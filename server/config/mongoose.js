/*

/server/config/mongoose.js
Connecting/configure to the database.
requiring models and connecting to database
*/
console.log("Loaded /server/config/mongoose.js");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/myTunes")
require("../models/item");
