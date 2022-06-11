module.exports = {
  env: {
    node: true,
  },
  plugins: ['prettier', 'import', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'prettier',
    'xo',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index', 'object'],
        ],
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
      },
    ],
    // Defer to Prettier
    indent: 'off',
    'arrow-parens': 'off',
    'object-curly-spacing': 'off',
    // '@typescript-eslint/comma-dangle': 'off',
    // '@typescript-eslint/space-before-function-paren': 'off',
  },
};
