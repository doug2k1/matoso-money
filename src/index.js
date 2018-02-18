const path = require('path');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const session = require('express-session');
const SessionStore = require('connect-session-sequelize')(session.Store);
const cors = require('express-cors');
const ForestAdmin = require('forest-express-sequelize');
const jwt = require('express-jwt');
const pg = require('pg');
const { sequelize } = require('./models');
const setupAuth = require('./setupAuth');
const setupGraphQL = require('./setupGraphQL');

// must use SSL to connect to Heroku
pg.defaults.ssl = true;

const app = express();

// gzip
app.use(compression());

// json parser
app.use(bodyParser.json());

// url encoding
app.use(bodyParser.urlencoded({ extended: false }));

// session
const sessionStore = new SessionStore({
  db: sequelize
});

app.use(
  session({
    secret: [process.env.FOREST_AUTH_SECRET],
    store: sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === 'production'
    },
    resave: false
  })
);

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

// auth
setupAuth(app);

// graphql
setupGraphQL(app);

// static files
app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log(req.user);
  if (req.isAuthenticated()) {
    res.sendFile(path.resolve('src/views/app.html'));
  } else {
    res.sendFile(path.resolve('src/views/index.html'));
  }
});

// start server
app.listen(process.env.PORT || 5000);
