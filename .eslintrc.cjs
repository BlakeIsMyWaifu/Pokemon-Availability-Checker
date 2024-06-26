/** @type {import('eslint').Linter.Config} */
module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:react-hooks/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react/recommended'
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		project: './tsconfig.json'
	},
	plugins: [
		'@stylistic',
		'@typescript-eslint',
		'react',
		'react-hooks',
		'react-refresh',
		'simple-import-sort'
	],
	settings: {
		react: {
			version: 'detect'
		}
	},
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'simple-import-sort/imports': 'warn',
		'simple-import-sort/exports': 'warn',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				vars: 'all',
				args: 'after-used',
				argsIgnorePattern: '^_'
			}
		],
		'@typescript-eslint/no-empty-function': 'warn',
		'@typescript-eslint/no-empty-interface': 'warn',
		'react/self-closing-comp': [
			'warn',
			{
				component: true,
				html: true
			}
		],
		'@typescript-eslint/consistent-type-imports': [
			'warn',
			{
				fixStyle: 'inline-type-imports'
			}
		],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'react/react-in-jsx-scope': 'off',
		'@stylistic/quotes': ['warn', 'single', { 'avoidEscape': true }]
	}
}
