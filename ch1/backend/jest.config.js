/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: "node",
  globalSetup: "<rootDir>/src/test/globalSetup.js",
  globalTeardown: "<rootDir>/src/test/globalTeardown.js",
  setupFilesAfterEnv: ["<rootDir>/src/test/setupFileAfterEnv.js"],
};

export default config;
