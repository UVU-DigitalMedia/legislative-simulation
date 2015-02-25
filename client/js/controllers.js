angular.module('controllers',[])

    .controller('navigationCtrl', ['$routeParams', '$scope', '$location', 'DataService', function ($routeParams, $scope, $location, DataService){

        //determine progress %, next and previous page, and provide link to each
        $scope.$on('$routeChangeSuccess', function() {

            //Get map of site
            var navProgress = DataService.getModel('progressModel');
            navProgress.get(function (content) {
                $scope.progMap = content.order;
            });

            //get current url path
            var param = "#" + $location.path();
            $scope.progress = {};

            //todo logic that takes the 'about' info pages out of the main flow of the program so you can review them and not loos your place
            //find current route param index # in map
            for (var i=0; i < $scope.progMap.length; i++){
                if($scope.progMap[i].url === param){

                    //post next previous and value to view
                    $scope.progress.next = $scope.progMap[i + 1].url;
                    $scope.progress.previous = $scope.progMap[i - 1].url;
                    $scope.progress.value = $scope.progMap[i].value;
                }
            }
        })
    }])

    .controller('HomeController', ['$routeParams', '$scope', 'DataService', function ($routeParams, $scope, DataService){

        if(!$routeParams.val1){
            $scope.currentContInclude = {"url": "client/partials/home.html"};

            //todo logic to deactivate back and green forward button on home page

        }else {
            switch ($routeParams.val1) {

                case 'intro':
                    $scope.currentContInclude = {"url": "client/partials/intro.html"};
                    var model = DataService.getModel('intro');
                    model.get(function (content) {
                        $scope.content = content.content;
                    });
                    break;

                case 'situation':
                    $scope.currentContInclude = {"url": "client/partials/situation.html"};
                    var model = DataService.getModel('situation');
                    model.get(function (content) {
                        $scope.content = content.content;
                    });
                    break;

                default :
                    console.log('HomeController switch err');
            }
        }
    }])



    .controller('InfoController', ['$routeParams','$scope','DataService', function($routeParams, $scope, DataService){
        switch ($routeParams.val1) {
            case 'abtYou':
                $scope.currentContInclude = {"url": "client/partials/abtYou.html"};
                var model = DataService.getModel('abtYou');
                model.get(function(content){
                    $scope.content = content.content;
                });
                break;

            case 'abtDistrict':
                $scope.currentContInclude = {"url": "client/partials/abtDistrict.html"};
                var model = DataService.getModel('abtDistrict');
                model.get(function(content){
                    $scope.content = content.content;
                });
                break;

            case 'abtAppropriations':
                $scope.currentContInclude = {"url": "client/partials/abtAppropriations.html"};
                var model = DataService.getModel('abtAppropriations');
                model.get(function(content){
                    $scope.content = content.content;
                });
                break;

            case 'abtStaff':
                $scope.currentContInclude = {"url": "client/partials/abtStaff.html"};
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
                //set partial for all news
                $scope.currentContInclude = {"url": "client/partials/news.html"};

                //get news model
                var newsModel = DataService.getModel('news1');
                newsModel.get(function(content){
                    $scope.newsContent = content.content;

                    //conjoin relevant section of model to the scope for binding (depending on what stage it is)
                    //todo Fill out news model with real info
                    switch($routeParams.val2){
                        /*stages 1 - 6*/
                        case "1":$scope.content = $scope.newsContent.news1;break;
                        case "2":$scope.content = $scope.newsContent.news2;break;
                        case "3":$scope.content = $scope.newsContent.news3;break;
                        case "4":$scope.content = $scope.newsContent.news4;break;
                        case "5":$scope.content = $scope.newsContent.news5;break;
                        case "6":$scope.content = $scope.newsContent.news6;break;
                        default: console.log('stageCtrl news switch err');
                    }
                });
                break;

            case 'decisions':
                //set partial for all decisions pages
                $scope.currentContInclude = {"url": "client/partials/decisions.html"};

                //get decisions model
                var decisionsModel = DataService.getModel('decisions1');
                decisionsModel.get(function(content){
                    $scope.decisionsModelContent = content.content;

                    //conjoin relevant section of model to the scope for binding (depending on what stage it is)
                    //todo Fill out decision model with real info
                    switch($routeParams.val2){
                        /*stage 1*/
                        case "1a":$scope.content = $scope.decisionsModelContent.decision1a;break;
                        case "1b":$scope.content = $scope.decisionsModelContent.decision1b;break;
                        case "1c":$scope.content = $scope.decisionsModelContent.decision1c;break;
                        case "1d":$scope.content = $scope.decisionsModelContent.decision1d;break;
                        /*stage 2*/
                        case "2a":$scope.content = $scope.decisionsModelContent.decision2a;break;
                        case "2b":$scope.content = $scope.decisionsModelContent.decision2b;break;
                        case "2c":$scope.content = $scope.decisionsModelContent.decision2c;break;
                        case "2d":$scope.content = $scope.decisionsModelContent.decision2d;break;
                        /*stage 3*/
                        case "3a":$scope.content = $scope.decisionsModelContent.decision3a;break;
                        case "3b":$scope.content = $scope.decisionsModelContent.decision3b;break;
                        case "3c":$scope.content = $scope.decisionsModelContent.decision3c;break;
                        case "3d":$scope.content = $scope.decisionsModelContent.decision3d;break;
                        /*stage 4*/
                        case "4a":$scope.content = $scope.decisionsModelContent.decision4a;break;
                        case "4b":$scope.content = $scope.decisionsModelContent.decision4b;break;
                        case "4c":$scope.content = $scope.decisionsModelContent.decision4c;break;
                        case "4d":$scope.content = $scope.decisionsModelContent.decision4d;break;
                        /*stage 5*/
                        case "5a":$scope.content = $scope.decisionsModelContent.decision5a;break;
                        case "5b":$scope.content = $scope.decisionsModelContent.decision5b;break;
                        case "5c":$scope.content = $scope.decisionsModelContent.decision5c;break;
                        case "5d":$scope.content = $scope.decisionsModelContent.decision5d;break;
                        /*stage 6*/
                        case "6a":$scope.content = $scope.decisionsModelContent.decision6a;break;
                        case "6b":$scope.content = $scope.decisionsModelContent.decision6b;break;
                        case "6c":$scope.content = $scope.decisionsModelContent.decision6c;break;
                        case "6d":$scope.content = $scope.decisionsModelContent.decision6d;break;
                        default: console.log('stageCtrl decisions switch err');
                    }
                });
                break;


            case 'workOrganizer':
                //set partial for all workOrganizer pages
                $scope.currentContInclude = {"url": "client/partials/workOrganizer.html"};

                //get workOrganizer model
                var workOrganizerModel = DataService.getModel('workOrganizer1');
                workOrganizerModel.get(function(content){
                    $scope.workOrganizerContent = content.content;

                    //conjoin relevant section of model to the scope for binding (depending on what stage it is)
                    //todo Fill out workOrganizer model with real info
                    switch ($routeParams.val2){
                        /*stages 1 - 6*/
                        case "1":$scope.content = $scope.workOrganizerContent.workDecision1;break;
                        case "2":$scope.content = $scope.workOrganizerContent.workDecision2;break;
                        case "3":$scope.content = $scope.workOrganizerContent.workDecision3;break;
                        case "4":$scope.content = $scope.workOrganizerContent.workDecision4;break;
                        case "5":$scope.content = $scope.workOrganizerContent.workDecision5;break;
                        case "6":$scope.content = $scope.workOrganizerContent.workDecision6;break;
                        default: console.log('stageCtrl workOrganizer switch err');
                    }
                });
                break;

            case 'decisionResponse':
                //set partial for all decisionResponse pages
                $scope.currentContInclude = {"url": "client/partials/decisionResponse.html"};

                //get decisionResponse model
                var decisionResponseModel = DataService.getModel('decisionResponse');
                decisionResponseModel.get(function(content){
                    $scope.decisionResponseContent = content.content;

                    //conjoin relevant section of model to the scope for binding (depending on what stage it is)
                    //todo Fill out decisionResponse model with real info
                    switch ($routeParams.val2){
                        /*stages 1 - 6*/
                        case "1":$scope.content = $scope.decisionResponseContent.decisionResponse1;break;
                        case "2":$scope.content = $scope.decisionResponseContent.decisionResponse2;break;
                        case "3":$scope.content = $scope.decisionResponseContent.decisionResponse3;break;
                        case "4":$scope.content = $scope.decisionResponseContent.decisionResponse4;break;
                        case "5":$scope.content = $scope.decisionResponseContent.decisionResponse5;break;
                        case "6":$scope.content = $scope.decisionResponseContent.decisionResponse6;break;
                        default: console.log('stageCtrl decisionResponse switch err');
                    }
                });
                break;

            case 'workResponse':
                //set partial for all workResponse pages
                $scope.currentContInclude = {"url": "client/partials/workResponse.html"};

                //get workResponse model
                var workResponseModel = DataService.getModel('workResponse');
                workResponseModel.get(function(content){
                    $scope.workResponseContent = content.content;

                    //conjoin relevant section of model to the scope for binding (depending on what stage it is)
                    //todo Fill out workResponse model with real info
                    switch ($routeParams.val2){
                        /*stages 1 - 6*/
                        case "1":$scope.content = $scope.workResponseContent.workResponse1;break;
                        case "2":$scope.content = $scope.workResponseContent.workResponse2;break;
                        case "3":$scope.content = $scope.workResponseContent.workResponse3;break;
                        case "4":$scope.content = $scope.workResponseContent.workResponse4;break;
                        case "5":$scope.content = $scope.workResponseContent.workResponse5;break;
                        case "6":$scope.content = $scope.workResponseContent.workResponse6;break;
                        default: console.log('stageCtrl workResponse switch err');
                    }
                });
                break;

            //todo create campaign spending case/model/bindings

            //possibly in a new controller, PostStageing or results or something
            //todo create vote case/model/bindings
            //todo create effectiveness case/model/bindings
            //todo create analysis case/model/bindings
            //todo create voteResults case/model/bindings
            //todo create thankyou case/model/bindings
            //todo create credits case/model/bindings

            default :
                console.log('stagectrl switch err');
        }
    }]);