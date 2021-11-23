module.exports = {
  root: true, // Make sure eslint picks up the config at the root of the directory
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2021, // Use the latest ecmascript standard
    sourceType: 'module', // Allows using import/export statements
    ecmaFeatures: {
      jsx: true, // Enable JSX since we're using React
    },
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
  env: {
    browser: true, // Enables browser globals like window and document
    amd: true, // Enables require() and define() as global variables as per the amd spec.
    node: true, // Enables Node.js global variables and Node.js scoping.
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended', // Make this the last element so prettier config overrides other formatting rules
  ],
  rules: {
    'max-len': 0,
    'no-unused-vars': 0,
    'jsx-a11y/no-autofocus': 'off',
    'react/prop-types': 'off',
    'prettier/prettier': ['off', { endOfLine: 'auto' }, { usePrettierrc: true }], // Use our .prettierrc file as source
  },
};
