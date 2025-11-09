module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['next', 'next/core-web-vitals', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/*.test.{js,jsx,ts,tsx}', '**/__tests__/**/*.{js,jsx,ts,tsx}'],
      env: {
        jest: true,
      },
    },
    {
      files: ['**/*.stories.{js,jsx,ts,tsx}'],
      env: {
        browser: true,
      },
    },
  ],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
};



