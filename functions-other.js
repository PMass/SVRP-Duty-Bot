const clock = require('./clock')

module.exports.checkURL = async (url) => {
  try {
  return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  } catch(err){
    console.error(err)
  }
}

module.exports.format = async (message) => {
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


module.exports.arrayMatch = async (array1, array2) => {
  try {
    const onlyFirst =  array1.filter(x => !array2.includes(x)); // in 1 but not 2
    const both =  array1.filter(x => array2.includes(x)); // in both
    return [onlyFirst, both]
  } catch(err){
    console.error(err)
  }
}
