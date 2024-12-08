// frontend/.eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended'
  ],
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { 
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_',
      'ignoreRestSiblings': true 
    }]
  },
};
  