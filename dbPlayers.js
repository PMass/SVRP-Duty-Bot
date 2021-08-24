/* eslint-disable no-unused-vars */
const mongo = require('./mongo');
const playerSchema = require('./schemas/player-schema');

// eslint-disable-next-line no-empty-function
module.exports = (client) => {};

// Add commands

// Adding chips to a user
module.exports.addPlayer = async (steamName, hex, name) => {
	return await mongo().then(async (mongoose) => {
		try {
			let cash = 0
			const result = await playerSchema.findOneAndUpdate(
				{
					hex,
					name,
				},
				{
					hex,
					steamName,
					name,
					cash,
				},
				{
					upsert: true,
					new: true,
				// eslint-disable-next-line comma-dangle
				}
			);
			return result.chips;
		}
		catch (err) {
			console.log(err);
		}
	});
};

// Adding chips to a user
module.exports.addCash = async (hex, name, cash) => {
	return await mongo().then(async (mongoose) => {
		try {
			const result = await playerSchema.findOneAndUpdate(
				{
					hex,
					name,
				},
				{
					hex,
					name,
		              $inc: {
		                cash,
		              },
				},
				{
					upsert: true,
				// eslint-disable-next-line comma-dangle
				}
			);
			console.log(result)	
		}
		catch (err) {
			console.log(err);
		}
	});
};
