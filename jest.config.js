module.exports = {
	preset: 'ts-jest',
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|ts?)$',
	testPathIgnorePatterns: ['/dist/', '/node_modules/', '/.nuxt/'],
	testEnvironmentOptions: {
		customExportConditions: ['node', 'node-addons'],
	},
	modulePaths: ['<rootDir>/node_modules'],
	moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
	transform: {
		'^.+\\.ts$': 'ts-jest',
		'^.+\\.js$': 'babel-jest',
		'.*\\.(vue)$': '@vue/vue3-jest',
		'^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
	},
	collectCoverage: false,
	collectCoverageFrom: [
		'<rootDir>/components/**/*.vue',
		'<rootDir>/pages/**/*.vue',
		'<rootDir>/composables/**/*.ts',
		'<rootDir>/composables/**/*.js',
		'<rootDir>/helpers/**/*.ts',
		'<rootDir>/helpers/**/*.js',
	],
	testEnvironment: '@happy-dom/jest-environment',
	setupFiles: ['<rootDir>/jest.setup.ts'],
}
