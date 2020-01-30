var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


//HOME PAGE
router.get("/", function(req, res){
    res.render("landing");
});

//SHOW REGISTER FORM
router.get("/register", function(req, res){
    res.render("register");
});
//HANDLE SIGN UP LOGIC
router.post("/register", function(req, res){
    User.register(new User({
        username: req.body.username,
        completeName: req.body.completeName,
        email: req.body.email,
        displayImg: req.body.displayImg
    }), 
    req.body.password,
    function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            console.log(user);
            req.flash("success", "Welcome to YelpCamp " + user.username + "!");
            res.redirect("/campgrounds");
        });
    });
});

//SHOW LOGIN fORM
router.get("/login",function(req, res){
    res.render("login");
});

//HANDLE LOGIN LOGIC
router.post("/login", passport.authenticate("local",
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: true
}), function(req, res){ 
});

//LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Successfully logged out!");
    res.redirect("/campgrounds");
});

module.exports = router;