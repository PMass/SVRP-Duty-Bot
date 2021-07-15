const { GoogleSpreadsheet } = require('google-spreadsheet');
const doc = new GoogleSpreadsheet('1f7TOwwbgJlty6KkJk-1SAz2IvbNl5EYuQ-riWatc9ug');  
const creds = require('./client_secret.json');
const fnOther = require('./functions-other')
const fncClock = require('./functions-clock')

module.exports = (client) => {}

// Add a server to the Guild Database
  module.exports.userAdd = async (userInfo) => {
    console.log('Running gSheets user()')
    try {
    await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
      });
      await doc.loadInfo(); // loads document properties and worksheets
      const sheet = doc.sheetsByTitle["Master"]; // or use doc.sheetsById[id]
      certList = userInfo.certsFull
      const arrayRow = await sheet.addRow({
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

// Add a server to the Guild Database
  module.exports.userUpdate = async (userInfo) => {
    console.log(userInfo)
    try {
    await doc.useServiceAccountAuth({
        client_email: creds.client_email,
        private_key: creds.private_key,
      });
    await doc.loadInfo(); // loads document properties and worksheets
    certList = userInfo.certsFull
    const sheet = doc.sheetsByTitle["Master"]; // or use doc.sheetsById[id]
    const rows = await sheet.getRows();
    const names = await fnOther.updateArray(rows)
    const location = await fnOther.arrayLoction(userInfo.name, names);
    console.log(location)
      rows[location].Discord = userInfo.ID
      rows[location].Hex = userInfo.hexid
      rows[location].Department = userInfo.department
      rows[location].Name = userInfo.name
      rows[location].Badge = userInfo.badge
      rows[location].Phone = userInfo.phone
      rows[location].Hired = userInfo.hired
      rows[location].Promotion = userInfo.hired
      rows[location].Region = userInfo.region
      rows[location].Rank = userInfo.rank
      rows[location].Title = userInfo.title
      rows[location].Time = userInfo.time
      rows[location].FTO = certList[0]
      rows[location].AR = certList[1]
      rows[location].ASU = certList[2]
      rows[location].Car1 = certList[3]
      rows[location].Car2 = certList[4]
      rows[location].Car3 = certList[5]
      rows[location].Bike = certList[6]
      rows[location].SWAT = certList[7]
      rows[location].K9 = certList[8]
      rows[location].SADOC = certList[9]
      rows[location].DOCFTO =  certList[10]
      rows[location].DOCK9 = certList[11]
      rows[location].CERT = certList[12]
      rows[location].ICU = certList[13]
      rows[location].CMU = certList[14]
      rows[location].DOCAR = certList[15]
      rows[location].Strikes = userInfo.stirkes
      rows[location].Title = userInfo.title
      rows[location].Other1 = userInfo.other1
      rows[location].Other2 = userInfo.other2
    await sheet.saveUpdatedCells(); //Save the information
    await rows[location].save(); // save changes
    } catch (error) {
        console.log(error)
        console.log("ERROR! Unable to Read Information from Cells")
        var googleError = error.response.status
        console.log(googleError)
        if(googleError == '429' ){
        sendMessage(channelFull, `Google is rate limiting the bot due to spam, please give the bot up to three minutes to update. Requests will still get processed in the order recieved, information will just not be updated.`, 20)
        sendMessage(channelLog, `ERROR! Unable to read sheet due to rate limit. Retrying in 2 minutes.`, -1);
          fncClock.sleep(120).then(() => {verifyDuty(userid);
            console.log('Retrying Read Cells')
          });
        } else {
        sendMessage(channelLog, `ERROR! Unable to read sheet due to other Google reasons. Retrying in 30 seconds.`, -1);
          fncClock.sleep(30).then(() => {verifyDuty(userid);
            console.log('Retrying Read Cells')
          });
        }
    }
  }
