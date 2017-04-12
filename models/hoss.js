var db = require('../config/db');

var Hoss = db.model('Hoss', {
	name: 			 {type: String, trim: true},
	oliver:        	 {type: Number},
	stewart:		 {type: Number},
	colbert:         {type: String}, 
	klepper:         {type: Number},
	meyers:          {type: String},
	kimmel:          {type: Number}
});

module.exports = Hoss;
