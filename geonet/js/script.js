google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(getData);

function getData() {
	$.ajax({
		url: 'https://api.geonet.org.nz/volcano/val',
		dataType: 'json',
		type: 'GET',
		success: function(data) {
			drawChart(data);
			getNews();
		},
		error: function(error) {
			console.log('Error');
			console.log(error);
		}
	});
}

function drawChart(dataJSON) {
	// console.log(data.with['0'].content);
	const data = new google.visualization.DataTable();

	data.addColumn('string', 'volcanoID');
	data.addColumn('number', 'Coordinates');
	data.addColumn('number', 'Coordinates');
	data.addColumn('string', 'Volcano Title');
	data.addColumn('number', 'Level');

	for (var i = 0; i < dataJSON.features.length; i++) {
		data.addRow([
			dataJSON.features[i].properties.volcanoID,
			dataJSON.features[i].geometry.coordinates[0],
			dataJSON.features[i].geometry.coordinates[1],
			dataJSON.features[i].properties.volcanoTitle,
			dataJSON.features[i].properties.level
		]);
	}

	var options = {
		title: 'Volcanos Size & Location',
		hAxis: {
			title: 'Longitude'
		},
		vAxis: {
			title: 'Latitude'
		},
		legend: { position: 'right' }
	};

	var chart = new google.visualization.BubbleChart(
		document.getElementById('bubbleChart')
	);

	chart.draw(data, options);
}

function getNews() {
	$.ajax({
		url: 'https://api.geonet.org.nz/news/geonet',
		dataType: 'json',
		type: 'GET',
		success: function(data) {
			displayNews(data);
		},
		error: function(error) {
			console.log('Error');
			console.log(error);
		}
	});
}

function displayNews(dataJSON) {
	for (var i = 0; i < dataJSON.feed.length; i++) {
		newElement(dataJSON.feed[i].title, i);
	}
}

function newElement(feed, i) {
	document
		.getElementById('news')
		.insertAdjacentHTML(
			'beforeend',
			'<div class="news">' + feed + '</div><br>'
		);
}
