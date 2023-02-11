const mongoose = require('mongoose');
const {Schema} = mongoose;
const FIRSchema = new Schema({
    FIR_Number:{
        type: Number,
        require: true
    },
    Date:{
        type: Date,
        default: Date.now
    },
    Police_Station_ID:{
        type: Number,
        require: true
    },
    Created_At:{
        type: String,
        require: true
    },
    Name:{
        type: String,
        require: true
    },
    Parent_Name:{
        type: String,
        require: true
    },
    Address:{
        type: String,
        require: true
    },
    Zip:{
        type: Number,
        require: true
    },
    Contact_Number:{
        type: Number,
        require: true
    },
    Relation_with_accused:{
        type: String,
        require: true
    },
    Name_of_accused:{
        type: String,
        require: true
    },
    Type_of_incident:{
        type: String,
        require: true
    },
    Incident_details:{
        type: String,
        require: true
    },
    Penal_code:{
        type: Number,
        require: true
    },
    Location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});
FIRSchema.index({ Location: '2dsphere' });
module.exports = mongoose.model('FIR', FIRSchema)