module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "globals": {
        "require": true,
        "exports": true
    },
    "rules": {
        "no-bitwise": 0,                // Prohibit bitwise operators (&, |, ^, etc.)
        "camelcase": 0,                 //
        "curly": [ 2, "all" ],          // enforce use of curly brackets for if statements and such
        "eqeqeq": [ 0, "always" ],      // warning for non-triple equalities
        "wrap-iife": [ 2, "any" ],      // wrapping immediate invokations in parenthesis ex (function () {} () )
        "no-use-before-define": 2,      // variables are not allowed to be used unless they are defined beforehand
        "new-cap": 0,
        "no-caller": 2,                 // Prohibit use of `arguments.caller` and `arguments.callee`.
        "quotes": [ 2, "single" ],      // use single quotes
        "no-undef": 2,                  // no undefined variables
        "no-unused-vars": [ 2, {        // enforces use of all variables except those in function args
            "args": "none"
        }],
        "strict": [ 1, "global" ],      // http://eslint.org/docs/rules/strict
        "no-loop-func": 0,              // warns of making a function in a loop
        "indent": [ 2, 4, {             // enforces indents of 4 spaces
            "SwitchCase": 1
        }],
        "no-empty": 0,
        "keyword-spacing": 2,           // require spacing before and after keywords (ex: if, while, for, etc)
        "space-before-function-paren": 2,   //pretty self explanitory (spaces before parentheisis in declaring a funciton enforced)
        "no-redeclare": [ 2, {          // Prohibits redeclaration of variables using var when the variable is already declared and initialized
            "builtinGlobals": true
        }],
        "no-func-assign": 2,            // Prohibits reassigning of function declarations (ex: declaring function foo() {} and then later on doing foo = 'bar')
        "semi": ["error", "always"],    // enforces semi colons wherever they are required
        "space-before-blocks": "error", // Enforces the use of spaces before curly braces (i.e. blocks)

    }
}
