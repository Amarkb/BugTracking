var app = angular.module('myContactBook', ['ngRoute',  
 'ngAnimate',                // support for CSS-based animations
            'ngTouch',                  //for touch-enabled devices
            'ui.grid',                  //data grid for AngularJS
            'ui.grid.pagination',       //data grid Pagination
            'ui.grid.resizeColumns',    //data grid Resize column
            'ui.grid.moveColumns',      //data grid Move column
            'ui.grid.pinning',          //data grid Pin column Left/Right
            'ui.grid.selection',        //data grid Select Rows
            'ui.grid.autoResize',       //data grid Enabled auto column Size
            'ui.grid.exporter' ,         //data grid Export Data
'ngMaterial', 'ngMessages', 'material.svgAssetsCache'
]);
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
        .when('/CO_ListingGrid', {
            templateUrl: '/Scripts/AB/ngTemplates/CO_ListingGrid.html',
            controller: 'COesGridController'
        })
        .when('/savecontact/:id', {
            templateUrl: '/Scripts/AB/ngTemplates/savecontact.html',
            controller: 'saveContactController'
        })
        .when('/AddCO/:id', {
            templateUrl: '/Scripts/AB/ngTemplates/AddCo.html',
            controller: 'AddCOController'
        })
        .when('/AddGroup/:id', {
            templateUrl: '/Scripts/AB/ngTemplates/AddGroup.html',
            controller: 'AddGroupController'
        })
         .when('/GroupListing', {
             templateUrl: '/Scripts/AB/ngTemplates/GroupListing.html',
             controller: 'HomeController'
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