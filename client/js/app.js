var app = angular.module('app', [
    'controllers',
    'services',
    'directives',
    'ngRoute'
]);

app.config(['$routeProvider',function(){
    $routrProvider
        .when('/',{templateUrl: '', controller:'home'})
        .otherwise({redirectTo:'/'});
}])