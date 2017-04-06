var Elephant = require('../models/elephant');
var logger = require('../config/log.js');

var getErrorMessage = function(err){
	if (err.errors){
		for (var errName in err.errors){
			if (err.errors[errName].message) return err.errors[errName].getErrorMessage
		}
	} else 
		return 'Unknown server error';
}

exports.create = function(req, res, next){
	var elephant = new Elephant(req.body);
  console.log(req.body);
	elephant.save(function(err){
    logger.info("Just saved a Elephant");
		if (err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(elephant);
		}
	});
};

exports.list = function(req, res){
  logger.info("getting all those sweet elephants");
	Elephant.find(req.query).sort('-name')
		.exec(function(err, elephants){
			if (err) {
				return res.status(400).send({
					message: getErrorMessage(err)
				});
			} else {
				res.json(elephants);
			}
		});
};

exports.elephantById = function(req, res, next, id) {
  Elephant.findById(id).exec(function(err, elephant) {
    if (err) return next(err);
    if (!elephant) return next(new Error('Failed to load elephant ' + id));

    req.elephant = elephant;
    next();
  });
};

exports.read = function(req, res) {
  res.json(req.elephant);
};

exports.update = function(req, res) {
  logger.info("updating a elephant from " + req.connection.remoteAddress);
  var elephant = req.elephant;

  elephant.name = req.body.name;
  //TODO add more fields here

  elephant.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(elephant);
    }
  });
};

exports.delete = function(req, res) {
  var elephant = req.elephant;

  elephant.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(elephant);
    }
  });
};
