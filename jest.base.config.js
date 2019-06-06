module.exports = {
  preset: 'jest-preset-angular',
  setupTestFrameworkScriptFile: "<rootDir>/src/setup-jest.jest.ts",
  moduleNameMapper: {
    "@w11k/ngx-select": "<rootDir>/dist/w11k/ngx-select",
  }
};
