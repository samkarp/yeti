var Hoss = require('../models/hoss');
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
	var hoss = new Hoss(req.body);
  console.log(req.body);
	hoss.save(function(err){
    logger.info("Just saved a Hoss");
		if (err){
			console.log(err);
      return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(hoss);
		}
	});
};

exports.list = function(req, res){
  logger.info("getting all those sweet hosss");
	Hoss.find(req.query).sort('-name')
		.exec(function(err, hoss){
			if (err) {
				return res.status(400).send({
					message: getErrorMessage(err)
				});
			} else {
				res.json(hoss);
			}
		});
};

exports.skinnyHoss = function(req,res){
  logger.info("getting some skinny hosses");
  Hoss.find(req.query).select('_id name colbert meyers')
    .exec(function(err, hoss){
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        res.json(hoss);
      }
    });
}

exports.hossById = function(req, res, next, id) {
  Hoss.findById(id).exec(function(err, hoss) {
    if (err) return next(err);
    if (!hoss) return next(new Error('Failed to load hoss ' + id));

    req.hoss = hoss;
    next();
  });
};

exports.read = function(req, res) {
  res.json(req.hoss);
};

exports.update = function(req, res) {
  logger.info("updating a hoss from " + req.connection.remoteAddress);
  var hoss = req.hoss;

  hoss.name = req.body.name;
  hoss.oliver = req.body.oliver;
  hoss.stewart = req.body.stewart;
  hoss.klepper = req.body.klepper;
  hoss.colbert = req.body.colbert;
  hoss.meyers = req.body.meyers;
  hoss.kimmel = req.body.kimmel;
  //TODO add more fields here

  hoss.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(hoss);
    }
  });
};

exports.delete = function(req, res) {
  var hoss = req.hoss;

  hoss.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(hoss);
    }
  });
};