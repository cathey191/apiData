var key;
var submit = document.querySelector('#submit');

$.ajax({
	url: 'config.json',
	dataType: 'json',
	type: 'GET',
	success: function(data) {
		key = data[0].API_KEY;
		getImage();
	},
	error: function(error) {
		console.log('Error');
		console.log(error);
	}
});

function getImage() {
	$.ajax({
		url:
			'https://api.nasa.gov/planetary/earth/assets?' +
			// '&date=2000-05-15' +
			'&hd=true' +
			'&api_key=' +
			key,
		dataType: 'json',
		type: 'GET',
		success: function(data) {
			addImg(data);
			getData();
		},
		error: function(error) {
			console.log('Error');
			console.log(error);
		}
	});
}

function addImg(data) {
	var todayDiv = document.querySelector('#todayImg');

	var img = document.createElement('img');
	img.src = data.url;

	var src = document.getElementById('container');
	src.appendChild(img);
}

function getData() {
	$.ajax({
		url: 'https://api.nasa.gov/planetary/earth/assets?' + '&api_key=' + key,
		dataType: 'json',
		type: 'GET',
		success: function(data) {
			console.log(data);
		},
		error: function(error) {
			console.log('Error');
			console.log(error);
		}
	});
}
