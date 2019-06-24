var mongoose=require("mongoose");

var infoSchema=new mongoose.Schema({
    name:String,
    email:String,
    college:String,
    branch:String,
    phone:Number
});

var Info=mongoose.model("Info",infoSchema);

module.exports=Info;