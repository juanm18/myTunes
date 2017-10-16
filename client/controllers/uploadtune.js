app.controller("uploadtune", function(taskFactory, $scope, $location, Upload) {
  if (!taskFactory.user) {
    $location.url('/createaccount')
  }

  $scope.add = function(){
    console.log('USER!!', taskFactory.user);
    Upload.upload({
      url: '/uploadtune',
      data: {user: taskFactory.user, tune: $scope.file, artist: $scope.artist, song: $scope.song}
    }).then(function(response){
      // console.log(response);
      $location.url('/')
    });
  }
})
