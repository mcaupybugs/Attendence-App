var express=require("express");
var router=express.Router({mergeParams:true});
var User=require("../models/user");

router.get('/',(req,res)=>{
    res.render('home');
})

module.exports=router;