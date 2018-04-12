(function() {
    "use strict";
    angular.module('platform.routes')
        .config(['$routeProvider', '$locationProvider',
            function($routeProvider, $locationProvider) {
                $routeProvider.
                when('/', {
                    templateUrl: '/js/angular/views/procurements/list.html',
                    controller: 'procCtrl'
                }).when('/procurement/edit/:id', {
                    templateUrl: '/js/angular/views/procurements/update.html',
                    controller: 'procCtrl'
                }).when('/procurement/new', {
                    templateUrl: '/js/angular/views/procurements/create.html',
                    controller: 'procCtrl'
                }).when('/users-list', {
                    templateUrl: '/js/angular/views/users/list.html',
                    controller: 'userCtrl'
                }).when('/get-user/:id', {
                    templateUrl: '/js/angular/views/users/user.html',
                    controller: 'userCtrl'
                }).when('/user/edit/:id', {
                    templateUrl: '/js/angular/views/users/update.html',
                    controller: 'userCtrl'
                }).when('/results', {
                    templateUrl: '/js/angular/views/results/list.html',
                    controller: 'resultCtrl'
                }).when('/result/new', {
                    templateUrl: '/js/angular/views/results/create.html',
                    controller: 'resultCtrl'
                }).when('/result/edit/:id', {
                    templateUrl: '/js/angular/views/results/update.html',
                    controller: 'resultCtrl'
                });
                $locationProvider.hashPrefix('');
            }
        ]);
}());