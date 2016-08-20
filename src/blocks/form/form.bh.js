bh.match('form', function(ctx, json) {
    ctx.content({
        elem: 'control',
        content: json.content
    }, true)
});

bh.match('form__control', function(ctx) {
    ctx.tag('form')
});
