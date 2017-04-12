var db = require('../config/db');

var Titan = db.model('Titan', {
	name: 			 {type: String, trim: true, required: 'Name cannot be blank'},
	marte:        	 {type: Number},
	mccutchen:		 {type: Number},
	cole:            {type: String}, 
	glasnow:         {type: Number},
	freese:          {type: String},
	kang:            {type: Number}
});

module.exports = Titan;
