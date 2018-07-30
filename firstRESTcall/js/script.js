var key;
$.ajax({
	url: 'config.json',
	dataType: 'json',
	type: 'GET',
	success: function(data) {
		key = data[0].API_KEY;
		getData(1);
	},
	error: function(error) {
		console.log('Error');
		console.log(error);
	}
});

function getData(minAge) {
	$.ajax({
		url:
			'https://my.api.mockaroo.com/peopledata.json?min_age=' +
			minAge +
			'&key=' +
			key,
		dataType: 'json',
		type: 'GET',
		success: function(data) {
			// for (var i = 0; i < data.length; i++) {
			// 	console.log(data[i].age);
			// }
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
	getData(minAge);
});
