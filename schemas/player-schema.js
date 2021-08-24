const mongoose = require('mongoose');

const reqString = {
	type: String,
	required: true,
};
const playerSchema = mongoose.Schema({
	hex: reqString,
	steamName: reqString,
	name: reqString,
	cash: Number,
});
module.exports = mongoose.model('player', playerSchema);