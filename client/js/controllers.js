angular.module('controllers',[])
    .controller('HomeController', ['$routeParams','$scope', function($routeParams, $scope){
        $scope.currentContInclude = {"url": "client/partials/home.html"};
    }])
    .controller('InfoController', ['$routeParams','$scope', function($routeParams, $scope){
        switch ($routeParams.val1) {
            case 'intro':
                $scope.currentContInclude = {"url": "client/partials/intro.html"};
                $scope.currentInfoNav = {"url": "client/partials/infoNav.html"};
                break;
            case 'situation':
                $scope.currentContInclude = {"url": "client/partials/situation.html"};
                $scope.currentInfoNav = {"url": "client/partials/infoNav.html"};
                break;
            case 'abtYou':
                $scope.currentContInclude = {"url": "client/partials/abtYou.html"};
                $scope.currentInfoNav = {"url": "client/partials/infoNav.html"};
                break;
            case 'abtDistrict':
                $scope.currentContInclude = {"url": "client/partials/abtDistrict.html"};
                $scope.currentInfoNav = {"url": "client/partials/infoNav.html"};
                break;
            case 'abtAppropriations':
                $scope.currentContInclude = {"url": "client/partials/abtAppropriations.html"};
                $scope.currentInfoNav = {"url": "client/partials/infoNav.html"};
                break;
            case 'abtStaff':
                $scope.currentContInclude = {"url": "client/partials/abtStaff.html"};
                $scope.currentInfoNav = {"url": "client/partials/infoNav.html"};
                break;
            default :
                console.log('infoctrl switch err');
        }
    }])
    .controller('StageController', ['$routeParams','$scope', function($routeParams, $scope){
        switch ($routeParams.val1) {
            case 'news':
                $scope.currentContInclude = {"url": "client/partials/news.html"};
                $scope.currentInfoNav = {"url": "client/partials/infoNav.html"};
                break;
            case 'decisions':
                $scope.currentContInclude = {"url": "client/partials/decisions.html"};
                $scope.currentInfoNav = {"url": "client/partials/infoNav.html"};
                break;
            case 'workOrganizer':
                $scope.currentContInclude = {"url": "client/partials/workOrganizer.html"};
                $scope.currentInfoNav = {"url": "client/partials/infoNav.html"};
                break;
            case 'decisionResponse':
                $scope.currentContInclude = {"url": "client/partials/decisionResponse.html"};
                $scope.currentInfoNav = {"url": "client/partials/infoNav.html"};
                break;
            case 'workResponse':
                $scope.currentContInclude = {"url": "client/partials/workResponse.html"};
                $scope.currentInfoNav = {"url": "client/partials/infoNav.html"};
                break;
            default :
                console.log('stagectrl switch err');
        }
    }]);