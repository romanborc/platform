(function() {
    "use strict";
    angular.module('platform.controllers')
        .controller('resultCtrl',
            function($scope, $http, $routeParams, $route, $filter, $location, DataProc, DataResult, DataUser, Filters, Excel, $timeout) {

                DataResult
                    .getResultsList()
                    .then(function(response) {
                        $scope.results = response.data;

                        $scope.search = function(event) {
                            $scope.results = $filter('filter')(response.data, {
                                users_id: $scope.filter.users_id,
                                status_winners_id: $scope.filter.status_winners_id,
                                participants_id: $scope.filter.participants_id,
                                updated_at: $scope.filter.updated_at
                            });
                        };

                        $scope.clear = function(event) {
                            $scope.filter = {};
                        };

                        $scope.reloadRoute = function() {
                            $route.reload();
                        };

                        $scope.exportToExcel = function(tableId) {
                            var browser = window.navigator.appVersion;
                            var useBlobBuilder = false;
                            if ((browser.indexOf('Trident') !== -1 && browser.indexOf('rv:11') !== -1) || (browser.indexOf('MSIE 10') !== -1) || (document.documentMode || /Edge/.test(browser))) {
                                useBlobBuilder = true;
                                $scope.exportHref = Excel.tableToExcel(tableId, 'sheet name', false);
                            } else {
                                useBlobBuilder = false;
                                $scope.exportHref = Excel.tableToExcel(tableId, 'sheet name', true);
                            }
                            $timeout(function() {
                                var fileName = "testing.xls";
                                if (useBlobBuilder) {
                                    var builder = new window.MSBlobBuilder();
                                    builder.append($scope.exportHref);
                                    var blob = builder.getBlob('data:application/vnd.ms-excel');
                                    window.navigator.msSaveOrOpenBlob(blob, fileName);
                                } else {
                                    var link = document.createElement('a');
                                    link.download = fileName;
                                    link.href = $scope.exportHref;
                                    if (document.body != null) { document.body.appendChild(link); } link.click();
                                    link.remove();
                                }
                            }, 100);
                        }
                    });

                DataProc
                    .getProcList()
                    .then(function(response) {
                        $scope.procurements = response.data.procurements;
                    });

                DataUser
                    .getUserList()
                    .then(function(response) {
                        $scope.users = response.data;
                    });

                Filters
                    .getStatus_winners()
                    .then(function(response) {
                        if (response.error) {
                            alertify.error(response.data);
                        } else {
                            $scope.status_winners = response.data;
                        }
                    }, function(error) {
                        var errorMessage = typeof(error) == 'string' ? error : 'Ошибка загрузки списков статуса закупки';
                        alertify.error(errorMessage);
                    });

                Filters
                    .getParticipants()
                    .then(function(response) {
                        if (response.error) {
                            alertify.error(response.data);
                        } else {
                            $scope.participants = response.data;
                        }
                    }, function(error) {
                        var errorMessage = typeof(error) == 'string' ? error : 'Ошибка загрузки списков участника закупки';
                        alertify.error(errorMessage);
                    });

                $scope.onSelectCallback = function(item, model) {
                    $scope.res = item.id;
                };

                /*============-CREATE-===============*/
                $scope.create = function() {
                    $scope.result.procurements_id = $scope.res;
                    DataResult
                        .createResult($scope.result)
                        .then(function(response) {
                            if (response.data.errors) {
                                alertify.error("Что-то пошло не так (((");
                                $scope.response = response.data;
                            } else {
                                alertify.success("Успешно добавлено");

                                $location.path('/results');
                            }
                        });
                }

                /* ===========-UPDATE-===============*/
                DataResult
                    .getResult($routeParams.id)
                    .then(function(response) {
                        $scope.result = response.data;
                        $scope.update = function() {
                            DataResult
                                .updateResult($scope.result)
                                .then(function(response) {
                                    if (response.data.errors) {

                                        $scope.response = response.data;
                                        console.log($scope.response);
                                    } else {
                                        alertify.success('Успешно обновлено');

                                        $location.path('/results');

                                    };
                                });
                        };
                    });


                /* ===========-DELETE-===============*/
                $scope.delete = function() {
                    if (confirm("Вы уверены что хотите удалить результат закупки??")) {
                        DataResult
                            .deleteResult($routeParams.id)
                            .then(function(response) {

                                if (response.data.errors) {
                                    $scope.response = response.data;
                                } else {
                                    alertify.success('Успешно удалено');

                                    $location.path('/results');

                                };
                            });
                    }
                }


                var enableEditor = function() {
                    $scope.editorEnabled = true;
                    $scope.editIdProcurements = $scope.result.procurements_id;
                    $scope.editResults = $scope.result.results;
                    $scope.editAmount = $scope.result.amount;
                    $scope.editUsers = $scope.result.users_id;
                    $scope.editStatus = $scope.result.status_winners_id;
                    $scope.editParticipants = $scope.result.participants_id;

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