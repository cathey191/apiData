var key;
var submit = document.querySelector('#submit');

$.ajax({
	url: 'config.json',
	dataType: 'json',
	type: 'GET',
	success: function(data) {
		key = data[0].API_KEY;
		getData();
	},
	error: function(error) {
		console.log('Error');
		console.log(error);
	}
});

function getData() {
	$.ajax({
		url:
			'https://images-api.nasa.gov/search?' + 'q=earth' + '&media_type=image',
		dataType: 'json',
		type: 'GET',
		success: function(data) {
			for (var i = 0; i < data.collection.items.length; i++) {
				addImg(data.collection.items[i].links['0'].href);
			}
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
	img.src = data;

	var src = document.getElementById('container');
	src.appendChild(img);
}
