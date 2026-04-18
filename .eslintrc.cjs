module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: 'detect' } },
  rules: {
    'react/prop-types': 'off',
    'react/jsx-uses-vars': 'error',
    'no-unused-vars': ['warn', {
      varsIgnorePattern: '^[A-Z_]|^motion$',
      argsIgnorePattern: '^_'
    }],
  },
}
