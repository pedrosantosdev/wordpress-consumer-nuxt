module.exports = {
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
	},
	testRegex: '\\.(test|spec)\\.(js|ts)$',
	testPathIgnorePatterns: ['/dist/', '/node_modules/', '/.nuxt/'],
	testEnvironmentOptions: {
		customExportConditions: ['node', 'node-addons'],
	},
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
	testEnvironment: 'jsdom',
}
