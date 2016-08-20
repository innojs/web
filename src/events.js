//console.log(bh.apply({ block: 'event', elem: 'title' }));
(function() {
	getIssues();
})()

var ORG = "innojs";
var projects = "web-events";

function getIssues() {
	var events=[];
	$.ajax({
		url: "https://api.github.com/repos/innojs/web-events/issues",
		method:"GET",
		success: function(data) {
			for (var i = 0; i < data.length; i++) {
				events.push(parseEvent(data[i]));
			}
			//here logc to process update ui
			console.log(events);
		}
	});
}

function parseEvent(issue){
	var result = issue.body.match(/^(```(.|\n|\r)+```)/g);
	var eventJSON = result[0].replace(/```/g,"");
	var result = JSON.parse(eventJSON);
	return result;
}

function addEvent(event){
	var issue = transformEvent(event);
	createIssue(issue);
}

function transformEvent(event){
	var newIssue = {
		title: event.title, //nonexisting field
		body: "```" + JSON.stringify(event) + "```"
	};
	return JSON.stringify(newIssue);

}

function createIssue(issueJSON) {
	$.ajax({
		url: "http://api.github.com/repos/innojs/web-events/issues",
		data: issueJSON,
		method:"POST",
	});
}

function addParticipant(login, eventNumber) {

	$.ajax({
		url: "http://api.github.com/repos/innojs/web-events/issues/" + eventNumber + "/assignees",
		data: [login],
		method:"POST",
	});
}