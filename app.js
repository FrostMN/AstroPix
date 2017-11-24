var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var index = require('./routes/index');
var favorites = require('./routes/favorites');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// loads all mongoDB info
var mongo_url = process.env.MONGO_URL;
mongo_url = mongo_url.replace('{user}', process.env.MONGO_ASTRO_USER);
mongo_url = mongo_url.replace('{pword}', process.env.MONGO_ASTRO_PW);
mongo_url = mongo_url.replace('{db}', process.env.MONGO_ASTRO_DB_NAME);

// Config session store
var store = new MongoDBStore({ uri: mongo_url, collection: 'sessions-astro'}, function (err) {
    if (err) {
      console.log("Error, cannot connect to MongoDB");
    }
});

// sets configs for session
app.use(session({
    secret: 'cWrqJPd2CBv8oKtYiMGWpEiKuqD2AfzHkDEH8MTwYU',
    resave: true,
    saveUninitialized: true,
    store: store
}));

// registers routes
app.use('/', index);
app.use('/favorites', favorites);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
