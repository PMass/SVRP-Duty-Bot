

module.exports.checkURL = async (url) => {
  return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  } catch(err){
    console.error(err)
  }

