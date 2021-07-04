export default {
  roots: [
    `<rootDir>/packages`
  ],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json"
    }
  },
  resetMocks: true,
  resetModules: true,
  moduleDirectories: [
    "node_modules",
    "packages/**/*"
  ],
  testEnvironment: 'jsdom',
  // collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts, tsx, js, jsx}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ],
  coverageDirectory: './coverage',
  moduleFileExtensions: [
    "js",
    "jsx",
    "tsx",
    "ts",
    "jest"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/coverage/",
    "/rollup/",
    "/cypress/"
  ],
  transformIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/coverage/",
    "/rollup/",
    "/cypress/"
  ],
  watchPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/coverage/",
    "/rollup/",
    "/cypress/"
  ],
  testMatch: [
    "**/tests/**/*.+(ts|tsx|js)",
    "**/?(*.)+(test).+(ts|tsx|js)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}