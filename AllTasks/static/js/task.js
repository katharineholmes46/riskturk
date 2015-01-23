/*
 * Requires:
 *     psiturk.js
 *     utils.js
 *     math.min.js
 */

// *** initalize psiturk object ***
var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

// *** task object to keep track of the current phase ***
var currentview;

// *** all pages to be loaded ***
var pages = [
	"instructions/welcome.html",
	"instructions/RL_1.html",
	"instructions/RL_2.html",
	"instructions/RL_3.html",
	"instructions/HL_1.html",
	"instructions/HL_2.html",
	"instructions/HL_3.html",
	"stage.html",
	"postquestionnaire.html",
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
	"fixation.html",
	"slow.html", 
	"nopoints.html", 
	"tenpoints.html",
	"fivepoints.html"
];

psiTurk.preloadPages(pages);


// *** instructions ***

// start 
var instructionsWelcome = [ 
	"instructions/welcome.html"
];

// RL task
var instructionsRL_pretrain = [ 
	"instructions/RL_1.html",
	"instructions/RL_2.html"
];

var instructionsRL_pretest = [ 
	"instructions/RL_3.html"
];

// holt and laury
var instructionsHL = [ 
	"instructions/HL_1.html",
	"instructions/HL_2.html",
	"instructions/HL_3.html"
];

// DOSPERT
var instructionsDOSPERT = [ 
	"instructions/RL_1.html"
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
4: S1 + S3 x 15
5: S3 + S4 x 15
6: Forced S1 x 12
7: Forced S2 x 14
8: Forced S3 x 12
9: Forced S4 x 12

Total: 150

********************/ 

var RiskRL = function() {

	// *** define timing parameters (in miliseconds) ***

	iti_bounds = [1000,2000];
	outcome_time = 500;
	time_out = 1500;



	// *** define trialtypes *** 

	// training
	var tt_train_forced = [8, 9, 7, 6, 9, 7, 6, 8, 9, 6, 7, 8, 7, 6, 9, 8];
	var tt_train_choice = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
	tt_train_choice = shuffle(tt_train_choice);
	tt_train = tt_train_forced.concat(tt_train_choice);

	// test
	var tt_test_1 = repeatelem(1,20);
	var tt_test_2 = repeatelem(2,30);
	var tt_test_3 = repeatelem(3,20);
	var tt_test_4 = repeatelem(4,15);
	var tt_test_5 = repeatelem(5,15);
	var tt_test_6 = repeatelem(6,12);
	var tt_test_7 = repeatelem(7,14);
	var tt_test_8 = repeatelem(8,12);
	var tt_test_9 = repeatelem(9,12);
	var tt_test = tt_test_1.concat(tt_test_2 ,tt_test_3 ,tt_test_4 ,tt_test_5,tt_test_6,tt_test_7,tt_test_8,tt_test_9);
	tt_test = shuffle(tt_test);

	// all 
	trial_types = tt_train.concat(tt_test);


	// trial variables 
	trial = 0; // initializes the trial counter
	nTrialsTrain = tt_train.length; 
	nTrialsTest = tt_test.length; 
	nTrials = nTrialsTrain + nTrialsTest; 



	// *** load graphics *** 

	// individual pictures
	images = [ 
			"static/images/S1.svg",
			"static/images/S2.svg",
			"static/images/S3.svg",
			"static/images/S4.svg"
			];

	// feedback
	feedback = [ 
			"static/images/0points.svg",
			"static/images/5points.svg",
			"static/images/10points.svg"
			];

	// other 		
	otherstims = [ 
			"static/images/fixation.svg",
			"static/images/tooslow.svg",
			"static/images/wrongside.svg",
			"static/images/blank.svg"
			];

	// preload		
	psiTurk.preloadImages(images);
	psiTurk.preloadImages(feedback);
	psiTurk.preloadImages(otherstims);

	// shuffle order of pictures 
	images = shuffle(images);


	// *** advance to a new trial ***
	var setup_newTrial = function(){
        
        if (trial <= nTrials) {
    		trial += 1; // advance counter
        		trialtype = trial_types[trial];
        		displayStims(trialtype);
        	}
        else {
        	trial = 0;
        	psiTurk.showPage("instructions/RL_3.html"); 
        }

    }


    // *** display stimuli ***
	var displayStims = function(trialtype) {

		// shuffle position
		stimPos = [1,2];
		stimPos = _.shuffle(stimPos);

		console.log(trialtype); // for debugging

		psiTurk.showPage('stage.html');
		
		switch(trialtype) {

			case 1: // S1 + S2
    			var current_img1 = images[0];
    			var current_img2 = images[1];
    			break;

    		case 2: // S2 + S3
    			var current_img1 = images[1];
    			var current_img2 = images[2];
    			break;

    		case 3: // S2 + S4
    			var current_img1 = images[1];
    			var current_img2 = images[3];
    			break;

    		case 4: // S1 + S3
    			var current_img1 = images[0];
    			var current_img2 = images[2];
    			break;

    		case 5: // S3 + S4
    			var current_img1 = images[2];
    			var current_img2 = images[3];
    			break;

			case 6: // forced S1
    			var current_img1 = images[0];
    			var current_img2 = otherstims[3];
    			break;
			
			case 7: // forced S2
    			var current_img1 = images[1];
    			var current_img2 = otherstims[3];
    			break;

    		case 8: // forced S3
    			var current_img1 = images[2];
    			var current_img2 = otherstims[3];
    			break;

    		case 9: // forced S4
    			var current_img1 = images[3];
    			var current_img2 = otherstims[3];
    			break;
    	}

    	if (stimPos[0] === 1) {
    		$("#stim_left").attr("src",current_img1);
    		$("#stim_right").attr("src",current_img2);
		}
		else {
			$("#stim_right").attr("src",current_img1);
    		$("#stim_left").attr("src",current_img2);
		}

		stimOn = new Date().getTime();
		listening = true;

		// register the response and show feedback
		$("body").focus().keydown(response_handler);

	}; // end displayStims



	// *** response handler ***
	var response_handler = function(e) {

		console.log(trialtype); // for debugging 

		if (!listening) return;

		var keyCode = e.keyCode;
		// 66 = "B", subject picked left 
		// 77 = "M", subject picked right

		switch(trialtype) 
		{	
				case 1:
					if (stimPos[0] == 1)
					{
						if (keyCode == 66) {response = "S1";}
						else {response = "S2";}
					}
					else 
					{
						if (keyCode == 66) {response = "S2";}
						else {response = "S1";}
					}
					break

				case 2:
					if (stimPos[0] == 1)
					{
						if (keyCode == 66) {response = "S2";}
						else {response = "S3";}
					}
					else 
					{
						if (keyCode == 66) {response = "S3";}
						else {response = "S2";}
					}
					break

				case 3:
					if (stimPos[0] == 1)
					{
						if (keyCode == 66) {response = "S2";}
						else {response = "S4";}
					}
					else 
					{
						if (keyCode == 66) {response = "S4";}
						else {response = "S2";}
					}
					break

				case 4:
					if (stimPos[0] == 1)
					{
						if (keyCode == 66) {response = "S1";}
						else {response = "S3";}
					}
					else 
					{
						if (keyCode == 66) {response = "S3";}
						else {response = "S1";}
					}
					break
				
				case 5:
					if (stimPos[0] == 1)
					{
						if (keyCode == 66) {response = "S3";}
						else {response = "S4";}
					}
					else 
					{
						if (keyCode == 66) {response = "S4";}
						else {response = "S3";}
					}
					break				

				case 6:

					if (stimPos[0] == 1 && keyCode == 66) {response = "S1";}
					else if (stimPos[0] == 2 && keyCode == 77) {response = "S1";}
					else {response = "wrongside";}
	    			break;
				
				case 7:

	    			if (stimPos[0] == 1 && keyCode == 66) {response = "S2";}
					else if (stimPos[0] == 2 && keyCode == 77){response = "S2";}
					else {response = "wrongside";}
	    			break;

	    		case 8:

	    			if (stimPos[0] == 1 && keyCode == 66) {response = "S3";}
					else if (stimPos[0] == 2 && keyCode == 77)
					{response = "S3";}
					else {response = "wrongside";}
	    			break;

	    		case 9:

	    			if (stimPos[0] == 1 && keyCode == 66) {response = "S4";}
					else if (stimPos[0] == 2 && keyCode == 77) {response = "S4";}
					else {response = "wrongside";}
	    			break;
	    }

	    // does not handle the case in which participants don't respond at all
		if (response.length>0) 
		{	
			listening = false;

			var rt = new Date().getTime() - stimOn;
			
			// record data
			psiTurk.recordTrialData({'response':response,
	                                 'rt':rt}
	                               );
			
			if (rt > time_out) // show slow screen
			{ 
				$('#stim').html('<img src='+otherstims[1]+' height=200 width=200 align=center>');
				setTimeout(fixstim, outcome_time);	
			}
			else // show feedback
				show_feedback(response);

		}

	}; // end response_handler


	// *** show fixation ***

	var fixstim = function() { 
		var iti = getRandomArbitrary(iti_bounds[0],iti_bounds[1]);
		$('#stim').html('<img src='+otherstims[0]+' height=200 width=200 align=center>');
		setTimeout(setup_newTrial, iti); // wait iti 
	};



	// *** show feedback ***

	var show_feedback = function(response) {

		switch (response)
			{
				case "S1":

					$('#stim').html('<img src='+feedback[0]+' height=200 width=200 align=center>');
					setTimeout(fixstim, outcome_time); 
					break;

				case "S2":

					var hlp_rand = Math.random();
					if (hlp_rand < 0.5)
					{
						
						$('#stim').html('<img src='+feedback[0]+' height=200 width=200 align=center>');
						setTimeout(fixstim, outcome_time); 
					}
					else
					{
						
						setTimeout(fixstim, outcome_time); 
						$('#stim').html('<img src='+feedback[2]+' height=200 width=200 align=center>');
					}
					break;

				case "S3":

					$('#stim').html('<img src='+feedback[1]+' height=200 width=200 align=center>');
					setTimeout(fixstim, outcome_time); 
					break;

				case "S4":

					$('#stim').html('<img src='+feedback[2]+' height=200 width=200 align=center>');
					setTimeout(fixstim, outcome_time); 
					break;

				case "wrongside":
					$('#stim').html('<img src='+otherstims[2]+' height=200 width=200 align=center>');
					setTimeout(fixstim, outcome_time); 
					break;

			}	

	} // end show_feedback



// *** start task ***
	
psiTurk.showPage('stage.html'); // load stage
$('#stim').html('<img src='+otherstims[0]+' height=200 width=200 align=center>');
setTimeout(console.log("starting experiment..."), 500)
setup_newTrial();

}; // end RiskExperiment


/********************
* Holt and Laury    *
********************/ 

var RiskHL = function() {

	var wordon, // time word is presented
	    listening = false;

	// *** gambles ***
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

	console.log(stims)

	var next = function() {

		console.log(stims.length)

		if (stims.length===0) {
			psiTurk.showPage('HLExperimentEnd.html');
			
		}
		else {

			console.log("here")

			stim = stims.shift();

			console.log(stim[0])

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

			psiTurk.recordTrialData({'Gamble A':stim[1],
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
	psiTurk.showPage('HLExperimentEnd.html');

	// Register the response handler that is defined above to handle any
	// key down events.
	$("body").focus().keydown(response_handler); 

	// Start the test
	next();

}; // end HLRiskExperiment


/********************
* DOSPERT           *
********************/

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
    
	
}; // end RTQuestionnaire




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
    
	
}; // end RPQuestionnaire



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
    
	
}; // end RTQuestionnaire



/***********************
 * Run full experiment *
 **********************/

$(window).load( function(){
psiTurk.doInstructions(instructionsRL_pretrain, // a list of pages you want to display in sequence
	function() { currentview = new RiskRL(); } // what you want to do when you are done with instructions
);


});

