var app = angular.module('myContactBook');
app.controller('COesController', ['$scope', 'contactService', function ($scope, contactService) {
    $scope.contacts = [];
    function populateContacts() {
        contactService.CO_Listing().then(function (data) {
            $scope.contacts = data;
        })
    }
    populateContacts();

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