var db = require('../config/db');

var Cat = db.model('Cat', {
	name: 			 {type: String, trim: true, required: 'Name cannot be blank'}
});

module.exports = Cat;
