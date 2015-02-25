var app = angular.module('app', [
    'controllers',
    'services',
    'directives',
    'ngRoute'
]);

app.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/',{templateUrl: 'client/templates/info.html', controller:'HomeController'})
        .when('/intro',{templateUrl: 'client/templates/info.html', controller:'HomeController'})
        .when('/intro/:val1',{templateUrl: 'client/templates/info.html', controller:'HomeController'})
        .when('/info',{templateUrl: 'client/templates/info.html', controller:'InfoController'})
        .when('/info/:val1',{templateUrl: 'client/templates/info.html', controller:'InfoController'})
        .when('/stage',{templateUrl: 'client/templates/stages.html', controller:'StageController'})
        .when('/stage/:val1',{templateUrl: 'client/templates/stages.html', controller:'StageController'})
        .when('/stage/:val1/:val2',{templateUrl: 'client/templates/stages.html', controller:'StageController'})

        .otherwise('/');
}])