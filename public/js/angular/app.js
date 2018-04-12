(function() {
    "use strict";
    angular.module('platform', [
        'platform.routes',
        'platform.controllers',
        'platform.directives',
        'platform.services'
    ]).config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }).config(['$qProvider', function($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }]);;

    angular.module('platform.routes', ['ngRoute']);
    angular.module('platform.controllers', ['ui.bootstrap', 'ui.mask', 'ui.select', 'ngSanitize']);
    angular.module('platform.directives', []);
    angular.module('platform.services', ['ngResource']);

}());