mongoose = require('mongoose');

const modelsauce = mongoose.Schema({
    //userid est la etrange de l'autre table
    userId:{
        type:String,
        required:true, 
        index:true
    },
    name:{
        type:String,
        required:true
    },
    manufacturer:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    mainPepper:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        default:"None"
    },
    heat:{
        type:Number,
        required:true
    },
    likes:{
        type:Number,
        required:false,
        default:0
    },
    dislikes:{
        type:Number,
        required:false,
        default:0
    },
    usersLiked:{
        type:[String],
        required:false,
       
    },
    usersDisliked :{
        type:[String],
        required:false,
    }
});

module.exports = mongoose.model("Modelsauce", modelsauce);