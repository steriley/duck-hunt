/* eslint-env node */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:vue/strongly-recommended',
    'plugin:@typescript-eslint/recommended',
    '@vue/typescript/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['**/*.vue'],
      parser: 'vue-eslint-parser',
    },
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.base.json'],
  },
  rules: {
    'vue/no-multiple-template-root': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
};
