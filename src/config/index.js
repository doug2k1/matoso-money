const baseConfig = {};

const devConfig = {
  siteURL: 'http://localhost:5000'
};

const prodConfig = {
  siteURL: 'https://matoso-money.herokuapp.com'
};

module.exports =
  process.env.NODE_ENV === 'production'
    ? Object.assign(baseConfig, prodConfig)
    : Object.assign(baseConfig, devConfig);
