
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	general: {	
		id: String,
		username: String,
		password: String,
		name: String,
		phone: String,
		address: String
	},
	fb: {
		id: String,
		access_token: String,
		name: String,
		email: String
	}
});