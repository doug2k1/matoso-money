const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('express-cors');
const ForestAdmin = require('forest-express-sequelize');
const jwt = require('express-jwt');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(
  cors({
    allowedOrigins: ['*.forestadmin.com', 'localhost:3000'],
    headers: ['Authorization', 'X-Requested-With', 'Content-Type']
  })
);
app.use(
  jwt({
    secret: process.env.FOREST_AUTH_SECRET,
    credentialsRequired: false
  })
);

const groupBy = (collection, key) => {
  return collection.reduce((acc, val) => {
    (acc[val[key]] = acc[val[key]] || []).push(val);
    return acc;
  }, {});
};

app.use(
  ForestAdmin.init({
    modelsDir: __dirname + '/models',
    envSecret: process.env.FOREST_ENV_SECRET,
    authSecret: process.env.FOREST_AUTH_SECRET,
    sequelize: require('./models').sequelize
  })
);

app.listen(process.env.PORT || 3000);
