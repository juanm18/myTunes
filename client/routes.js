/*

client/partials/config.js
Configure client routes, and really anything

*/

var app = angular.module("app", ["ngRoute", "ngFileUpload"]);

console.log("creating app")

app.config(function($routeProvider) {
    $routeProvider

    .when("/", {
      templateUrl: "partials/homepage.html",
      controller: 'homepage'
    })

    .when("/createaccount", {
      templateUrl: "partials/createaccount.html",
      controller: "createaccount"
    })

    .when("/uploadtune", {
      templateUrl: "partials/uploadtune.html",
      controller: "uploadtune"
    })

    .when("/login", {
      templateUrl: "partials/login.html",
      controller: "login"
    })

    .when("/profile/:id", {
      templateUrl: "partials/profile.html",
      controller: "profile"
    })

    .otherwise('/')
    console.log("Configuring routes")
});
