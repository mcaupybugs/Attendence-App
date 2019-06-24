var express=require("express");
var router=express.Router({mergeParams:true});
var User=require("../models/user");
var Info=require('../models/info');

//==========================================

router.get('/',(req,res)=>{
    res.render('welcome');
})

router.post('/welcome',isLoggedIn,(req,res)=>{
    Info.create(req.body.info,(err,newUser)=>{
        if(err){
            res.render('welcome');
        }else{
            res.render('home');
        }
    })
})

//Middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/login');
    }
}

module.exports=router;