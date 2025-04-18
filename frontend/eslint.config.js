import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'import/order': ['error', { 'newlines-between': 'always' }], // Правила порядка импортов
      'jsx-a11y/alt-text': 'warn', // Проверка наличия альтернативного текста для изображений
      'prettier/prettier': 'error', // Интеграция с Prettier
      'react-hooks/rules-of-hooks': 'error', // Обязательно следовать правилам хуков
      'react-hooks/exhaustive-deps': 'warn', // Предупреждения о зависимостях эффектов
      'no-console': 'warn', // Предупреждение при использовании console
    },
  }
);
