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
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
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
