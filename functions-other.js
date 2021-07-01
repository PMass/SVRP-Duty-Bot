
module.exports.checkURL = async (url) => {
  try {
  return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  } catch(err){
    console.error(err)
  }
}






module.exports.format = async (content) => {
  var res = content.split(" | ");
  var res2 = res[0].split(":");
  if(res2[1] == ":green_circle"){
    var status = "on"
  } else {
    var status = "off"
  }
  var res3 = res2[2].split("[");
  var res4 = res3[1].split("]");
  var job = res4[0];
  console.log(status)
  console.log(job)
  var res5 = res2[3].split(" (");
  var name = res5[0].trim();
  console.log(name)
  var res6 = res2[4].split(")");
  var hex = res6[0];
  console.log(hex)
  var res7 = res[1].split(" (");
  var date = res7[0];
  console.log(date)
}

