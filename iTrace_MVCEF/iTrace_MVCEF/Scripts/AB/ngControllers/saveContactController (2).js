var app = angular.module('myContactBook');
app.controller('saveContactController', ['$scope', '$routeParams', '$location', 'contactService'
    , function ($scope, $routeParams, $location, contactService) {
        
        $scope.IsFormSubmitted = false;
        $scope.IsFormValid = false;

        $scope.myDate = new Date(2014, 3, 19);

        $scope.minDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() - 2,
            $scope.myDate.getDate());

        $scope.maxDate = new Date(
            $scope.myDate.getFullYear(),
            $scope.myDate.getMonth() + 2,
            $scope.myDate.getDate());
        $scope.onlyWeekendsPredicate = function (date) {
            var day = date.getDay();
            return day === 0 || day === 6;
        };

        $scope.Contact = {};

        //Populate data for edit mode
        if ($routeParams.id > 0) {
            //Edit mode
            contactService.GetContact($routeParams.id).then(function (data) {
                $scope.Contact = data;
            })
        }
        else {
            //Add new 
            $scope.Contact.ContactID = 0;
        }

        // check form
        $scope.$watch('contactForm.$valid', function (newValue) {
            $scope.IsFormValid = newValue;
        });

        $scope.Groups = {};
        contactService.GetGroups().then(function (data) {
            $scope.Groups = data;
        })

        $scope.COTypes = {};
        contactService.GetCOTypes().then(function (data) {
            $scope.COTypes = data;
        })
        //submit form
        $scope.Submit = function () {
            $scope.IsFormSubmitted = true;
            if ($scope.IsFormValid) {
                contactService.SaveContact($scope.Contact).then(function (data) {
                    if (data.status) {
                        alert('Contact saved successfully.');
                        $location.path('/home');
                    }
                    else {
                        alert('Error! Please try again.');
                        console.log(data.message);
                    }
                })
            }
        }

}])