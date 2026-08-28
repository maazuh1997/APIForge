export default [
  {
    ignores: ['node_modules/**', 'coverage/**']
  },
  {
    files: ['**/*.js'],
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'error'
    }
  }
]
