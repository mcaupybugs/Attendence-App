var mongoose = require('mongoose');


var subjectSchema = new mongoose.Schema({
   username: String,
   name: String,
   teacher: String,
   total: Number,
   present: Number
});


var Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;