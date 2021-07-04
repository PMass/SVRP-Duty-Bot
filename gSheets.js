const { GoogleSpreadsheet } = require('google-spreadsheet');
const doc = new GoogleSpreadsheet('1f7TOwwbgJlty6KkJk-1SAz2IvbNl5EYuQ-riWatc9ug');  
const creds = require('./client_secret.json');

module.exports = (client) => {}


// Add a server to the Guild Database
  module.exports.user = async (userInfo) => {
    console.log('Running gSheets user()')
    try {
    await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
      });
      await doc.loadInfo(); // loads document properties and worksheets
      const sheet = doc.sheetsByTitle["Master"]; // or use doc.sheetsById[id]
      certList = userInfo.certsFull
      const larryRow = await sheet.addRow({
      Discord: userInfo.ID,
      Hex: userInfo.hexid,
      Department: userInfo.department,
      Name: userInfo.name,
      Badge: userInfo.badge,
      Phone: userInfo.phone,
      Hired: userInfo.hired,
      Promotion: userInfo.hired,
      Region: userInfo.region,
      Rank: userInfo.rank,
      Title: userInfo.title,
      Time: userInfo.time,
      FTO: certList[0],
      AR: certList[1],
      ASU: certList[2],
      Car1: certList[3],
      Car2: certList[4],
      Car3: certList[5],
      Bike: certList[6],
      SWAT: certList[7],
      K9: certList[8],
      SADOC: certList[9],
      DOCFTO: certList[10],
      DOCK9: certList[11],
      CERT: certList[12],
      ICU: certList[13],
      CMU: certList[14],
      DOCAR: certList[15],
      Strikes: 0,
      Title: "",
      Other1: "",
      Other2: "",
      });
      await sheet.saveUpdatedCells();
      console.log('Added on Duty')
    updateStatus = "Ready";
    } catch (error) {
        console.log("ERROR! Unable to Save Intake")
        console.log(error)
    }
  }
