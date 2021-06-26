module.exports.stringToMention = (users) => {
	try {
		var user = "";
		if (users[0] !== 'None') {
			users.forEach((value) => {user += "<@" +value + ">" + "\n"});
		} else {
			users.forEach((value) => {user += value});
		} 
		return user;
    } catch {
    	console.log("error in converting String to Time")
    }
}

module.exports.populateOnDuty = async (guild) => {
  try {
  	
  } catch(err){
    console.error(err)
  }
}




async function populateOnDuty(guild) {


		const sheetEV = doc.sheetsByTitle["EveryoneOnDuty"]; // or use doc.sheetsById[id]
	  	const rowsEV = await sheetEV.getRows();
		everyoneOnDutyArray = updateArray(rowsEV);
		everyoneOnDutyArray = zeroArray(everyoneOnDutyArray)
	  	const sheetOD = doc.sheetsByTitle["OfficerOnDuty"]; // or use doc.sheetsById[id]
	  	const rowsOD = await sheetOD.getRows();
		officersOnDutyArray = updateArray(rowsOD);
		officersOnDutyArray = zeroArray(officersOnDutyArray)
	  	const sheetCD = doc.sheetsByTitle["CadetsOnDuty"]; // or use doc.sheetsById[id]
	  	const rowsCD = await sheetCD.getRows();
		cadetsOnDutyArray = updateArray(rowsCD);
		cadetsOnDutyArray = zeroArray(cadetsOnDutyArray)
	  	const sheetOQ = doc.sheetsByTitle["OfficerInQueue"]; // or use doc.sheetsById[id]
	  	const rowsOQ = await sheetOQ.getRows();
	  	officersInQueueArray = updateArray(rowsOQ);
		officersInQueueArray = zeroArray(officersInQueueArray)
	  	const sheetCQ = doc.sheetsByTitle["CadetsInQueue"]; // or use doc.sheetsById[id]
	  	const rowsCQ = await sheetCQ.getRows();
	  	cadetsInQueueArray = updateArray(rowsCQ);
		cadetsInQueueArray = zeroArray(cadetsInQueueArray)
	  	const sheetDO = doc.sheetsByTitle["DOCOfficers"]; // or use doc.sheetsById[id]
	  	const rowsDO = await sheetDO.getRows();
	  	docOfficersArray = updateArray(rowsDO);
		docOfficersArray = zeroArray(docOfficersArray)
	   	const sheetDC = doc.sheetsByTitle["DOCCadets"]; // or use doc.sheetsById[id]
	  	const rowsDC = await sheetDC.getRows();
	  	docCadetsArray = updateArray(rowsDC);
		docCadetsArray = zeroArray(docCadetsArray)

	  	// console.log(everyoneOnDutyArray)
	  	// console.log(officersOnDutyArray)
	  	// console.log(cadetsOnDutyArray)
	  	// console.log(officersInQueueArray)
	  	// console.log(cadetsInQueueArray)	  	
	  	// console.log(docOfficersArray)
	  	// console.log(docCadetsArray)
		const onDutyList =  everyoneOnDutyArray.filter(x => !officersInQueueArray.includes(x));

      	var Role = guild.roles.cache.find(role => role.id == info.dutyRole);
       	const clockedOn = guild.members.cache.filter(member => member.roles.cache.find(role => role == Role)).map(member => member.user.id);
      	var Role = guild.roles.cache.find(role => role.id == info.queueRole);
       	const inQueue = guild.members.cache.filter(member => member.roles.cache.find(role => role == Role)).map(member => member.user.id);

       	// console.log(members)
       	// console.log(everyoneOnDutyArray)
       	updateRoles(clockedOn,onDutyList,inQueue,officersInQueueArray)

		sleep(1000).then(() => {updateEmbeds();});
		} catch (error) {
	    	console.log("ERROR! Unable to Read Information from Cells")

	    	console.log(error)
	    	if(googleError == '429' ){
				sendMessage(channelLog, `ERROR! Unable to read sheet due to rate limit.`, -1);
	    	} else {
				sendMessage(channelLog, `ERROR! Unable to read sheet due to other Google reasons. Retrying in 30 seconds.`, -1);
	    		sleep(30000).then(() => {readCells();
	    			console.log('Retrying Read Cells')
	    		});
	    	}
		}
	}