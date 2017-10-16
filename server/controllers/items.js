/*
/server/controllers/items.js
Main logic for connecting http requests with database requests, delivering
responses
*/
console.log("Loaded: /server/controllers/items.js")
var mongoose = require('mongoose')
var session = require('express-session')
var fs = require('fs')
var User = mongoose.model("User")
var Tune = mongoose.model("Tune")

module.exports = {
  getdata: function(request, response) {
    Tune.find({}, function (err, tune) {
      if (err) {
        console.log(err);

      } else {
        response.json(tune)
      }
    })
  },

  createuser: function(request, response) {
    var user = new User({
      username: request.body.username,
      password: request.body.password
    })
    user.save(function(err) {
      if (err) {
        console.log('Error Occurred', err)
      } else {
        request.session.userID = user._id
        request.session.username = user.username
        response.json(request.body)
      }
    })

  },

  loginuser: function(request, response) {
    User.findOne({username: request.body.username}, function(err, user) {
      if (err) {
        console.log('ERROR', err);
      } else if (user){
        console.log("\n\n\n\nUSER LOGGED IN\n\n\n\n\n");
        request.session.userID = user._id
        request.session.username = user.username
        response.json(user)
      }
    });
  },


  updatecounter: function(request, response) {
    console.log(request.body.tune);
    Tune.findOne({_id: request.body.tune._id}, function(err, tune) {
      if (err) {
        console.log('this is an error', err);
      } else {
        tune.count+=1;
        tune.save(function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log("UPDATED:", tune);
            response.json({tune})
          }
        })
      }
    })
  },

  loggedin: function(request, response){
    User.findOne({_id: request.session.userID}, function(err,user){
      if (err){
        console.log("error finding user:", err);
      }
      else if(user){
        console.log('user in session:', user);
        response.json({user:user})

      }
    })
  },

  uploadtune: function(request, response) {
    // console.log('this is the factory user',taskFactory.user);
    var tune = new Tune({
      user: request.session.user,
      artist: request.body.artist,
      song: request.body.song,
      file: {
        originalname: request.file.originalname,
        encoding: request.file.encoding,
        mimetype: request.file.mimetype,
        destination: request.file.destination,
        filename: request.file.filename,
        path: request.file.path,
        size: request.file.size
      }
    })
    tune.save(function(err, tune) {
      if (err) {
        console.log(err);
      }

      fs.writeFile('testFile.mp3', request.file, "base64", function(err) {
        if (err) {
          console.log(err)
        } else {
          response.json({})
        }
      })
    })
  },

  delete: function(request, response) {
    Tune.remove({_id: request.params.tuneID}, function(err) {
      console.log('BEFORE ERROR', request.params.tuneID)
      if (err) {
        console.log('this is an error', err);
      } else {
        response.json({message: "successfully deleted post"})
      }
    })
  },

  uploadimage: function(request, response){
    var ext = '.jpg';
    User.findOne({_id:request.session.userID}, function(err, user){
      if(err){
        console.log("error finding user");
      }
      else if(user){
        user.image = request.file.filename
        user.save(function(err, user){
          if (err){
            console.log("error uploading image");
          }
          else if(user){
            response.json(user.image)
          }
        })
      }
    })
  },

  follow: function(request, response) {
    console.log('in server route');
    console.log('this is the session', request.session.userID);

    User.findOne({_id: request.session.userID}, function(err, user){
      if(err){
        console.log("error at following:", err);
      }
      else if(user){
        console.log(request.params.id);
        user.following.push(request.params.id)
      }
      user.save(function (err, user) {
        if(err){
          console.log("failed to follow:", err);
        }
        else if(user){
          console.log("following user");
          User.findOne({_id:request.params.id}, function(err, user){
            if(err){
              console.log("error finding user:", err);
            }
            else if(user){
              user.followers.push(request.session.userID);
            }
            user.save(function(err, user){
              if(err){
                console.log("failed to add follower");
              }
              else if(user){
                console.log("added to followers");
                response.json(user)
              }
            })
          })
        }
      })
    })
  },


  unfollow: function(request, response){
    User.findOne({_id:request.session.userID}, function(err, user){
      if(err){
        console.log("could not find user:", err);
      }
      else if(user){
        user.following.remove(request.params.id);
      }
      user.save(function(err, user){
        if(err){
          console.log("could not unfollow", err);
        }
        else if(user){
          console.log("unfollowed user", user);
          User.findOne({_id:request.params.id}, function(err, user){
            if(err){
              console.log("Could not find unfollowed user", user);
            }
            else if(user){
              user.followers.remove(request.session.userID);
            }
            user.save(function(err, user){
              if(err){
                console.log("failed to remove", err);
              }
              else if(user){
                console.log("removed from followers");
                response.json(user)
              }
            })
          })
        }
      })
    })
  },

  getAllUsers: function(request, response) {
    User.find({}, function(err, users){
      if(err){
        console.log("Error retrieving Users:", err);
      }
      else if(users){
        console.log("These are all users:", users);
        response.json({users:users})
      }
    })
  },

  userProfile: function (request, response) {
    User.findOne({_id: request.params.id}, function(err, profile){
      if(err){
        console.log("error in profile:", err);
      }
      else if(profile){
        console.log("heres the profile", profile);
        response.json({profile:profile})
      }
    })

  },

  logout: function(request){
    request.session.clear
  }



      // console.log("SIZE OF FILE:", request.body.tune.data.length);
      }
