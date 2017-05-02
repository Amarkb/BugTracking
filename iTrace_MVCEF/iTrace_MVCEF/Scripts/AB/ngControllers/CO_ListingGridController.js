var app = angular.module('myContactBook'   );
app.controller('COesGridController', ['$scope', 'contactService', function ($scope, contactService) {
   
    function populateContacts() {
        contactService.GetCOList().then(function (data) {
            $scope.Data=data;
            //$scope.gridOptions = { data: 'Data' };
            $scope.gridOptions.data = data;
            //$scope.data = data;


        })
    }
    populateContacts();

     

}]);