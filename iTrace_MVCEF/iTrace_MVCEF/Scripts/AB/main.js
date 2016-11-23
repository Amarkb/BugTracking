var app = angular.module('myContactBook', ['ngRoute']);
app.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
    //Start routing 
    $routeProvider
        .when('/home', {
            templateUrl: '/Scripts/AB/ngTemplates/home.html',
            controller: 'HomeController'
        })
           .when('/CO_Listing', {
               templateUrl: '/Scripts/AB/ngTemplates/CO_Listing.html',
               controller: 'COesController'
           })
        .when('/savecontact/:id', {
            templateUrl: '/Scripts/AB/ngTemplates/savecontact.html',
            controller: 'saveContactController'
        })
        .when('/', {
            redirectTo: function () {
                return '/home';
            }
        })
        .when('/error', {
            templateUrl: '/Scripts/AB/ngTemplates/error.html',
            controller : 'errorController'
        })
    $locationProvider.html5Mode(false);
    //End routing

    //configure http post method
    $httpProvider.defaults.headers.post = { 'content-type': 'application/json' }

    //Erroe handling
    $httpProvider.interceptors.push(function ($location) {
        return {
            'responseError': function () {
                //will do more later
                console.log('Response Error');
                $location.path('/error');
            }
        }
    })
}]);