google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(getJSON);

// get JSON using pure JS
function getJSON() {
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.status == 403) {
			console.log('Forbidden, cannot access information');
			return;
		} else if (this.status == 404) {
			console.log('Error, file not found');
			return;
		}

		if (this.status == 200 && this.readyState == 4) {
			var data = JSON.parse(this.responseText);
			dataList(data);
		}
	};

	xhttp.open('GET', 'data/MOCK_DATA.json', true);
	xhttp.send();
}

// get data from JSON
function dataList(mockData) {
	gender(mockData);
	color(mockData);
}

// count genders
function gender(mockData) {
	var list = document.getElementById('data');
	var female = [];
	var male = [];

	for (var i = 0; i < mockData.length; i++) {
		if (mockData[i].gender == 'Female') {
			female.push(1);
		} else if (mockData[i].gender == 'Male') {
			male.push(1);
		}
	}

	pieChart(female, male);
}

// find all colors
function color(mockData) {
	var colors = [];
	colors.push(mockData[0].color);
	for (var i = 1; i < mockData.length; i++) {
		// console.log(mockData[i]);
		var fail = [];
		for (var j = 0; j < colors.length; j++) {
			if (!(mockData[i].color === colors[j])) {
				fail.push(1);
			}
			if (fail.length === colors.length) {
				colors.push(mockData[i].color);
			}
		}
	}
	totalColors(colors, mockData);
}

// create column chart, using colors totals
function totalColors(colors, mockData) {
	const data = new google.visualization.DataTable();
	data.addColumn('string', 'Color');
	data.addColumn('number', 'Count');

	for (var i = 0; i < colors.length; i++) {
		var totalColor = [];
		for (var j = 0; j < mockData.length; j++) {
			if (colors[i] === mockData[j].color) {
				totalColor.push(1);
			}
		}
		data.addRow([colors[i], totalColor.length]);
	}

	// style options
	const options = {
		title: 'Total Fav Colours'
	};

	// create chart
	const chart = new google.visualization.ColumnChart(
		document.getElementById('columnDiv')
	);
	chart.draw(data, options);
}

// create pie chart
function pieChart(data1, data2) {
	var data = google.visualization.arrayToDataTable([
		['Gender', 'Totel'],
		['Female', data1.length],
		['Male', data2.length]
	]);
	var options = {
		title: 'Gender'
	};
	var chart = new google.visualization.PieChart(
		document.getElementById('pieDiv')
	);

	chart.draw(data, options);
}
