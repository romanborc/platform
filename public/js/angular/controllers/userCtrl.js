(function() {
    "use strict";
    angular.module('platform.controllers')
        .controller('userCtrl',
            function($scope, $rootScope, $http, $location, $filter, $route, $routeParams, DataUser, Filters) {
                DataUser
                    .getUser($routeParams.id)
                    .then(function(response) {
                        $scope.user = response.data;
                        $scope.reloadRoute = function() {
                            $route.reload();
                        };
                    });

                DataUser
                    .getUsersResult()
                    .then(function(response) {
                        if (response.error) {
                            alertify.error(response.data);
                        } else {
                            $scope.users = response.data;
                            $scope.countProc = response.data;
                            $scope.countDoneProc = response.data;
                            $scope.countWinProc = response.data;
                            $scope.sumWinProc = response.data;
                            $scope.statUser = response.data.statUser;

                            Morris.Bar({
                                element: 'hero-bar',
                                data: $scope.statUser,
                                xkey: 'name',
                                ykeys: ['result', 'amount'],
                                labels: ['Выиграл на сумму', 'Сумма бюджет ']
                            });
                        }

                    }, function(error) {
                        var errorMessage = typeof(error) == 'string' ? error : 'Ошибка загрузки списков менеджеров';
                        alertify.error(errorMessage);
                    });

                Filters
                    .getPositions()
                    .then(function(response) {
                        if (response.error) {
                            alertify.error(response.data);
                        } else {
                            $scope.positions = response.data;
                        }
                    }, function(error) {
                        var errorMessage = typeof(error) == 'string' ? error : 'Ошибка загрузки списка должности';
                        alertify.error(errorMessage);
                    });

                Filters
                    .getRegions()
                    .then(function(response) {
                        if (response.error) {
                            alertify.error(response.data);
                        } else {
                            $scope.regions = response.data;
                        }
                    }, function(error) {
                        var errorMessage = typeof(error) == 'string' ? error : 'Ошибка загрузки списка регионов';
                        alertify.error(errorMessage);
                    });

                DataUser
                    .getUser($routeParams.id)
                    .then(function(response) {
                        $scope.user = response.data;
                        $scope.update = function() {
                            DataUser
                                .updateUser($scope.user)
                                .then(function(response) {
                                    if (response.data.errors) {

                                        $scope.response = response.data;
                                        console.log($scope.response);
                                    } else {
                                        alertify.success('Успешно обновлено');
                                        $location.path('/users-list');
                                        
                                    };
                                });
                        };
                    });

                var enableEditor = function() {
                    $scope.editorEnabled = true;
                    $scope.editIdProcurements = $scope.user.name;
                    $scope.editResults = $scope.user.lastname;
                    $scope.editAmount = $scope.user.email;
                    $scope.editUsers = $scope.user.positions;
                    $scope.editStatus = $scope.user.region;

                };
                var enableEditorResult = function() {
                    $scope.editorResultEnabled = true;
                };
                var disableEditor = function() {
                    $scope.editorEnabled = false;
                    $route.reload();
                };
                var disableEditorResult = function() {
                    $scope.editorResultEnabled = false;
                };


                $scope.enableEditor = enableEditor;
                $scope.enableEditorResult = enableEditorResult;
                $scope.disableEditor = disableEditor;
                $scope.disableEditorResult = disableEditorResult;


            });
}());