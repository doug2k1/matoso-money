const ForestAdmin = require('forest-express-sequelize');

ForestAdmin.collection('BalanceUpdate', {
  actions: [
    {
      name: 'Bulk import',
      global: true,
      fields: [{ field: 'file', type: 'File' }]
    }
  ]
});
