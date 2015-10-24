suite('Global Tests', function(){
    test('page title must be cool', function(){
        assert(document.title && document.title.match(/^HHU/));
    });
});