module.exports = {
  root: true,
  extends: ['next', 'next/core-web-vitals', 'eslint:recommended', 'plugin:tailwindcss/recommended'],
  plugins: ['tailwindcss'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/no-custom-classname': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-undef': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.{ts,tsx}', '**/*.stories.{ts,tsx}'],
      env: {
        jest: true,
        browser: true,
        node: true,
      },
    },
  ],
};

