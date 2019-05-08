module.exports = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  collectCoverageFrom: [
    'client/**/*.js',
    '!e2e/**/*.js',
    '!client/**/*.test.js',
    '!client/**/TestUtils.js',
  ],
};
