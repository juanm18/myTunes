app.controller('mainController', function(taskFactory, $scope, $rootScope){
  taskFactory.whoisloggedin(function(loggedinuser, myid,username){
    $scope.loggedinuser = loggedinuser;
    console.log('user logged in:', loggedinuser);
    $scope.userID = myid;
    $scope.username = username;
  })

  $scope.logout = function(){
    taskFactory.request.session.clear(callback);
  }
  //$rootScope.$emit('searchItem()')
})
