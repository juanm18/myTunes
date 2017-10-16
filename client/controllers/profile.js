/*
/client/controllers/items-index.js
the logic for items-index partial, will connect the factory with the template
*/

app.controller("profile", function(taskFactory, $scope, $location, $routeParams, Upload, $rootScope) {


  taskFactory.whoisloggedin(function(loggedinuser, myid,username){
    $scope.loggedinuser = loggedinuser.data.user;
    console.log('user logged in:', loggedinuser);
    $scope.userID = myid;
    $scope.username = username;
  })


    taskFactory.userprofile($routeParams.id, function(singleProfile){
      $scope.singleProfile = singleProfile.data.profile;
    })


  $scope.follow = function(id){
    taskFactory.Followuser($routeParams.id, function(user){
      console.log("want to follow:", user);
    })
  }
  $scope.Unfollow = function(id){
    taskFactory.UNfollow($routeParams.id, function(user){
      console.log("unfollow him:", user);
    })
  }

  taskFactory.getUsers(function(allUsers){
    $scope.allUsers = allUsers;
    console.log('hmmm:', allUsers);
  })


  $scope.uploadImage = function(){
    console.log('THE ATTRIBUTE OF IMAGE', $scope.imagefile);
    Upload.upload({
      url: '/uploadImage',
      data:{'file':$scope.imagefile}
    }).then(function(response){
      console.log("this is your response", response);
      $location.url('/profile/:id')
    })
  }

  $rootScope.$on('searchItem')
})
