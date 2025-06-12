module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.controller.ts', '!**/node_modules/**', '!**/dist/**', '!**/coverage/**'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^@prisma/__generated__$': '<rootDir>/../prisma/__generated__',
        '^@prisma/__generated__/(.*)$': '<rootDir>/../prisma/__generated__/$1',
    },
    moduleDirectories: ['node_modules', 'src'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    coverageReporters: ['text', 'lcov', 'clover', 'html'],
};
