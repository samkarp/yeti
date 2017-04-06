var db = require('../config/db');

var Monkey = db.model('Monkey', {
	name: 			 {type: String, trim: true, required: 'Name cannot be blank'}
});

module.exports = Monkey;
