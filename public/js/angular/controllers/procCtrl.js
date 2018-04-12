(function() {
    "use strict";
    angular.module('platform.controllers')
        .filter('eventDuration', function() {
            return function(eventDuration) {
                var now = moment(new Date());
                var ms = moment(eventDuration).diff(moment(now));

                var eventDurationString = " ";
                var eventMDuration = moment.duration(ms);

                if (eventMDuration._data.months > 0) {
                    eventDurationString += " " + moment.duration(eventMDuration.months(), 'months').format("M [мес.]");
                }

                if (eventMDuration._data.days > 0) {
                    eventDurationString += " " + moment.duration(eventMDuration.days(), 'days').format("d [дн.]");
                }
                if (eventMDuration._data.hours > 0) {
                    eventDurationString += " " + moment.duration(eventMDuration.hours(), 'hours').format("h [час.]");
                }

                if (eventMDuration._data.minutes > 0) {
                    eventDurationString += " " + moment.duration(eventMDuration.minutes(), 'minutes').format("m [мин.]");
                } else if (eventMDuration._data.minutes < 0) {

                    eventDurationString = "Закончился";
                }

                return eventDurationString;
            }

        }).filter('dateFormat', function() {
            return function(date) {
                return moment(new Date(date)).format("LLL");
            }
        }).filter('numberFormat', function() {
            return function(number) {
                return number.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            }
        }).filter('data', function() {
            return function(input, begin) {
                if (input) {
                    begin = +begin;
                    return input.slice(begin);
                }
                return [];
            }
        }).controller('procCtrl',
        function($scope, $rootScope, $http, $location, $filter, $route, $routeParams, DataProc, DataUser, Filters) {

            /* ===========-LIST PROCUREMENTS-===============*/
            DataProc
                .getProcList()
                .then(function(response) {
                    $scope.procurements = response.data.procurements;
                    $scope.countProcToDay = response.data.countProcToDay;
                    $scope.procListToDay = response.data.procListToDay;
                    $scope.countAllProc = response.data.countAllProc;
                    $scope.countWinProc = response.data.countWinProc;
                    $scope.countFalseProc = response.data.countFalseProc;
                    $scope.currentMonth = response.data.currentMonth;
                    $scope.sumPerMonth = response.data.sumPerMonth

                    $scope.current_grid = 1;
                    $scope.data_limit = 1;
                    $scope.filter_data = $scope.procurements.length;
                    $scope.entire_user = $scope.procurements.length;

                    $scope.search = function(event) {
                        $scope.procurements = $filter('filter')(response.data.procurements, {
                            users_id: $scope.filter.users_id,
                            statuses_id: $scope.filter.statuses_id,
                            subjects_id: $scope.filter.subjects_id,
                            types_id: $scope.filter.types_id,
                            offers_period_end: $scope.filter.offers_period_end,
                            auction_period_end: $scope.filter.auction_period_end
                        });
                    };
                    $scope.clear = function(event) {
                        $scope.filter = {};
                    };
                    $scope.reloadRoute = function() {
                        $route.reload();
                    };

                    $scope.page_position = function(page_number) {
                        $scope.current_grid = page_number;
                    };
                });

            DataUser
                .getUserList()
                .then(function(response) {
                    if (response.error) {
                        alertify.error(response.data);
                    } else {
                        $scope.users = response.data;
                    }

                }, function(error) {
                    var errorMessage = typeof(error) == 'string' ? error : 'Ошибка загрузки списков менеджеров';
                    alertify.error(errorMessage);
                });

            Filters
                .getStatus()
                .then(function(response) {
                    if (response.error) {
                        alertify.error(response.data);
                    } else {
                        $scope.statuses = response.data;
                    }

                }, function(error) {
                    var errorMessage = typeof(error) == 'string' ? error : 'Ошибка загрузки списков статусов закупки';
                    alertify.error(errorMessage);
                });

            Filters
                .getSubject()
                .then(function(response) {
                    if (response.error) {
                        alertify.error(response.data);
                    } else {
                        $scope.subjects = response.data;
                    }
                }, function(error) {
                    var errorMessage = typeof(error) == 'string' ? error : 'Ошибка загрузки списков предметов закупки';
                    alertify.error(errorMessage);
                });

            Filters
                .getType()
                .then(function(response) {
                    if (response.error) {
                        alertify.error(response.data);
                    } else {
                        $scope.types = response.data;
                    }
                }, function(error) {
                    var errorMessage = typeof(error) == 'string' ? error : 'Ошибка загрузки списков типов закупки';
                    alertify.error(errorMessage);
                });

            /*============-CREATE-===============*/
            $scope.create = function() {
                $scope.procurement.offers_period_end = moment($scope.procurement.offers_period_end, 'D/M/YYYY HH:mm:ss').format("YYYY-MM-DD HH:mm:ss");
                $scope.procurement.auction_period_end = moment($scope.procurement.auction_period_end, 'D/M/YYYY HH:mm:ss').format("YYYY-MM-DD HH:mm:ss");
                DataProc
                    .createProc($scope.procurement)
                    .then(function(response) {
                        if (response.data.errors) {
                            alertify.error("Что-то пошло не так (((");
                            $scope.response = response.data;

                        } else {
                            $location.path('/');
                            alertify.success("Успешно добавлено");
                            alertify.success(response.data.success);
                        }
                    });
            }

            /* ===========-UPDATE-===============*/
            DataProc
                .getProc($routeParams.id)
                .then(function(response) {
                    $scope.procurement = response.data;
                    $scope.update = function() {
                        $scope.procurement.offers_period_end = moment($scope.procurement.offers_period_end, 'YYYY/M/D HH:mm:ss').format("YYYY-MM-DD HH:mm:ss");
                        $scope.procurement.auction_period_end = moment($scope.procurement.auction_period_end, 'YYYY/M/D HH:mm:ss').format("YYYY-MM-DD HH:mm:ss");

                        DataProc
                            .updateProc($scope.procurement)
                            .then(function(response) {
                                if (response.data.errors) {

                                    $scope.response = response.data;
                                    console.log($scope.response);
                                } else {
                                    alertify.success('Успешно обновлено');
                                    $route.reload();
                                };
                            });
                    };
                });
            /* ===========-DELETE-===============*/
            $scope.delete = function() {
                if (confirm("Вы уверены что хотите удалить Закупку??")) {
                    DataProc
                        .deleteProc($routeParams.id)
                        .then(function(response) {

                            if (response.data.errors) {
                                $scope.response = response.data;
                            } else {
                                alertify.success('Успешно удалено');
                                $route.reload();
                                $location.path('/');

                            };
                        });
                }
            }

            var enableEditor = function() {
                $scope.editorEnabled = true;
                $scope.editCustomer = $scope.procurement.customer;
                $scope.editIdProcurements = $scope.procurement.id_procurement;
                $scope.editOffersPeroidEnd = $scope.procurement.offers_period_end;
                $scope.editAuctionPeriodEnd = $scope.procurement.auction_period_end;
                $scope.editAmount = $scope.procurement.amount;
                $scope.editUsers = $scope.procurement.users_id;
                $scope.editSubject = $scope.procurement.subjects_id;

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