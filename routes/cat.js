var Cat = require('../models/cat');
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
	var cat = new Cat(req.body);
  console.log(req.body);
	cat.save(function(err){
    logger.info("Just saved a Cat");
		if (err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(cat);
		}
	});
};

exports.list = function(req, res){
  logger.info("getting all those sweet cats");
	Cat.find(req.query).sort('-name')
		.exec(function(err, cats){
			if (err) {
				return res.status(400).send({
					message: getErrorMessage(err)
				});
			} else {
				res.json(cats);
			}
		});
};

exports.catById = function(req, res, next, id) {
  Cat.findById(id).exec(function(err, cat) {
    if (err) return next(err);
    if (!cat) return next(new Error('Failed to load cat ' + id));

    req.cat = cat;
    next();
  });
};

exports.read = function(req, res) {
  res.json(req.cat);
};

exports.update = function(req, res) {
  logger.info("updating a cat from " + req.connection.remoteAddress);
  var cat = req.cat;

  cat.name = req.body.name;
  //TODO add more fields here

  cat.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(cat);
    }
  });
};

exports.delete = function(req, res) {
  var cat = req.cat;

  cat.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(cat);
    }
  });
};
