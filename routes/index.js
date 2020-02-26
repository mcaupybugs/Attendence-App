var express = require("express");
var router = express.Router({ mergeParams: true });
var User = require("../models/user");
var passport = require("passport");

//===============================================
router.get("/login", isLoggedOut, (req, res) => {
    res.render("login");
})

router.post("/login", isLoggedOut, passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), (req, res) => {
    });

//=================================================
router.get("/logout", isLoggedIn, (req, res) => {
    req.logout();
    req.flash("success", "Logged you out successfully");
    res.redirect("/login");
});

//================================================


router.get("/register", isLoggedOut, (req, res) => {
    res.render("register");
})

router.post("/register", isLoggedOut, (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (err) {
            return res.render("register");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.render("welcome", { user: user });
            });
            user.email = req.body.email;
            console.log(user);
            user.save();
        }
    });
});

//====================================================


//Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
        res.flash("error", "Please log in first");
    }
}
function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        req.flash("damn", "Already logged in");
        res.redirect("/");
    }
};
module.exports = router;