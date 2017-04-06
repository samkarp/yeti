var Monkey = require('../models/monkey');
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
	var monkey = new Monkey(req.body);
  console.log(req.body);
	monkey.save(function(err){
    logger.info("Just saved a Monkey");
		if (err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(monkey);
		}
	});
};

exports.list = function(req, res){
  logger.info("getting all those sweet monkeys");
	Monkey.find(req.query).sort('-name')
		.exec(function(err, monkeys){
			if (err) {
				return res.status(400).send({
					message: getErrorMessage(err)
				});
			} else {
				res.json(monkeys);
			}
		});
};

exports.monkeyById = function(req, res, next, id) {
  Monkey.findById(id).exec(function(err, monkey) {
    if (err) return next(err);
    if (!monkey) return next(new Error('Failed to load monkey ' + id));

    req.monkey = monkey;
    next();
  });
};

exports.read = function(req, res) {
  res.json(req.monkey);
};

exports.update = function(req, res) {
  logger.info("updating a monkey from " + req.connection.remoteAddress);
  var monkey = req.monkey;

  monkey.name = req.body.name;
  //TODO add more fields here

  monkey.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(monkey);
    }
  });
};

exports.delete = function(req, res) {
  var monkey = req.monkey;

  monkey.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(monkey);
    }
  });
};
