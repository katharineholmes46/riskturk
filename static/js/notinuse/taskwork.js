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
	"gameend.html",
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
* STROOP TEST       *
********************/
var RiskExperiment = function() { 


	
	var wordon, // time word is presented
	    listening = false;

	// Stimuli for Risk experiment
	var stims = [
			["1/10 of $2.00 or 9/10 of $1.60 \u00A0 \u00A0 \u00A0 \u00A0 1/10 of $3.85 or 9/10 of $0.10", "1/10 of $2.00 or 9/10 of $1.60", "1/10 of $3.85 or 9/10 of $0.10"],
			["2/10 of $2.00 or 8/10 of $1.60 \u00A0 \u00A0 \u00A0 \u00A0 2/10 of $3.85 or 8/10 of $0.10", "2/10 of $2.00 or 8/10 of $1.60", "2/10 of $3.85 or 8/10 of $0.10"],
			["3/10 of $2.00 or 7/10 of $1.60 \u00A0 \u00A0 \u00A0 \u00A0 3/10 of $3.85 or 7/10 of $0.10", "3/10 of $2.00 or 7/10 of $1.60", "3/10 of $3.85 or 7/10 of $0.10"],
			["4/10 of $2.00 or 6/10 of $1.60 \u00A0 \u00A0 \u00A0 \u00A0 4/10 of $3.85 or 6/10 of $0.10", "4/10 of $2.00 or 6/10 of $1.60", "4/10 of $3.85 or 6/10 of $0.10"],
			["5/10 of $2.00 or 5/10 of $1.60 \u00A0 \u00A0 \u00A0 \u00A0 5/10 of $3.85 or 5/10 of $0.10", "5/10 of $2.00 or 5/10 of $1.60", "5/10 of $3.85 or 5/10 of $0.10"],
			["6/10 of $2.00 or 4/10 of $1.60 \u00A0 \u00A0 \u00A0 \u00A0 6/10 of $3.85 or 4/10 of $0.10", "6/10 of $2.00 or 4/10 of $1.60", "6/10 of $3.85 or 4/10 of $0.10"],
			["7/10 of $2.00 or 3/10 of $1.60 \u00A0 \u00A0 \u00A0 \u00A0 7/10 of $3.85 or 3/10 of $0.10", "7/10 of $2.00 or 3/10 of $1.60", "7/10 of $3.85 or 3/10 of $0.10"],
			["8/10 of $2.00 or 2/10 of $1.60 \u00A0 \u00A0 \u00A0 \u00A0 8/10 of $3.85 or 2/10 of $0.10", "8/10 of $2.00 or 2/10 of $1.60", "8/10 of $3.85 or 2/10 of $0.10"],
			["9/10 of $2.00 or 1/10 of $1.60 \u00A0 \u00A0 \u00A0 \u00A0 9/10 of $3.85 or 1/10 of $0.10", "9/10 of $2.00 or 1/10 of $1.60", "9/10 of $3.85 or 1/10 of $0.10"], 
			["10/10 of $2.00 or 0/10 of $1.60 \u00A0 \u00A0 \u00A0 \u00A0 10/10 of $3.85 or 0/10 of $0.10", "10/10 of $2.00 or 0/10 of $1.60", "10/10 of $3.85 or 1/10 of $0.10"]
		];

	stims = _.shuffle(stims);

	var next = function() {
		if (stims.length===0) {
			finish();
		}
		else {
			stim = stims.shift();
			show_word( stim[0], stim[1] );
			wordon = new Date().getTime();
			listening = true;
			d3.select("#query").html('<p id="prompt">Type "R" for Red, "B" for blue, "G" for green.</p>');
		}
	};
	
	var response_handler = function(e) {
		if (!listening) return;

		var keyCode = e.keyCode,
			response;

		switch (keyCode) {
			case 65:
				// "A"
				response="Gamble A";
				break;
			case 66:
				// "B"
				response="Gamble B";
				break;
			default:
				response = "";
				break;
		}
		if (response.length>0) {
			listening = false;
			var rt = new Date().getTime() - wordon;

			psiTurk.recordTrialData({'phase':"TEST",
                                     'Gamble A':stim[1],
                                     'Gamble B':stim[2],
                                     'response':response,
                                     'rt':rt}
                                   );
			remove_word();
			next();
		}
	};

	var finish = function() {
	    $("body").unbind("keydown", response_handler); // Unbind keys
	    currentview = new Questionnaire();
	};
	
	var show_word = function(text, color) {
		d3.select("#stim")
			.append("div")
			.attr("id","word")
			.style("color",color)
			.style("text-align","center")
			.style("font-size","25px")
			.style("font-weight","200")
			.style("margin","20px")
			.text(text);

	};

	var remove_word = function() {
		d3.select("#word").remove();
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
* Game End *
****************/

ar GameEnd = function() {

	var response_handler2 = function(e) {

		$("body").unbind("keydown", response_handler2); // Unbind keys
	    currentview = new TestPhase();
	};


	psiTurk.showPage('gameend.html');
	$("body").focus().keydown(response_handler2); 
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
