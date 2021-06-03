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
  collectCoverageFrom: ["packages/**/*"],
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
    "/rollup/"
  ],
  transformIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/coverage/",
    "/rollup/"
  ],
  watchPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/coverage/",
    "/rollup/"
  ],
  testMatch: [
    "**/tests/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}