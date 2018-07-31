google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(getKey);
var thing;

function getKey() {
	$.ajax({
		url: 'config.json',
		dataType: 'json',
		type: 'GET',
		success: function(data) {
			thing = data[0].thing;
			getData(thing);
		},
		error: function(error) {
			console.log('Error');
			console.log(error);
		}
	});
}

function getData(thing) {
	$.ajax({
		url: 'https://dweet.io:443/get/dweets/for/' + thing,
		dataType: 'json',
		type: 'GET',
		success: function(data) {
			console.log(data);
			drawChart(data);
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

	data.addColumn('number', 'Count');
	data.addColumn('number', 'Battery');
	data.addColumn('number', 'Humidity');
	data.addColumn('number', 'Temperature');

	for (var i = 0; i < dataJSON.with.length; i++) {
		data.addRow([
			dataJSON.with[i].content.Count,
			dataJSON.with[i].content.Battery,
			dataJSON.with[i].content.Humidity,
			dataJSON.with[i].content.Temperature
		]);
	}

	var options = {
		title: 'Company Performance',
		curveType: 'function',
		legend: { position: 'bottom' }
	};

	var chart = new google.visualization.LineChart(
		document.getElementById('lineChart')
	);

	chart.draw(data, options);
}
