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
	var docType = document.querySelector('select').value;
	getData(false, docType);
}

function getData(keyWord, docType) {
	$.ajax({
		url:
			'http://api.nytimes.com/svc/search/v2/articlesearch.json?' +
			// 'q=' +
			// keyWord +
			'document_type' +
			docType +
			'&api-key=' +
			key,
		dataType: 'json',
		type: 'GET',
		success: function(data) {
			if (data.response.docs.length === 0) {
				console.log('No results');
			} else {
				for (var i = 0; i < data.response.docs.length; i++) {
					newElement(data.response.docs[i].headline.main);
				}
			}
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
