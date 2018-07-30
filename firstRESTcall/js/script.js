var key;
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
		url: 'https://my.api.mockaroo.com/peopledata.json?key=' + key,
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
