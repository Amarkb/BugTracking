var app = angular.module('myContactBook');
app.controller('HomeController', ['$scope', 'contactService', function ($scope, contactService) {
    $scope.contacts = [];
    function populateContacts() {
        contactService.GetContacts().then(function (data) {
            $scope.contacts = data;
        })
    }
   populateContacts();

    $scope.AllGroups = [];
    function populateGroups() {
        contactService.GetGroups().then(function (data) {
            $scope.AllGroups = data;
        })
    }
   populateGroups();

    $scope.DeleteContact = function (contactID) {
        if (confirm('Are you sure?')) {
            //Delete contact here
            contactService.DeleteContact(contactID).then(function (data) {
                if (data.status) {
                    populateContacts();
                }
            });
        }
    }

}]);