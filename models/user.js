var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");
    
var UserSchema = new mongoose.Schema({
    completeName: String,
    email: String,
    contact: String,
    displayImg: String,
    username: String,
    password: String
});
UserSchema.plugin(passportLocalMongoose); 
module.exports = mongoose.model("User", UserSchema);