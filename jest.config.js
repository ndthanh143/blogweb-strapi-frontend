module.exports = {
  compilerOptions: {
    paths: {
      '@/*': ['./src/*'],
    },
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    'react-markdown': '<rootDir>/node_modules/react-markdown/react-markdown.min.js',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./setupTests.js'],
};
