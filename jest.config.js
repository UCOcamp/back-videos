const options = {
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/*.test.ts'],
  testEnvironment: 'node',
  silent: true,
  collectCoverage: true,
};
module.exports = options;
