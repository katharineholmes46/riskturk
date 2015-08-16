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

var RLTask = function() { 

// *** all pages to be loaded ***
var pages = [
	"instructions/RL_1.html",
	"instructions/RL_2.html",
	"instructions/RL_3.html",
	"RLstage.html",
	"RLpostquestionnaire.html",
	"fixation.html",
	"slow.html", 
	"nopoints.html", 
	"tenpoints.html",
	"fivepoints.html",
	"complete.html",
	"earlyfinish.html"
];

psiTurk.preloadPages(pages);


// *** instructions ***

var instructions = [ 
	"instructions/RL_1.html",
	"instructions/RL_2.html",
	"instructions/RL_3.html"
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

	iti_bounds = [1000,2000]; // iti is uniform between these 
	outcome_time = 500; 
	time_out = 1500; 
	miss_thresh = 10; // quit after this many missed trials 
	close_out = 10000; // quit if any of the rt's are this long


	// *** define trialtypes *** 

	// training
	var tt_train_forced = [8, 9, 7, 6, 9, 7, 6, 8, 9, 6, 7, 8, 7, 6, 9, 8];
	var tt_train_choice = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
	tt_train_choice = shuffle(tt_train_choice);
	tt_train = tt_train_forced.concat(tt_train_choice);
	tt_train = shuffle(tt_train);

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
	// nTrials = nTrialsTrain + nTrialsTest; 
	nTrials = 3; // for debugging 

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
        
        console.log('trial number:')
        console.log(trial)

        if (trial+1 <= nTrials) {

        		trialtype = trial_types[trial];
    			trial += 1; // advance counter
        		displayStims(trialtype);

        	}
        else {

        	finish();
        }

    }


    // *** display stimuli ***
	var displayStims = function(trialtype) {

		// shuffle position
		stimPos = [1,2];
		stimPos = _.shuffle(stimPos);

		psiTurk.showPage('RLstage.html');
		
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

		if (!listening) return;

		var keyCode = e.keyCode;
		// 66 = "B", subject picked left 
		// 77 = "M", subject picked right

		if (keyCode == 66) {var side = "left";}
	    else {var side = "right";}

		switch(trialtype) 
		{	
				case 1:
					if (stimPos[0] == 1) {
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

	    if (keyCode != 66 && keyCode !=77) { 
	    	response = ""
	    };

	    // does not handle the case in which participants don't respond at all
		if (response.length>0) 
		{	
			listening = false;

			var rt = new Date().getTime() - stimOn;
			
			// record data
			psiTurk.recordTrialData({'trial': trial-1,
									 'trialtype': trialtype,
									 'response':response,
	                                 'rt':rt,
	                            	 'side': side}
	                               );

			if (rt < close_out && rt > time_out) // show slow screen
			{ 
				$('#stim').html('<img src='+otherstims[1]+' height=200 width=200 align=center>');
				setTimeout(fixstim, outcome_time);	
			}	
			else if (rt > close_out)
			{  
				early_finish(); 
			}				
			else // show feedback
				show_feedback(response, side);

		}

	}; // end response_handler


	// *** show fixation ***
	var fixstim = function() { 
		var iti = getRandomArbitrary(iti_bounds[0],iti_bounds[1]);
		$("#feedback_left").remove();
		$("#feedback_right").remove();
		$('#stim').html('<img src='+otherstims[0]+' height=200 width=200 align=center>');
		setTimeout(setup_newTrial, iti); // wait iti 
	};

	// *** show feedback ***
	var show_feedback = function(response, side) {

		// which stimulus was chosen? 
		switch (response)
			{
				case "S1":
					
					var fb = feedback[0];
					break;

				case "S2":

					var hlp_rand = Math.random();
					
					if (hlp_rand < 0.5) {
						var fb = feedback[0];
					}
					else {
						var fb = feedback[2];
					}
					
					break;

				case "S3":

					var fb = feedback[1];
 
					break;

				case "S4":

					var fb = feedback[2];

					break;

				case "wrongside":

					var fb = otherstims[2];

					$('#stim').html('<img src='+fb+' height=200 width=200 align=center>'); 
					setTimeout(fixstim, outcome_time);
					return;

			}	 

		// which side to show feedback on? 	
		if (side == "left") 
			{
    			$("#feedback_left").attr("src",fb);
    			$("#stim_right").remove();
			}
		else 
			{
				$("#feedback_right").attr("src",fb);
				$("#stim_left").remove();
			}	
		
		setTimeout(fixstim, outcome_time);

	} // end show_feedback


	// *** end this part ***
	var finish = function() {
	    $("body").unbind("keydown", response_handler); // Unbind keys
	    currentview = RLpostquestionnaire();
	};

	var early_finish = function() { 
	    psiTurk.showPage('earlyfinish.html');
	};

// *** start task ***
	
psiTurk.showPage('RLstage.html'); // load stage
$('#stim').html('<img src='+otherstims[0]+' height=200 width=200 align=center>');
setTimeout(console.log("starting experiment..."), 500)
// setup_newTrial();
fixstim();

}; // end RiskExperiment



$(window).load( function(){
psiTurk.doInstructions(instructions, // a list of pages you want to display in sequence
	function() { currentview = new RiskRL(); } // what you want to do when you are done with instructions
);


});

}; //end RL task 

 



var DOSPERT = function() { 

// All pages to be loaded
var pages = [
	"instructions/DOSPERtinstruct-1.html",
	"instructions/DOSPERTinstruct-2.html",
	"instructions/DOSPERTinstruct-3.html",
	"instructions/DOSPERTinstruct-ready.html",
	"postquestionnaire.html",
	"EBInstructions.html",
	"RPInstructions.html",
	"RTInstructions.html",
	"EBstage.html", // see instructions/instruct-ready.html 
	"RPstage.html",
	"RTstage.html"
];

psiTurk.preloadPages(pages);

var instructionPages = [ // add as a list as many pages as you like
	"instructions/DOSPERTinstruct-1.html",
	"instructions/DOSPERTinstruct-2.html",
	"instructions/DOSPERTinstruct-3.html",
	"instructions/DOSPERTinstruct-ready.html"
];

var EBQuestionnaire = function() {

	var wordon, // time word is presented
	    listening = false;

	// Stimuli for a basic Stroop experiment
	var stims = [
			["Admitting that your tastes are different from those of a friend"],
			["Going camping in the wilderness"],
			["Betting a day's income at the horse races"],
			["Investing 10% of your annual income in a moderate growth mutual fund"],
			["Drinking heavily at a social function"],
			["Taking some questionable deductions on your income tax return"],
			["Disagreeing with an authority figure on a major issue"],
			["Betting a day’s income at a high-stake poker game"],
			["Having an affair with a married man/woman"],
			["Passing off somebody else’s work as your own"],
			["Going down a ski run that is beyond your ability"],
			["Investing 5% of your annual income in a very speculative stock"],
			["Going whitewater rafting at high water in the spring"],
			["Betting a day’s income on the outcome of a sporting event"],
			["Engaging in unprotected sex"],
			["Revealing a friend’s secret to someone else"],
			["Driving a car without wearing a seat belt"],
			["Investing 10% of your annual income in a new business venture"],
			["Taking a skydiving class"],
			["Riding a motorcycle without a helmet"],
			["Choosing a career that you truly enjoy over a more secure one"],
			["Speaking your mind about an unpopular issue in a meeting at work"],
			["Sunbathing without sunscreen"],
			["Bungee jumping off a tall bridge"],
			["Piloting a small plane"],
			["Walking home alone at night in an unsafe area of town"],
			["Moving to a city far away from your extended family"],
			["Starting a new career in your mid-thirties"],
			["Leaving your young children alone at home while running an errand"],
			["Not returning a wallet you found that contains $200"], 
			[""],
			["Admitting that your tastes are different from those of a friend"],
			["Going camping in the wilderness"],
			["Betting a day's income at the horse races"],
			["Investing 10% of your annual income in a moderate growth mutual fund"],
			["Drinking heavily at a social function"],
			["Taking some questionable deductions on your income tax return"],
			["Disagreeing with an authority figure on a major issue"],
			["Betting a day’s income at a high-stake poker game"],
			["Having an affair with a married man/woman"],
			["Passing off somebody else’s work as your own"],
			["Going down a ski run that is beyond your ability"],
			["Investing 5% of your annual income in a very speculative stock"],
			["Going whitewater rafting at high water in the spring"],
			["Betting a day’s income on the outcome of a sporting event"],
			["Engaging in unprotected sex"],
			["Revealing a friend’s secret to someone else"],
			["Driving a car without wearing a seat belt"],
			["Investing 10% of your annual income in a new business venture"],
			["Taking a skydiving class"],
			["Riding a motorcycle without a helmet"],
			["Choosing a career that you truly enjoy over a more secure one"],
			["Speaking your mind about an unpopular issue in a meeting at work"],
			["Sunbathing without sunscreen"],
			["Bungee jumping off a tall bridge"],
			["Piloting a small plane"],
			["Walking home alone at night in an unsafe area of town"],
			["Moving to a city far away from your extended family"],
			["Starting a new career in your mid-thirties"],
			["Leaving your young children alone at home while running an errand"],
			["Not returning a wallet you found that contains $200"],
			[""],
			["Admitting that your tastes are different from those of a friend"],
			["Going camping in the wilderness"],
			["Betting a day's income at the horse races"],
			["Investing 10% of your annual income in a moderate growth mutual fund"],
			["Drinking heavily at a social function"],
			["Taking some questionable deductions on your income tax return"],
			["Disagreeing with an authority figure on a major issue"],
			["Betting a day’s income at a high-stake poker game"],
			["Having an affair with a married man/woman"],
			["Passing off somebody else’s work as your own"],
			["Going down a ski run that is beyond your ability"],
			["Investing 5% of your annual income in a very speculative stock"],
			["Going whitewater rafting at high water in the spring"],
			["Betting a day’s income on the outcome of a sporting event"],
			["Engaging in unprotected sex"],
			["Revealing a friend’s secret to someone else"],
			["Driving a car without wearing a seat belt"],
			["Investing 10% of your annual income in a new business venture"],
			["Taking a skydiving class"],
			["Riding a motorcycle without a helmet"],
			["Choosing a career that you truly enjoy over a more secure one"],
			["Speaking your mind about an unpopular issue in a meeting at work"],
			["Sunbathing without sunscreen"],
			["Bungee jumping off a tall bridge"],
			["Piloting a small plane"],
			["Walking home alone at night in an unsafe area of town"],
			["Moving to a city far away from your extended family"],
			["Starting a new career in your mid-thirties"],
			["Leaving your young children alone at home while running an errand"],
			["Not returning a wallet you found that contains $200"]
			
		];

	

	var next = function() {
		
		if (stims.length===0) {
			finish();
		}
		else {
			
			stim = stims.shift();
			if (0 < stims.length && stims.length < 30) { 
				psiTurk.showPage('RTstage.html');
			}
			else if (stims.length===30) { 
				psiTurk.showPage('RTInstructions.html');
			}
			else if (30 < stims.length && stims.length < 61) { 
				psiTurk.showPage('RPstage.html');
			}
			else if (stims.length===61) { 
				psiTurk.showPage('RPInstructions.html');
			}
			else { 
				psiTurk.showPage('EBstage.html');
			}
			
			show_word( stim[0]);
			wordon = new Date().getTime();
			listening = true;
			d3.select("#query").html(''); 

		}
	};
	
	var response_handler = function(e) {
		if (!listening) return;

		var keyCode = e.keyCode,
			response;

		switch (keyCode) {
			case 49:
				// "R"
				response="1";
				break;
			case 50:
				// "G"
				response="2";
				break;
			case 51:
				// "B"
				response="3";
				break;
			case 52:
				// "R"
				response="4";
				break;
			case 53:
				// "G"
				response="54";
				break;
			case 54:
				// "B"
				response="6";
				break;
			case 55:
				// "B"
				response="7";
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
                                     'word':stim[0],
                                     'color':stim[1],
                                     'relation':stim[2],
                                     'response':response,
                                     'hit':hit,
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

	var RPInstructions = function() { 
		psiTurk.showPage('RPInstructions.html')
	}
	
	var show_word = function(text, color) {
		d3.select("#stim")
			.append("div")
			.attr("id","word")
			.style("color",color)
			.style("text-align","center")
			.style("font-size","30px")
			.style("font-weight","400")
			.style("margin","20px")
			.text(text);
	};

	var remove_word = function() {
		d3.select("#word").remove();
	};

	
	// Load the stage.html snippet into the body of the page
	
	for (x=0; x<63; x++) { 
		if (x < 5) { 
			psiTurk.showPage('EBstage.html');
		}
		else { 
			psiTurk.showPage('RPstage.html');
		}	
	}; 


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
    	function() { currentview = new EBQuestionnaire(); } // what you want to do when you are done with instructions
    );
});

}; 


RLTask();
