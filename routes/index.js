var express=require("express");
var router=express.Router({mergeParams:true});
var User=require("../models/user");
var passport=require("passport");


router.get("/login",(req,res)=>{
    res.render("login");
})

router.post("/login",passport.authenticate("local",
{
    successRedirect:"/",
    failureRedirect:"/login"
}),(req,res)=>{

});


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

module.exports=router;