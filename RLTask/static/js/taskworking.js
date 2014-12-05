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

/****

var S1orS2 = function() { 
	var one=document.getElementById("myCanvas");
	var ctxone=one.getContext("2d");
	// Red rectangle
	ctxone.beginPath();
	ctxone.lineWidth="6";
	ctxone.strokeStyle="red";
	ctxone.rect(5,5,290,140); 
	ctxone.stroke();
}; 

var S2orS3 = function() { 
	var two=document.getElementById("myCanvas");
	var ctxtwo=two.getContext("2d");
	// Red rectangle
	ctxtwo.beginPath();
	ctxtwo.lineWidth="6";
	ctxtwo.strokeStyle="green";
	ctxwo.rect(5,5,290,140); 
	ctxwo.stroke();
}; 

var S2orS4 = function () { 
	var three=document.getElementById("myCanvas");
	var ctxthree=three.getContext("2d");
	// Red rectangle
	ctxthree.beginPath();
	ctxthree.lineWidth="6";
	ctxthree.strokeStyle="red";
	ctxthree.rect(5,5,290,140); 
	ctxthree.stroke();
}: 

var S1andS3 = function() { 
	var four=document.getElementById("myCanvas");
	var ctxfour=four.getContext("2d");
	// Red rectangle
	ctxfour.beginPath();
	ctxfour.lineWidth="1";
	ctxfour.strokeStyle="red";
	ctxfour.rect(5,5,290,140); 
	ctxfour.stroke();
}; 

var S3andS4 = function() { 
	var five=document.getElementById("myCanvas");
	var ctxfive=five.getContext("2d");
	// Red rectangle
	ctxfive.beginPath();
	ctxfive.lineWidth="1";
	ctxfive.strokeStyle="green";
	ctxfive.rect(5,5,290,140); 
	ctxfive.stroke();
}; 

var S1 = function() { 
	var six=document.getElementById("myCanvas");
	var ctxsix=six.getContext("2d");
	// Red rectangle
	ctxsix.beginPath();
	ctxsix.lineWidth="1";
	ctxsix.strokeStyle="blue";
	ctxsix.rect(5,5,290,140); 
	ctxsix.stroke();
}: 

var S2 = function() { 
	var seven=document.getElementById("myCanvas");
	var ctxseven=seven.getContext("2d");
	// Red rectangle
	ctxseven.beginPath();
	ctxseven.lineWidth="12";
	ctxseven.strokeStyle="red";
	ctxseven.rect(5,5,290,140); 
	ctxseven.stroke();
}; 

var S3 = function() { 
	var eight=document.getElementById("myCanvas");
	var ctxeight=eight.getContext("2d");
	// Red rectangle
	ctxeight.beginPath();
	ctxeight.lineWidth="12";
	ctxeight.strokeStyle="red";
	ctxeight.rect(5,5,290,140); 
	ctxeight.stroke();
}; 

var S4 = function { 
	var nine=document.getElementById("myCanvas");
	var ctxnine=nine.getContext("2d");
	// Red rectangle
	ctxnine.beginPath();
	ctxnine.lineWidth="12";
	ctxnine.strokeStyle="red";
	ctxnine.rect(5,5,290,140); 
	ctxnine.stroke();
}; 

****/ 



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

var RiskRL = function() {

	var wordon, // time word is presented
	    listening = false;

	// Stimuli for a basic Stroop experiment
	var stims = [
			[ "S1 or S2" ],
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
			finish();
		}
		else {
			show_word();
			wordon = new Date().getTime();
			listening = true;
			d3.select("#query").html('<p id="prompt">Type "N" for the bandit on the left and M for the bandit on the right.</p>');
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
	

	var show_word = function(stims) {
		scr = "raphael-min.js"
		window.onload = function() {
    	var paper = new Raphael(document.getElementById('canvas_container'), 500, 500);
		}; 
		if (stims = "S1 or S2") { 
			left = paper.rect(10, 10, 120, 120);
			left.attr({stroke: "rgb(58, 122, 42)", 'stroke-width': 15});
		} 
		else  {
			left = paper.circle(70, 70, 60);
			left.attr({stroke: "rgb(189, 62, 62)", 'stroke-width': 15});

		} 

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
