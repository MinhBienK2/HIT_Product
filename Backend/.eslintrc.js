const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
    env: {
        "browser": true,
        "es2021": true,
        "node": true
    },
    plugins: ['prettier'],
    extends: ["eslint:recommended","prettier"],
    overrides: [
        {
            "env": {
                "node": true
            },
            files: ['**/*.ts?(x)'],
            "parserOptions": {
                "sourceType": "script"
            },
            rules: { 'prettier/prettier': ['warn', prettierOptions] },
        }
    ],
    parserOptions: {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    rules: {
        'prettier/prettier': ['error', prettierOptions],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        semi: ["error", "always"],
        //'no-unused-vars': ['error', { vars: 'all' }], //error when variable not used
      },
};
