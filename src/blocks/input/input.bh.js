bh.match('input', function(ctx, json) {
    ctx.tag('input');
    json.name && ctx.attr('name', json.name);
    json.hint && ctx.attr('placeholder', json.hint);
});

bh.match('input_type_textarea', function(ctx) {
    ctx.tag('textarea');
    ctx.attrs({ rows: 7, cols: 50 });
});
