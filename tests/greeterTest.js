var assert = require('chai').assert,
    greet = require('../lib/greeter').greet;

suite('Greeter Test Suite', function(){
    test('Greet person', function(){
        assert(greet('Artur') === 'Hello Artur')
    });
    
    test('Greet nobody', function(){
        assert(greet('') === 'Hello ')
    });
});

// install: npm install mocha -g
// run: mocha -u tdd -R spec greeterTest.js