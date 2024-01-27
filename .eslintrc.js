module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        // Indentation
        'react/jsx-indent': ['warn', 2], // Enforce consistent indentation for JSX
        'react/jsx-indent-props': ['warn', 2], // Enforce consistent indentation for JSX props
    
        // Line breaks
        'react/jsx-max-props-per-line': ['warn', { maximum: 1, when: 'multiline' }], // Limit maximum number of props per line in JSX
        'react/jsx-one-expression-per-line': ['warn', { allow: 'single-child' }], // Require each JSX expression to be on a new line
    
        // Spacing
        'react/jsx-closing-bracket-location': ['warn', 'line-aligned'], // Enforce closing bracket location in JSX tags
        'react/jsx-props-no-multi-spaces': 'warn', // Disallow multiple spaces between JSX attributes
    
        // Wrapping and parentheses
        'react/jsx-wrap-multilines': ['warn', { declaration: 'parens-new-line', assignment: 'parens-new-line', return: 'parens-new-line', arrow: 'parens-new-line', condition: 'parens-new-line', logical: 'parens-new-line', prop: 'parens-new-line' }], // Enforce wrapping JSX in parentheses when multiple lines
    
        // Order and sorting
        'react/jsx-sort-props': ['warn', { reservedFirst: true }], // Enforce sorting of JSX props
    
        // Self-closing tags
        'react/self-closing-comp': 'warn', // Enforce self-closing tags for JSX elements without children
        'react/jsx-closing-tag-location': 'warn', // Enforce closing tag location in JSX
    
        // Other formatting rules
        'react/jsx-curly-brace-presence': ['warn', 'never'] // Enforce curly braces around JSX props
        // ... add more formatting rules based on your preferences
    
        // 'react/function-component-definition': ['error', { namedComponents: 'function-declaration' }],
        // 'max-lines-per-function': ['error', { max: 100, skipBlankLines: true, skipComments: true }],
        // 'max-lines': ['error', { max: 700, skipBlankLines: true, skipComments: true }]
      }
}
