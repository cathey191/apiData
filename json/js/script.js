google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(getJSON);

function getJSON() {
	// getting JSON using pure JS
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

function dataList(mockData) {
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
