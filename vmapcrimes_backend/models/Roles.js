const mongoose = require("mongoose");
const { Schema } = mongoose;


const Roles = Schema ({
    "name" : {
        type : String,
        required: true,
        unique: true
    },
    "read-perms" : {
        type: [String],
        default: ['None']
    },
    "action-perms" : {
        type: [String],
        default: ['None']
    }
})

module.exports = mongoose.model('roles', Roles);
