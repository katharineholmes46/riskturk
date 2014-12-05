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
	"BlockEnd.html"
];

psiTurk.preloadPages(pages);

var instructionPages = [ // add as a list as many pages as you like
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/instruct-ready.html"
];

var images = [ 
	"static/images/S1.svg",
	"static/images/S2.svg",
	"static/images/S3.svg",
	"static/images/S4.svg", 
	"static/images/S1orS2.svg", 
	"static/images/S1orS3.svg", 
	"static/images/S2orS3.svg", 
	"static/images/S2orS4.svg",
	"static/images/S3orS4.svg"
	];

	psiTurk.preloadImages(images);

	images = _.shuffle(images);





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
* RL Task       *

1: S1 + S2 x 20
2: S2 + S3 x 30 (risk trials) 
3: S2 + S4 x 20
4: S1 + S3 x 15
5: S3 + S4 x 15
6: Forced S1 x 12
7: Forced S2 x 14
8: Forced S3 x 12
9: Forced S4 x 12

********************/ 

var RiskExperiment = function() {

	var wordon, // time word is presented
	    listening = false;

	// Stimuli for a basic Stroop experiment
	var stims = [
			[ "S1" ],
			[ "S2 or S3"],
			[ "S3 or S4"],
			[ "S1 or S3"],
			[ "S3 or S4"],
			[ "S1"],
			[ "S2"],
			[ "S3"],
			[ "S4"] 
		];

	stims = _.shuffle(stims);


	

	var next = function() {
		if (stims.length===0) {
			psiTurk.showPage('BlockEnd.html');
		}
		else {
			stim = stims.shift();
			current_img = images.shift();
			$('#stim').html('<img src='+current_img+' height=400 width=600>');
			wordon = new Date().getTime();
			listening = true;
			d3.select("#query").html('<p id="prompt">Type "N" for the bandit on the left and "M" for the bandit on the right.</p>');
			}
	};
	
	var response_handler = function(e) {
		if (!listening) return;

		var keyCode = e.keyCode,
			response;

		switch (keyCode) {
			case 77:
				// "M"
				response="The bandit on the right";
				break;
			case 78:
				// "N"
				response="The bandit on the left";
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
                                     'bandit':stim[0],
                                     'image':images[0], /* may have problem here - I don't know if the stims and images will align */ 
                                     'response':response,
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
			.style("font-size","150px")
			.style("font-weight","400")
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
