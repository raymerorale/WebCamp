
var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var User = require("../models/user");
var Campground = require("../models/campground");

//SHOW PROFILE
router.get("/", middleware.isLoggedIn, function(req, res){
    User.findById(req.user._id, function(err, foundUser){
        if(err){
            console.log(err)
        } else{
            Campground.find({ 'author.id' : foundUser }, function(err, foundCampground){
                if(err){
                    console.log(err);
                    res.redirect("/campgrounds");
                } else{
                    res.render("profile/show",
                    {  
                        user: foundUser,
                        campgrounds: foundCampground
                    });
                    
                }
            })
        }
    })
    
});

//EDIT ROUTE
router.get("/edit", middleware.isLoggedIn, function(req, res){
    User.findById(req.user._id, function(err, foundUser){
        if(err){
            console.log(err);
            
        } else {
            res.render("profile/edit", {user: foundUser});
        }
    });
});

//UPDATE ROUTE
router.put("/", middleware.isLoggedIn, function(req, res){
    User.findByIdAndUpdate(req.user._id, req.body.user, function(err, updatedCampground){
        if(err){
            console.log(err);
            req.flash("error", "Something went wrong, please try again.");
            res.redirect("/profile"); 
        } else{
            req.flash("success", "Updated successfully");
            res.redirect("/profile");
        }
    });
});

module.exports = router;