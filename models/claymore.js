var db = require('../config/db');

var Claymore = db.model('Claymore', {
	name: 			 {type: String, trim: true, required: 'Name cannot be blank'},
	breed:           {type: String, trim: true},
	cuteness:        {type: Number, trim: true},
	smell:           {type: Number, trim: true},
	color:           {type: String, trim: true},
	agressiveness:     {type: Number, trim: true},
	food:            {type: String, trim: true},
	bestInShow:      {type: Boolean, trim: true},
	akcDogRanking:   {type: Number, trim: true},
	personality:     {type: String, trim: true},
	registerYear:    {type: String, trim: true},
	colors:          {type: [String], trim: true}
});

module.exports = Claymore;
