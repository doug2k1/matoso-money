const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('express-cors');
const ForestAdmin = require('forest-express-sequelize');
const jwt = require('express-jwt');
const postgraphql = require('postgraphql').postgraphql;
const pg = require('pg');

// must use SSL to connect to Heroku
pg.defaults.ssl = true;
const app = express();

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
    modelsDir: __dirname + '/models',
    envSecret: process.env.FOREST_ENV_SECRET,
    authSecret: process.env.FOREST_AUTH_SECRET,
    sequelize: require('./models').sequelize
  })
);
app.use(
  postgraphql(`${process.env.DATABASE_URL}?ssl=1`, 'public', {
    graphiql: true
  })
);

app.listen(process.env.PORT || 5000);
