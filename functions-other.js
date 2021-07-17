const clock = require('./clock')
const dbAdd = require('./dbAdd')

//Function that checks and makes sure that the URL is an image url
  module.exports.checkURL = async (url) => {
    try {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    } catch(err){
      console.error(err)
    }
  }

// Function for formatting the single line text that comes from the duty clock
  module.exports.formatDuty = async (message) => {
    var res = message.content.split(" ");
    if(res[0] == "🟢"){
      var status = "on"
    } else {
      var status = "off"
    }
    var job = res[2].substring(1, res[2].length-1);
    var res2 = message.content.split(": ");
    var res3 = res2[1].split(" (");
    var name = res3[0].trim();
    var res4 = res3[1].split(") | ");
    var res5 = res4[0].split("steam:");
    var hex = res5[1];
    var date = res4[1]
    await clock.adjustDuty(message, job, hex, date, name, status)
  }

// Function for formatting the single line text that comes from the duty clock
  module.exports.formatJoin = async (message) => {
    var res = message.content.split(" / ");
    var res2 = res[1].split("steam:");
    var hexID = res2[1]
    console.log(hexID)
    var res3 = res[2].split(")");
    var name = res3[0]
    console.log(name)
    await dbAdd.player(hexID, name)
  }

//function for matching 2 arrays that outputs a array of matching and an array of only in the first one
  module.exports.arrayMatch = async (array1, array2) => {
    try {
      const onlyFirst =  array1.filter(x => !array2.includes(x)); // in 1 but not 2
      const both =  array1.filter(x => array2.includes(x)); // in both
      return [onlyFirst, both]
    } catch(err){
      console.error(err)
    }
  }

//function that determins what group a person is in
  module.exports.findGroup = async (cadet, doc) => {
    try {
      var group = ""
      if (doc){
        group = doc
      } else if (cadet){
        group = cadets
      } else {
        group = officers
      }
      return group
    } catch(err){
      console.error(err)
    }
  }

//capatilize the first letter
  module.exports.capitalize = async (string) => {
    try {
      let stringLower = string.toLowerCase();
      let stringUpdt = stringLower.charAt(0).toUpperCase() + stringLower.slice(1);
      return stringUpdt;
    } catch(err){
      console.error(err)
    }
  }

//Update 
   module.exports.updateArray = async (rows) => {
      let maxRow = rows.length, returnedArray = [];
    var i;
    for (i = 0; i < maxRow; i++) {
      returnedArray.push(rows[i].Name);
    }
    return returnedArray
  }

 //Update 
   module.exports.arrayLoction = async (value,array) => {
    const number = (element) => element == value; 
    var location = array.findIndex(number);
    console.log(location)
    return location;
  }
