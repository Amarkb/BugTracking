﻿var app = angular.module('myContactBook');
app.factory('contactService', ['$http', '$q', function ($http, $q) {
    var fac = {};
    fac.GetContacts = function () {
        var defer = $q.defer();
        $http.get('/home/getcontacts')
        .success(function (data) {
            defer.resolve(data);
        });
        return defer.promise;
    }

    fac.GetCOTypes = function () {
        var defer = $q.defer();
        $http.get('/home/GetCOTypes')
        .success(function (data) {
            defer.resolve(data);
        });
        return defer.promise;
    }

    fac.GetGroups = function () {
        var defer = $q.defer();
        $http.get('/home/GetGroups')
        .success(function (data) {
            defer.resolve(data);
        });
        return defer.promise;
    }

    
    fac.GetGroup = function (ID) {
        var defer = $q.defer();
        $http.get('/home/GetGroup', {
            params: {
                'ID': ID
            }
        })
        .success(function (data) {
            defer.resolve(data);
        });
        return defer.promise;
    }

    fac.CO_Listing = function () {
        var defer = $q.defer();
        $http.get('/API/COes')
        .success(function (data) {
            defer.resolve(data);
        });
        return defer.promise;
    }

    
       fac.GetCOList = function () {
        var defer = $q.defer();
           $http.get('/API/COes')
        .success(function (data) {
            defer.resolve(data);
        });
        return defer.promise;
       }

       fac.GetGroupList = function () {
           var defer = $q.defer();
           $http.get('/API/Groups')
        .success(function (data) {
            defer.resolve(data);
        });
           return defer.promise;
       }

    fac.GetContact = function (contactID) {
        var defer = $q.defer();
        $http.get('/home/getcontact', {
            params: {
                'contactID': contactID
            }
        })
        .success(function (data) {
            defer.resolve(data);
        });
        return defer.promise;
    }

    fac.SaveContact = function (contact) {
        var defer = $q.defer();
        $http({
            method: "post",
            url: '/home/savecontact',
            data : contact
        }).then(function (response) {
            defer.resolve(response.data);
        })
        return defer.promise;
    }

    fac.AddCO = function (contact) {
        var defer = $q.defer();
        $http({
            method: "post",
            url: '/home/AddCO',
            data: contact
        }).then(function (response) {
            defer.resolve(response.data);
        })
        return defer.promise;
    }

    fac.AddGroup = function (contact) {
        var defer = $q.defer();
        $http({
            method: "post",
            url: '/home/AddGroup',
            data: contact
        }).then(function (response) {
            defer.resolve(response.data);
        })
        return defer.promise;
    }
    fac.DeleteContact = function (contactID) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: '/home/DeleteContact',
            data : {'contactID' : contactID}
        }).then(function (response) {
            defer.resolve(response.data);
        })

        return defer.promise;
    }

    fac.DeleteGroup = function (GroupId) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: '/home/DeleteGroup',
            data: { 'GroupId': GroupId }
        }).then(function (response) {
            defer.resolve(response.data);
        })

        return defer.promise;
    }

    return fac;

}]);