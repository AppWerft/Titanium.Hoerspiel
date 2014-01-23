exports.get = function(_callback) {
	var data = {
		"auf-ein-wort" : "Auf ein Wort",
		"betthupferl" : "Betthupferl",
		"blaue-couch" : "Blaue Couch",
		"clever-kochen-mit-alexander-herrmann" : "Clever kochen mit Alexander Herrmann",
		"evangelische-morgenfeier" : "Evangelische Morgenfeier",
		"gschmarri" : "Gschmarri"
	}, podcasts = [];
	for (var key in data) {
		podcasts.push({
			feed : 'http://www.br-online.de/podcast/' + key + '/cast.xml',
			station : 'br',
			logo : 'http://www.br-online.de/podcast/' + key + '/cover.jpg',
			title : data[key]
		});
	}
	_callback && _callback(podcasts);
	return podcasts;
};

