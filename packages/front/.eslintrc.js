module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'xo',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
	],
	rules: {
		'react/function-component-definition': ['error', {
			namedComponents: 'arrow-function',
			unnamedComponents: 'arrow-function',
		}],
		'react/react-in-jsx-scope': 'off',
		'import/prefer-default-export': 'off',
		'arrow-body-style': 'off',
		'react/jsx-filename-extension': [1, { extensions: ['.jsx', 'tsx'] }],
		'object-curly-spacing': [2, 'always'],
	},
};
