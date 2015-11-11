
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	id: String,
	username: String,
	password: String,
	name: String,
	phone: String,
	address: String
});