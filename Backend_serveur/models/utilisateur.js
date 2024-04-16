mongoose = require('mongoose');


const utilisateur = mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model("Utilisateur", utilisateur );