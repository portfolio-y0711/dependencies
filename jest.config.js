/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  clearMocks: true,
  coverageProvider: "v8",
  // roots: [
  //   "<rootDir>"
  // ],
  // runner: "jest-runner",
  // setupFiles: [],
  testEnvironment: "node",
  // testMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  // ],
  moduleNameMapper: {
    "#tests/(.*)": [
      "<rootDir>/__tests__/fixtures/$1",
    ]
  },
  testPathIgnorePatterns: [
    "/node_modules/", "fixtures"
  ],
  // transformIgnorePatterns: [
  //   "/node_modules/",
  //   "\\.pnp\\.[^\\/]+$"
  // ],
  verbose: true,
  // watchPathIgnorePatterns: [],
};
