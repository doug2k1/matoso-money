const path = require('path');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('express-cors');
const ForestAdmin = require('forest-express-sequelize');
const jwt = require('express-jwt');
const { postgraphql } = require('postgraphql');
const pg = require('pg');
const { sequelize } = require('./models/index');

// must use SSL to connect to Heroku
pg.defaults.ssl = true;
const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(
  cors({
    allowedOrigins: ['*.forestadmin.com', 'localhost:5000'],
    headers: ['Authorization', 'X-Requested-With', 'Content-Type']
  })
);
app.use(
  jwt({
    secret: process.env.FOREST_AUTH_SECRET,
    credentialsRequired: false
  })
);
app.use(
  ForestAdmin.init({
    modelsDir: path.resolve('/models'),
    envSecret: process.env.FOREST_ENV_SECRET,
    authSecret: process.env.FOREST_AUTH_SECRET,
    sequelize
  })
);
app.use(
  postgraphql(`${process.env.DATABASE_URL}?ssl=1`, 'public', {
    graphiql: true
  })
);

app.listen(process.env.PORT || 5000);
