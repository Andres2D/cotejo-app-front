module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testPathIgnorePatterns: [
        "<rootDir>/src/test.ts",
        "<rootDir>/src/app/app-routing.module.spec.ts"
    ],
    collectCoverage: true,
    coverageReporters: ['text'],
    coverageThreshold: {
        global: {
            branches: '4',
            functions: '40',
            lines: '50',
            statements: '50',
        }
    }
};
