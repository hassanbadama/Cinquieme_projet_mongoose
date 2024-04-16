const mongoose = require("mongoose");

const users = mongoose.Schema({
    nom:{
        type:String,
        require:true,
    },
    prenom:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    passWord:{
        type:String,
        require:true
    }
});
module.exports = mongoose.model("User", users);