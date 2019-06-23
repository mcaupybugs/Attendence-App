var mongoose=require('mongoose');
var passportLocalMongoose=require('passport-local-mongoose');

var userSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    subject:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subject'
    }],
    Info:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subject'
    }]
});

userSchema.plugin(passportLocalMongoose);

var User=mongoose.model("User",userSchema);

module.exports=User;