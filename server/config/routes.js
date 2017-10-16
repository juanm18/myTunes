/*

/server/config/routes.js
configure the routes (listen for routes, connect to controllers)
*/

var multers  = require('multer')



console.log("loaded /server/config/routes.js")

var TunesController = require("../controllers/items") //exporting the results of routes

module.exports = function(app) {



    // app.post("/uploadtune", upload.single('tune'), TunesController.uploadtune)
    app.delete("/deletetune/:tuneID", TunesController.delete)
    app.get("/uploadtune", TunesController.getdata)

    app.post("/createuser", TunesController.createuser) //Controller create items
    app.get("/uploadtune", TunesController.getdata)
    app.post("/loginuser", TunesController.loginuser)

    app.post("/updatecounter", TunesController.updatecounter)

    app.post("/uploadtune", multers({ dest: 'uploads/' }).single('tune'), TunesController.uploadtune)
    app.post("/follow/:id", TunesController.follow)
    app.put("/unfollow/:id", TunesController.unfollow)
    app.get("/users", TunesController.getAllUsers)
    app.get("/loggedin", TunesController.loggedin)
    app.get("/profile/:id", TunesController.userProfile)
    app.post("/uploadImage", multers({ dest: 'uploads/images' }).single('file'), TunesController.uploadimage)
    app.get("/logout", TunesController.logout)


};
