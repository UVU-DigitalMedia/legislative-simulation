angular.module('controllers',['angularCharts'])

    .controller('HomeController', ['$routeParams', '$scope', 'DataService', function ($routeParams, $scope, DataService){

        var model;

        $scope.about = {

            "abtYou": {
                "header": "About",
                "name": "Kenneth Jones ",
                "body": {
                    "p1": "Kenneth Jones is a successful businessman (social media marketing) from the suburban community of North Districtville.  He is very proud of his ancestry, as his family first located in Utah in the 1840s.",
                    "p2": "He served on the Bunko County Commission prior to being elected to the legislature.  He is known to be rather \"volitile\" and expresses his opinions freely.",
                    "p3": "Jones is known as an moderate but with a deep distrust of big government programs.  His typical speech is about how local communities should set policy.  This makes him acceptable to Tea Party supporters.",
                    "p4": "He is married and has grown children.  His wife,  Annebel, is a teacher in the local school district."
                },
                "images": [
                    {
                        "name": "Kenneth Jones",
                        "url": "../img/kennethJones.jpg",
                        "alt": "Profile pic of Kenneth Jones"
                    }
                ]
            },
            "abtDistrict": {
                "header": "About the District",
                "body": {
                    "p1": "The Utah 38th House District includes the northern half of the city of Districtville and the immediate suburbs of North Districtville and Potsdale.",
                    "p2": "The politics of the 38th is quite varied.  Districtville is very liberal where anything goes.  It is surrounded by traditional conservative LDS church members.   Jones won the election by carrying North Districtville and winning Potsdale by a very large margin.",
                    "p3": "Districtville houses the University of Districtville, also known as the fighting \"Weasels.\" The city is home to a burgeoning music industry and a federal agency specializing in climate research.",
                    "p4": "The big issue in the 38th is support for education and the university.  Voters are concerned about declining test scores and safety in the schools.",
                    "p5": "The biggest industry is tourism with over a million visitors spending time and money in the region.   The powerful business leaders are largely from the tourist industry."
                },
                "images": [
                    {
                        "name": "District map",
                        "url": "../img/districtMap.jpg",
                        "alt": "A map of the district"
                    }
                ]
            },
            "abtAppropriations": {
                "header": "About the Appropriations Chair",
                "body": {
                    "title": "Republican Leaders",
                    "candidates": [
                        {
                            "name": "Fred Colbert",
                            "info": "Fred Colbert is one of the more flamboyant members of the House.  Elected in 2004, he represents Beauford  County.   He is known as the leader of the \"Young Turks,\" who wish to align public spending with district needs.  He has substantial following, especially among less senior Republicans.  Colbert is chair of the Judiciary Committee.  He is frequently interviewed by the press and is popular guest of \"Off the Record.\"   Colbert campaigned for you in the last election.",
                            "imgUrl": "../img/colbert.jpg",
                            "imgAlt": "Appropriations committee chair candidate Fred Colbert"
                        },
                        {
                            "name": "Ralph Jenkins",
                            "info": "Ralph Jenkins is an eight term veteran from Cumberland County.   He is a leader of what is referred to as the \"old guard.\"  Jenkins likes like-minded House Republicans who favor the status quo and wish to preserve the current power relationships within the caucus.   He is a conservative anti-spending Republican.    He is known for his skill in political infighting and his knowledge of the budget.   Jenkins may also chair the newly created reapportionment committee.",
                            "imgUrl": "../img/Jenkins.jpg",
                            "imgAlt": "Appropriations committee chair candidate Ralph Jenkins"
                        }
                    ]
                }
            },
            "abtStaff": {
                "header": "About the Staff",
                "body": {
                    "title": "",
                    "candidates": [
                        {
                            "name": "Paula Martinez",
                            "info": "Paula Martinez has been active in district politics for some time.  She is 41 years old and is a partner in a local law firm.  She is the current chair of the Disrictville Hispanic Association.  Martinez is well connected with the minority community which makes up 20% of the voting population.",
                            "imgUrl": "../img/Martinez.jpg",
                            "imgAlt": "Appropriations committee chair candidate Fred Colbert"
                        },
                        {
                            "name": "Dan Graves",
                            "info": "Dan Graves is a long time Capitol staffer. Graves is 54 years old.   He has a law degree and considerable experience in drafting legislation.  Graves has worked for the national and state Republican parties.  He is an expert in the state budget as he currently works for Rep. Jenkins, Chair of the House Appropriations Committee",
                            "imgUrl": "../img/Graves.jpg",
                            "imgAlt": "Appropriations committee chair candidate Ralph Jenkins"
                        },
                        {
                            "name": "Erik Larson",
                            "info": "Erik Larson was a major player in your election campaign.   Larson, 25, has been a journalist and helped design and write your campaign literature.  He is also an activist with the Tea Party activists in the region.  He has great skills in crafting electioneering strategies.",
                            "imgUrl": "../img/Larson.jpg",
                            "imgAlt": "Appropriations committee chair candidate Ralph Jenkins"
                        }
                    ]
                }
            }
        };

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

    .controller('StageController', ['$routeParams','$scope', '$rootScope', '$location', 'DataService', function($routeParams, $scope, $rootScope, $location, DataService){

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
                        if(i > 0) $scope.progress.previous = $scope.progMap[i - 1].url
                        $scope.progress.value = $scope.progMap[i].value;
                      }
                  }
          });

          //get current url path

          var param = "#" + $location.path();
          $scope.progress = {};
          //var curPage = $scope.progMap[i].url;
          if((param.indexOf("decisions") != -1) || (param.indexOf("workOrganizer") != -1)) {
            // we are on a page where a decision must be selected before progressing
            $rootScope.navDisabled = true;
        }else {
          $rootScope.navDisabled = false;
          // if (!$scope.$$phase) { // check if digest already in progress
          //   $scope.$applyAsync(); // launch digest;
          // }
        }


          //todo logic that takes the 'about' info pages out of the main flow of the program so you can review them and not loose your place
            // completed by making modal paper-dialog components inside index.html
          //todo logic that stops progress if conditions aren't met (decisions are not selected etc)



      });

        //declare answers object
        $scope.answers={};
        $scope.family = $scope.respect = $scope.district = $scope.press = $scope.campaign = $scope.business = $scope.staff = $scope.governor = $scope.ethics = $scope.money = 0;



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

        //todo create campaign spending case/model/bindings -- probably in a new controller, 'PostStageing' or 'results' or something
            case 'vote'://set model and view
                $scope.currentContInclude = {"url": "partials/vote.html"};
                var model = DataService.getModel('vote');
                model.get(function (content) {$scope.content = content.content;});
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

            //save answer and response on selection
            $scope.evalAnswers = function(){
              console.log(localStorage['1a']);
              switch (localStorage['1a']){
                  case "Paula Martinez":$scope.district += 2;
                      console.log($scope.district);
                      break;
                  case "Dan Graves":$scope.respect += 3;
                      $scope.governor += 1;
                      $scope.money += 1;
                      break;
                  case "Erik Larson":$scope.district += 2;
                      $scope.campaign += 3;
                      break;
                    }
              switch (localStorage['1b']){
                  case "Yes":$scope.campaign += 1;
                      break;
                  case "No":$scope.respect += 3;
                      $scope.district += 2;
                      break;
                    }
              switch (localStorage['1c']){
                  case "Ralph Jenkins":$scope.respect += 1;
                      break;
                  case "Fred Colbert":$scope.respect += 1;
                      $scope.district += 3;
                      $scope.press += 3;
                      $scope.campaign += 1;
                      break;
                    }
              switch (localStorage['1d']){
                  case "Peterson for Speaker (Rep.)":$scope.respect += 3;
                  $scope.respect += 3;
                  $scope.respect += 3;
                      break;
                  case "Seelig for Speaker (Dem.)":$scope.respect += 1;
                      $scope.district += 3;
                      $scope.press += 3;
                      $scope.campaign += 1;
                      $scope.governor += 3;
                      break;
                    }
              switch (localStorage['2a']){
                  case "Yes":$scope.district += 3;
                  $scope.business += 3;
                      break;
                  case "No":$scope.press += 3;
                      break;
                    }
              switch (localStorage['2b']){
                  case "1 night a week":$scope.family += 3;
                      break;
                  case "2 or 3 nights a week":$scope.family += 2;
                      break;
                  case "4 nights a week":$scope.respect += 1;
                      $scope.district += 3;
                      $scope.campaign += 3;
                      $scope.governor += 2;
                      break;
                  case "As many as needed to meet district demands":$scope.respect += 3;
                      $scope.district += 3;
                      $scope.campaign += 3;
                      $scope.staff += 3;
                      break;
                    }
              switch (localStorage['2c']){
                  case "\"I  plan to vote yes, What is $200,000 compared to fredom from the feds.\"":$scope.respect += 2;
                      $scope.press += 3;
                      $scope.campaign += 2;
                      break;
                  case "\"I plan to vote no. Funding should be maintained for  Districtville inspite of the federal mandates.\"":$scope.district += 3;
                      $scope.press += 3;
                      $scope.campaign += 1;
                      $scope.money += 2;
                      break;
                    }
              switch (localStorage['2d']){
                  case "Yes":$scope.business += 3;
                  $scope.governor += 3;
                      break;
                  case "No":$scope.district += 3;
                  $scope.press += 3;
                  $scope.campaign += 2;
                      break;
                    }
              switch (localStorage['3a']){
                  case "Yes":$scope.respect += 3;
                  $scope.business += 3;
                  $scope.governor += 3;
                      break;
                  case "No":$scope.district += 3;
                  $scope.press += 1;
                  $scope.staff += 3;
                      break;
                    }
              switch (localStorage['3b']){
                  case "Yes":$scope.press += 3;
                      break;
                  case "No":$scope.district += 2;
                  $scope.campaign += 1;
                  $scope.business += 3;
                  $scope.governoe += 3;
                  $scope.money += 1;
                      break;
                    }
              switch (localStorage['3c']){
                  case "Yes":$scope.district += 3;
                  $scope.press += 3;
                  $scope.money += 1;
                      break;
                  case "No":
                  $scope.staff += 3;
                      break;
                    }
              switch (localStorage['3d']){
                  case "Yes":$scope.district += 2;
                  $scope.business += 3;
                      break;
                  case "No":$scope.respect += 3;
                      break;
                    }
              switch (localStorage['4a']){
                  case "Meet personally with the DSS director and push for them to support Roper.":$scope.money += 2;
                      break;
                  case "Let Roper fend for himself.":$scope.press += 3;
                      $scope.ethics += 3;
                      $scope.money += 3;
                      break;
                    }
              switch (localStorage['4b']){
                  case "You vote \"yes\" to advance the amendment to the agriculture committee.":$scope.respect += 3;
                      $scope.campaign += 2;
                      break;
                  case "You tell the Speaker that you cannot support the constitutional amendment.  It is not good policy, science or politics.":$scope.district += 3;
                      $scope.press += 3;
                      $scope.campaign += 2;
                      break;
                    }
              switch (localStorage['4c']){
                  case "\"With all due respect, you plan to vote for the amendment.\"":$scope.district += 2;
                      $scope.press += 3;
                      $scope.campaign += 2;
                      $scope.money += 3;
                      break;
                  case "\"I'm a team player, Governor, I will vote against the amendment.\"":$scope.business += 2;
                      $scope.staff += 3;
                      $scope.governor += 3;
                      break;
                  case "You will call the lobbyist from University of Disttrictville representative and find out how to vote.":$scope.district += 1;
                      $scope.money += 3;
                      break;
                    }
              switch (localStorage['4d']){
                  case "\"Yes, my spouse and I will join you for dinner at the mansion.\"":$scope.family += 3;
                  $scope.governor += 2;
                      break;
                  case "\"No, I appreciate your invitation, but I have important district business to attend to.\"":$scope.respect += 3;
                  $scope.district += 2;
                  $scope.campaign += 2;
                  $scope.business += 3;
                  $scope.money += 1;
                      break;
                  case "\"No thanks, Gov. Maybe another time.\"  You are planning playing golf at Pinehurst #2 with lobbyists from Pope Foundation.":$scope.business += 1;
                  $scope.money += 2;
                      break;
                    }
              switch (localStorage['5a']){
                  case "\"Yes, Governor, I'll see that the bill is killed in committee.\"":$scope.respect += 3;
                  $scope.governor += 3;
                      break;
                  case "\"No,  I will do all I can to see the bill pass.\"":$scope.district += 3;
                  $scope.press +=3;
                  $scope.business += 3;
                      break;
                    }
              switch (localStorage['5b']){
                  case "Stand up to Fink and demand your bill in trade.":$scope.respect += 3;
                  $scope.district += 3;
                  $scope.campaign += 3;
                  $scope.staff += 3;
                      break;
                  case "Give in and report the bill.":$scope.governor += 3;
                  $scope.money += 3;
                      break;
                    }
              switch (localStorage['5c']){
                  case "Yes":$scope.respect += 3;
                  $scope.business += 3;
                      break;
                  case "No":$scope.district += 3;
                  $scope.campaign += 3;
                  $scope.money += 1;
                      break;
                    }
              switch (localStorage['5d']){
                  case "\"Sure, you are a team player and are confident you can win no matter what your district looks like.\"":$scope.respect += 3;
                      break;
                  case "You offer an alternative plan in which you lose Potsdale and parts of south Districtville but pick up a number of independent precincts in North Districtville.":$scope.respect += 2;
                  $scope.district += 3;
                  $scope.press += 2;
                  $scope.campaign += 2;
                      break;
                  case "You tell the Speaker \"absolutely not.\"  You have a special bond with the good voters of Potsdale and won't give them up without a fight.":$scope.district += 3;
                  $scope.campaign += 3;
                      break;
                    }
              switch (localStorage['6a']){
                  case "Say all representatives do constituent work and ask for contributions.":$scope.press += 3;
                  $scope.campaign += 3;
                      break;
                    }
              switch (localStorage['6b']){
                  case "Yes":$scope.money += 3;
                  $scope.business += 1;
                      break;
                  case "No":$scope.respect += 3;
                  $scope.press += 3;
                  $scope.ethics += 3;
                  $scope.money += 1;
                      break;
                    }
              switch (localStorage['6c']){
                  case "Joint fund-raiser with other Appropriations Committee members.":$scope.ethics += 3;
                  $scope.money += 2;
                      break;
                  case "Ask the NC school board association to organize the event for you.":$scope.money += 2;
                      break;
                  case "Hold a lobbyist fund-raiser at the prestigious Alta Club with yourself as special guest.":$scope.campaign += 3;
                  $scope.ethics += 3;
                  $scope.money += 3;
                      break;
                    }
              switch (localStorage['6d']){
                  case "Agree with him by vowing to serve only one more term and accept no more PAC money.":$scope.press += 2;
                  $scope.campaign += 3;
                  $scope.ethics += 1;
                  $scope.money += 3;
                      break;
                  case "Have your mother do a commercial for you saying how you were taught to hold on to a job.":$scope.campaign += 3;
                      break;
                  case "Double your effort, stressing your successes in the legislature.":$scope.respect += 3;
                  $scope.campaign += 3;
                      break;
                    }
                    // now calculate the effectiveness values for all the work organizer choices they made
              if (localStorage['work1a'] === "Visit plant gates next week thanking workers for their support.") {
                $scope.district += 3;
                $scope.campaign += 1;
              }
              if (localStorage['work1b'] ===  "Meet wtih influential lobbyists in Salt Lake City.") {
                $scope.respect += 3;
                $scope.money += 2;
              }
              if (localStorage['work1c'] ===  "Attend caucus retreat where you will discuss school reform issues including \"No Child Left Behind\" and \"Teacher Tenure.\"") {
                $scope.district += 3;
                $scope.press += 1;
              }
              if (localStorage['work1d'] ===  "Visit city halls introducing your constituent service plan.") {
                $scope.district += 3;
                $scope.campaign += 1;
              }
              if (localStorage['work2a'] ===  "Conduct research on the bills you are going to introduce.") {
                $scope.respect += 3;
              }
              if (localStorage['work2b'] ===  "Attend a PTA meeting in Suburbia to discuss \"No Child Left Behind.\"") {
                $scope.district += 3;
              }
              if (localStorage['work2c'] ===  "Pay attention to staff priorities and concerns.") {
                $scope.campaign += 1;
              }
              if (localStorage['work2d'] ===  "Visit Washington to discuss state budget problems with the congressional delegation.") {
                $scope.respect += 1;
                $scope.campaign += 1;
              }
              if (localStorage['work3a'] ===  "Take your family on a short vacation.") {
                $scope.family += 3;
              }
              if (localStorage['work3b'] ===  "Meet with the governor to review the bills you have introduced.") {
                $scope.respect += 3;
                $scope.governor += 3;
              }
              if (localStorage['work3c'] ===  "Send a questionnaire to your district.") {
                $scope.district += 3;
                $scope.campaign += 3;
              }
              if (localStorage['work3d'] ===  "Meet with lobbyists interested in education issues.") {
                $scope.respect += 3;
                $scope.district += 2;
                $scope.staff += 1;
              }
              if (localStorage['work4a'] ===  "Meet with staff about their concerns.") {
                $scope.campaign += 2;
                $scope.staff += 3;
              }
              if (localStorage['work4b'] ===  "Organize a hearing at University of Disttrictville to discuss tuition levels.") {
                $scope.district += 3;
                $scope.campaign += 1;
              }
              if (localStorage['work4c'] ===  "Send a \"franked\" mail to your district.") {
                $scope.district += 3;
              }
              if (localStorage['work4d'] ===  "Organize a fund-raiser.") {
                $scope.campaign += 3;
                $scope.money += 3;
              }
              if (localStorage['work5b'] ===  "Hold committee hearings throughout the state.") {
                $scope.respect += 3;
                $scope.press += 2;
                $scope.campaign += 1;
              }
              if (localStorage['work5c'] ===  "Hold a fund-raiser.") {
                $scope.campaign += 3;
                $scope.money += 3;
              }
              if (localStorage['work5d'] ===  "Meet with constituents.") {
                $scope.district += 3;
                $scope.campaign += 2;
              }
              if (localStorage['work6a'] ===  "Attend a Republican \"get out the vote\" rally on campus.") {
                $scope.district += 2;
                $scope.campaign += 2;
              }
              if (localStorage['work6b'] ===  "Go door to door in swing precincts.") {
                $scope.district += 1;
                $scope.campaign += 3;
              }
              if (localStorage['work6c'] ===  "Campaign with Governor Herbert in Republican neighborhoods.") {
                $scope.press += 2;
                $scope.campaign += 1;
                $scope.governor += 1;
              }
              if (localStorage['work6d'] ===  "Organize a fund-raiser for a last minute television blitz.") {
                $scope.campaign += 3;
                $scope.money += 3;
              }

              $scope.pct1 = $scope.family / 9;
              $scope.pct2 = $scope.respect / 62;
              $scope.pct3 = $scope.district / 75;
              $scope.pct4 = $scope.press / 50;
              $scope.pct5 = $scope.campaign / 61;
              $scope.pct6 = $scope.business / 27;
              $scope.pct7 = $scope.staff / 24;
              $scope.pct8 = $scope.governor / 32;
              $scope.pct9 = $scope.ethics / 10;
              $scope.pct10 = $scope.money / 38;

              $scope.overallScore = (3 * $scope.pct1) + (10 * $scope.pct2) + (40 * $scope.pct3)
               + (10 * $scope.pct4) + (10 * $scope.pct5) + (5 * $scope.pct6) + (3 * $scope.pct7)
                + (4 * $scope.pct8) + (5 * $scope.pct9) + (10 * $scope.pct10);

              console.log("overallScore is: " + $scope.overallScore);
              console.log("pct10 is: " + $scope.pct10);

              $scope.data = { // raw numbers must be divided by max possible values Sederburg set up for each category
                data: [
                  {
                    x: "Family",
                    y: [Math.trunc(($scope.family / 9) * 100)]
                  },
                  {
                    x: "Respect",
                    y: [Math.trunc(($scope.respect / 62) * 100)]
                  },
                  {
                    x: "District",
                    y: [Math.trunc(($scope.district / 75) * 100)]
                  },
                  /*{
                    x: "Press",
                    y: [$scope.press / 50]
                  },
                  {
                    x: "Campaign",
                    y: [$scope.campaign / 61]
                  },*/
                  {
                    x: "Business",
                    y: [Math.trunc(($scope.business / 27) * 100)]
                  },
                  {
                    x: "Staff",
                    y: [Math.trunc(($scope.staff / 24) * 100)]
                  },
                  /*{
                    x: "Governor",
                    y: [$scope.governor / 32]
                  },*/
                  {
                    x: "Ethics",
                    y: [Math.trunc(($scope.ethics / 10) * 100)]
                  },
                  /*{
                    x: "Money",
                    y: [$scope.money / 38]
                  }*/
              ]
          };
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

            case 'voteResults'://set model and view
                $scope.currentContInclude = {"url": "partials/voteResults.html"};
                var model = DataService.getModel('voteResults');
                model.get(function (content) {$scope.content = content.content;});
                break;

            case 'thankyou'://set model and view
                $scope.currentContInclude = {"url": "partials/thankyou.html"};
                var model = DataService.getModel('thankyou');
                model.get(function (content) {$scope.content = content.content;});
                break;

            case 'credits'://set model and view
                $scope.currentContInclude = {"url": "partials/credits.html"};
                var model = DataService.getModel('credits');
                model.get(function (content) {$scope.content = content.content;});
                break;


            //todo create vote case/model/bindings
            //todo create analysis case/model/bindings
            //todo create voteResults case/model/bindings
            //todo create thankyou case/model/bindings
            //todo create credits case/model/bindings

            default :
                console.log('stagectrl switch err');
        }

    //save answer and response on selection
    $scope.saveAnswer = function(entry, question, answer){
        localStorage[question] = entry;
        var response = question + 'Response';
        localStorage[response] = answer;
        checkSelected(question);
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
        checkSelected(question);
    }
    //remove checked value
    function removeValue(question, answer){
        var response;
        delete localStorage[question];
        response = question + 'Response';
        delete localStorage[response];
        checkSelected(question);
    }

    function checkSelected(question) {
      if(question.indexOf("work") != -1) {
        // we need 2 of the work response checkboxes checked
        if ($scope.checked === 2) {
          $rootScope.navDisabled = false;
        } else {
        $rootScope.navDisabled = true;
        }
      } else {
          $rootScope.navDisabled = false;
        }
    }

}]);
