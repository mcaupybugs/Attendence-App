var express=require('express');
var app=express();
var bodyParser=require("body-parser");

app.use(express.static("public"));
app.set("view engine","ejs");

//================================

app.get("/",(req,res)=>{
    res.render("index");
})

//================================
const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})