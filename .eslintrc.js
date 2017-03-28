module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'yoda': 'off',
    'comma-dangle': ["off", "always"],
    'space-before-function-paren': ["error", "never"],
    'no-extend-native': 'off'
  },
  globals: {}
}
