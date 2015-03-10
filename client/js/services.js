angular.module('services',['ngResource'])
    .factory('DataService', ['$resource', function($resource){
        return {
            getModel: function(fileName){
                fileName = fileName + '.json';
                return $resource('client/models/:file',{file:fileName});
            },
            getWorkResponses: function(stageNumber){

                var questionNamea =  stageNumber+ "a";
                var questionNameb =  stageNumber+ "b";
                var questionNamec =  stageNumber+ "c";
                var questionNamed =  stageNumber+ "d";

                var answerNamea = "work" + stageNumber+ "a";
                var answerNameb = "work" + stageNumber+ "b";
                var answerNamec = "work" + stageNumber+ "c";
                var answerNamed = "work" + stageNumber+ "d";

                var responseNamea = "work" + stageNumber+ "aResponse";
                var responseNameb = "work" + stageNumber+ "bResponse";
                var responseNamec = "work" + stageNumber+ "cResponse";
                var responseNamed = "work" + stageNumber+ "dResponse";


                var questions = [questionNamea,questionNameb,questionNamec,questionNamed];
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


                /*[
                    {
                        "activityChosen":"what ever you chose",
                        "response":"The response",
                        "question":"Visit city halls introducing your constituent service plan.", "response":"Lobbyists enjoyed your company.  Three lobbyists said their PACs could contribute $5,000 to your campaign."
                    },
                    {
                        "activityChosen":"what ever you chose",
                        "response":"The response",
                        "question":"Visit city halls introducing your constituent service plan.", "response":"Lobbyists enjoyed your company.  Three lobbyists said their PACs could contribute $5,000 to your campaign."
                    }
                ]*/
            }
        }
    }]);