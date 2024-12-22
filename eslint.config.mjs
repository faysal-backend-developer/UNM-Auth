import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      "eqeqeq": 'off',
      'no-unused-vars': 'error',
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      "no-console": "error",
      "no-undef": "error"
    },
  },
  {
    ignores: ['node_modules', 'dist/**/*.js', '.env'],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
