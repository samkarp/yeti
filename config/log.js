var winston = require('winston');
var logger = new winston.Logger({
	transports: [
		new winston.transports.File({ filename: "./logs/production.log"})
	]
});

logger.info('Chill Winston, the logs are being captured 2 ways- console, and file');

module.exports=logger;