var key;
var submit = document.querySelector('#submit');
submit.addEventListener('click', getInput, false);

$.ajax({
	url: 'config.json',
	dataType: 'json',
	type: 'GET',
	success: function(data) {
		key = data[0].API_KEY;
	},
	error: function(error) {
		console.log('Error');
		console.log(error);
	}
});

function getInput() {
	var textInput = document.querySelector('#textInput');
	// console.dir(textInput.value);
	getData(textInput);
}

function getData(docType) {
	$.ajax({
		url:
			'http://api.nytimes.com/svc/search/v2/articlesearch.json?' +
			'document_type' +
			docType +
			'&api-key=' +
			key,
		dataType: 'json',
		type: 'GET',
		success: function(data) {
			console.log(data);
			// for (var i = 0; i < data.response.docs.length; i++) {
			// 	newElement(data.response.docs[i].headline.main);
			// }
		},
		error: function(error) {
			console.log('Error');
			console.log(error);
		}
	});
}

function newElement(headline) {
	document
		.getElementById('news')
		.insertAdjacentHTML(
			'beforeend',
			'<div class="news">' + headline + '</div><br>'
		);
}
