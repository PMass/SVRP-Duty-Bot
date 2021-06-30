

module.exports.checkURL = async (url) => {
  try {
  return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  } catch(err){
    console.error(err)
  }
}

