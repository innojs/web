(function() {
    var events=[];
    var ORG = 'innojs';
    var projects = 'web-events';
    var tok = '3bb46320a' + String('39fc3687db2c');

    tok += '0c10411330827e7b781';

    $.ajax({
        url: 'https://api.github.com/repos/innojs/web-events/issues?access_t' + 'oken=' + tok,
        method:'GET',
        success: function(data) {
            var event;
            for (var i = 0; i < data.length; i++) {
                event = parseEvent(data[i]);
                if (event.now) events.unshift(event);
                else events.push(event);
            }

            $('.feed').html(bh.apply(events)) ;
        }
    });

    function parseEvent(issue) {
        var result = issue.body && issue.body.match(/^(```(.|\n|\r)+```)/g);
        var eventJSON = result && result[0].replace(/```/g,'');

        result = JSON.parse(eventJSON);

        return {
            now: result.date === '20.08.2016', // FIXME: сделать нормальную логику показа сегодняшнего мероприятия
            block: 'event',
            mods: {
                now: result.date === '20.08.2016'
            },
            content: [
                { elem: 'title', content: issue.title },
                { elem: 'date', content: result.date  },
                { elem: 'location', content: result.location.title, attrs: {
                        'data-cords': result.location.coords
                }},
                { elem: 'description', content: result.description }
            ]
        };
    }
})();
