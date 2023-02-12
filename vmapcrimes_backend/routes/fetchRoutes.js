const express = require('express');
const FIR = require("../models/FIR");
const router = express.Router();

router.get('/fetchFIR', (req, res) => {
    const dateBefore = req.query.dateBefore;
    const dateAfter = req.query.dateAfter;
    const crimeType = req.query.crimeType;
    const zipCode = req.query.zipCode;
    const address = req.query.address;
    const coordX = req.query.coordX;
    const coordY = req.query.coordY;
    const penalCode = req.query.penalCode;

    let query = FIR.find({});

    if(dateBefore) {
        query.where('Created_At').lte(dateBefore);
    }

    if(dateAfter) {
        query.where('Created_At').gte(dateAfter);
    }

    if(crimeType) {
        query.where('Type_of_incident').equals(crimeType);
    }

    if(zipCode) {
        query.where('Zip').equals(zipCode);
    }

    if(address) {
        query.where('Address').equals(address);
    }

    if(coordX && coordY) {
        query.where('Location.coordinates').equals([coordX, coordY]);
    }

    if(penalCode){
        query.where('Penal_code').equals(penalCode);
    }

    query.exec((error, result) => {
        if(error) {
            return res.status(500).json({ error: error });
        }
        res.send(result);
    });
});

module.exports = router;




