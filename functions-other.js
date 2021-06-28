module.exports.findGroup = async (department, cadet, doc) => {
  try {
    if (cadet) {
      const group = cadets
    } else if (doc) {
      const group = doc
    } else {
      const group = officers
    }
    return group
  } catch(err){
    console.error(err)
  }
}


