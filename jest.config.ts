export default {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/cypress/',
    '/projects/anedomansky/ngx-tooltip/src/gen/',
  ],
  coverageDirectory: 'coverage/',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/cypress/',
    '/dist/',
    '.html',
  ],
  moduleNameMapper: {
    '@anedomansky/ngx-tooltip':
      '<rootDir>/dist/anedomansky/ngx-tooltip/fesm2022/anedomansky-ngx-tooltip.mjs',
  },
};
