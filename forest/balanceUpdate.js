const ForestAdmin = require('forest-express-sequelize');

ForestAdmin.collection('BalanceUpdate', {
  actions: [
    {
      name: 'Bulk import',
      type: 'global',
      fields: [{ field: 'file', type: 'File' }]
    }
  ]
});
