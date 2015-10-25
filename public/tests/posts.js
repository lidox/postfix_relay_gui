suite('Posts Tests', function(){
    test('page title must be cool also with posts', function(){
        assert(document.title && document.title.match(/^HHU/));
    });
});