var app = angular.module('app', [
    'controllers',
    'services',
    'directives',
    'ngRoute'
]);

app.run(function($rootScope) {
  $rootScope.navDisabled = false;
});

app.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/',{templateUrl: 'templates/intro.html', controller:'HomeController'})

        .when('/intro',{templateUrl: 'templates/intro.html', controller:'HomeController'})
        .when('/intro/:val1',{templateUrl: 'templates/intro.html', controller:'HomeController'})

        .when('/info',{templateUrl: 'templates/info.html', controller:'InfoController'})
        .when('/info/:val1',{templateUrl: 'templates/info.html', controller:'InfoController'})

        .when('/stage',{templateUrl: 'templates/stages.html', controller:'StageController'})
        .when('/stage/:val1',{templateUrl: 'templates/stages.html', controller:'StageController'})
        .when('/stage/:val1/:val2',{templateUrl: 'templates/stages.html', controller:'StageController'})


        //todo create post-stages routing (analytics, results, etc)
        .otherwise('/');
}]);
