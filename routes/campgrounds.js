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
                searchKey: null,
                searchResult: null,
                sortby: null,
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
    var price = req.body.price;
    var location = req.body.location;
    var contact = req.body.contact;
    var starting = req.body.starting;
    var ending = req.body.ending;
    var amenities = req.body.amenities;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    Campground.create(
        {
            name:name, 
            image:image, 
            description: description,
            price: price,
            location: location,
            contact: contact,
            starting: starting,
            ending: ending,
            amenities: amenities,
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
            var ratingsArray = [];

            foundCampground.comments.forEach(function(rating) {
                ratingsArray.push(rating.rating);
            });
            if (ratingsArray.length === 0) {
                foundCampground.rateAvg = 0;
            } else {
                var ratings = ratingsArray.reduce(function(total, rating) {
                return total + rating;
                });
                foundCampground.rateAvg = ratings / foundCampground.comments.length;
                foundCampground.rateCount = foundCampground.comments.length;
            }
            foundCampground.save();
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//SEARCH ROUTE
router.post("/search", function(req, res){
    Campground.find({ name: { $regex: req.body.search, $options: 'i' } }, function(err, foundCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            res.render("campgrounds/index",
            {  
                sortby: null,
                searchKey: req.body.search,
                searchResult: foundCampground.length,
                campgrounds: foundCampground
            });
            
        }
    })
})
//SORT ROUTE
router.post("/sortby", function(req, res){
    
    if(req.body.sortby == 'Lowest Price' || req.body.sortby == 'Highest Price'){
        if(req.body.sortby == 'Lowest Price'){
            var inc = 1;
        } else{
            var inc = -1;
        }
        Campground.find({}).sort({price : inc}).exec(function(err, foundCampground) {
            if(err){
                console.log(err);
                res.redirect("/campgrounds");
            } else{
                res.render("campgrounds/index",
                {  
                    sortby: req.body.sortby,
                    searchKey: null,
                    searchResult: null,
                    campgrounds: foundCampground
                });
            }
        });
    } else if(req.body.sortby == 'Highest Rated'){
        Campground.find({}).sort({rateAvg : -1}).exec(function(err, foundCampground) {
            if(err){
                console.log(err);
                res.redirect("/campgrounds");
            } else{
                res.render("campgrounds/index",
                {  
                    sortby: req.body.sortby,
                    searchKey: null,
                    searchResult: null,
                    campgrounds: foundCampground
                });
            }
        });
    } else if(req.body.sortby == 'Most Reviewed'){
        Campground.find({}).sort({rateCount : -1}).exec(function(err, foundCampground) {
            if(err){
                console.log(err);
                res.redirect("/campgrounds");
            } else{
                res.render("campgrounds/index",
                {  
                    sortby: req.body.sortby,
                    searchKey: null,
                    searchResult: null,
                    campgrounds: foundCampground
                });
            }
        });
    }
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