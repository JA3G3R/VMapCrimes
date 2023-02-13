const express = require('express');
const FIR = require("../models/FIR");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const verifyAccess = require('../middleware/verifyAccess');

router.post('/uploadFir', verifyAccess({ACTION_PERMS:["CREATE_FIR"]}),[
    // body('Police_Station_ID').notEmpty().withMessage('Police Station ID is required').isNumeric().withMessage('Police Station ID must be a number'),

    body('Victim_Name').notEmpty().withMessage("Name is required"),
    body('Officers_Name').notEmpty().withMessage("Officer's Name is required"),
        (req,res,next)=> {console.log("Passed 2");next()},

    body('Address').notEmpty().withMessage('Address is required'),
        (req,res,next)=> {console.log("Passed 3");next()},

    body('Zip').notEmpty().withMessage('Zip is required').isNumeric().withMessage('Zip must be a number').isLength({min:6,max:6}).withMessage("Provide a valid Zip Code"),
        (req,res,next)=> {console.log("Passed 4");next()},

    body('Contact_Number').notEmpty().withMessage('Contact Number is required').isNumeric().withMessage('Contact Number must be a number').isLength({min:10,max:10}).withMessage("Porvide a valid contact number"),
        (req,res,next)=> {console.log("Passed 5");next()},

    body('Relation_with_accused').notEmpty().withMessage('Relation with accused is required'),
        (req,res,next)=> {console.log("Passed 7");next()},

    body('Name_of_accused').notEmpty().withMessage('Name of accused is required'),
        (req,res,next)=> {console.log("Passed 8");next()},

    body('Type_of_incident').notEmpty().withMessage('Type of incident is required'),
        (req,res,next)=> {console.log("Passed 9");next()},

    body('Incident_Highlight').notEmpty().withMessage('Incident details is required'),
        (req,res,next)=> {console.log("Passed 10");next()},

    body('Incident_details').notEmpty().withMessage('Incident details is required'),
        (req,res,next)=> {console.log("Passed 11");next()},

    body('Penal_code').notEmpty().withMessage('Penal code is required').isNumeric().withMessage('Penal code must be a number'),
        (req,res,next)=> {console.log("Passed 12");next()},

    body('Crime_City').notEmpty().withMessage('City of crime must not be left empty').isAlpha(),
        (req,res,next)=> {console.log("Passed 13");next()},

    body('Location.coordinates.*').notEmpty().withMessage('Longitude/Latitude field must not be empty').isNumeric().withMessage('Longitude/Latitude field must be a number'),
        (req,res,next)=> {console.log("Passed 14");next()},

    body('Crime_State').notEmpty().withMessage('State of crime must not be left empty').isAlpha('en-US',{ignore: ' '}),
        (req,res,next)=> {console.log("Passed 15");next()},

    body('Timestamp_of_Crime').notEmpty().withMessage("Timestamp of Crime is required").isISO8601().withMessage("Date should be of the format YYYY-MM-DD")


], (req, res) => {
    console.log("In upload FIR")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    var { Location } = req.body
    console.log(typeof req.body.Location.coordinates[0])

    req.body.Location.coordinates = [parseFloat(Location.coordinates[0]), parseFloat(Location.coordinates[1])]
    console.log(typeof req.body.Location.coordinates[0])
    const Report = FIR(req.body);
    Report.save();
    res.send(req.body);
});


module.exports = router
