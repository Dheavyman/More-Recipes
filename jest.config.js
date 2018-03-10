// module.exports = {
//   globals: {
//     window: true,
//   },
//   verbose: true,
//   collectCoverage: true,
//   setupTestFrameworkScriptFile: './client/__tests__/setupTest.js',
// testPathIgnorePatterns: [
//   'client/__tests__/__mocks__',
//   'client/__tests__/setupTest.js',
//   './node_modules/'],
//   collectCoverageFrom: [
//     '!client/__tests__/**/*.{js,jsx}',
//     '!client/__tests__/setupTest.js',
//     '!client/src/app/index.jsx',
//     '!client/src/store/**',
//     '!client/src/js/**',
//     '!client/public/**',
//     '!client/static/**'
//   ],
//   testMatch: [
//     '<rootDir>/client/__tests__/**/*.spec.js?(x)'
//   ],
//   roots: [
//     './client'
//   ],
//   moduleFileExtensions: ['js', 'jsx'],
//   moduleNameMapper: {
//     '\\.(jpg|jpeg|png|gif|svg)$':
//       '<rootDir>/client/__tests__/__mocks__/fileMock.js',
//     '\\.(css|scss)$': '<rootDir>/client/__tests__/__mocks__/styleMock.js'
//   },
// };

module.exports = {
  verbose: true,
  collectCoverage: true,
  coverageDirectory: '<rootDir>/client/coverage',
  // collectCoverageFrom: ['<rootDir>/client/**/*.{js,jsx}'],
  // globals: {
  //   window: true,
  // },
  setupTestFrameworkScriptFile: '<rootDir>/client/tests/__mocks__/localStorage.js', // eslint-disable-line
  testMatch: [
    '**/?(*.)(spec).js?(x)'
  ],
  testPathIgnorePatterns: [
    './node_modules/',
    'client/tests/__mocks__',
    './tests/test.js'
  ],
};
