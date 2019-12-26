var mongoose = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");

var data = [
    {
        name: "Mountain Goat's Rest",
        image: "/pictures/pic6.jfif",
        description: "Person lying inside tent and overlooking mountain. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        name: "Aurora Hill",
        image: "/pictures/pic3.jfif",
        description: "Dome tent on grass field under stars and aurora. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        name: "Canyon Floor",
        image: "/pictures/pic2.jfif",
        description: "Short-coated brown dog. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    },
    {
        name: "Cloud's Rest",
        image: "/pictures/pic1.jfif",
        description: "Person lying inside tent and overlooking mountain. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
    }
]
function seedDB(){
    //Remove all campgrounds
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("removed campgrounds!");
            //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else{
                        console.log("added a campground");
                        //create comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Colt Steele"
                            }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created a new comment");
                            }
                        });
                    }
                });
            });
        }
    });
    
};
module.exports = seedDB;