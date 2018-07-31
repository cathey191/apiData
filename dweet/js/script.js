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
		url: 'https://dweet.io:443/get/latest/dweet/for/' + thing,
		dataType: 'json',
		type: 'GET',
		success: function(data) {
			drawChart(data, thing);
		},
		error: function(error) {
			console.log('Error');
			console.log(error);
		}
	});
}

function drawChart(dataJSON, thing) {
	// console.log(data.with['0'].content);
	const data = new google.visualization.DataTable();

	data.addColumn('number', 'Count');
	data.addColumn('number', 'Battery');
	data.addColumn('number', 'Humidity');
	data.addColumn('number', 'Temperature');

	addRows(data, dataJSON);

	var options = {
		title: 'Company Performance',
		curveType: 'function',
		legend: { position: 'bottom' }
	};

	var chart = new google.visualization.LineChart(
		document.getElementById('lineChart')
	);

	chart.draw(data, options);

	setInterval(function() {
		listenToJSON(thing, data, chart, options);
	}, 3000);
}

function addRows(data, dataJSON) {
	data.addRow([
		dataJSON.with[0].content.Count,
		dataJSON.with[0].content.Battery,
		dataJSON.with[0].content.Humidity,
		dataJSON.with[0].content.Temperature
	]);
}

function drawChart(data, options, chart) {
	chart.draw(data, options);
}

function listenToJSON(thing, data, chart, options) {
	$.ajax({
		url: 'https://dweet.io:443/get/latest/dweet/for/' + thing,
		dataType: 'json',
		type: 'GET',
		success: function(dataJSON) {
			console.log('test');
			addRows(data, dataJSON);
			drawChart(data, options, chart);
		},
		error: function(error) {
			console.log('Error');
			console.log(error);
		}
	});
}
