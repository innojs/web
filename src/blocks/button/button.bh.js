bh.match('button', function(ctx, json) {
    ctx.tag('button');
    json.type && ctx.attr('type', json.type);
    ctx.content(json.text);
});
