var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var cors = require('cors');
var http = require('http');
var logger = require('./config/log.js');

var orabelle = require('./routes/orabelle');
var claymore = require('./routes/claymore');
var hoss = require('./routes/hoss');
var titan = require('./routes/titan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.get('/api/claymore', claymore.list);
app.get('/api/claymore/skinny', claymore.skinnyClaymore);
app.post('/api/claymore', claymore.create);
app.get('/api/claymore/:claymoreId', claymore.read);
app.put('/api/claymore/:claymoreId', claymore.update);
app.delete('/api/claymore/:claymoreId', claymore.delete);
app.param('claymoreId', claymore.claymoreById);

app.get('/api/orabelle', orabelle.list);
app.get('/api/orabelle/skinny', orabelle.skinnyOrabelle);
app.post('/api/orabelle', orabelle.create);
app.get('/api/orabelle/:orabelleId', orabelle.read);
app.put('/api/orabelle/:orabelleId', orabelle.update);
app.delete('/api/orabelle/:orabelleId', orabelle.delete);
app.param('orabelleId', orabelle.orabelleById);

app.get('/api/hoss', hoss.list);
app.get('/api/hoss/skinny', hoss.skinnyHoss);
app.post('/api/hoss', hoss.create);
app.get('/api/hoss/:hossId', hoss.read);
app.put('/api/hoss/:hossId', hoss.update);
app.delete('/api/hoss/:hossId', hoss.delete);
app.param('hossId', hoss.hossById);

app.get('/api/titan', titan.list);
app.get('/api/titan/skinny', titan.skinnyTitan);
app.post('/api/titan', titan.create);
app.get('/api/titan/:titanId', titan.read);
app.put('/api/titan/:titanId', titan.update);
app.delete('/api/titan/:titanId', titan.delete);
app.param('titanId', titan.titanById);

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.get('/', function(req,res){
  console.log('index here');
  res.sendFile(path.join(__dirname, 'public/', 'index.html'));
});

http.createServer(app).listen(app.get('port'), function(){
  logger.info("Starting this biatch up right");
  console.log('Express server listening on port ' + app.get('port'));
});