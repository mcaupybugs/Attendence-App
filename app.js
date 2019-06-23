var express=require('express');
var app=express();
var bodyParser=require("body-parser");
var passport=require('passport');
var LocalStrategy=require('passport-local');
var passportLocalMongoose=require('passport-local-mongoose');
var mongoose=require('mongoose');
var User=require('./models/user');

var authRoutes=require('./routes/index');
var attendenceRoutes=require('./routes/attendence');

mongoose.connect("mongodb://localhost/attendence");

app.use(require("express-session")({
    secret:"My app",
    resave:false,
    saveUninitialized:false
}));

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({extended:true}));

app.use('/',express.static(__dirname+'/'));

app.use(authRoutes);
app.use(attendenceRoutes);

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})