module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: false,
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    node: true,
    es2020: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
      "no-console": "error",

    'semi': ['error', 'always'],                
    'quotes': ['error', 'single'],              
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],   
    'indent': ['error', 2],                       
  },
  ignorePatterns: ['dist/**'],
};
