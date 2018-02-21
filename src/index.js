const path = require('path');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
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
app.use(
  session({
    secret: process.env.SESSION_KEY,
    store: new RedisStore({
      url: process.env.REDIS_URL
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 2.592e9 // 30 days
    },
    resave: false,
    saveUninitialized: false,
    proxy: true
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

// template
app.set('view engine', 'ejs');
app.set('views', './src/views');

// static files
app.use(express.static('public'));

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('app');
  } else {
    res.render('index');
  }
});

// start server
app.listen(process.env.PORT || 5000);
