(function () {
    "use strict";
    angular.module('platform.services')
        .factory('DataProc', ['$http', function DataProc($http) {
            return {
                getProcList: function getProcList () {
                  return $http.get('/api/procurements/list');
                },
                getProc: function getProc (id) {
                	return $http.get('api/procurement/get/' + id);
                },
                createProc: function createProc (data) {
                	return $http.put('/api/procurement/create', data);
                },
                updateProc: function updateProc (data) {
                	return $http.patch('/api/procurement/update', data);
                },
                deleteProc: function deleteProc (id) {
                	return $http.delete('/api/procurement/delete/' + id);
                }
            };
        }]);
} ());



