module.exports.toHours = (time) => {
	try {
		var hours = Number(time.slice(0, 4));
		var minutes = Number(time.slice(5,7));
		var seconds = Number(time.slice(8,10));
		return seconds / 60 + minutes + hours * 60;
    } catch {
    	console.log("error in converting String to Time")
    }
}

module.exports.sum = (a, b) => {
	try {
		return a + b;
    } catch {
    	console.log("error in summing variables")
    }
}

module.exports.timeConvert = (n) => {
	try {
		var num = n;
		var hours = (num / 60);
		var rhours = Math.floor(hours);
		var minutes = (hours - rhours) * 60;
		var rminutes = Math.round(minutes);
		var seconds = (minutes - rminutes) * 60;
		var rseconds = Math.round(seconds);
		if (rhours < 10) {
	  		rhours = '000' + rhours;
	  	} else if (rhours < 100){
	  		rhours = '00' + rhours;
	  	} else if (rhours < 1000){
	  		rhours = '0' + rhours;
	  	}
	  	if (rminutes < 10) {
	  		rminutes = '0' + rminutes;
	  	}
	  	if (rseconds < 10) {
	  		rseconds = '00';
	  	}
		return rhours + ":" + rminutes + ":" + rseconds
    } catch {
    	console.log("error in converting time to string")
    }
}

// sleep for a certain time
  module.exports.sleep = async (time) => {
      try {
        console.log('Running sleep()')
        time = await time * 1000
    		return new Promise(resolve => setTimeout(resolve, time));
      } catch {
    		console.log("error sleeping")
    	}
  }

