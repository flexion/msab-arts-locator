module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'environments/**/*.js',
    'presenter/**/*.js',
    'utilities/**/*.js',
    'persistence/**/*.js',
    'interactors/**/*.js',
    'controllers/**/*.js',
  ],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      branches: 25,
      functions: 22,
      lines: 30,
      statements: 30,
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
