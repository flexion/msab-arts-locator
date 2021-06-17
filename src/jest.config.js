module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'environments/**/*.js',
    'presenter/**/*.js',
    'utilities/**/*.js',
    'persistence/**/*.js',
    'interactors/**/*.js',
    'controllers/**/*.js',
    '!**/*ApplicationContext*.js',
  ],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      branches: 26,
      functions: 26,
      lines: 31,
      statements: 31,
    },
  },
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test Report',
      },
    ],
  ],
  testEnvironment: 'jsdom',
  verbose: true,
};
