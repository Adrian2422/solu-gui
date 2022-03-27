module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
  env: {
		jest: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier'
	],
	overrides: [
		{
			files: [
				'*.ts',
			],
      rules: {
        '@typescript-eslint/consistent-type-imports': 'error',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '_'
			}
		],
		'@typescript-eslint/array-type': 'error',
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'camelcase': 'warn',
		'default-case': 'warn',
		'default-param-last': 'warn',
		'eqeqeq': 'error',
		'no-console': 'warn',
		'no-empty-function': 'warn',
		'no-eval': 'error',
		'no-implied-eval': 'error',
		'no-magic-numbers': 'warn',
		'no-shadow': 'warn',
		'no-unused-expressions': 'warn',
		'prefer-const': 'warn',
		'prefer-destructuring': 'warn',
		'prefer-spread': 'warn',
		'prefer-template': 'warn',
		'sort-imports': [ 'error', {
			'ignoreCase': false,
			'ignoreDeclarationSort': false,
			'ignoreMemberSort': false,
			'memberSyntaxSortOrder': [ 'none', 'all', 'single', 'multiple' ],
			'allowSeparatedGroups': false
		} ],
		'array-bracket-spacing': [ 'error', 'always', { 'singleValue': false } ],
		'yoda' : [ 'error', 'never' ],
		'eol-last': [ 'error', 'always' ],
		'indent': [ 'error', 'tab' ],
		'no-multi-spaces': 'warn',
		'no-multiple-empty-lines': 'warn',
		'quotes': [ 'error', 'single' ],
		'semi': [ 'error', 'always' ],
		'semi-style': [ 'error', 'last' ],
		'no-extra-semi': 'warn'
      }
		},
    {
      "files": [
        "*.html"
      ],
      "extends": [
        "plugin:@angular-eslint/template/recommended"
      ],
      "rules": {}
    }
	]
};
