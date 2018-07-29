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

function dataList(mockData) {
	var list = document.getElementById('data');

	for (var i = 0; i < mockData.length; i++) {
		var country = mockData[i].country;
		var count = [];
		for (var j = 0; j < mockData.length; j++) {
			if (country == mockData[j].country) {
				count.push(1);
			}
		}

		console.log(country);
		console.log(count.length);
	}
}
