var Claymore = require('../models/claymore');
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
	var claymore = new Claymore(req.body);
  console.log(req.body);
	claymore.save(function(err){
    logger.info("Just saved a Claymore");
		if (err){
      console.log(err);
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(claymore);
		}
	});
};

exports.list = function(req, res){
  logger.info("getting all those sweet claymores");
	Claymore.find(req.query).sort('-name')
		.exec(function(err, claymores){
			if (err) {
        console.log(err);
				return res.status(400).send({
					message: getErrorMessage(err)
				});
			} else {
				res.json(claymores);
			}
		});
};

exports.skinnyClaymore = function(req,res){
  logger.info("getting some skinny claymore");
  Claymore.find(req.query).select('_id name')
    .exec(function(err, claymore){
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        res.json(claymore);
      }
    });
}

exports.claymoreById = function(req, res, next, id) {
  Claymore.findById(id).exec(function(err, claymore) {
    if (err) return next(err);
    if (!claymore) return next(new Error('Failed to load claymore ' + id));

    req.claymore = claymore;
    next();
  });
};

exports.read = function(req, res) {
  res.json(req.claymore);
};

exports.update = function(req, res) {
  logger.info("updating a claymore from " + req.connection.remoteAddress);
  var claymore = req.claymore;

  claymore.name = req.body.name;
  claymore.breed = req.body.breed;
  claymore.cuteness = req.body.cuteness;
  claymore.smell = req.body.smell;
  claymore.color = req.body.color;
  claymore.agressiveness = req.body.agressiveness;
  claymore.food = req.body.food;
  claymore.bestInShow = req.body.bestInShow;
  claymore.akcDogRanking = req.body.akcDogRanking;
  claymore.personality = req.body.personality;
  claymore.registerYear = req.body.registerYear;
  claymore.colors = req.body.colors;
  claymore.hoss = req.body.hoss;
  //TODO add more fields here

  claymore.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(claymore);
    }
  });
};

exports.delete = function(req, res) {
  var claymore = req.claymore;

  claymore.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(claymore);
    }
  });
};
