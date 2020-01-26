var Campground  = require("../models/campground");
var Comment     = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){

        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else{
                    req.flash("error", "You do not have permission to do that!");
                    res.redirect("back");
                }
            }
        });  
    } else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){

        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else{
                    req.flash("error", "You do not have permission to do that!");
                    res.redirect("back");
                }
            }
        });  
    } else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.checkCommentSingularity = function(req, res, next){
    if(req.isAuthenticated()){

        Campground.find({hasRated: req.user._id}, function(err, campground){
            if(err){
                console.log(err);
                res.redirect("back");
            } else{
                if(campground.length == 0){
                    next();
                } else{
                    req.flash("error", "You have already reviewed this campground.");
                    res.redirect("back");
                } 
            }
        });

    } else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}

module.exports = middlewareObj;