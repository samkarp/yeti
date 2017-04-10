var Orabelle = require('../models/orabelle');
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
	var orabelle = new Orabelle(req.body);
  console.log(req.body);
  console.log(orabelle);
	orabelle.save(function(err){
    logger.info("Just saved a Orabelle");
		if (err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(orabelle);
		}
	});
};

exports.list = function(req, res){
  logger.info("getting all those sweet orabelles");
	Orabelle.find(req.query).sort('-name')
		.exec(function(err, orabelles){
			if (err) {
				return res.status(400).send({
					message: getErrorMessage(err)
				});
			} else {
				res.json(orabelles);
			}
		});
};

exports.orabelleById = function(req, res, next, id) {
  Orabelle.findById(id).exec(function(err, orabelle) {
    if (err) return next(err);
    if (!orabelle) return next(new Error('Failed to load orabelle ' + id));

    req.orabelle = orabelle;
    next();
  });
};

exports.read = function(req, res) {
  res.json(req.orabelle);
};

exports.update = function(req, res) {
  logger.info("updating a orabelle from " + req.connection.remoteAddress);
  var orabelle = req.orabelle;

  orabelle.name = req.body.name;
  orabelle.ibu = req.body.ibu;
  orabelle.abv = req.body.abv;
  orabelle.brand = req.body.brand;
  orabelle.price = req.body.price;
  orabelle.aroma = req.body.aroma;
  orabelle.bitterness = req.body.bitterness;
  //TODO add more fields here

  orabelle.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(orabelle);
    }
  });
};

exports.delete = function(req, res) {
  var orabelle = req.orabelle;

  orabelle.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(orabelle);
    }
  });
};
