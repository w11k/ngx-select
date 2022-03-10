module.exports = {
  moduleNameMapper: {
    "@w11k/ngx-select": "<rootDir>/dist/w11k/ngx-select",
  },
  roots: ['<rootDir>/src/app'],
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
};
