const ForestAdmin = require('forest-express-sequelize');
const models = require('../models');

ForestAdmin.collection('Investment', {
  fields: [
    {
      field: 'fullName',
      type: 'String',
      get(object) {
        return `${object.name} (${object.Broker.name})`;
      }
    }
  ]
});
