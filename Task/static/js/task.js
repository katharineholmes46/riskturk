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
	"Block1End.html", 
	"Block2End.html",
	"postquestionnaire.html",
	"HLExperimentEnd.html",
	"RLExperimentEnd.html", 
	"dInsturctions.html",
	"EBInstructions.html",
	"EBQuestionnaire.html",
	"RPQuestionnnaire.html",
	"RPInstructions.html",
	"RTInstructions.html",
	"RTQuestionnaire.html",
	"HLInstructions1.html",
	"HLInstructions2.html",
	"HLInstructions3.html",
	"fixation.html",
	"slow.html", 
	"nopoints.html", 
	"tenpoints.html",
	"fivepoints.html"
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
* RL Task       *

1: S1 + S2 x 20
2: S2 + S3 x 30 (risk trials) 
3: S2 + S4 x 20
4: S1 + S3 x 16
5: S3 + S4 x 16
6: Forced S1 x 12
7: Forced S2 x 14
8: Forced S3 x 12
9: Forced S4 x 12

********************/ 

var RiskExperiment = function() {

		var images = [ 
				"static/images/S1[].svg",
				"static/images/[]S1.svg",
				"static/images/S1[].svg",
				"static/images/[]S1.svg",
				"static/images/S1[].svg",
				"static/images/[]S1.svg",
				"static/images/S1[].svg",
				"static/images/[]S1.svg",
				"static/images/S1[].svg",
				"static/images/[]S1.svg",
				"static/images/S1[].svg",
				"static/images/[]S1.svg",
				"static/images/S2[].svg",
				"static/images/[]S2.svg",
				"static/images/S2[].svg",
				"static/images/[]S2.svg",
				"static/images/S2[].svg",
				"static/images/[]S2.svg",
				"static/images/S2[].svg",
				"static/images/[]S2.svg",
				"static/images/S2[].svg",
				"static/images/[]S2.svg",
				"static/images/S2[].svg",
				"static/images/[]S2.svg",
				"static/images/S2[].svg",
				"static/images/[]S2.svg",
				"static/images/S3[].svg",
				"static/images/[]S3.svg",
				"static/images/S3[].svg",
				"static/images/[]S3.svg",
				"static/images/S3[].svg",
				"static/images/[]S3.svg",
				"static/images/S3[].svg",
				"static/images/[]S3.svg",
				"static/images/S3[].svg",
				"static/images/[]S3.svg",
				"static/images/S3[].svg",
				"static/images/[]S3.svg",
				"static/images/S4[].svg",
				"static/images/[]S4.svg", 
				"static/images/S4[].svg",
				"static/images/[]S4.svg", 
				"static/images/S4[].svg",
				"static/images/[]S4.svg", 
				"static/images/S4[].svg",
				"static/images/[]S4.svg", 
				"static/images/S4[].svg",
				"static/images/[]S4.svg", 
				"static/images/S4[].svg",
				"static/images/[]S4.svg", 
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS3.svg", 
				"static/images/S3orS1.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S1orS3.svg",
				"static/images/S3orS1.svg",
				"static/images/S1orS3.svg",
				"static/images/S3orS1.svg",
				"static/images/S1orS3.svg",
				"static/images/S3orS1.svg",
				"static/images/S1orS3.svg",
				"static/images/S3orS1.svg",
				"static/images/S1orS3.svg",
				"static/images/S3orS1.svg",
				"static/images/S1orS3.svg",
				"static/images/S3orS1.svg",
				"static/images/S1orS3.svg",
				"static/images/S3orS1.svg",
				"static/images/S1orS3.svg",
				"static/images/S3orS1.svg",
				"static/images/S3orS4.svg",
				"static/images/S4orS3.svg",
				"static/images/S3orS4.svg",
				"static/images/S4orS3.svg",
				"static/images/S3orS4.svg",
				"static/images/S4orS3.svg",
				"static/images/S3orS4.svg",
				"static/images/S4orS3.svg",
				"static/images/S3orS4.svg",
				"static/images/S4orS3.svg",
				"static/images/S3orS4.svg",
				"static/images/S4orS3.svg",
				"static/images/S3orS4.svg",
				"static/images/S4orS3.svg",
				"static/images/S3orS4.svg",
				"static/images/S4orS3.svg"
				];

				psiTurk.preloadImages(images);

				images = _.shuffle(images);

	var wordon, // time word is presented
	    listening = false;

	// Stimuli for a basic Stroop experiment
	var stims = [
			[ "[]S1"],
			[ "S1[]"],
			[ "[]S1"],
			[ "S1[]"],
			[ "[]S1"],
			[ "S1[]"],
			[ "[]S1"],
			[ "S1[]"],
			[ "[]S1"],
			[ "S1[]"],
			[ "[]S1"],
			[ "S1[]"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S1 or S3"],
			[ "S3 or S1"],
			[ "S1 or S3"],
			[ "S3 or S1"],
			[ "S1 or S3"],
			[ "S3 or S1"],
			[ "S1 or S3"],
			[ "S3 or S1"],
			[ "S1 or S3"],
			[ "S3 or S1"],
			[ "S1 or S3"],
			[ "S3 or S1"],
			[ "S1 or S3"],
			[ "S3 or S1"],
			[ "S1 or S3"],
			[ "S3 or S1"],
			[ "S4 or S3"],
			[ "S3 or S4"],
			[ "S4 or S3"],
			[ "S3 or S4"],
			[ "S4 or S3"],
			[ "S3 or S4"],
			[ "S4 or S3"],
			[ "S3 or S4"],
			[ "S4 or S3"],
			[ "S3 or S4"],
			[ "S4 or S3"],
			[ "S3 or S4"],
			[ "S4 or S3"],
			[ "S3 or S4"],
			[ "S4 or S3"],
			[ "S3 or S4"],
			[ "S1 or S2"], 
			[ "S2 or S1"],
			[ "S1 or S2"], 
			[ "S2 or S1"],
			[ "S1 or S2"], 
			[ "S2 or S1"],
			[ "S1 or S2"], 
			[ "S2 or S1"],
			[ "S1 or S2"], 
			[ "S2 or S1"],
			[ "S1 or S2"], 
			[ "S2 or S1"],
			[ "S1 or S2"], 
			[ "S2 or S1"],
			[ "S1 or S2"], 
			[ "S2 or S1"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "[]S2"],
			[ "S2[]"],
			[ "[]S2"],
			[ "S2[]"],
			[ "[]S2"],
			[ "S2[]"],
			[ "[]S2"],
			[ "S2[]"],
			[ "[]S2"],
			[ "S2[]"],
			[ "[]S2"],
			[ "S2[]"],
			[ "[]S2"],
			[ "S2[]"],
			[ "[]S3"],
			[ "S3[]"],
			[ "[]S3"],
			[ "S3[]"],
			[ "[]S3"],
			[ "S3[]"],
			[ "[]S3"],
			[ "S3[]"],
			[ "[]S3"],
			[ "S3[]"],
			[ "[]S3"],
			[ "S3[]"],
			[ "[]S4"], 
			[ "S4[]"],
			[ "[]S4"], 
			[ "S4[]"],
			[ "[]S4"], 
			[ "S4[]"],
			[ "[]S4"], 
			[ "S4[]"],
			[ "[]S4"], 
			[ "S4[]"],
			[ "[]S4"], 
			[ "S4[]"]
		];

	
	
	stims = _.shuffle(stims);
	

	var next = function() {
		if (stims.length===0) {
				psiTurk.showPage('Block1End.html')
		} 
		else { 
			psiTurk.showPage('stage.html');
			stim = stims.shift();
			current_img = images.shift();
			$('#stim').html('<img src='+current_img+' height=600 width=800>');
			wordon = new Date().getTime();
			listening = true;
			d3.select("#query").html('<p id="prompt"></p>');
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
			case 66:
				// "N"
				response="The bandit on the left";
				break;
			default:
				response = "";
				break;
		}
		if (response.length>0) {
			listening = false;
			var rt = new Date().getTime() - wordon;

			psiTurk.recordTrialData({'phase':"TEST",
                                     'bandit':event.keyCode,
                                     'image':images[0], /* may have problem here - I don't know if the stims and images will align */ 
                                     'response':response,
                                     'rt':rt}
                                   );
			if (rt > 1500) { 
				remove_word(); 
				slow(); 
				setTimeout(fixstim, 500);	
			}
			else if (current_img=="static/images/S1[].svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						nopoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					nopoints(); 
					setTimeout(fixstim, 500); 
				}
			}
			else if (current_img=="static/images/[]S1.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						nopoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					nopoints(); 
					setTimeout(fixstim, 500); 
				}
			}
			else if (current_img=="static/images/[]S2.svg") { 
				if (event.keyCode = 77) {
						remove_word();
						Math.random(); 
							if (Math.random < 0.5) { 
								nopoints();
							} 
							else { 
								tenpoints(); 
							} 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					nopoints(); 
					setTimeout(fixstim, 500); 
				}
			}  
			else if (current_img=="static/images/S2[].svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						nopoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					Math.random(); 
						if (Math.random < .5) { 
							nopoints(); 
						}
						else { 
							tenpoints(); 
						} 
					setTimeout(fixstim, 500); 
				}
			}
			else if (current_img=="static/images/[]S3.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						fivepoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					nopoints(); 
					setTimeout(fixstim, 500); 
				}
			}
			else if (current_img=="static/images/S3[].svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						nopoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					fivepoints(); 
					setTimeout(fixstim, 500) 
				}
			}
			else if (current_img=="static/images/[]S4.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						tenpoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					nopoints(); 
					setTimeout(fixstim, 500) 
				}
			}
			else if (current_img=="static/images/S4[].svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						nopoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					tenpoints(); 
					setTimeout(fixstim, 500) 
				}
			}
			else if (current_img=="static/images/S1orS3.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						fivepoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					nopoints(); 
					setTimeout(fixstim, 500) 
				}
			}
			else if (current_img=="static/images/S3orS1.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						nopoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					fivepoints(); 
					setTimeout(fixstim, 500) 
				}
			}
			else if (current_img=="static/images/S1orS2.svg") { 
				if (event.keyCode = 77) {
						remove_word();
						Math.random(); 
							if (Math.random < 0.5) { 
								nopoints();
							} 
							else { 
								tenpoints(); 
							} 
						setTimeout(fixstim, 500);
				}
				else {
					remove_word(); 
					nopoints(); 
					setTimeout(fixstim, 500); 
				}
			}
			else if (current_img=="static/images/S2orS1.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						nopoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					Math.random(); 
						if (Math.random < 0.5) {
							nopoints(); 
						}
						else { 
							tenpoints(); 
						}
					setTimeout(fixstim, 500); 
				}
			} 
			else if (current_img=="static/images/S2orS3.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						fivepoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					Math.random(); 
						if (Math.random < 0.5) { 
							nopoints(); 
						}
						else { 
							tenpoints(); 
						} 
					setTimeout(fixstim, 500); 
				}
			}
			else if (current_img=="static/images/S3orS2.svg") { 
				if (event.keyCode = 77) {
						remove_word();
						Math.random(); 
							if (Math.random < 0.5)  { 
								nopoints(); 
							}
							else { 
								tenpoints(); 
							}
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					fivepoints(); 
					setTimeout(fixstim, 500);
				}
			}
			else if (current_img=="static/images/S2orS4.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						tenpoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					Math.random(); 
						if (Math.random < 0.5) { 
							nopoints(); 
						}
						else { 
							tenpoints(); 
						} 
					setTimeout(fixstim, 500);
				}
			}
			else if (current_img=="static/images/S4orS2.svg") { 
				if (event.keyCode = 77) {
						remove_word();
						Math.random() 
							if (Math.random < 0.5) { 
								nopoints(); 
							}
							else { 
								tenpoints(); 
							}
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					tenpoints(); 
					setTimeout(fixstim, 500) 
				}
			}
			else if (current_img=="static/images/S3orS4.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						tenpoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					fivepoints(); 
					setTimeout(fixstim, 500) 
				}
			}
			else if (current_img=="static/images/S4orS3.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						fivepoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					tenpoints(); 
					setTimeout(fixstim, 500) 
				}
			}
			else { 
				remove_word(); 
				fixstim(); 
			}
			
		}
	};



	var remove_word = function() {
		d3.select("#word").remove();
	};

	var fixation = function() { 
		psiTurk.showPage('fixation.html');
	};

	var fixstim = function() { 
		fixation(); 
		setTimeout(next, 500);
	};

	var slow = function() { 
		psiTurk.showPage('slow.html');
	};

	var nopoints = function() { 
		psiTurk.showPage('nopoints.html')
	}

	var tenpoints = function() { 
		psiTurk.showPage('tenpoints.html')
	} 

	var fivepoints = function() { 
		psiTurk.showPage('fivepoints.html')

	}


	
	// Load the stage.html snippet into the body of the page
	psiTurk.showPage('stage.html');

	// Register the response handler that is defined above to handle any
	// key down events.
	$("body").focus().keydown(response_handler); 

	// Start the test

	fixation(); 
	
	setTimeout(next, 500);

	
};

var RiskExperiment2 = function() {

		var images = [ 
				"static/images/S1[].svg",
				"static/images/[]S1.svg",
				"static/images/S1[].svg",
				"static/images/[]S1.svg",
				"static/images/S1[].svg",
				"static/images/[]S1.svg",
				"static/images/S1[].svg",
				"static/images/[]S1.svg",
				"static/images/S1[].svg",
				"static/images/[]S1.svg",
				"static/images/S1[].svg",
				"static/images/[]S1.svg",
				"static/images/S2[].svg",
				"static/images/[]S2.svg",
				"static/images/S2[].svg",
				"static/images/[]S2.svg",
				"static/images/S2[].svg",
				"static/images/[]S2.svg",
				"static/images/S2[].svg",
				"static/images/[]S2.svg",
				"static/images/S2[].svg",
				"static/images/[]S2.svg",
				"static/images/S2[].svg",
				"static/images/[]S2.svg",
				"static/images/S2[].svg",
				"static/images/[]S2.svg",
				"static/images/S3[].svg",
				"static/images/[]S3.svg",
				"static/images/S3[].svg",
				"static/images/[]S3.svg",
				"static/images/S3[].svg",
				"static/images/[]S3.svg",
				"static/images/S3[].svg",
				"static/images/[]S3.svg",
				"static/images/S3[].svg",
				"static/images/[]S3.svg",
				"static/images/S3[].svg",
				"static/images/[]S3.svg",
				"static/images/S4[].svg",
				"static/images/[]S4.svg", 
				"static/images/S4[].svg",
				"static/images/[]S4.svg", 
				"static/images/S4[].svg",
				"static/images/[]S4.svg", 
				"static/images/S4[].svg",
				"static/images/[]S4.svg", 
				"static/images/S4[].svg",
				"static/images/[]S4.svg", 
				"static/images/S4[].svg",
				"static/images/[]S4.svg", 
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS3.svg", 
				"static/images/S3orS1.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S1orS3.svg",
				"static/images/S3orS1.svg",
				"static/images/S1orS3.svg",
				"static/images/S3orS1.svg",
				"static/images/S1orS3.svg",
				"static/images/S3orS1.svg",
				"static/images/S1orS3.svg",
				"static/images/S3orS1.svg",
				"static/images/S1orS3.svg",
				"static/images/S3orS1.svg",
				"static/images/S1orS3.svg",
				"static/images/S3orS1.svg",
				"static/images/S1orS3.svg",
				"static/images/S3orS1.svg",
				"static/images/S1orS3.svg",
				"static/images/S3orS1.svg",
				"static/images/S3orS4.svg",
				"static/images/S4orS3.svg",
				"static/images/S3orS4.svg",
				"static/images/S4orS3.svg",
				"static/images/S3orS4.svg",
				"static/images/S4orS3.svg",
				"static/images/S3orS4.svg",
				"static/images/S4orS3.svg",
				"static/images/S3orS4.svg",
				"static/images/S4orS3.svg",
				"static/images/S3orS4.svg",
				"static/images/S4orS3.svg",
				"static/images/S3orS4.svg",
				"static/images/S4orS3.svg",
				"static/images/S3orS4.svg",
				"static/images/S4orS3.svg"
				];

				psiTurk.preloadImages(images);

				images = _.shuffle(images);

	var wordon, // time word is presented
	    listening = false;

	// Stimuli for a basic Stroop experiment
	var stims = [
			[ "[]S1"],
			[ "S1[]"],
			[ "[]S1"],
			[ "S1[]"],
			[ "[]S1"],
			[ "S1[]"],
			[ "[]S1"],
			[ "S1[]"],
			[ "[]S1"],
			[ "S1[]"],
			[ "[]S1"],
			[ "S1[]"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S1 or S3"],
			[ "S3 or S1"],
			[ "S1 or S3"],
			[ "S3 or S1"],
			[ "S1 or S3"],
			[ "S3 or S1"],
			[ "S1 or S3"],
			[ "S3 or S1"],
			[ "S1 or S3"],
			[ "S3 or S1"],
			[ "S1 or S3"],
			[ "S3 or S1"],
			[ "S1 or S3"],
			[ "S3 or S1"],
			[ "S1 or S3"],
			[ "S3 or S1"],
			[ "S4 or S3"],
			[ "S3 or S4"],
			[ "S4 or S3"],
			[ "S3 or S4"],
			[ "S4 or S3"],
			[ "S3 or S4"],
			[ "S4 or S3"],
			[ "S3 or S4"],
			[ "S4 or S3"],
			[ "S3 or S4"],
			[ "S4 or S3"],
			[ "S3 or S4"],
			[ "S4 or S3"],
			[ "S3 or S4"],
			[ "S4 or S3"],
			[ "S3 or S4"],
			[ "S1 or S2"], 
			[ "S2 or S1"],
			[ "S1 or S2"], 
			[ "S2 or S1"],
			[ "S1 or S2"], 
			[ "S2 or S1"],
			[ "S1 or S2"], 
			[ "S2 or S1"],
			[ "S1 or S2"], 
			[ "S2 or S1"],
			[ "S1 or S2"], 
			[ "S2 or S1"],
			[ "S1 or S2"], 
			[ "S2 or S1"],
			[ "S1 or S2"], 
			[ "S2 or S1"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "[]S2"],
			[ "S2[]"],
			[ "[]S2"],
			[ "S2[]"],
			[ "[]S2"],
			[ "S2[]"],
			[ "[]S2"],
			[ "S2[]"],
			[ "[]S2"],
			[ "S2[]"],
			[ "[]S2"],
			[ "S2[]"],
			[ "[]S2"],
			[ "S2[]"],
			[ "[]S3"],
			[ "S3[]"],
			[ "[]S3"],
			[ "S3[]"],
			[ "[]S3"],
			[ "S3[]"],
			[ "[]S3"],
			[ "S3[]"],
			[ "[]S3"],
			[ "S3[]"],
			[ "[]S3"],
			[ "S3[]"],
			[ "[]S4"], 
			[ "S4[]"],
			[ "[]S4"], 
			[ "S4[]"],
			[ "[]S4"], 
			[ "S4[]"],
			[ "[]S4"], 
			[ "S4[]"],
			[ "[]S4"], 
			[ "S4[]"],
			[ "[]S4"], 
			[ "S4[]"]
		];

	
	
	stims = _.shuffle(stims);
	

	var next = function() {
		if (stims.length===0) {
				psiTurk.showPage('Block2End.html')
		} 
		else { 
			psiTurk.showPage('stage.html');
			stim = stims.shift();
			current_img = images.shift();
			$('#stim').html('<img src='+current_img+' height=600 width=800>');
			wordon = new Date().getTime();
			listening = true;
			d3.select("#query").html('<p id="prompt"></p>');
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
			case 66:
				// "N"
				response="The bandit on the left";
				break;
			default:
				response = "";
				break;
		}
		if (response.length>0) {
			listening = false;
			var rt = new Date().getTime() - wordon;

			psiTurk.recordTrialData({'phase':"TEST",
                                     'bandit':event.keyCode,
                                     'image':images[0], /* may have problem here - I don't know if the stims and images will align */ 
                                     'response':response,
                                     'rt':rt}
                                   );
			if (rt > 1500) { 
				remove_word(); 
				slow(); 
				setTimeout(fixstim, 500);	
			}
			else if (current_img=="static/images/S1[].svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						nopoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					nopoints(); 
					setTimeout(fixstim, 500); 
				}
			}
			else if (current_img=="static/images/[]S1.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						nopoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					nopoints(); 
					setTimeout(fixstim, 500); 
				}
			}
			else if (current_img=="static/images/[]S2.svg") { 
				if (event.keyCode = 77) {
						remove_word();
						Math.random(); 
							if (Math.random < 0.5) { 
								nopoints();
							} 
							else { 
								tenpoints(); 
							} 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					nopoints(); 
					setTimeout(fixstim, 500); 
				}
			}  
			else if (current_img=="static/images/S2[].svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						nopoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					Math.random(); 
						if (Math.random < .5) { 
							nopoints(); 
						}
						else { 
							tenpoints(); 
						} 
					setTimeout(fixstim, 500); 
				}
			}
			else if (current_img=="static/images/[]S3.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						fivepoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					nopoints(); 
					setTimeout(fixstim, 500); 
				}
			}
			else if (current_img=="static/images/S3[].svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						nopoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					fivepoints(); 
					setTimeout(fixstim, 500) 
				}
			}
			else if (current_img=="static/images/[]S4.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						tenpoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					nopoints(); 
					setTimeout(fixstim, 500) 
				}
			}
			else if (current_img=="static/images/S4[].svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						nopoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					tenpoints(); 
					setTimeout(fixstim, 500) 
				}
			}
			else if (current_img=="static/images/S1orS3.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						fivepoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					nopoints(); 
					setTimeout(fixstim, 500) 
				}
			}
			else if (current_img=="static/images/S3orS1.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						nopoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					fivepoints(); 
					setTimeout(fixstim, 500) 
				}
			}
			else if (current_img=="static/images/S1orS2.svg") { 
				if (event.keyCode = 77) {
						remove_word();
						Math.random(); 
							if (Math.random < 0.5) { 
								nopoints();
							} 
							else { 
								tenpoints(); 
							} 
						setTimeout(fixstim, 500);
				}
				else {
					remove_word(); 
					nopoints(); 
					setTimeout(fixstim, 500); 
				}
			}
			else if (current_img=="static/images/S2orS1.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						nopoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					Math.random(); 
						if (Math.random < 0.5) {
							nopoints(); 
						}
						else { 
							tenpoints(); 
						}
					setTimeout(fixstim, 500); 
				}
			} 
			else if (current_img=="static/images/S2orS3.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						fivepoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					Math.random(); 
						if (Math.random < 0.5) { 
							nopoints(); 
						}
						else { 
							tenpoints(); 
						} 
					setTimeout(fixstim, 500); 
				}
			}
			else if (current_img=="static/images/S3orS2.svg") { 
				if (event.keyCode = 77) {
						remove_word();
						Math.random(); 
							if (Math.random < 0.5)  { 
								nopoints(); 
							}
							else { 
								tenpoints(); 
							}
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					fivepoints(); 
					setTimeout(fixstim, 500);
				}
			}
			else if (current_img=="static/images/S2orS4.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						tenpoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					Math.random(); 
						if (Math.random < 0.5) { 
							nopoints(); 
						}
						else { 
							tenpoints(); 
						} 
					setTimeout(fixstim, 500);
				}
			}
			else if (current_img=="static/images/S4orS2.svg") { 
				if (event.keyCode = 77) {
						remove_word();
						Math.random() 
							if (Math.random < 0.5) { 
								nopoints(); 
							}
							else { 
								tenpoints(); 
							}
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					tenpoints(); 
					setTimeout(fixstim, 500) 
				}
			}
			else if (current_img=="static/images/S3orS4.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						tenpoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					fivepoints(); 
					setTimeout(fixstim, 500) 
				}
			}
			else if (current_img=="static/images/S4orS3.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						fivepoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					tenpoints(); 
					setTimeout(fixstim, 500) 
				}
			}
			else { 
				remove_word(); 
				fixstim(); 
			}
			
		}
	};



	var remove_word = function() {
		d3.select("#word").remove();
	};

	var fixation = function() { 
		psiTurk.showPage('fixation.html');
	};

	var fixstim = function() { 
		fixation(); 
		setTimeout(next, 500);
	};

	var slow = function() { 
		psiTurk.showPage('slow.html');
	};

	var nopoints = function() { 
		psiTurk.showPage('nopoints.html')
	}

	var tenpoints = function() { 
		psiTurk.showPage('tenpoints.html')
	} 

	var fivepoints = function() { 
		psiTurk.showPage('fivepoints.html')

	}


	
	// Load the stage.html snippet into the body of the page
	psiTurk.showPage('stage.html');

	// Register the response handler that is defined above to handle any
	// key down events.
	$("body").focus().keydown(response_handler); 

	// Start the test

	fixation(); 
	
	setTimeout(next, 500);

	
};

var RiskExperiment3 = function() {

		var images = [ 
				"static/images/S1[].svg",
				"static/images/[]S1.svg",
				"static/images/S1[].svg",
				"static/images/[]S1.svg",
				"static/images/S1[].svg",
				"static/images/[]S1.svg",
				"static/images/S1[].svg",
				"static/images/[]S1.svg",
				"static/images/S1[].svg",
				"static/images/[]S1.svg",
				"static/images/S1[].svg",
				"static/images/[]S1.svg",
				"static/images/S2[].svg",
				"static/images/[]S2.svg",
				"static/images/S2[].svg",
				"static/images/[]S2.svg",
				"static/images/S2[].svg",
				"static/images/[]S2.svg",
				"static/images/S2[].svg",
				"static/images/[]S2.svg",
				"static/images/S2[].svg",
				"static/images/[]S2.svg",
				"static/images/S2[].svg",
				"static/images/[]S2.svg",
				"static/images/S2[].svg",
				"static/images/[]S2.svg",
				"static/images/S3[].svg",
				"static/images/[]S3.svg",
				"static/images/S3[].svg",
				"static/images/[]S3.svg",
				"static/images/S3[].svg",
				"static/images/[]S3.svg",
				"static/images/S3[].svg",
				"static/images/[]S3.svg",
				"static/images/S3[].svg",
				"static/images/[]S3.svg",
				"static/images/S3[].svg",
				"static/images/[]S3.svg",
				"static/images/S4[].svg",
				"static/images/[]S4.svg", 
				"static/images/S4[].svg",
				"static/images/[]S4.svg", 
				"static/images/S4[].svg",
				"static/images/[]S4.svg", 
				"static/images/S4[].svg",
				"static/images/[]S4.svg", 
				"static/images/S4[].svg",
				"static/images/[]S4.svg", 
				"static/images/S4[].svg",
				"static/images/[]S4.svg", 
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS2.svg", 
				"static/images/S2orS1.svg",
				"static/images/S1orS3.svg", 
				"static/images/S3orS1.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS3.svg", 
				"static/images/S3orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S2orS4.svg",
				"static/images/S4orS2.svg",
				"static/images/S1orS3.svg",
				"static/images/S3orS1.svg",
				"static/images/S1orS3.svg",
				"static/images/S3orS1.svg",
				"static/images/S1orS3.svg",
				"static/images/S3orS1.svg",
				"static/images/S1orS3.svg",
				"static/images/S3orS1.svg",
				"static/images/S1orS3.svg",
				"static/images/S3orS1.svg",
				"static/images/S1orS3.svg",
				"static/images/S3orS1.svg",
				"static/images/S1orS3.svg",
				"static/images/S3orS1.svg",
				"static/images/S1orS3.svg",
				"static/images/S3orS1.svg",
				"static/images/S3orS4.svg",
				"static/images/S4orS3.svg",
				"static/images/S3orS4.svg",
				"static/images/S4orS3.svg",
				"static/images/S3orS4.svg",
				"static/images/S4orS3.svg",
				"static/images/S3orS4.svg",
				"static/images/S4orS3.svg",
				"static/images/S3orS4.svg",
				"static/images/S4orS3.svg",
				"static/images/S3orS4.svg",
				"static/images/S4orS3.svg",
				"static/images/S3orS4.svg",
				"static/images/S4orS3.svg",
				"static/images/S3orS4.svg",
				"static/images/S4orS3.svg"
				];

				psiTurk.preloadImages(images);

				images = _.shuffle(images);

	var wordon, // time word is presented
	    listening = false;

	// Stimuli for a basic Stroop experiment
	var stims = [
			[ "[]S1"],
			[ "S1[]"],
			[ "[]S1"],
			[ "S1[]"],
			[ "[]S1"],
			[ "S1[]"],
			[ "[]S1"],
			[ "S1[]"],
			[ "[]S1"],
			[ "S1[]"],
			[ "[]S1"],
			[ "S1[]"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S2 or S3"],
			[ "S3 or S2"],
			[ "S1 or S3"],
			[ "S3 or S1"],
			[ "S1 or S3"],
			[ "S3 or S1"],
			[ "S1 or S3"],
			[ "S3 or S1"],
			[ "S1 or S3"],
			[ "S3 or S1"],
			[ "S1 or S3"],
			[ "S3 or S1"],
			[ "S1 or S3"],
			[ "S3 or S1"],
			[ "S1 or S3"],
			[ "S3 or S1"],
			[ "S1 or S3"],
			[ "S3 or S1"],
			[ "S4 or S3"],
			[ "S3 or S4"],
			[ "S4 or S3"],
			[ "S3 or S4"],
			[ "S4 or S3"],
			[ "S3 or S4"],
			[ "S4 or S3"],
			[ "S3 or S4"],
			[ "S4 or S3"],
			[ "S3 or S4"],
			[ "S4 or S3"],
			[ "S3 or S4"],
			[ "S4 or S3"],
			[ "S3 or S4"],
			[ "S4 or S3"],
			[ "S3 or S4"],
			[ "S1 or S2"], 
			[ "S2 or S1"],
			[ "S1 or S2"], 
			[ "S2 or S1"],
			[ "S1 or S2"], 
			[ "S2 or S1"],
			[ "S1 or S2"], 
			[ "S2 or S1"],
			[ "S1 or S2"], 
			[ "S2 or S1"],
			[ "S1 or S2"], 
			[ "S2 or S1"],
			[ "S1 or S2"], 
			[ "S2 or S1"],
			[ "S1 or S2"], 
			[ "S2 or S1"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "S2 or S4"],
			[ "S4 or S2"],
			[ "[]S2"],
			[ "S2[]"],
			[ "[]S2"],
			[ "S2[]"],
			[ "[]S2"],
			[ "S2[]"],
			[ "[]S2"],
			[ "S2[]"],
			[ "[]S2"],
			[ "S2[]"],
			[ "[]S2"],
			[ "S2[]"],
			[ "[]S2"],
			[ "S2[]"],
			[ "[]S3"],
			[ "S3[]"],
			[ "[]S3"],
			[ "S3[]"],
			[ "[]S3"],
			[ "S3[]"],
			[ "[]S3"],
			[ "S3[]"],
			[ "[]S3"],
			[ "S3[]"],
			[ "[]S3"],
			[ "S3[]"],
			[ "[]S4"], 
			[ "S4[]"],
			[ "[]S4"], 
			[ "S4[]"],
			[ "[]S4"], 
			[ "S4[]"],
			[ "[]S4"], 
			[ "S4[]"],
			[ "[]S4"], 
			[ "S4[]"],
			[ "[]S4"], 
			[ "S4[]"]
		];

	
	
	stims = _.shuffle(stims);
	

	var next = function() {
		if (stims.length===0) {
				psiTurk.showPage('RLExperimentEnd.html')
		} 
		else { 
			psiTurk.showPage('stage.html');
			stim = stims.shift();
			current_img = images.shift();
			$('#stim').html('<img src='+current_img+' height=600 width=800>');
			wordon = new Date().getTime();
			listening = true;
			d3.select("#query").html('<p id="prompt"></p>');
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
			case 66:
				// "N"
				response="The bandit on the left";
				break;
			default:
				response = "";
				break;
		}
		if (response.length>0) {
			listening = false;
			var rt = new Date().getTime() - wordon;

			psiTurk.recordTrialData({'phase':"TEST",
                                     'bandit':event.keyCode,
                                     'image':images[0], /* may have problem here - I don't know if the stims and images will align */ 
                                     'response':response,
                                     'rt':rt}
                                   );
			if (rt > 1500) { 
				remove_word(); 
				slow(); 
				setTimeout(fixstim, 500);	
			}
			else if (current_img=="static/images/S1[].svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						nopoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					nopoints(); 
					setTimeout(fixstim, 500); 
				}
			}
			else if (current_img=="static/images/[]S1.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						nopoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					nopoints(); 
					setTimeout(fixstim, 500); 
				}
			}
			else if (current_img=="static/images/[]S2.svg") { 
				if (event.keyCode = 77) {
						remove_word();
						Math.random(); 
							if (Math.random < 0.5) { 
								nopoints();
							} 
							else { 
								tenpoints(); 
							} 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					nopoints(); 
					setTimeout(fixstim, 500); 
				}
			}  
			else if (current_img=="static/images/S2[].svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						nopoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					Math.random(); 
						if (Math.random < .5) { 
							nopoints(); 
						}
						else { 
							tenpoints(); 
						} 
					setTimeout(fixstim, 500); 
				}
			}
			else if (current_img=="static/images/[]S3.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						fivepoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					nopoints(); 
					setTimeout(fixstim, 500); 
				}
			}
			else if (current_img=="static/images/S3[].svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						nopoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					fivepoints(); 
					setTimeout(fixstim, 500) 
				}
			}
			else if (current_img=="static/images/[]S4.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						tenpoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					nopoints(); 
					setTimeout(fixstim, 500) 
				}
			}
			else if (current_img=="static/images/S4[].svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						nopoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					tenpoints(); 
					setTimeout(fixstim, 500) 
				}
			}
			else if (current_img=="static/images/S1orS3.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						fivepoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					nopoints(); 
					setTimeout(fixstim, 500) 
				}
			}
			else if (current_img=="static/images/S3orS1.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						nopoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					fivepoints(); 
					setTimeout(fixstim, 500) 
				}
			}
			else if (current_img=="static/images/S1orS2.svg") { 
				if (event.keyCode = 77) {
						remove_word();
						Math.random(); 
							if (Math.random < 0.5) { 
								nopoints();
							} 
							else { 
								tenpoints(); 
							} 
						setTimeout(fixstim, 500);
				}
				else {
					remove_word(); 
					nopoints(); 
					setTimeout(fixstim, 500); 
				}
			}
			else if (current_img=="static/images/S2orS1.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						nopoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					Math.random(); 
						if (Math.random < 0.5) {
							nopoints(); 
						}
						else { 
							tenpoints(); 
						}
					setTimeout(fixstim, 500); 
				}
			} 
			else if (current_img=="static/images/S2orS3.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						fivepoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					Math.random(); 
						if (Math.random < 0.5) { 
							nopoints(); 
						}
						else { 
							tenpoints(); 
						} 
					setTimeout(fixstim, 500); 
				}
			}
			else if (current_img=="static/images/S3orS2.svg") { 
				if (event.keyCode = 77) {
						remove_word();
						Math.random(); 
							if (Math.random < 0.5)  { 
								nopoints(); 
							}
							else { 
								tenpoints(); 
							}
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					fivepoints(); 
					setTimeout(fixstim, 500);
				}
			}
			else if (current_img=="static/images/S2orS4.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						tenpoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					Math.random(); 
						if (Math.random < 0.5) { 
							nopoints(); 
						}
						else { 
							tenpoints(); 
						} 
					setTimeout(fixstim, 500);
				}
			}
			else if (current_img=="static/images/S4orS2.svg") { 
				if (event.keyCode = 77) {
						remove_word();
						Math.random() 
							if (Math.random < 0.5) { 
								nopoints(); 
							}
							else { 
								tenpoints(); 
							}
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					tenpoints(); 
					setTimeout(fixstim, 500) 
				}
			}
			else if (current_img=="static/images/S3orS4.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						tenpoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					fivepoints(); 
					setTimeout(fixstim, 500) 
				}
			}
			else if (current_img=="static/images/S4orS3.svg") { 
				if (event.keyCode = 77) {
						remove_word(); 
						fivepoints(); 
						setTimeout(fixstim, 500); 
				}
				else {
					remove_word(); 
					tenpoints(); 
					setTimeout(fixstim, 500) 
				}
			}
			else { 
				remove_word(); 
				fixstim(); 
			}
			
		}
	};



	var remove_word = function() {
		d3.select("#word").remove();
	};

	var fixation = function() { 
		psiTurk.showPage('fixation.html');
	};

	var fixstim = function() { 
		fixation(); 
		setTimeout(next, 500);
	};

	var slow = function() { 
		psiTurk.showPage('slow.html');
	};

	var nopoints = function() { 
		psiTurk.showPage('nopoints.html')
	}

	var tenpoints = function() { 
		psiTurk.showPage('tenpoints.html')
	} 

	var fivepoints = function() { 
		psiTurk.showPage('fivepoints.html')

	}


	
	// Load the stage.html snippet into the body of the page
	psiTurk.showPage('stage.html');

	// Register the response handler that is defined above to handle any
	// key down events.
	$("body").focus().keydown(response_handler); 

	// Start the test

	fixation(); 
	
	setTimeout(next, 500);

	
};

var HLInstructions2 = function() { 
	psiTurk.showPage('HLInstructions2.html');
};

var HLInstructions3 = function() { 
	psiTurk.showPage('HLInstructions3.html');
};

var HLRiskExperiment = function() {

	var wordon, // time word is presented
	    listening = false;

	// Stimuli for a basic Stroop experiment
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
			psiTurk.showPage('HLExperimentEnd.html');
			
		}
		else {
			stim = stims.shift();
			show_word( stim[0]);
			wordon = new Date().getTime();
			listening = true;
			d3.select("#query").html('<p id="prompt"></p>');
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
			.style("font-weight","400")
			.style("margin","20px")
			.style("margin-top","250px")
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



var dInsturctions = function() { 
	psiTurk.showPage('dInsturctions.html');
}; 

var EBInstructions = function() { 
	psiTurk.showPage('EBInstructions.html');
};

var RPInstructions = function() { 
	psiTurk.showPage('RPInstructions.html');
};

var RTInstructions = function() { 
	psiTurk.showPage('RTInstructions.html');
};



var EBQuestionnaire = function() {

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	record_responses = function() {

		psiTurk.recordTrialData({'phase':'EBQuestionnaire', 'status':'submit'});

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
	psiTurk.showPage('EBQuestionnaire.html');
	psiTurk.recordTrialData({'phase':'EBQuestionnaire', 'status':'begin'});
	
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

var RPQuestionnnaire = function() {

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	record_responses = function() {

		psiTurk.recordTrialData({'phase':'RPQuestionnnaire', 'status':'submit'});

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
	psiTurk.showPage('RPQuestionnnaire.html');
	psiTurk.recordTrialData({'phase':'RPQuestionnnaire', 'status':'begin'});
	
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

var RTQuestionnaire = function() {

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	record_responses = function() {

		psiTurk.recordTrialData({'phase':'RTQuestionnaire', 'status':'submit'});

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
	psiTurk.showPage('RTQuestionnaire.html');
	psiTurk.recordTrialData({'phase':'RTQuestionnaire', 'status':'begin'});
	
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

