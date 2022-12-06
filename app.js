var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ngrok = require('ngrok');
var open = require('open');
require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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



const ngrokOpts = {
  authtoken: process.env.TOKEN,
  port: 3000
}


if (NODE_ENV === "production") {
  // For now, this tunnels to a subdomain on
  // ngrok. For an official deployment
  // a CNAME setup is recommended
  // https://ngrok.com/docs/guides/how-to-set-up-a-custom-domain
  
  ngrokOpts.subdomain = "deployment"

} else if (NODE_ENV === "staging") {
  ngrokOpts.subdomain = "staging-deployment"
  // ngrokOpts.oauth = myTeamEmails

} else {
  // presume localhost, spin up on random url
  // ngrokOpts.oauth = myTeamEmails

}


ngrok.connect(ngrokOpts).then(res => {
  open(res);
})

module.exports = app;