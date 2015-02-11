angular.module('services',['ngResource'])
    .factory('DataService', ['$resource', function($resource){
        return {
            getModel: function(fileName){
                fileName = fileName + '.json';
                return $resource('client/models/:file',{file:fileName});
            }
        }
    }]);