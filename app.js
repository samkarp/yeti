var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
var cors = require('cors');
var http = require('http');
var logger = require('./config/log.js');

var cats = require('./routes/cat');
var claymore = require('./routes/claymore');
var elephants = require('./routes/elephant');
var monkeys = require('./routes/monkey');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.get('/api/claymore', claymore.list);
app.post('/api/claymore', claymore.create);
app.get('/api/claymore/:claymoreId', claymore.read);
app.put('/api/claymore/:claymoreId', claymore.update);
app.delete('/api/claymore/:claymoreId', claymore.delete);
app.param('claymoreId', claymore.claymoreById);

app.get('/api/cats', cats.list);
app.post('/api/cats', cats.create);
app.get('/api/cats/:catId', cats.read);
app.put('/api/cats/:catId', cats.update);
app.delete('/api/cats/:catId', cats.delete);
app.param('catId', cats.catById);

app.get('/api/elephants', elephants.list);
app.post('/api/elephants', elephants.create);
app.get('/api/elephants/:elephantId', elephants.read);
app.put('/api/elephants/:elephantId', elephants.update);
app.delete('/api/elephants/:elephantId', elephants.delete);
app.param('elephantId', elephants.elephantById);

app.get('/api/monkeys', monkeys.list);
app.post('/api/monkeys', monkeys.create);
app.get('/api/monkeys/:monkeyId', monkeys.read);
app.put('/api/monkeys/:monkeyId', monkeys.update);
app.delete('/api/monkeys/:monkeyId', monkeys.delete);
app.param('monkeyId', monkeys.monkeyById);

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