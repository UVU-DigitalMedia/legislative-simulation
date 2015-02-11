angular.module('controllers',[])
    .controller('HomeController', ['$routeParams','$scope', function($routeParams, $scope){
        $scope.currentContInclude = {"url": "client/partials/home.html"};
    }])
    .controller('InfoController', ['$routeParams','$scope','DataService', function($routeParams, $scope, DataService){
        switch ($routeParams.val1) {
            case 'intro':
                $scope.currentContInclude = {"url": "client/partials/intro.html"};
                $scope.currentInfoNav = {"url": "client/partials/infoNav.html"};

                var model = DataService.getModel('intro');
                model.get(function(content){
                    $scope.content = content.content;
                });


                break;
            case 'situation':
                $scope.currentContInclude = {"url": "client/partials/situation.html"};
                $scope.currentInfoNav = {"url": "client/partials/infoNav.html"};

                var model = DataService.getModel('situation');
                model.get(function(content){
                    $scope.content = content.content;
                });

                break;
            case 'abtYou':
                $scope.currentContInclude = {"url": "client/partials/abtYou.html"};
                $scope.currentInfoNav = {"url": "client/partials/infoNav.html"};

                var model = DataService.getModel('abtYou');
                model.get(function(content){
                    $scope.content = content.content;
                });
                break;
            case 'abtDistrict':
                $scope.currentContInclude = {"url": "client/partials/abtDistrict.html"};
                $scope.currentInfoNav = {"url": "client/partials/infoNav.html"};

                var model = DataService.getModel('abtDistrict');
                model.get(function(content){
                    $scope.content = content.content;
                });
                break;
            case 'abtAppropriations':
                $scope.currentContInclude = {"url": "client/partials/abtAppropriations.html"};
                $scope.currentInfoNav = {"url": "client/partials/infoNav.html"};

                var model = DataService.getModel('abtAppropriations');
                model.get(function(content){
                    $scope.content = content.content;
                });
                break;
            case 'abtStaff':
                $scope.currentContInclude = {"url": "client/partials/abtStaff.html"};
                $scope.currentInfoNav = {"url": "client/partials/infoNav.html"};

                var model = DataService.getModel('abtStaff');
                model.get(function(content){
                    $scope.content = content.content;
                });
                break;
            default :
                console.log('infoctrl switch err');
        }
    }])
    .controller('StageController', ['$routeParams','$scope', 'DataService', function($routeParams, $scope, DataService){
        switch ($routeParams.val1) {
            case 'news':
                $scope.currentContInclude = {"url": "client/partials/news.html"};
                $scope.currentInfoNav = {"url": "client/partials/infoNav.html"};

                var model = DataService.getModel('news1');
                model.get(function(content){
                    $scope.content = content.content;
                });
                break;
            case 'decisions':
                $scope.currentContInclude = {"url": "client/partials/decisions.html"};
                $scope.currentInfoNav = {"url": "client/partials/infoNav.html"};

                var model = DataService.getModel('decisions1');
                model.get(function(content){
                    $scope.content = content.content;
                });
                break;
            case 'workOrganizer':
                $scope.currentContInclude = {"url": "client/partials/workOrganizer.html"};
                $scope.currentInfoNav = {"url": "client/partials/infoNav.html"};

                var model = DataService.getModel('workOrganizer1');
                model.get(function(content){
                    $scope.content = content.content;
                });
                break;
            case 'decisionResponse':
                $scope.currentContInclude = {"url": "client/partials/decisionResponse.html"};
                $scope.currentInfoNav = {"url": "client/partials/infoNav.html"};

                var model = DataService.getModel('decisionResponse');
                model.get(function(content){
                    $scope.content = content.content;
                });
                break;
            case 'workResponse':
                $scope.currentContInclude = {"url": "client/partials/workResponse.html"};
                $scope.currentInfoNav = {"url": "client/partials/infoNav.html"};

                var model = DataService.getModel('workResponse');
                model.get(function(content){
                    $scope.content = content.content;
                });
                break;
            default :
                console.log('stagectrl switch err');
        }
    }]);