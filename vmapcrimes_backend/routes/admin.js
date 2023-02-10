//importing npm provided libraries
const express = require('express');
const bcrypt =  require('bcrypt');
const dotenv= require('dotenv');
const jwt = require("jsonwebtoken");

//initializing some stuff
const router = express.Router();
const user= require('../models/User');
const role = require('../models/Roles');

// importing npm provided middlewares
const { body, validationResult } = require('express-validator');
const { expressjwt: ejwt } = require('express-jwt');

// importing custom middlewares
const verifyAdmin = require('../middleware/verifyAdmin');

dotenv.config();

// ROUTE 3
// [ 🔴 NEED ADMIN ACCESS ]
// GET to http://localhost:5001/api/v1/admin/fetchAllUsers 

router.get('/fetchAllUsers',verifyAdmin, async (req,res) => {
    const allUsers = await user.find();
    const toSend = [];
    var i=0;
    allUsers.forEach((item)=>{
        const {_id, name , role } = item;
        toSend[i] = { name: name , role : role, id : _id };
        i++;
    })
    return res.json(toSend);
}); // END ROUTE 3


// ROUTE 4
// [ 🔴 NEED ADMIN ACCESS ]
// GET to http://localhost:5001/api/v1/admin/fetchAllUsers/<userId>

router.get('/fetchUser/:id',verifyAdmin,async (req,res) => {
const id = req.params.id;
if(!id) {
    return res.status(400).json({status:"failure",message: "Missing ID parameter"})
}
console.log("Inside fetchUser")
var requestedUser = await user.findOne({_id:id});
if(!requestedUser) { 
    return res.status(404).json({status: "failure",message:"Not Found"})
}
var { _id , name , email , address, phone , role } = requestedUser;
return res.json({_id: _id,name :name,email:email,address:address,phone:phone,role:role});

}); // END ROUTE 4

// ROUTE 1
// [ 🟢 UNRESTRICTED ROUTE ]  (May need to later control access with IP based filtering)
// POST to http://localhost:5001/api/v1/admin/adminLogin with { "email":"test@test.com","password" : "test123" }

router.post('/adminLogin',
    [
        body('email').isEmail() //check if the email is valid email or not
    ],

    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json(errors);
        }
        var loginuser = await user.findOne({email: req.body.email}) ;
        if(loginuser.role !== "admin"){
            return res.status(401).json({status:"failure",message:"User is not an admin!"})
        }
        if(!loginuser || !bcrypt.compare(req.body.password,loginuser.password)) {
            return res.status(404).send("Please enter valid Credentials");
        }
    

        // After successful username, password verification
        var payload =  {
            role : loginuser.role,
            username: loginuser.name
        };

        const jwtSessionTok = await jwt.sign(payload,process.env.JWT_SECRET_KEY,{ algorithm : 'HS256',expiresIn: 15*3600});
        console.log(jwtSessionTok);

        return res.send(jwtSessionTok);
    }


) // END ROUTE 1

// ROUTE 2
// [ 🔴 NEED ADMIN ACCESS ]
// POST to http://localhost:5001/api/v1/admin/createUser with { "name" : "John Doe",  "email": "test@test.com","password" : "test123", "phone" : "1234567890" , "address" : "dummy address", "role" : "admin2"}

router.post('/createUser',

    // TODO : create the middleware
    // middleware to check if the user is admin
    verifyAdmin,
    [

        // TODO : add proper sanitization to name and address fields

        // check if email is not empty and a valid email address
        body('email').notEmpty().withMessage("Email must not be empty").isEmail().withMessage("Must be a valid email"),
        // check if the name is minimum 5 characters long and maximum 50 characters long
        body('name').notEmpty().withMessage("Name must not be empty").isLength({min: 5}).withMessage("Name must not be smaller than 5 characters").isLength({max : 50}).withMessage("Sorry, name cannot be greater than 50 characters"),
        body('address').notEmpty().withMessage("Address must not be empty").isLength({min: 5}).withMessage("Address must not be smaller than 5 characters").isLength({max : 100}).withMessage("Sorry, address cannot be greater than 100 characters"),
        // check if the phone number is numeric and of length 10
        body('phone').notEmpty().withMessage("Phone number must not be empty").isNumeric().isLength({min: 10,max:10}).withMessage("Phone numbers must be 10 digits in length"),
        // check if the password is not empty and is a strong password : minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
        body('password').notEmpty().withMessage("Password must not be empty").isStrongPassword().withMessage("Please enter a strong password(With min length of 8,at least one uppercase, one lowercase, one special character and one number ")
    
    ],async (req, res) => {

        // check if any of the validations failed
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors : errors.array()});
        }

        //check if the role name is valid
        var role = req.body.role;
        if(req.body.role){
            if(typeof role !== "string") {
                return res.status(400).json({status : "failed",message: "Role invalid"});
            }
            if(req.body.role.length > 20 || req.body.role.length < 5){
                return res.status(400).json({status : "failed",message: "Role length must be between 5-20 characters"});
            }
            
        }

        // check if the email id is unique
        let email = await user.findOne({email : req.body.email});
        if(email) {
            // console.log(email);
            return res.status("400").send("Email must be unique");
        }

        // check if phone number is unique
        let phone = await user.findOne({phone : req.body.phone});
        if(phone) {
            // console.log(email);
            return res.status("400").send("Phone Number must be unique");
        }


        // calculate password hash

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt);

        //finally create the user
        let newUser = {
            name : req.body.name,
            email: req.body.email,
            address: req.body.address,
            password: hashedPass,
            phone: req.body.phone,
        }
        if(role) {
            newUser.role = role
        }
        await user.create(newUser).then(() => console.log("User successfully created")).catch((err)=> console.log("Some err occured while creating new user: " + err));
        return res.send("Ok");
    }
) // END ROUTE 2



// ROUTE 5
// [ 🔴 NEED ADMIN ACCESS ]
// POST to http://localhost:5001/api/v1/admin/fetchAllUsers/<userId> with -> { 'name' : 'normaluser', 'read-perms' : [] , 'action-perms' : [] }


router.post('/addRole',verifyAdmin,
    body('role').notEmpty().withMessage("Role name cannot be empty").isLength({min :5, max:20}).withMessage("Role names should be between 5-20 characters in length"),
async (req,res) => {
    if (req.body.read-perms && !Array.isArray(req.body.read-perms)) {
        res.status(400).json({status: 'failure',message:"Read Permissions should be an array of permissions"})
    }
    if (req.body.action-perms && !Array.isArray(req.body.action-perms)) {
        res.status(400).json({status: 'failure',message:"Action Permissions should be an array of permissions"})
    }
    role.create()
    return res.json({status:"success",message:"New Role Created"})

})

module.exports = router;