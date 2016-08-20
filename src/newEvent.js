OAuth.initialize('-Rzipes15nnYRX0CDOrIUEb-4RE');

document.querySelector('.header__add-event').addEventListener('click', function() {
  OAuth.popup('github',{cache: true})
  .then(function(github) {
    return github.get('/user');
  })
  .then(function(data) {
    console.log("Succeses " + data.login);
  })
  .fail(function(err) {
    console.log("retry");
  });
});
