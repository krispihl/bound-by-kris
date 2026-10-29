import js from '@eslint/js'
import globals from 'globals'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettierConfig from 'eslint-config-prettier'

const exportAllRestriction = {
  selector: 'ExportAllDeclaration',
  message: 'Barrel re-exports (`export *`) are not allowed. Export only what is needed.',
}

const typeAssertionRestriction = {
  selector: "TSAsExpression:not([typeAnnotation.type='TSTypeReference'][typeAnnotation.typeName.name='const']), TSTypeAssertion",
  message: 'Avoid `as` type assertions. Narrow with a type guard instead (`as const` is fine).',
}

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended,
      prettierConfig,
    ],
    plugins: { react },
    settings: { react: { version: 'detect' } },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      complexity: ['error', 14],
      'react-hooks/exhaustive-deps': 'error',
      'react/jsx-no-leaked-render': 'error',
      'no-restricted-syntax': ['error', exportAllRestriction, typeAssertionRestriction],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['**/*.test.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': ['error', exportAllRestriction],
    },
  },
])
