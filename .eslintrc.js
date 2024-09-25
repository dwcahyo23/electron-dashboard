module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier',
    'plugin:@tanstack/eslint-plugin-query/recommended'
  ],
  settings: {
    react: {
      version: 'detect' // Automatically detect the React version
    }
  },
  plugins: ['unused-imports'], // Add this plugin
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
    ],
    'no-console': 'warn',
    'no-unused-vars': 'off', // Turn this off to use `unused-imports/no-unused-vars`
    'unused-imports/no-unused-vars': [
      'error',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }
    ],
    'unused-imports/no-unused-imports': 'error' // Automatically remove unused imports
  }
}
