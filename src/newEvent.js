OAuth.initialize('-Rzipes15nnYRX0CDOrIUEb-4RE');
var user_token;

$('.header__add-event').on('click', function() {
  OAuth.popup('github',{cache: true})
  .then(function(github) {
    user_token = github.access_token;
    return github.get('/user');
  })
  .then(function(data) {
    console.log(data);
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
        var data = {
          title: $('input[name=title]').val(),
          date: $('input[name=date]').val(),
          location: $('input[name=location]').val(),
          description: $('textarea[name=description]').val()
        };
        addEvent(data);
        return false;
    });

  })
  .fail(function(err) {
    console.log("retry");
  });
});

function addEvent(event){
  var issue = transformEvent(event);
  createIssue(issue);
}

function createIssue(issueJSON) {
  $.ajax({
    url: "https://api.github.com/repos/innojs/web-events/issues?access_token=" + user_token,
    method: "POST",
    data: JSON.stringify({
      "test": "title"
    }),
    success: function() {
      console.log("lol");
    }
  });
  // OAuth.popup('github',{cache: true})
  // .then(function(github) {
  //   return github.post('/repos/innojs/web-events/issues?access_token=' + user_token, {
  //     data: {
  //       "title": "test"
  //     }
  //   });
  // })
  // .then(function() {
  //   console.log('success');
  // })
}

function transformEvent(event){
  var title = event.title;
  delete event.title;
  var newIssue = {
    title: title,
    body: "```" + JSON.stringify(event) + "```"
  };
  return JSON.stringify(newIssue);
}


// $('.form__control>button').on('click', function() {
//   $('.feed').remove(this);
// })
