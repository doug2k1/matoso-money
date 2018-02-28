const ForestAdmin = require('forest-express-sequelize');
const parseDataURI = require('parse-data-uri');
const csvParse = require('csv-parse');
const { BalanceUpdate } = require('../src/models');

const setup = app => {
  // builk import
  app.post(
    '/forest/actions/bulk-import',
    ForestAdmin.ensureAuthenticated,
    (req, res) => {
      csvParse(
        parseDataURI(req.body.data.attributes.values.file).data,
        { columns: true, comment: '#' },
        (err, rows) => {
          if (err) res.status(500).send(err);

          BalanceUpdate.bulkCreate(rows).then(() => {
            res.send({ success: 'Data successfuly imported!' });
          });
        }
      );
    }
  );
};

module.exports = setup;
