var mongoose=require('mongoose');
var Info=require("./info");
var Subject=require("./subject");
var passportLocalMongoose=require('passport-local-mongoose');

var userSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    subject:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subject'
    }],
    info:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Info'
    }]
});

userSchema.plugin(passportLocalMongoose);

var User=mongoose.model("User",userSchema);

module.exports=User;