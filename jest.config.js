module.exports = {
  globals: {
    window: true,
  },
  verbose: true,
  collectCoverage: true,
  coverageDirectory: '<rootDir>/client/coverage',
  collectCoverageFrom: [
    '**/client/**/*.{js,jsx}',
    '!**/client/**/App.jsx',
    '!**/client/public/**',
    '!**/client/coverage/**',
    '!**/client/config/**',
    '!**/client/tests/**',
    '!**/client/utils',
    '!**/client/index.jsx',
    '!**/client/store.js'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/client/tests/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/client/tests/__mocks__/styleMock.js'
  },
  setupFiles: ['<rootDir>/client/tests/__mocks__/localStorage.js'],
  setupTestFrameworkScriptFile: '<rootDir>/client/tests/setupTest.js', // eslint-disable-line
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: [
    '<rootDir>/client/tests/**/?(*.)(spec).js?(x)'
  ],
  testPathIgnorePatterns: [
    './node_modules/',
    'client/tests/__mocks__',
    '<rootDir>/tests/__mocks__'
  ],
};
