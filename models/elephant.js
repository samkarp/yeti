var db = require('../config/db');

var Elephant = db.model('Elephant', {
	name: 			 {type: String, trim: true, required: 'Name cannot be blank'}
});

module.exports = Elephant;
