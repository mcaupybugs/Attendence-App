var mongoose=require("mongoose");

var infoSchema=new mongoose.Schema({
    name:String,
    email:String,
    college:String
});

var Info=mongoose.model("Info",infoSchema);

module.exports=Info;