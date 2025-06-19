const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^jose': '<rootDir>/__mocks__/jose.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jose)/)',
  ],
}

module.exports = createJestConfig(customJestConfig)