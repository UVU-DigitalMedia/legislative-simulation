angular.module('controllers',['angularCharts'])

    .controller('navigationCtrl', ['$routeParams', '$scope', '$location', 'DataService', function ($routeParams, $scope, $location, DataService){

        //determine progress %, next and previous page, and provide link to each
        $scope.$on('$routeChangeSuccess', function() {

            //Get map of site (for linear progress)
            var navProgress = DataService.getModel('progressModel');

            //wait for promise fulfillment
            navProgress.get().$promise.then(function (content) {
                    $scope.progMap = content.order;

                //find current route param index # in map
                for (var i=0; i < $scope.progMap.length; i++){
                    if($scope.progMap[i].url === param){

                        //post next previous and value to view
                        $scope.progress.next = $scope.progMap[i + 1].url;
                        $scope.progress.previous = $scope.progMap[i - 1].url;
                        $scope.progress.value = $scope.progMap[i].value;
                    }
                }
            });

            //get current url path
            var param = "#" + $location.path();
            $scope.progress = {};

            //todo logic that takes the 'about' info pages out of the main flow of the program so you can review them and not loose your place
            //todo logic that stops progress if conditions aren't met (decisions are not selected etc)


        })
    }])
    .controller('HomeController', ['$routeParams', '$scope', 'DataService', function ($routeParams, $scope, DataService){

        var model;
        //direct to home if no further value otherwise direct to respective partial
        if(!$routeParams.val1){
            $scope.currentContInclude = {"url": "partials/home.html"};
            //todo logic to deactivate back and forward(green) button on home page
        }else {
            //determine the route
            switch ($routeParams.val1) {

                case 'intro'://set model and view
                    //set current partial (pulled into the template)
                    $scope.currentContInclude = {"url": "partials/intro.html"};

                    //get corresponding json and attach to $scope
                    model = DataService.getModel('intro');
                    model.get(function (content) {$scope.content = content.content;});
                    break;

                case 'situation'://set model and view
                    $scope.currentContInclude = {"url": "partials/situation.html"};
                    model = DataService.getModel('situation');
                    model.get(function (content) {$scope.content = content.content;});
                    break;

                default :
                    console.log('HomeController switch err');
            }
        }
    }])

    .controller('InfoController', ['$routeParams','$scope','DataService', function($routeParams, $scope, DataService){
        var model;
        switch ($routeParams.val1) {
            case 'abtYou'://set model and view
                $scope.currentContInclude = {"url": "partials/abtYou.html"};
                model = DataService.getModel('abtYou');
                model.get(function(content){ $scope.content = content.content; });
                break;

            case 'abtDistrict'://set model and view
                $scope.currentContInclude = {"url": "partials/abtDistrict.html"};
                model = DataService.getModel('abtDistrict');
                model.get(function(content){$scope.content = content.content;});
                break;

            case 'abtAppropriations'://set model and view
                $scope.currentContInclude = {"url": "partials/abtAppropriations.html"};
                model = DataService.getModel('abtAppropriations');
                model.get(function(content){$scope.content = content.content;});
                break;

            case 'abtStaff'://set model and view
                $scope.currentContInclude = {"url": "partials/abtStaff.html"};
                model = DataService.getModel('abtStaff');
                model.get(function(content){$scope.content = content.content;});
                break;

            default :
                console.log('infoctrl switch err');
        }
    }])

    .controller('StageController', ['$routeParams','$scope', 'DataService', function($routeParams, $scope, DataService){
        //declare answers object
        $scope.answers={};

        //save answer and response on selection
        $scope.saveAnswer = function(entry, question, answer){
            localStorage[question] = entry;
            var response = question + 'Response';
            localStorage[response] = answer;
        };

        //limit check boxes to 2, add/remove from local storage
        $scope.checkboxs = [];
        $scope.limit = 2;
        $scope.checked = 0;
        $scope.checkChanged = function(checkbox, questionName, entry, response){
            if(checkbox.answer){
                $scope.checked++;
                addValue(questionName, entry, response)
            }else{
                $scope.checked--;
                removeValue(questionName, entry, response)
            }
        };

        //add checked value to localStorage
        function addValue(question, entry, answer){
            var response;
            localStorage[question] = entry;
            response = question + 'Response';
            localStorage[response] = answer;
        }
        //remove checked value
        function removeValue(question, answer){
            var response;
            delete localStorage[question];
            response = question + 'Response';
            delete localStorage[response];
        }

        //redirect to respective partial
        switch ($routeParams.val1) {
            case 'news'://set model and view
                $scope.currentContInclude = {"url": "partials/news.html"};
                var newsModel = DataService.getModel('news1');
                newsModel.get(function(content){$scope.newsContent = content.content;

                    //conjoin relevant section of model to the scope for binding (depending on what stage it is)
                    //todo Fill out news model with real info
                    //todo make dynamic as opposed to a switch
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

            case 'decisions'://set model and view
                $scope.currentContInclude = {"url": "partials/decisions.html"};
                var decisionsModel = DataService.getModel('decisions1');
                decisionsModel.get(function(content){ $scope.decisionsModelContent = content.content;

                    //conjoin relevant section of model to the scope for binding (depending on what stage it is)
                    //todo make dynamic as opposed to a switch
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

            case 'workOrganizer'://set model and view
                $scope.currentContInclude = {"url": "partials/workOrganizer.html"};
                var workOrganizerModel = DataService.getModel('workOrganizer1');
                workOrganizerModel.get(function(content){ $scope.workOrganizerContent = content.content;

                    //conjoin relevant section of model to the scope for binding (depending on what stage it is)
                    //todo Fill out workOrganizer model with real info
                    //todo make dynamic as opposed to a switch
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

            case 'decisionResponse'://set model and view
                $scope.currentContInclude = {"url": "partials/decisionResponse.html"};
                var decisionResponseModel = DataService.getModel('decisionResponse');
                decisionResponseModel.get(function(content){ $scope.decisionResponseContent = content.content;

                    //conjoin relevant section of model to the scope for binding (depending on what stage it is)
                    //todo make dynamic as opposed to switch
                    switch ($routeParams.val2){
                        /*stages 1 - 6*/
                        case "1":
                            $scope.content = $scope.decisionResponseContent.decisionResponse1;
                            //todo make service that collects local and builds single "answer object
                            //todo change question too
                            //todo cleanup json objects, have them be a full build
                            $scope.content.body.questions[0].choice = localStorage['1a'];
                            $scope.content.body.questions[0].response = localStorage['1aResponse'];

                            $scope.content.body.questions[1].choice = localStorage['1b'];
                            $scope.content.body.questions[1].response = localStorage['1bResponse'];

                            $scope.content.body.questions[2].choice = localStorage['1c'];
                            $scope.content.body.questions[2].response = localStorage['1cResponse'];

                            $scope.content.body.questions[3].choice = localStorage['1d'];
                            $scope.content.body.questions[3].response = localStorage['1dResponse'];
                            break;
                        case "2":
                            $scope.content = $scope.decisionResponseContent.decisionResponse2;

                            $scope.content.body.questions[0].choice = localStorage['2a'];
                            $scope.content.body.questions[0].response = localStorage['2aResponse'];

                            $scope.content.body.questions[1].choice = localStorage['2b'];
                            $scope.content.body.questions[1].response = localStorage['2bResponse'];

                            $scope.content.body.questions[2].choice = localStorage['2c'];
                            $scope.content.body.questions[2].response = localStorage['2cResponse'];

                            $scope.content.body.questions[3].choice = localStorage['2d'];
                            $scope.content.body.questions[3].response = localStorage['2dResponse'];
                            break;
                        case "3":
                            $scope.content = $scope.decisionResponseContent.decisionResponse3;

                            $scope.content.body.questions[0].choice = localStorage['3a'];
                            $scope.content.body.questions[0].response = localStorage['3aResponse'];

                            $scope.content.body.questions[1].choice = localStorage['3b'];
                            $scope.content.body.questions[1].response = localStorage['3bResponse'];

                            $scope.content.body.questions[2].choice = localStorage['3c'];
                            $scope.content.body.questions[2].response = localStorage['3cResponse'];

                            $scope.content.body.questions[3].choice = localStorage['3d'];
                            $scope.content.body.questions[3].response = localStorage['3dResponse'];
                            break;
                        case "4":
                            $scope.content = $scope.decisionResponseContent.decisionResponse4;
                            $scope.content.body.questions[0].choice = localStorage['4a'];
                            $scope.content.body.questions[0].response = localStorage['4aResponse'];

                            $scope.content.body.questions[1].choice = localStorage['4b'];
                            $scope.content.body.questions[1].response = localStorage['4bResponse'];

                            $scope.content.body.questions[2].choice = localStorage['4c'];
                            $scope.content.body.questions[2].response = localStorage['4cResponse'];

                            $scope.content.body.questions[3].choice = localStorage['4d'];
                            $scope.content.body.questions[3].response = localStorage['4dResponse'];
                            break;
                        case "5":
                            $scope.content = $scope.decisionResponseContent.decisionResponse5;
                            $scope.content.body.questions[0].choice = localStorage['5a'];
                            $scope.content.body.questions[0].response = localStorage['5aResponse'];

                            $scope.content.body.questions[1].choice = localStorage['5b'];
                            $scope.content.body.questions[1].response = localStorage['5bResponse'];

                            $scope.content.body.questions[2].choice = localStorage['5c'];
                            $scope.content.body.questions[2].response = localStorage['5cResponse'];

                            $scope.content.body.questions[3].choice = localStorage['5d'];
                            $scope.content.body.questions[3].response = localStorage['5dResponse'];
                            break;
                        case "6":
                            $scope.content = $scope.decisionResponseContent.decisionResponse6;
                            $scope.content.body.questions[0].choice = localStorage['6a'];
                            $scope.content.body.questions[0].response = localStorage['6aResponse'];

                            $scope.content.body.questions[1].choice = localStorage['6b'];
                            $scope.content.body.questions[1].response = localStorage['6bResponse'];

                            $scope.content.body.questions[2].choice = localStorage['6c'];
                            $scope.content.body.questions[2].response = localStorage['6cResponse'];

                            $scope.content.body.questions[3].choice = localStorage['6d'];
                            $scope.content.body.questions[3].response = localStorage['6dResponse'];
                            break;
                        default: console.log('stageCtrl decisionResponse switch err');
                    }
                });
                break;

            case 'workResponse'://set model and view
                $scope.currentContInclude = {"url": "partials/workResponse.html"};
                var workResponseModel = DataService.getModel('workResponse');
                workResponseModel.get(function(content){ $scope.workResponseContent = content.content;

                    //conjoin relevant section of model to the scope for binding (depending on what stage it is)
                    //todo Fill out workResponse model with real info
                    //todo make dynamic as opposed to switch
                    switch ($routeParams.val2){
                        /*stages 1 - 6*/
                        case "1":$scope.content = $scope.workResponseContent.workResponse1;
                            //service that gets local storage and returns answer object
                            $scope.content.body.situations = DataService.getWorkResponses(1);
                            break;
                        case "2":$scope.content = $scope.workResponseContent.workResponse2;
                            $scope.content.body.situations = DataService.getWorkResponses(2);
                            break;
                        case "3":$scope.content = $scope.workResponseContent.workResponse3;
                            $scope.content.body.situations = DataService.getWorkResponses(3);
                            break;
                        case "4":$scope.content = $scope.workResponseContent.workResponse4;
                            $scope.content.body.situations = DataService.getWorkResponses(4);
                            break;
                        case "5":$scope.content = $scope.workResponseContent.workResponse5;
                            $scope.content.body.situations = DataService.getWorkResponses(5);
                            break;
                        case "6":$scope.content = $scope.workResponseContent.workResponse6;
                            $scope.content.body.situations = DataService.getWorkResponses(6);
                            break;
                        default: console.log('stageCtrl workResponse switch err');
                    }
                });
                break;

            case 'campSpending'://set model and view
                $scope.currentContInclude = {"url": "partials/campSpending.html"};
                var campSpendingModel = DataService.getModel('campSpending');
                campSpendingModel.get(function(content){ $scope.campSpendingContent = content.content;
                });

                break;


            case 'effectiveness':


            $scope.config = {
                tooltips: true,
                labels: false,
                mouseover: function() {},
                mouseout: function() {},
                click: function() {},
                legend: {
                  display: true,
                  //could be 'left, right'
                  position: 'right'
                }
              };

                //set model and view
                $scope.currentContInclude = {"url": "partials/effectiveness.html"};
                    var model = DataService.getModel('effectiveness');
                    model.get(function (content) {
                        $scope.content = content.content;
                        $scope.effData = content.effData;
                    });
                break;

            case 'analysis'://set model and view
                    $scope.currentContInclude = {"url": "partials/analysis.html"};
                    var model = DataService.getModel('analysis');
                    model.get(function (content) {$scope.content = content.content;});
                    break;

            case 'results'://set model and view
                    $scope.currentContInclude = {"url": "partials/results.html"};
                    var model = DataService.getModel('results');
                    model.get(function (content) {$scope.content = content.content;});
                    break;

            //todo create campaign spending case/model/bindings - possibly in a new controller, PostStageing or results or something
            //todo create vote case/model/bindings
            //todo create analysis case/model/bindings
            //todo create voteResults case/model/bindings
            //todo create thankyou case/model/bindings
            //todo create credits case/model/bindings

            default :
                console.log('stagectrl switch err');
        }
    }]);
