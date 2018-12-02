module.exports = {
  preset: 'ts-jest',
  "testPathIgnorePatterns": [
    "/node_modules/",
    "/lib/"
  ],
  testMatch: null,
  "testRegex": "(/test/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "json"
  ],
  "coverageDirectory": "./coverage",
  "setupTestFrameworkScriptFile": "<rootDir>src/setupTests.ts"
};
