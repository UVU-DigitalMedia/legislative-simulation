// spec.js
describe('Legislative Simulation App', function() {

    var startButton = element(by.css('.startButton'));
    var nextButton = element(by.css('.nextButton'));
    //Get choices for decisions radios
    var decisionsRadios = element.all(by.repeater('answer in content.body.answers'));
    //Get decisionsRadios for workOrg checks
    var workOrgChecks = element.all(by.repeater('situation in content.body.situations').column('situation.entry'));
    //Get response divs to check the answers
    var responseDivs = element.all(by.repeater('question in content.body.questions').column('question.choice'));
    //Get work response divs to check answers
    var workResponseDivs = element.all(by.repeater('situation in content.body.situations').column('situation.activityChoosen'));

    beforeEach(function() {
        browser.get('http://localhost:9090');
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('Legislative Simulation');
    });

    it('should do stuff', function () {
        startButton.click();
        nextButton.click();
        nextButton.click();
        nextButton.click();

        //decisions/1a
        decisionsRadios.first().click();

        //decisions/1b
        nextButton.click();
        decisionsRadios.first().click();

        //decisions/1c
        nextButton.click();
        decisionsRadios.first().click();

        //decisions/1d
        nextButton.click();
        decisionsRadios.first().click();

        //workOrginizer/1
        nextButton.click();
        workOrgChecks.first().click();
        workOrgChecks.last().click();

        //now we are now at the first results page
        nextButton.click();

        expect(responseDivs.get(0).getText()).toContain('Your Answer: Paula Martinez');
        expect(responseDivs.get(1).getText()).toContain('Your Answer: yes');
        expect(responseDivs.get(2).getText()).toContain('Your Answer: Ralph Jenkins');
        expect(responseDivs.get(3).getText()).toContain('Your Answer: Peterson for Speaker (Rep.)');

        //now we are now at the second results page
        nextButton.click();

        expect(workResponseDivs.get(0).getText()).toContain('Your chosen action: Visit plant gates next week thanking workers for their support.');
        expect(workResponseDivs.get(1).getText()).toContain('Your chosen action: Visit city halls introducing your constituent service plan.');

    })

});
