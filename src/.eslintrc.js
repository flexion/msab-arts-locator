// re-format this file with `npx eslint --ignore-pattern '!.eslintrc.js' .eslintrc.js --fix`
module.exports = {
  env: {
    browser: true,
    'cypress/globals': true,
    es6: true,
    'jest/globals': true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:cypress/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
    'plugin:react/recommended',
    'plugin:security/recommended',
    'prettier',
    // 'plugin:jsx-a11y/recommended', // todo
  ],
  overrides: [
    {
      files: ['cypress/**/*.js', 'cypress-smoketests/**/*.js'],
      rules: {
        'jest/expect-expect': 'off',
        'jest/valid-expect': 'off',
        'jest/valid-expect-in-promise': 'off',
        'promise/always-return': 'off',
        'promise/catch-or-return': 'off',
      },
    },
    {
      files: [
        'web-client/integration-tests/**/*.js',
        'web-client/integration-tests-public/**/*.js',
      ],
      rules: {
        'jest/expect-expect': 'off',
      },
    },
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 9,
    jsx: true,
    sourceType: 'module',
  },
  plugins: [
    'cypress',
    'import',
    'jest',
    'jsx-a11y',
    '@miovision/disallow-date',
    'prettier',
    'promise',
    'react',
    'security',
    'sort-destructure-keys',
    'sort-imports-es6-autofix',
    'sort-keys-fix',
    'sort-requires',
  ],
  rules: {
    '@miovision/disallow-date/no-new-date': 1,
    '@miovision/disallow-date/no-static-date': 0,
    '@miovision/disallow-date/no-to-date': 0,
    'arrow-parens': ['error', 'as-needed'],
    complexity: ['warn', { max: 20 }], // todo: plugin default is 20; set to 'error'
    'eol-last': ['error', 'always'],
    'import/named': 'warn',
    'import/no-default-export': 'error',
    'import/no-named-as-default': 'off',
    'jest/expect-expect': 'off',
    'jest/no-conditional-expect': 'off',
    'jest/no-export': 'off',
    'jest/no-identical-title': 'off', // todo: warn
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
      },
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        allowChildren: false,
        components: ['Label'],
        required: {
          every: ['id'],
        },
      },
    ],
    'max-lines': [
      'error',
      { max: 1670, skipBlankLines: true, skipComments: true }, // TODO - devex 864 - max 500 lines
    ],
    'no-irregular-whitespace': ['error', { skipStrings: false }],
    'no-prototype-builtins': 'off',
    'no-restricted-globals': [
      'error',
      { name: 'error' },
      { name: 'event' },
      { name: 'status' },
      { name: 'name' },
      { name: 'document' },
    ],
    'no-shadow': ['warn', { builtinGlobals: false }],
    'no-trailing-spaces': 'error',
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    'no-var': 'error',
    'no-warning-comments': [
      'error',
      { location: 'anywhere', terms: ['fixme', 'xxx'] },
    ],
    'object-shorthand': 'warn',
    'prefer-destructuring': [
      'error',
      {
        AssignmentExpression: {
          array: false,
          object: true,
        },
        VariableDeclarator: {
          array: false,
          object: true,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'prettier/prettier': 'error',
    'promise/always-return': 'off', // todo: warn
    'promise/avoid-new': 'off', // todo: warn
    'promise/catch-or-return': 'off', // todo: warn
    'promise/no-callback-in-promise': 'warn',
    'promise/no-native': 'off',
    'promise/no-nesting': 'warn',
    'promise/no-new-statics': 'error',
    'promise/no-promise-in-callback': 'warn',
    'promise/no-return-in-finally': 'warn',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/valid-params': 'warn',
    quotes: ['error', 'single', { avoidEscape: true }],
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        ignoreCase: false,
        noSortAlphabetically: false,
        shorthandFirst: true,
        shorthandLast: false,
      },
    ],
    'react/no-array-index-key': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'warn',
    'require-atomic-updates': 'off',
    'security/detect-child-process': 'off',
    'security/detect-non-literal-fs-filename': 'off',
    'security/detect-object-injection': 'off',
    'sort-destructure-keys/sort-destructure-keys': [
      'error',
      { caseSensitive: false },
    ],
    'sort-imports-es6-autofix/sort-imports-es6': [
      'error',
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'sort-keys-fix/sort-keys-fix': [
      'error',
      'asc',
      { caseSensitive: true, natural: true },
    ],
    'sort-requires/sort-requires': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json'],
      },
    },
    react: {
      version: '17.0.1',
    },
  },
};
