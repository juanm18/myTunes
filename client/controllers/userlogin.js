app.controller("login", function(taskFactory, $scope, $location) {
    $scope.login = function() {
      taskFactory.ValidateUser({username: $scope.username}, function(user) {
        console.log('THIS IS THE RESPONSE ON CLIENT', user)
        if (user) {
          $location.url('/homepage')
        } else {
          $location.url('/createaccount')
        }
      })
    }
});
