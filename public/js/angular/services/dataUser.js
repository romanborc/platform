(function () {
    "use strict";
    angular.module('platform.services')
        .factory('DataUser', function DataUser($http) {
            return {
                getUserList: function getUserList () {
                  return $http.get('/api/users/list');
                },
                getUser: function getUser (id) {
                    return $http.get('/api/user/get/' + id);
                },
                getUsersResult: function getUsersResult () {
                    return $http.get('/api/user-result/list');
                },
                updateUser: function updateUser (data) {
                    return $http.patch('/api/user/update', data);
                },
            };
        });
} ());



