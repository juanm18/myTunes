app.controller("createaccount", function(taskFactory, $scope, $location) {


  $scope.createaccount = function() {
    $scope.errors = [];
    if (!$scope.createusername ) {
      $scope.errors.push('Username cannot be blank')
    } else if ($scope.createusername.length < 8 ) {
      $scope.errors.push('Username must be more than 8 characters long')
    } if (!$scope.createEmail ) {
      $scope.errors.push('Email cannot be blank')
    } else if ($scope.createEmail.length < 8 ) {
      $scope.errors.push('Email must be more than 8 characters long')
    } if (!$scope.createpassword || !$scope.confirmpassword) {
      $scope.errors.push('Password fields cannot be blank')
    } else if ($scope.createpassword !== $scope.confirmpassword) {
      $scope.errors.push('Passwords do not match')
    } else {
      taskFactory.createuser({username: $scope.createusername, password: $scope.createpassword}, function(response) {
        console.log('This is the response.body',response.body);
        $scope.createusername = ""
        $scope.createpassword = ""
        $scope.createEmail = ""
        $scope.createpassword = ""
        $scope.confirmpassword = ""
        alert('Successfully created profile')
        $location.url('/profile')
      })
    }
  }
});
