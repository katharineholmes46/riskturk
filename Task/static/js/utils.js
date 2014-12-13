
function AssertException(message) { this.message = message; }
AssertException.prototype.toString = function () {
	return 'AssertException: ' + this.message;
};

function assert(exp, message) {
	if (!exp) {
		throw new AssertException(message);
	}
}

// Mean of booleans (true==1; false==0)
function boolpercent(arr) {
	var count = 0;
	for (var i=0; i<arr.length; i++) {
		if (arr[i]) { count++; } 
	}
	return 100* count / arr.length;
}

// returns an array with element elem repeated n times.
var repeatelem = function(elem, n){
        
        var arr = [];
        for (var i=0; i<=n; i++) {
            arr = arr.concat(elem);
        };
        return arr;
    };

// returns random number between min and max
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
