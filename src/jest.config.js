module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'client/**/*.js',
    '!e2e/**/*.js',
    '!client/**/*.test.js',
    '!client/**/TestUtils.js',
  ],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  testEnvironment: 'jsdom',
  verbose: true,
};
