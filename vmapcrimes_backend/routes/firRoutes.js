const express = require('express');
const FIR = require("../models/FIR");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const verifyAccess = require('../middleware/verifyAccess');

router.post('/uploadFir', verifyAccess({ACTION_PERMS:["CREATE_FIR"]}),[
    // body('Police_Station_ID').notEmpty().withMessage('Police Station ID is required').isNumeric().withMessage('Police Station ID must be a number'),
    (req,res)=> {console.log("Passed verify Access");next()},
    body('Victim_Name').notEmpty().withMessage('Name is required'),
    body('Relatives').notEmpty().withMessage('Parent Name is required'),
    body('Address').notEmpty().withMessage('Address is required'),
    body('Zip').notEmpty().withMessage('Zip is required').isNumeric().withMessage('Zip must be a number').isLength({min:6,max:6}).withMessage("Provide a valid Zip Code"),
    body('Contact_Number').notEmpty().withMessage('Contact Number is required').isNumeric().withMessage('Contact Number must be a number').isLength({min:10,max:10}).withMessage("Porvide a valid contact number"),
    body('Date').isISO8601().withMessage("Date should be of the format YYYY-MM-DD"),
    body('Relation_with_accused').notEmpty().withMessage('Relation with accused is required'),
    body('Name_of_accused').notEmpty().withMessage('Name of accused is required'),
    body('Type_of_incident').notEmpty().withMessage('Type of incident is required'),
    body('Incident_Highlight').notEmpty().withMessage('Incident details is required'),
    body('Incident_details').notEmpty().withMessage('Incident details is required'),
    body('Penal_code').notEmpty().withMessage('Penal code is required').isNumeric().withMessage('Penal code must be a number'),
    body('Crime_City').notEmpty().withMessage('City of crime must not be left empty').isAlpha(),
    body('Location.coordinates.*').notEmpty().withMessage('Longitude/Latitude field must not be empty').isNumeric().withMessage('Longitude/Latitude field must be a number'),
    body('Crime_State').notEmpty().withMessage('State of crime must not be left empty').isAlpha({ignore: ' '}),
    body('Timestamp_of_Crime').notEmpty().isISO8601().withMessage("Date should be of the format YYYY-MM-DD")


], (req, res) => {
    console.log("In upload FIR")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const Report = FIR(req.body);
    Report.save();
    res.send(req.body);
});


module.exports = router
