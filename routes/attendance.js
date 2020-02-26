var express = require("express");
var router = express.Router({ mergeParams: true });
var User = require("../models/user");
var Info = require('../models/info');
var Subject = require("../models/subject");

//==========================================

router.get('/', isLoggedIn, (req, res) => {
    Subject.find({ '_id': { $in: req.user.subject } }, (err, subject) => {
        if (err) {
            console.log(err);
        } else {
            res.render('home', { subjects: subject });
        }
    })
})
//==================================================

router.get("/welcome", isLoggedIn, (req, res) => {
    res.render('welcome');
})


router.post('/welcome', isLoggedIn, (req, res) => {
    Info.create(req.body.info, (err, newUser) => {
        if (err) {
            res.render('welcome');
        } else {
            newUser.username = req.user.username;
            console.log(newUser);
            req.user.info.push(newUser);
            req.user.save();
            res.redirect('subject');
        }
    })
})

//=====================================================

router.get("/subject", isLoggedIn, (req, res) => {
    res.render('subject');
})

router.post('/subject', isLoggedIn, (req, res) => {
    Subject.create(req.body.subject, (err, newUser) => {
        if (err) {
            res.render('welcome', { user: req.user });
        } else {
            newUser.username = req.user.username;
            console.log(newUser);
            req.user.subject.push(newUser);
            req.user.save();
            res.redirect('/');
        }
    })
})

//Edit Route
router.get("/subject/:id/edit", isLoggedIn, (req, res) => {
    Subject.findById(req.params.id, (err, foundSubject) => {
        if (err) {
            console.log(err);
            res.redirect('/subject');
        } else {
            res.render("subject/edit", { subject: foundSubject });
        }
    })
})

//Update Route

router.put("/subject/:id", isLoggedIn, (req, res) => {
    Subject.findByIdAndUpdate(req.params.id, req.body.subject, (err, UpdateSubject) => {
        if (err) {
            res.redirect('/subject');
        } else {
            res.redirect('/');
        }
    })
});

//Render Add Present
router.get("/subject/:id/edit/add", isLoggedIn, (req, res) => {
    Subject.findById(req.params.id, (err, foundSubject) => {
        if (err) {
            console.log(err);
            res.redirect('/subject');
        } else {
            res.render("subject/add", { subject: foundSubject });
        }
    })
})

//Add route
router.put("/subject/:id/add", isLoggedIn, (req, res) => {
    Subject.findByIdAndUpdate(req.params.id, req.body.subject, (err, UpdateSubject) => {
        if (err) {
            res.redirect('/subject');
        } else {
            res.redirect('/');
        }
    })
});

//Render add total
router.get("/subject/:id/edit/add_total", isLoggedIn, (req, res) => {
    Subject.findById(req.params.id, (err, foundSubject) => {
        if (err) {
            console.log(err);
            res.redirect('/subject');
        } else {
            res.render("subject/add_total", { subject: foundSubject });
        }
    })
})

//Total Add Route
router.put("/subject/:id/add_total", isLoggedIn, (req, res) => {
    Subject.findByIdAndUpdate(req.params.id, req.body.subject, (err, UpdateSubject) => {
        if (err) {
            res.redirect('/subject');
        } else {
            res.redirect('/');
        }
    })
});

//Destroy Route

router.delete("/subject/:id/delete", isLoggedIn, (req, res) => {
    Subject.findByIdAndRemove(req.params.id, (err, deleteCar) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            res.redirect('/')
        }
    })
})

//====================================================

//Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
}

module.exports = router;