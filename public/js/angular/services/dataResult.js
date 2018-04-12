(function () {
    "use strict";
    angular.module('platform.services')
        .factory('DataResult', ['$http', function DataResult($http) {
            return {
                getResultsList: function getResultsList () {
                	return $http.get('/api/results/list');
                },
                getResult: function getResult (id) {
                    return $http.get('api/result/get/' + id);
                },
                createResult: function createResult (data) {
                 	return $http.put('/api/results/create', data);
                },
                updateResult: function updateResult (data) {
                    return $http.patch('/api/result/update', data);
                },
                deleteResult: function deleteResult (id) {
                    return $http.delete('/api/result/delete/' + id);
                }
            };
        }]);
} ());



