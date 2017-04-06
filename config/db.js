var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost:27017/yeti');
mongoose.connection.once('connected', function(){
	console.log("Connected to database: yeti");
});

module.exports = mongoose;