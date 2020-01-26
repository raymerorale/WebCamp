var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
//NEW COMMENT
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground: foundCampground});
        }
    });
});

//CREATE COMMENT
router.post("/", middleware.checkCommentSingularity, function(req, res){
    var text = req.body.text;
    var rating = req.body.rating;
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            Comment.create(
                {
                    text: text,
                    rating: rating
                },
                function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong, please try again.");
                    console.log(err);
                } else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    Campground.findByIdAndUpdate(req.params.id, {
                        // $inc : {'commentCount' : 1}, 
                        $push: {'hasRated': req.user._id},  
                     }).exec();
                    res.redirect("/campgrounds/"+ campground._id);
                    
                }
            });
        }
    })
});

//EDIT COMMENT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            console.log(err);
            req.flash("error", "Cannot find comment");
            res.redirect("back");
        } else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

//UPDATE COMMENT
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
            req.flash("error", "Something went wrong, please try again.");
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DELETE COMMENT
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndDelete(req.params.comment_id, function(err, deletedComment){
        if(err){
            console.log(err);
            res.redirect("back");
        } else{
            Campground.findByIdAndUpdate(req.params.id, {$inc : {'commentCount' : -1}, $pullAll: { 'hasRated': [req.user._id] } }).exec();
            req.flash("success", "Deleted successfully");
            res.redirect("back");
        }
    });
});

module.exports = router;