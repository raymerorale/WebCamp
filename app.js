var express         = require("express"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user"),
    methodOverride  = require("method-override");

var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    profileRoutes       = require("./routes/profile"),
    indexRoutes         = require("./routes/index");

const port = process.env.PORT || 3000;
const ip = process.env.IP;
const database = process.env.DATABASEURL || "mongodb://localhost/yelp-camp";

mongoose.connect(database,
    {
        useNewUrlParser:true, 
        useUnifiedTopology:true,
        useFindAndModify: false
    });
var app = express();

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "qwerty",
    resave: false,
    saveUninitialized: false
}));
app.locals.moment = require("moment");
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// seedDB();

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/profile", profileRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


//SERVER CONFIG
app.listen(port, ip, function(){
    console.log("Yelpcamp server started!");
});