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
	"postquestionnaire.html", 
	"BlockEnd.html",
	"ExperimentEnd"
];

psiTurk.preloadPages(pages);

var instructionPages = [ // add as a list as many pages as you like
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/instruct-ready.html"
];

/*** 
hello
***/ 


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
* RISK EXPERIMENT       *
********************/ 

var Block1 = function() { 

var RiskExperiment = function() {

	var wordon, // time word is presented
	    listening = false;

	// gambles for holt and laury
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
			["10/10 of $2.00 or 0/10 of $1.60 \u00A0 \u00A0 \u00A0 \u00A0 10/10 of $3.85 or 0/10 of $0.10", "10/10 of $2.00 or 0/10 of $1.60", "10/10 of $3.85 or 1/10 of $0.10"], 
		];
		

	//stims = _.shuffle(stims);

	var next = function() {
		if (stims.length===0) {
			psiTurk.showPage('BlockEnd.html');
			window.setInterval("Block2", 2000)
		}
		else {
			stim = stims.shift();
			show_word( stim[0]);
			wordon = new Date().getTime();
			listening = true;
			d3.select("#query").html('<p id="prompt">Type "B" for the gamble on the left, "M" for for the gamble on the right.</p>');
		}
	};
	
	var response_handler = function(e) {
		if (!listening) return;

		var keyCode = e.keyCode,
			response;

		switch (keyCode) {
			case 66:
				// "B"
				response="Gamble A";
				break;
			case 77:
				// "M"
				response="Gamble B";
				break;
			default:
				response = "";
				break;
		}
		if (response.length>0) {
			listening = false;
			var hit = response == stim[1];
			var rt = new Date().getTime() - wordon;

			psiTurk.recordTrialData({'phase':"TEST",
                                     'Gamble A':stim[1],
                                     'Gamble B':stim[2],
                                     'rt':rt}
                                   );
			remove_word();
			next();
		}
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

}; 

Block1();



