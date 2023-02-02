const express = require('express');
const bcrypt =  require('bcrypt');
const router = express.Router();
const user= require('../models/User')
const verifyAccess = require('../middleware/verifyAccess')
const { body, validationResult } = require('express-validator');



// [ 🔴 NEED ADMIN ACCESS ]


router.post('/createUser',

// TODO : create the middleware
// middleware to get the role
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
    body('password').notEmpty().withMessage("Password must not be empty").isStrongPassword().withMessage("Please enter a strong password(With min length of 8,at least one uppercase, one lowercase, one special character and one number ")

],async (req, res) => {
    
    // check if any of the validations failed
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()});
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
    await user.create({
        name : req.body.name,
        email: req.body.email,
        address: req.body.address,
        password: hashedPass,
        phone: req.body.phone,
    }).then().catch();
    res.send("Ok");
})



module.exports = router;