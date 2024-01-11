import baseConfig from './jest.config';

export default {
  ...baseConfig,
  roots: ['<rootDir>/projects/ngx-tooltip-app/src'],
  modulePathIgnorePatterns: ['<rootDir>/projects/anedomansky/ngx-tooltip'],
};
