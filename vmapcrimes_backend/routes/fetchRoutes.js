const express = require('express');
const verifyAccess = require('../middleware/verifyAccess');
const FIR = require("../models/FIR");
const User = require("../models/User")
const Role = require("../models/Roles")
const jwt_decode = require('jwt-decode')
const router = express.Router();
const mongoose = require("mongoose")
// Returns an array of form [fir_id,lat,lng]

const firRbaced = async (roleid, result) => {
    var userRole, isAdmin;
    if (roleid) {

        userRole = await Role.findOne({ _id: roleid })
        isAdmin = userRole.name === "admin"
    }
    // console.log("User is : "+userRole.name)
    // visible to user with least privileges
    var toSend = result.map((fir) => {
        return {
            _id: fir._id, coords: fir.Location.coordinates, type: fir.Type_of_incident, highlight: fir.Incident_Highlight, timestamp: fir.Timestamp_of_Crime, address: fir.Address, crimeCity: fir.Crime_City, penalCode: fir.Penal_code, crimeState: fir.Crime_State,

            //visible to user with CRIME_SUSPECTS permission
            ...((roleid && userRole && (isAdmin || userRole.read_perms.includes("CRIME_SUSPECTS"))) ? { suspect: fir.Name_of_accused } : {}),
            ...((roleid && userRole && (isAdmin || userRole.read_perms.includes("CRIME_VICTIM"))) ? { victim: fir.Victim_Name } : {}),
            ...((roleid && userRole && (isAdmin || userRole.read_perms.includes("ACCUSED_VICTIM_RELATION"))) ? { relation: fir.Relation_with_accused } : {}),
            ...((roleid && userRole && (isAdmin || userRole.read_perms.includes("CRIME_USED_WEAPONS"))) ? { weapon: fir.Weapons_Used } : {}),
            ...((roleid && userRole && (isAdmin || userRole.read_perms.includes("CRIME_DETAILS"))) ? { details: fir.Incident_details } : {}),
        }
    })
    console.log("To Send: " + toSend)

    return toSend
}

router.get('/fetchFIR', async (req, res) => {

    const dateBefore = req.query.dateBefore;
    const dateAfter = req.query.dateAfter;
    const crimeType = req.query.crimeType;
    const zipCode = req.query.zipCode;
    const address = req.query.address;
    const city = req.query.city;
    const state = req.query.state;
    const penalCode = req.query.penalCode;
    const textSearch = req.query.textSearch
    let query = FIR.find({});
    var role
    if (req.cookies) {
        try {

            role = jwt_decode(req.cookies['auth-token']).role
            var userRole = await Role.findOne({ _id: roleid })
        } catch (e) {
            console.log(e)
            
        }
    }

    if (dateBefore) {
        query.where('Timestamp_of_Crime').lte(dateBefore);
    }

    if (dateAfter) {
        query.where('Timestamp_of_Crime').gte(dateAfter);
    }

    if (crimeType) {
        query.where('Type_of_incident').equals(crimeType);
    }

    if (zipCode) {
        query.where('Zip').equals(zipCode);
    }

    if (address) {
        query.where('Address').equals(address);
    }

    if (penalCode) {
        query.where('Penal_code').equals(penalCode);
    }
    if (state) {
        query.where('Crime_State').equals(state);
    }
    if (city) {
        query.where('Crime_City').equals(city);
    }
    if (role) {

        if (textSearch) {
            query.where({ $text: { $search: textSearch } }, { matchedFields: { $meta: "textMatchedFields" } });
        }

    }

    query.exec(async (error, result) => {
        console.log("Result is " + result)
        // console.log("Matched fields are: "+matchedFields)
        if (error) {
            return res.status(500).json({ status: "failure", error: error });
        }

        
        const toSend = await firRbaced(role ? role : "", result)

        // const {Location,_id} = result;
        // const toSend = [_id,...Location.coordinates]
        res.json({ status: "success", result: toSend, message: "Fetched FIRs, Success!" })
    });

});


module.exports = router;




