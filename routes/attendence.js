var express=require("express");
var router=express.Router({mergeParams:true});
var User=require("../models/user");
var Info=require('../models/info');
var Subject=require("../models/subject");

//==========================================

router.get('/',(req,res)=>{
    // Subject.find({'_id':{$in:req.user.subject}},(err,subject)=>{
    //     if(err){
    //         console.log(err);
    //     }else{
    //         res.render('home',{subjects:subject});
    //     }
    // })
    res.render('home');
})
//==================================================

router.get("/welcome",isLoggedIn,(req,res)=>{
    res.render('welcome');
})


router.post('/welcome',isLoggedIn,(req,res)=>{
    Info.create(req.body.info,(err,newUser)=>{
        if(err){
            res.render('welcome');
        }else{
            req.user.info.push(newUser);
            req.user.save();
            res.render('home');
        }
    })
})

//=====================================================

router.get("/subject",isLoggedIn,(req,res)=>{
    res.render('subject');
})

router.post('/subject',isLoggedIn,(req,res)=>{
    Subject.create(req.body.subject,(err,newUser)=>{
        if(err){
            res.render('welcome');
        }else{
            req.user.subject.push(newUser);
            req.user.save();
            res.render('home');
        }
    })
})

//====================================================

//Middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/login');
    }
}

module.exports=router;