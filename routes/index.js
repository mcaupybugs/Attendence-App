var express=require("express");
var router=express.Router({mergeParams:true});
var User=require("../models/user");
var passport=require("passport");

//===============================================
router.get("/login",(req,res)=>{
    res.render("login");
})

router.post("/login",passport.authenticate("local",
{
    successRedirect:"/",
    failureRedirect:"/login"
}),(req,res)=>{
});

//=================================================
router.get("/logout",(req,res)=>{
    req.logout();
    req.flash("success","Logged you out successfully");
    res.redirect("/");
});

//================================================


router.get("/register",(req,res)=>{
    res.render("register");
})

router.post("/register",(req,res)=>{
    User.register(new User({username:req.body.username}),req.body.password,(err,user)=>{
        if(err){
            return res.render("register");
        }else{
            passport.authenticate("local")(req,res,()=>{
                res.render("login");
            });
        }
    });
});

//====================================================


//Middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/login');
        res.flash("error","Please log in first");
    }
}
module.exports=router;