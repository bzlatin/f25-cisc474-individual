import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tanstackConfig } from '@tanstack/eslint-config';

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
    ignores: ['eslint.config.js'],
  },
];
