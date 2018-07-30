var key;
var countries = ['New Zealand', 'Australia', 'United Kingdom'];
$.ajax({
	url: 'config.json',
	dataType: 'json',
	type: 'GET',
	success: function(data) {
		key = data[0].API_KEY;
		// getData(1, countries);
	},
	error: function(error) {
		console.log('Error');
		console.log(error);
	}
});

function getData(minAge, country) {
	$.ajax({
		url:
			'https://my.api.mockaroo.com/peopledata.json?min_age=' +
			minAge +
			'&countries=' +
			country +
			'&key=' +
			key,
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

$('#ageForm').submit(function() {
	event.preventDefault();
	var minAge = $("input[name='minAge']").val();

	// console.log($(input[name='minAge']));

	getData(minAge);
});
