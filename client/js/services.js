angular.module('services',['ngResource'])
    .factory('DataService', ['$resource', function($resource){
        return {
            //for getting .json files
            getModel: function(fileName){
                fileName = fileName + '.json';
                return $resource('models/:file',{file:fileName});
            },
            //for
            getWorkResponses: function(stageNumber){

                /*var questionNamea =  stageNumber+ "a";
                var questionNameb =  stageNumber+ "b";
                var questionNamec =  stageNumber+ "c";
                var questionNamed =  stageNumber+ "d";*/

                var answerNamea = "work" + stageNumber+ "a";
                var answerNameb = "work" + stageNumber+ "b";
                var answerNamec = "work" + stageNumber+ "c";
                var answerNamed = "work" + stageNumber+ "d";

                var responseNamea = "work" + stageNumber+ "aResponse";
                var responseNameb = "work" + stageNumber+ "bResponse";
                var responseNamec = "work" + stageNumber+ "cResponse";
                var responseNamed = "work" + stageNumber+ "dResponse";

                /*var questions = [questionNamea,questionNameb,questionNamec,questionNamed];*/
                var answers = [answerNamea,answerNameb,answerNamec,answerNamed];
                var responses = [responseNamea,responseNameb,responseNamec,responseNamed];

                var situations = [];

                for(var i=0;i < 4;i++){
                    if(localStorage[answers[i]]){
                        var situation = {};
                        /*situation.question = localStorage[questions[i]];*/
                        situation.activityChoosen = localStorage[answers[i]];
                        situation.response = localStorage[responses[i]];
                        situations.push(situation);
                    }
                }
                return situations;
            }
        }
    }]);
