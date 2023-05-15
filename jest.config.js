module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest',
    '\\.(gif|png|jpg|ttf|eot|svg)$': '<rootDir>/src/__mocks__/assetMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  testEnvironment: 'jsdom',
};
