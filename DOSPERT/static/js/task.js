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
	"EBInstructions.html",
	"RPInstructions.html",
	"RTInstructions.html",
	"EBstage.html", // see instructions/instruct-ready.html 
	"RPstage.html",
	"RTstage.html"
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
