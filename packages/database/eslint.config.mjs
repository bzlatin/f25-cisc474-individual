import libraryConfig from '@repo/eslint-config/library';

export default [
  ...libraryConfig,
  {
    rules: {
      'turbo/no-undeclared-env-vars': [
        'error',
        {
          allowList: ['NODE_ENV'],
        },
      ],
    },
  },
];
