const express = require('express');
const FIR = require("../models/FIR");
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/', [
    body('FIR_Number').isNumeric().withMessage('FIR Number must be a number'),
    body('FIR_Number').isLength({ min: 1 }).withMessage('FIR Number is required'),
    body('Police_Station_ID').isNumeric().withMessage('Police Station ID must be a number'),
    body('Police_Station_ID').isLength({ min: 1 }).withMessage('Police Station ID is required'),
    body('Created_At').isLength({ min: 1 }).withMessage('Created At is required'),
    body('Name').isLength({ min: 1 }).withMessage('Name is required'),
    body('Parent_Name').isLength({ min: 1 }).withMessage('Parent Name is required'),
    body('Address').isLength({ min: 1 }).withMessage('Address is required'),
    body('Zip').isNumeric().withMessage('Zip must be a number'),
    body('Zip').isLength({ min: 1 }).withMessage('Zip is required'),
    body('Contact_Number').isNumeric().withMessage('Contact Number must be a number'),
    body('Contact_Number').isLength({ min: 1 }).withMessage('Contact Number is required'),
    body('Relation_with_accused').isLength({ min: 1 }).withMessage('Relation with accused is required'),
    body('Name_of_accused').isLength({ min: 1 }).withMessage('Name of accused is required'),
    body('Type_of_incident').isLength({ min: 1 }).withMessage('Type of incident is required'),
    body('Incident_details').isLength({ min: 1 }).withMessage('Incident details is required'),
    body('Penal_code').isNumeric().withMessage('Penal code must be a number'),
    body('Penal_code').isLength({ min: 1 }).withMessage('Penal code is required'),
    body('Location.coordinates.*').isNumeric().withMessage('Longitude/Latitude field must be a number'),
    body('Location.coordinates.*').not().isEmpty().withMessage('Longitude/Latitude field must not be empty')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const Report = FIR(req.body);
    Report.save();
    res.send(req.body);
});

module.exports = router
