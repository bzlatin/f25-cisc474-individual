import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tanstackConfig } from '@tanstack/eslint-config';
import reactHooks from 'eslint-plugin-react-hooks';
import { fixupPluginRules } from '@eslint/compat';

const tsconfigRootDir = dirname(fileURLToPath(import.meta.url));
const baseConfigs = tanstackConfig.map((config) => ({
  ...config,
  languageOptions: {
    ...(config.languageOptions ?? {}),
    parserOptions: {
      ...(config.languageOptions?.parserOptions ?? {}),
      project: ['./tsconfig.json'],
      tsconfigRootDir,
    },
  },
}));

export default [
  ...baseConfigs,
  {
    plugins: {
      'react-hooks': fixupPluginRules(reactHooks),
    },
    rules: {
      // enable the official hooks rules (includes exhaustive-deps)
      ...reactHooks.configs.recommended.rules,
      // optional: tweak severity
      // 'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    ignores: ['eslint.config.js'],
  },
];
