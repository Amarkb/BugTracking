var app = angular.module('myContactBook');
app.controller('AddGroupController', ['$scope', '$routeParams', '$location', 'contactService'
    , function ($scope, $routeParams, $location, contactService) {
        
        $scope.IsFormSubmitted = false;
        $scope.IsFormValid = false;

       

        $scope.Groups = {};

        //Populate data for edit mode
        if ($routeParams.id > 0) {
            //Edit mode
            contactService.GetGroup($routeParams.id).then(function (data) {
                $scope.Groups = data;
            })
        }
        else {
            //Add new 
           // $scope.Contact.ContactID = 0;
        }

        // check form
        $scope.$watch('addGroupForm.$valid', function (newValue) {
            $scope.IsFormValid = newValue;
        });

       
        contactService.GetGroups().then(function (data) {
            $scope.Groups = data;
        })

   
        //submit form
        $scope.Submit = function () {
            $scope.IsFormSubmitted = true;
            if ($scope.IsFormValid) {
                contactService.AddGroup($scope.Contact).then(function (data) {
                    if (data.status) {
                        alert('Group saved successfully.');
                        $location.path('/GroupListing');
                    }
                    else {
                        alert('Error Saving Group! Please try again.');
                        console.log(data.message);
                    }
                })
            }
        }

}])