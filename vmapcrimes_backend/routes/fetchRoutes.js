const express = require('express');
const verifyAccess = require('../middleware/verifyAccess');
const FIR = require("../models/FIR");
const router = express.Router();

// Returns an array of form [fir_id,lat,lng]

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
        query.where('Timestamp_of_Crime').lte(dateBefore);
    }

    if(dateAfter) {
        query.where('Timestamp_of_Crime').gte(dateAfter);
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
            return res.status(500).json({status: "failure", error: error });
        }
        var toSend = result.map((fir)=> {return [fir._id,fir.Location.coordinates[0],fir.Location.coordinates[1]]})


        // const {Location,_id} = result;
        // const toSend = [_id,...Location.coordinates]
        res.json({status:"success",result:toSend,message:"Fetched FIRs, Success!"})
    });
});
router.get('/fetchFIR/:id', async (req, res) => {

    const id = req.params.id;
    // console.log(req.params.id+"length is "+req.params.id.length)
    var lengthChecks= (id.length==24)
    // console.log("length checks "+lengthChecks)
    var isAlphanumeric =  /^[a-zA-Z0-9]+$/.test(id)
    // console.log("is alpha numeric "+isAlphanumeric)
    
    if (!id || !(typeof id === 'string')|| !lengthChecks || !isAlphanumeric) {
        return res.status(400).json({status:"failure",message : "Please Send a valid id in parameter"})
    }

    try {
        var requestedFir = await FIR.findOne({_id:id});
        // TODO Implement RBAC to give role specific details. For now, just type of crime,incident highlights, date, address and city
    
    } catch(e) {
        console.log("Error: "+e)
    
        if (e instanceof mongoose.Error) {
            return res.status(500).json({status:"failure",message:"Failed to query Database"})
    
        }else{
            
            return res.status(500).json({status:"failure",message:"Some unknown error occured"})
    
        }
    }
});



module.exports = router;




