var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX ROUTE
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            req.flash("error", "Something went wrong");
            console.log(err);
        }
        else{
            res.render("campgrounds/index",
            {
                campgrounds: allCampgrounds,
                currentUser: req.user
            });
        }
    })
})

//NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    Campground.create(
        {
            name:name, 
            image:image, 
            description: description,
            author: author
        }, function(err, newcampground){
        if(err){
            req.flash("error", "Something went wrong, please try again.");
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            req.flash("success", "Successfully added a campground");
            res.redirect("/campgrounds");
        }
    });
});

//SHOW ROUTE
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//SEARCH ROUTE
router.post("/search", function(req, res){
    console.log(req.body.search);
    Campground.find({ name: { $regex: req.body.search, $options: 'i' } }, function(err, foundCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            res.render("campgrounds/index",
            {
                campgrounds: foundCampground
            });
        }
    })
})
//EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
            
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

//UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            console.log(err);
            req.flash("error", "Something went wrong, please try again.");
            res.redirect("/campgrounds"); 
        } else{
            req.flash("success", "Updated successfully");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err, deletedCampground){
        if(err){
            console.log(err);
        } else{
            req.flash("success", "Deleted successfully");
            res.redirect("/campgrounds");
        }
    })
});

module.exports =  router;