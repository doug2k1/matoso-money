module.exports = {
  root: true,
  parser: 'babel-eslint',
  plugins: ['graphql', 'flowtype'],
  extends: ['airbnb', 'prettier'],
  env: { browser: true },
  rules: {
    'comma-dangle': ['error', 'never'],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: []
      }
    ],
    'react/jsx-filename-extension': ['off'],
    'react/no-children-prop': ['off'],
    'react/no-multi-comp': ['off'],
    'react/prefer-stateless-function': ['off']
  }
};
