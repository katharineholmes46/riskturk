/*
 * Requires:
 *     psiturk.js
 *     utils.js
 */

// Initalize psiturk object
var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

var mycondition = condition;  // these two variables are passed by the psiturk server process
var mycounterbalance = counterbalance;  // they tell you which condition you have been assigned to
// they are not used in the stroop code but may be useful to you

// All pages to be loaded
var pages = [
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/instruct-ready.html",
	"stage.html",
	"postquestionnaire.html"
];

psiTurk.preloadPages(pages);

var instructionPages = [ // add as a list as many pages as you like
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/instruct-ready.html"
];


/********************
* HTML manipulation
*
* All HTML files in the templates directory are requested 
* from the server when the PsiTurk object is created above. We
* need code to get those pages from the PsiTurk object and 
* insert them into the document.
*
********************/

/********************
* Risk Experiment       *
********************/
var RiskExperiment = function() {


	// Stimuli for a H+L experiment block 
	var stims = [
			["1/10 of $200, 9/10 of $1.60", "1/10 of $3.85, 9/10 $0.10"],
			["2/10 of $200, 8/10 of $1.60", "2/10 of $3.85, 8/10 $0.10"],
			["3/10 of $200, 7/10 of $1.60", "3/10 of $3.85, 7/10 $0.10"],
			["4/10 of $200, 6/10 of $1.60", "4/10 of $3.85, 6/10 $0.10"],
			["5/10 of $200, 5/10 of $1.60", "5/10 of $3.85, 5/10 $0.10"],
			["6/10 of $200, 4/10 of $1.60", "6/10 of $3.85, 4/10 $0.10"],
			["7/10 of $200, 3/10 of $1.60", "7/10 of $3.85, 3/10 $0.10"],
			["8/10 of $200, 2/10 of $1.60", "8/10 of $3.85, 2/10 $0.10"],
			["9/10 of $200, 1/10 of $1.60", "9/10 of $3.85, 1/10 $0.10"],
			["10/10 of $200, 0/10 of $1.60", "10/10 of $3.85, 0/10 $0.10"],
		];

	stims = _.shuffle(stims);

	var next = function() {
		if (stims.length===0) {
			finish();
		}
		else {
			show_gamble(stim[0], stim[1]);
			d3.select("#query").html('<p id="prompt">Type "L" if you prefer the gamble on the left or "R" if you prefer the gamble on the right .</p>');
		}
	};
	
	var response_handler = function(e) {

		var keyCode = e.keyCode,
			response;

		switch (keyCode) {
			case 76:
				// "L"
				response="A";
				break;
			case 82:
				// "R"
				response="B";
				break;
			default:
				response = "";
				break;
		}
		if (response.length>0) {

			psiTurk.recordTrialData({'phase':"TEST",
                                     'gamble':stim[0], stim[1],
                                     'response':response}
                                   );
			remove_gamble();
			next();
		}
	};

	var finish = function() {
	    $("body").unbind("keydown", response_handler); // Unbind keys
	    currentview = new Questionnaire();
	};
	
	var show_gamble = function(text, color) {
		d3.select("#stim")
			.append("div")
			.attr("id","word")
			.style("color",color)
			.style("text-align","center")
			.style("font-size","150px")
			.style("font-weight","400")
			.style("margin","20px")
			.text(text);
	};

	var remove_gamble = function() {
		d3.select("#gmable").remove();
	};

	
	// Load the stage.html snippet into the body of the page
	psiTurk.showPage('stage.html');

	// Register the response handler that is defined above to handle any
	// key down events.
	$("body").focus().keydown(response_handler); 

	// Start the test
	next();
};


/****************
* Questionnaire *
****************/

var Questionnaire = function() {

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	record_responses = function() {

		psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'submit'});

		$('textarea').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('select').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);		
		});

	};

	prompt_resubmit = function() {
		replaceBody(error_message);
		$("#resubmit").click(resubmit);
	};

	resubmit = function() {
		replaceBody("<h1>Trying to resubmit...</h1>");
		reprompt = setTimeout(prompt_resubmit, 10000);
		
		psiTurk.saveData({
			success: function() {
			    clearInterval(reprompt); 
                psiTurk.computeBonus('compute_bonus', function(){finish()}); 
			}, 
			error: prompt_resubmit
		});
	};

	// Load the questionnaire snippet 
	psiTurk.showPage('postquestionnaire.html');
	psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'begin'});
	
	$("#next").click(function () {
	    record_responses();
	    psiTurk.saveData({
            success: function(){
                psiTurk.computeBonus('compute_bonus', function() { 
                	psiTurk.completeHIT(); // when finished saving compute bonus, the quit
                }); 
            }, 
            error: prompt_resubmit});
	});
    
	
};

// Task object to keep track of the current phase
var currentview;

/*******************
 * Run Task
 ******************/
$(window).load( function(){
    psiTurk.doInstructions(
    	instructionPages, // a list of pages you want to display in sequence
    	function() { currentview = new RiskExperiment(); } // what you want to do when you are done with instructions
    );
});
