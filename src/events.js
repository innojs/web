//console.log(bh.apply({ block: 'event', elem: 'title' }));
(function() {
	var events=[];
	var ORG = "innojs";
	var projects = "web-events";

	$.ajax({
		url: "https://api.github.com/repos/innojs/web-events/issues?access_token=3b5f1cba3fbb7f2a9677ffe83e9c8aa3e9d24f66",
		method:"GET",
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				events.push(parseEvent(data[i]));
			}

			$('.feed').html(bh.apply(events)) ;
		}
	});

	function parseEvent(issue){
		var title = issue.title;
		if (issue.body) {
			var result = issue.body.match(/^(```(.|\n|\r)+```)/g);
		}
		var eventJSON = result[0].replace(/```/g,"");
		var result = JSON.parse(eventJSON);

		var event = {
						block: 'event',
						content: [
							{ elem: 'title', content: title },
							{ elem: 'date', content: result.date  },
							{ elem: 'location', content: result.location.title, attrs: {
									'data-cords': result.location.coords
							}},
							{ elem: 'description', content: result.description }
						]
	 }

		return event;
	}

})();
