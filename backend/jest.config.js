module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^@prisma/__generated__$': '<rootDir>/../prisma/__generated__',
        '^@prisma/__generated__/(.*)$': '<rootDir>/../prisma/__generated__/$1',
    },
    moduleDirectories: ['node_modules', 'src'],
};
