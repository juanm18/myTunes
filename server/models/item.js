/*
/server/models/item.js
create database schema for "item"
*/

console.log("Loaded: /server/models/item.js")

var mongoose = require("mongoose")

var UserSchema = mongoose.Schema({
  username: String,
  image: String,
  followers: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
  following: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
  password: String
})

var TuneSchema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
  count: {type: Number, default:0},
  artist: String,
  song: String,
  file: {
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number,
  },
})


mongoose.model("Tune", TuneSchema);
mongoose.model("User", UserSchema);
