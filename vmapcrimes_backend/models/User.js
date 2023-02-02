const mongoose = require('mongoose');
const { Schema } = mongoose

const UserSchema = new Schema({

    "name" : String,
    "email" : { type : String, unique : true },
    "address" : { type : String },
    "phone" : {type : String , unique : true },
    "password" : String

})

module.exports = mongoose.model('user',UserSchema);

