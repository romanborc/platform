(function () {
    "use strict";
    angular.module('platform.services')
        .factory('Filters', ['$http', function DataProc($http) {
            return {
                getStatus: function getStatus () {
                	return $http.get('/api/procurement/status');
                },
                getSubject: function getSubject () {
                	return $http.get('/api/procurement/subject');
                },
                getType: function getType () {
                	return $http.get('/api/procurement/type');
                },
                getStatus_winners: function getStatus_winners () {
                    return $http.get('/api/result/status_winners');
                },
                getParticipants: function getParticipants () {
                    return $http.get('/api/result/participants');
                },
                getPositions: function getPositions () {
                    return $http.get('/api/user/positions');
                },
                getRegions: function getRegions () {
                    return $http.get('/api/user/regions');
                }
            };
        }]);
} ());



