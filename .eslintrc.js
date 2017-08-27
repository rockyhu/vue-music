// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'indent': 0,
    //'indent': ['error', 'tab'],
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    //'semi': ["error", "always"],
    'eol-last': 0,
    'no-tabs': "off",
    'space-before-function-paren': 0,
    'no-multiple-empty-lines': 0,
    'no-unused-vars': 0,
    'padded-blocks': 0,
    'no-trailing-spaces': 0
  }
}