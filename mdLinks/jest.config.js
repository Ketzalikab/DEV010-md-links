module.exports = {
    collectCoverage: true,
    coverageReporters: ["text", "lcov"],
    collectCoverageFrom: ["*.js"], 
    testMatch: ["**/*.spec.(js|cjs)"],
  };