//importing npm provided libraries
const express = require('express');
const bcrypt =  require('bcrypt');
const dotenv= require('dotenv');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

//initializing some stuff
const router = express.Router();
const user= require('../models/User');
const Role= require('../models/Roles');

// importing npm provided middlewares
const { body, validationResult,param } = require('express-validator');
const { expressjwt: ejwt } = require('express-jwt');

// importing custom middlewares
const verifyAccess = require('../middleware/verifyAccess');

dotenv.config();

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
        var loginuser
        try {
            loginuser = await user.findOne({email: req.body.email}) ;
        } catch(MongooseError) {
            return res.status(500).json({status:"failure",message:"Failed to query Database"})
        }
        var userRole;
        try {
            userRole = await Role.findOne({_id: loginuser.role});
        }catch(e) {
            console.log(e)
            if (e instanceof mongoose.Error) {
                return res.status(500).json({status:"failure",message:"Failed to query the database"})
            }else{
                return res.status(500).json({status:"failure",message:"Some Unknown error occured"})

            }
        }

        if(userRole.name !== "admin"){
            return res.status(401).json({status:"failure",message:"User is not an admin!"})
        }
        if(!loginuser || !bcrypt.compare(req.body.password,loginuser.password)) {
            return res.status(404).send("Please enter valid Credentials");
        }
    

        // After successful username, password verification
        var payload =  {
            id : loginuser._id,
            username: loginuser.name
        };

        const jwtSessionTok = await jwt.sign(payload,process.env.JWT_SECRET_KEY,{ algorithm : 'HS256',expiresIn: 2*3600});
        console.log(jwtSessionTok);

        return res.send(jwtSessionTok);
    }


) 
// END ROUTE 1

// [ 🔴 NEED ADMIN ACCESS ]

// ROUTE 2
// POST to http://localhost:5001/api/v1/admin/createUser with { "name" : "John Doe",  "email": "test@test.com","password" : "test123", "phone" : "1234567890" , "address" : "dummy address", "role" : "admin2"}

router.post('/createUser',

    // TODO : create the middleware
    // middleware to check if the user is admin
    verifyAccess(),
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
        body('password').notEmpty().withMessage("Password must not be empty").isStrongPassword().withMessage("Please enter a strong password(With min length of 8,at least one uppercase, one lowercase, one special character and one number "),
        
        body('role').optional().isAlpha().withMessage("Role invalid").isLength({min:5,max:20}).withMessage("Role length must be between 5-20 characters")

    ],async (req, res) => {
        try{

            // check if any of the validations failed
            var errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors : errors.array()});
            }

            // check if the email id is unique
            let  email = await user.findOne({email : req.body.email});
        
            if(email) {
                // console.log(email);
                return res.status("400").json({status:"failure",message:"Email must be unique"});

            }

            // check if phone number is unique
            let phone = await user.findOne({phone : req.body.phone});
            
            if(phone) {
                // console.log(email);
                return res.status("400").json({status:"failure",message:"Phone Number must be unique"});
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
            let roleName = req.body.role 
            newUser.role = await Role.findOne({name : roleName?roleName:'public'})
            
                await user.create(newUser).then(() => console.log("User successfully created"))
            
            return res.send("Ok");
        } catch(e) {
            console.log("Error  " + e)
            if (e instanceof mongoose.Error) {
                return res.status(500).json({status:"failure",message:"Failed to query the database"})
            }else{
                return res.status(500).json({status:"failure",message:"Some Unknown error occured"})

            }
        }
    }
) 
// END ROUTE 2


// ROUTE 3
// POST to http://localhost:5001/api/v1/admin/addRole with -> { 'role' : 'normaluser', 'read-perms' : [] , 'action-perms' : [] }


router.post('/addRole',
verifyAccess(),
    body('role').notEmpty().withMessage("Role name cannot be empty").isLength({min :5, max:20}).withMessage("Role names should be between 5-20 characters in length"),
async (req,res) => {
    try {
    
        if (req.body.read_perms && !Array.isArray(req.body.read_perms)) {
            return res.status(400).json({status: 'failure',message:"Read Permissions should be an array of permissions(Strings)"})
        }
        if (req.body.action_perms && !Array.isArray(req.body.action_perms)) {
            return res.status(400).json({status: 'failure',message:"Action Permissions should be an array of permissions(Strings)"})
        }
        var roleExists;
         
            roleExists = await Role.findOne({name: req.body.role});
        
        if(roleExists){
            return res.status(500).json({status:"failure",message:"Cannot create aRolewith that name, Role exists already"})
        }

        await Role.create({
            name: req.body.role,
            read_perms : req.body.read_perms,
            action_perms : req.body.action_perms,
    
        })
        

        return res.json({status:"success",message:"New Role Created"})
    } catch(e) {
        console.log("Error: "+e)

        if (e instanceof mongoose.Error) {
            return res.status(500).json({status:"failure",message:"Failed to query Database"})

        }else{
            
            return res.status(500).json({status:"failure",message:"Some unknown error occured"})

        }
    }

}) 
// END ROUTE 3

// ROUTE 4
// GET to http://localhost:5001/api/v1/admin/fetchAllUsers 

router.get('/fetchAllUsers',verifyAccess(), async (req,res) => {
        
    try {
        var allUsers = await user.find()
        var toSend = [];
        var i=0;
        for (var item of allUsers) {
                const {_id, name ,role } = item;
                let roleObj = await Role.findOne({_id:role});
                let roleName = roleObj.name;
                toSend[i] = { name: name , role:roleName, id : _id };
                i = i+1; 
                
        }
        return res.json({users: toSend});   
    }catch(e) {
        console.log("Error: "+e)

        if (e instanceof mongoose.Error) {
            return res.status(500).json({status:"failure",message:"Failed to query Database"})

        }else{
            
            return res.status(500).json({status:"failure",message:"Some unknown error occured"})

        }
    }
    
}); 
// END ROUTE 4


// ROUTE 5
// GET to http://localhost:5001/api/v1/admin/fetchUser/<userId>

router.get('/fetchUser/:id',verifyAccess(),async (req,res) => {
const id = req.params.id;
if(!id) {
    return res.status(400).json({status:"failure",message: "Missing ID parameter"})
}

try {
    var requestedUser = await user.findOne({_id:id});
} catch(e) {
    console.log("Error: "+e)

    if (e instanceof mongoose.Error) {
        return res.status(500).json({status:"failure",message:"Failed to query Database"})

    }else{
        
        return res.status(500).json({status:"failure",message:"Some unknown error occured"})

    }
}
if(!requestedUser) { 
    return res.status(404).json({status: "failure",message:"Not Found"})
}
var { _id , name , email , address, phone ,role} = requestedUser;
return res.json({_id: _id,name :name,email:email,address:address,phone:phone,role:role});

}); 
// END ROUTE 5


// ROUTE 6
// DELETE to http://localhost:5001/api/v1/admin/deleteUser/<userId>

router.delete('/deleteUser/:id',verifyAccess(),async (req,res) => {  
    if (typeof req.params.id !== 'string') {
        return res.status(400).json({status:"failure",message: "Provide a valid ID"});
    }
    var id = req.params.id.toLowerCase();
    let toDelete;
    try {
        toDelete = await user.findOneAndDelete({_id: id });
        if(!toDelete) {
            return res.status(404).json({status:"failure",message:"User not found"})
        }
    } catch(e) {
        console.log("Error: "+e)

        if (e instanceof mongoose.Error) {
            return res.status(500).json({status:"failure",message:"Failed to query Database"})

        }else{
            
            return res.status(500).json({status:"failure",message:"Some unknown error occured"})

        }
    }
        return res.json({status : "success", message : "User deleted Successfully!"});
    


});
// END ROUTE 6

// ROUTE 7
// DELETE to http://localhost:5001/api/v1/admin/deleteRole/<userId>

router.delete('/deleteRole/:id',verifyAccess(),async (req,res) => {  
    if (typeof req.params.id !== 'string') {
        return res.status(400).json({status:"failure",message: "Provide a valid ID"});
    }
    var id = req.params.id.toLowerCase();
    let toDelete;
    try {
        toDelete = await Role.findOneAndDelete({_id: new mongoose.Types.ObjectId(id) });
        if(!toDelete){
            return res.status(404).json({status:"failure",message:"Role not found"})
        }
        await user.deleteMany({role: id}) // to delete all the users having the deleted roles
    } catch(e) {
        console.log("Error: "+e)

        if (e instanceof mongoose.Error) {
            return res.status(500).json({status:"failure",message:"Failed to query Database"})

        }else{
            
            return res.status(500).json({status:"failure",message:"Some unknown error occured"})

        }
    }
        return res.json({status : "success", message : "Role deleted Successfully!"});
    


});
// END ROUTE 7

// ROUTE 8
// PUT to http://localhost:5001/api/v1/admin/updateUser

router.put('/updateUser',verifyAccess(),
[
    body("_id").isAlphanumeric().withMessage("Id should be a string value").isLength({min:24,max:24}).withMessage("Id should be 24 characters in length"),
   // check if email is a valid email address
   body('email').optional().isEmail().withMessage("Must be a valid email"),

   // check if the name is minimum 5 characters long and maximum 50 characters long
   body('name').optional().isLength({min: 5}).withMessage("Name must not be smaller than 5 characters").isLength({max : 50}).withMessage("Sorry, name cannot be greater than 50 characters"),
   
   // check if the address is minimum 5 characters long and maximum 100 characters long
   body('address').optional().isLength({min: 5}).withMessage("Address must not be smaller than 5 characters").isLength({max : 100}).withMessage("Sorry, address cannot be greater than 100 characters"),

   // check if the phone number is numeric and of length 10
   body('phone').optional().isNumeric().isLength({min: 10,max:10}).withMessage("Phone numbers must be 10 digits in length")

]
,async (req,res) => {  
    
    // check if any of the validations failed
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()});
    }
console.log()
    
    if(typeof req.body._id !== 'string'){
        return res.status(400).json({status:"failure",message:"Please provide a valid id for the user to update"})

    }

    let _id = req.body._id.toLowerCase();
    let toUpdate

    try {
        toUpdate = await user.findOneAndUpdate({_id:_id},req.body)
        if(!toUpdate) {
            return res.status(404).json({status:"failure",message:"User not found"})
        }

    } catch(e) {
        console.log("Error: "+e)

        if (e instanceof mongoose.Error) {
            return res.status(500).json({status:"failure",message:"Failed to query Database"})

        }else{
            
            return res.status(500).json({status:"failure",message:"Some unknown error occured"})

        }
    }
    return res.json({status:"success",message:"User successfully updated"})
})
// END ROUTE 8


// ROUTE 9
// PUT to http://localhost:5001/api/v1/admin/updateRole

router.put('/updateRole',verifyAccess(), 
[
    body('name').optional().isLength({min:5,max:20}).withMessage("Name of aRolemust be betweem 5-20 characters long"),
    
]
,
async (req,res) => {
    if (req.body.read_perms && !Array.isArray(req.body.read_perms)) {
        return res.status(400).json({status: 'failure',message:"Read Permissions should be an array of permissions(Strings)"})
    }
    if (req.body.action_perms && !Array.isArray(req.body.action_perms)) {
        return res.status(400).json({status: 'failure',message:"Action Permissions should be an array of permissions(Strings)"})
    }
    try {
        let toUpdate = await Role.findOneAndUpdate({_id: req.body._id},req.body);
        if(!toUpdate) {
            return res.status(404).json({status:"failure",message:"Role not found"})
        }
    }catch(e) {
        console.log("Error: "+e)

        if (e instanceof mongoose.Error) {
            return res.status(500).json({status:"failure",message:"Failed to query Database"})

        }else{
            
            return res.status(500).json({status:"failure",message:"Some unknown error occured"})

        }
    }

    return res.json({status:"success",message:"User updated Successfully"});
})
// END ROUTE 9

// ROUTE 10
// GET to http://localhost:5001/api/v1/admin/fetchRole/<roleID>

router.get('/fetchRole/:id',verifyAccess(), 
async (req,res) => {
        // console.log(req.params.id+"length is "+req.params.id.length)
        var lengthChecks= (req.params.id.length==24)
        // console.log("length checks "+lengthChecks)
        var isAlphanumeric =  /^[a-zA-Z0-9]+$/.test(req.auth.id)
        // console.log("is alpha numeric "+isAlphanumeric)

        if (!req.params.id || !(typeof req.params.id === 'string')|| !lengthChecks || !isAlphanumeric) {
            return res.status(400).json({status:"failure",message : "Please Send a valid id in parameter"})
         }

         try {
            let toFetch = await Role.find({_id: req.params.id.toLowerCase()});
            if (!toFetch) {
                return res.status(404).json({status:"failure",message:"Role not found"})
            }
            return res.json(toFetch[0])

         } catch(e) {
            console.log("Error: "+e)
    
            if (e instanceof mongoose.Error) {
                return res.status(500).json({status:"failure",message:"Failed to query Database"})
    
            }else{
                
                return res.status(500).json({status:"failure",message:"Some unknown error occured"})
    
            }
        }

    }
)
// END ROUTE 10

// ROUTE 11
// GET to http://localhost:5001/api/v1/admin/fetchAllRoles

router.get('/fetchAllRoles',verifyAccess(), async (req,res) => {
    try {
        let fetchArray = await Role.find();
        return res.json({roles:fetchArray})
    }catch(e) {
        console.log("Error: "+e)

        if (e instanceof mongoose.Error) {
            return res.status(500).json({status:"failure",message:"Failed to query Database"})

        }else{
            
            return res.status(500).json({status:"failure",message:"Some unknown error occured"})

        }
    }
})
// END ROUTE 11

// ROUTE 12
// DELETE to http://localhost:5001/api/v1/admin/deleteRoles with an array of ids in the body

router.delete('/deleteRoles',
verifyAccess(),async (req,res) => {  
    
    if(!(Array.isArray(req.body.ids))) {
        return res.status(400).json({status: "failure",message: "Please send ids as array"});
    }
    if(!(req.body.ids.every((item) => {
        return (typeof item === "string" && item.length == 24) 
    }))) {
        return res.status(400).json({status: "failure",message: "Bad Request"})
    }

    let toDelete;
    try {
        toDelete = awaitRoledeleteMany({_id: {$in:req.body.ids} });
        if(!(toDelete.deletedCount === req.body.ids.length)){
            await user.deleteMany({role: {$in:req.body.ids}}) // to delete all the users having the deleted roles
            return res.status(500).json({status:"failure",message:"Something went wrong, All roles could not be deleted"})
        }
        await user.deleteMany({role: {$in:req.body.ids}}) // to delete all the users having the deleted roles
    } catch(e) {
        console.log("Error: "+e)

        if (e instanceof mongoose.Error) {
            return res.status(500).json({status:"failure",message:"Failed to query Database"})

        }else{
            
            return res.status(500).json({status:"failure",message:"Some unknown error occured"})

        }
    }
        return res.json({status : "success", message : "Role deleted Successfully!"});
    


});
// END ROUTE 12

// ROUTE 13
// DELETE to http://localhost:5001/api/v1/admin/deleteUsers with a body containing an array of ids to delete

router.delete('/deleteUser/:id',verifyAccess(),async (req,res) => {  
    if(!(Array.isArray(req.body.ids))) {
        return res.status(400).json({status: "failure",message: "Please send ids as array"});
    }
    if(!(req.body.ids.every((item) => {
        return (typeof item === "string" && item.length == 24) 
    }))) {
        return res.status(400).json({status: "failure",message: "Bad Request"})
    }

    let toDelete;
    try {
        toDelete = await user.deleteMany({_id: {$in: id} });
        if(!(toDelete.deletedCount === req.body.ids.length)){
            return res.status(500).json({status:"failure",message:"Something went wrong, All users could not be deleted"})
        }
    } catch(e) {
        console.log("Error: "+e)

        if (e instanceof mongoose.Error) {
            return res.status(500).json({status:"failure",message:"Failed to query Database"})

        }else{
            
            return res.status(500).json({status:"failure",message:"Some unknown error occured"})

        }
    }
        return res.json({status : "success", message : "User deleted Successfully!"});
    


});
// END ROUTE 13
module.exports = router;