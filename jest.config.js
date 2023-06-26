module.exports = {
  compilerOptions: {
    paths: {
      '@/*': ['./src/*'],
    },
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./setupTests.js'],
};
