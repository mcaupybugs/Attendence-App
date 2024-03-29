var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var methodOverride = require("method-override");
var mongoose = require('mongoose');
var User = require('./models/user');
var flash = require('connect-flash');

var authRoutes = require('./routes/index');
var attendanceRoutes = require('./routes/attendance');

//mongoose.connect("mongodb://localhost/attendance");
mongoose.connect("mongodb+srv://mcaupy_bugs:vishal@cluster0-hxm1y.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => {
        console.log('enjoy');
    })
    .catch((err) => {
        console.log(err);
    })

app.use(require("express-session")({
    secret: "My app",
    resave: false,
    saveUninitialized: false
}));


app.use(methodOverride("_method"));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(__dirname + '/'));

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.damn = req.flash("damn");
    next();
})

app.use(authRoutes);
app.use(attendanceRoutes);

const port = process.env.PORT || 4200;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})