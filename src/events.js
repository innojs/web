//console.log(bh.apply({ block: 'event', elem: 'title' }));
(function() {
  var events;
  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://api.github.com/repos/innojs/web-events/issues', false);
  xhr.send();

  if (xhr.status != 200) {
    console.log("УВАГА")
  } else {
     events = xhr.responseText; 
  }

})()
