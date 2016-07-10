const os = require('os');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const logger = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const routes = require('./routes/index');
const models = require('./models');
const helpers = require('./util/helpers');
const listeners = require('./util/listeners');

const app = express();

app.set('views', path.join(__dirname, '../front/views'));
app.set('view engine', 'pug');

// Enable CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(favicon(path.join(__dirname, '../front/static', 'favicon.ico')));

app.use(logger('dev'));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: models.sequelize,
  }),

}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy({
  clientID: 'd87530f855c18573e868',
  clientSecret: '16136b982bbd0d619d906ee23b8c81e516f093ad',
  callbackURL: 'http://muddles.nepenth.xyz/auth/github/callback',
},
  function(accessToken, refreshToken, profile, cb) {
    models.User.findOrCreate({
      where: {
        githubId: profile.id,
        accessToken,
        refreshToken,
        username: profile.username,
        avatar: profile._json.avatar_url,
        profile: profile.profileUrl,
      },
    })
      .then(function () {
        cb(null, profile);
      });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.username);
});

passport.deserializeUser(function (githubId, done) {
  models.User.findOne({
    where: {
      githubId
    }
  }).then(function (user) {
    done(null, user);
  });
});

app.use(express.static(path.join(__dirname, '../front/static')));

app.use(function (req, res, next) {
  console.log('req.user:', req.user);
  console.log('req.isAuthenticated:', req.isAuthenticated);
  console.log('req.isAuthenticated():', req.isAuthenticated());
  console.log('req.session:', req.session);
  next();

});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler, will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler, no stacktraces leaked to user
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

const port = helpers.normalizePort(process.env.PORT || '3000');
app.set('port', port);

models.sequelize.sync({force: true})
  .then(function () {
    app.listen(port);
    app.on('error', listeners.onError);
    app.on('listening', listeners.onListening);
    console.log('Server running on http://' + os.hostname() + ':' + port);
  });

module.exports = app;
