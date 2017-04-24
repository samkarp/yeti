var Titan = require('../models/titan');
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
	var titan = new Titan(req.body);
  console.log(req.body);
	titan.save(function(err){
    logger.info("Just saved a Titan");
		if (err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(titan);
		}
	});
};

exports.list = function(req, res){
  logger.info("getting all those sweet titans");
	Titan.find(req.query).sort('-name')
		.exec(function(err, titans){
			if (err) {
				return res.status(400).send({
					message: getErrorMessage(err)
				});
			} else {
				res.json(titans);
			}
		});
};

exports.skinnyTitan = function(req,res){
  logger.info("getting some skinny titan");
  Titan.find(req.query).select('_id name')
    .exec(function(err, titan){
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err)
        });
      } else {
        res.json(titan);
      }
    });
}

exports.titanById = function(req, res, next, id) {
  Titan.findById(id).exec(function(err, titan) {
    if (err) return next(err);
    if (!titan) return next(new Error('Failed to load titan ' + id));

    req.titan = titan;
    next();
  });
};

exports.read = function(req, res) {
  res.json(req.titan);
};

exports.update = function(req, res) {
  logger.info("updating a titan from " + req.connection.remoteAddress);
  var titan = req.titan;

  titan.name = req.body.name;
  //TODO add more fields here
  titan.marte = req.body.marte;
  titan.mccutchen = req.body.mccutchen;
  titan.cole = req.body.cole;
  titan.glasnow = req.body.glasnow;
  titan.freese = req.body.freese;
  titan.kang = req.body.kang;

  titan.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(titan);
    }
  });
};

exports.delete = function(req, res) {
  var titan = req.titan;

  titan.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(titan);
    }
  });
};
