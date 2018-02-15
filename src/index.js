const path = require('path');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cors = require('express-cors');
const ForestAdmin = require('forest-express-sequelize');
const jwt = require('express-jwt');
const { postgraphql } = require('postgraphql');
const pg = require('pg');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { sequelize } = require('./models/index');

// must use SSL to connect to Heroku
pg.defaults.ssl = true;

const app = express();

// gzip
app.use(compression());

// json parser
app.use(bodyParser.json());

// url encoding
app.use(bodyParser.urlencoded({ extended: false }));

// cookies
app.use(
  cookieSession({
    keys: [process.env.FOREST_AUTH_SECRET]
  })
);

// static files
app.use(express.static('public'));

// cors
app.use(
  cors({
    allowedOrigins: ['*.forestadmin.com', 'localhost:5000'],
    headers: ['Authorization', 'X-Requested-With', 'Content-Type']
  })
);

// jwt
app.use(
  jwt({
    secret: process.env.FOREST_AUTH_SECRET,
    credentialsRequired: false
  })
);

// forest admin
app.use(
  ForestAdmin.init({
    modelsDir: path.resolve('src/models'),
    envSecret: process.env.FOREST_ENV_SECRET,
    authSecret: process.env.FOREST_AUTH_SECRET,
    sequelize
  })
);

// postgraphql
app.use(
  postgraphql(`${process.env.DATABASE_URL}?ssl=1`, 'public', {
    graphiql: true
  })
);

// passport
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, { id });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      if (profile.id === process.env.GOOGLE_OAUTH_ALLOWED_USER_ID) {
        return done(null, { id: profile.id });
      }

      return done();
    }
  )
);
app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(path.resolve('src/views/app.html'));
  } else {
    res.sendFile(path.resolve('src/views/index.html'));
  }
});

// start server
app.listen(process.env.PORT || 5000);
