var db = require('../config/db');

var Orabelle = db.model('Orabelle', {
	name: 			 {type: String, trim: true, required: 'Name cannot be blank'},
	ibu:        	 {type: Number},
	abv: 			 {type: Number},
	brand:           {type: String}, 
	price:           {type: Number},
	aroma:           {type: String},
	bitterness:      {type: Number}
});

module.exports = Orabelle;
