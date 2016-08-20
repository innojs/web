OAuth.initialize('-Rzipes15nnYRX0CDOrIUEb-4RE');

$('.header__add-event').on('click', function() {
  OAuth.popup('github', {cache: true})
  .then(function(github) {
    var form = $(bh.apply({ 
        block: 'form',
        content: [
            { block: 'input', name: 'title', hint: 'Название события' },
            { block: 'input', name: 'date', hint: 'Дата проведения события' },
            { block: 'input', name: 'location', hint: 'Адрес проведения мероприятия' },
            { block: 'input', mods: { type: 'textarea' }, name: 'description', hint: 'Описание события' },
            { block: 'button', type: 'submit', text: 'Добавить событие' }
        ]
    }));
    $('.feed').prepend(form);
    $('.form__control').submit(function() {
        var event = {
            title: $('input[name=title]').val(),
            date: $('input[name=date]').val(),
            location: {
                title: $('input[name=location]').val(),
                coords: ''
            },
            description: $('textarea[name=description]').val()
        };
        var issueJSON = transformEvent(event);
        github.post("/repos/innojs/web-events/issues", {data: issueJSON});
        form.remove();
        return false;
    });

  })
  .fail(function(err) {
    console.log('retry');
  });
});

function transformEvent(event){
  var title = event.title;
  delete event.title;
  var newIssue = {
    title: title,
    body: '```' + JSON.stringify(event) + '```'
  };
  return JSON.stringify(newIssue);
}