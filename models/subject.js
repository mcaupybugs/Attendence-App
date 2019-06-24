var mongoose=require('mongoose');


var subjectSchema=new mongoose.Schema({
   name:String,
   Total:Number,
   Present:Number
});


var Subject=mongoose.model("Subject",subjectSchema);

module.exports=Subject;