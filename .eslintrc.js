module.exports = {
  root: true,
  parser: 'babel-eslint',
  plugins: ['node'],
  extends: ['plugin:node/recommended', 'prettier'],
  env: {
    node: true
  }
};
