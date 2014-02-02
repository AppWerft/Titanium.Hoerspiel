exports.get = function(_callback) {
	var data = {
		"auf-ein-wort" : "Auf ein Wort",
		"betthupferl" : "Betthupferl",
		"blaue-couch" : "Blaue Couch",
		"clever-kochen-mit-alexander-herrmann" : "Clever kochen mit Alexander Herrmann",
		"evangelische-morgenfeier" : "Evangelische Morgenfeier",
		"gschmarri" : "Gschmarri",
		"heinzi-und-kurti" : "Heinzi und Kurti",
		"helmut-schleich-ist-fjs" : "Helmut Schleich ist FJS",
		"heute-im-stadion" : "Heute im Stadion",
		"katholische-morgenfeier" : "Katholische Morgenfeier",
		"toni-lauerer" : "Toni Lauerer",
		"" : "",
		"" : "",
		"" : "",

	}, podcasts = [];
	for (var key in data) {
		if (key)
			podcasts.push({
				feed : 'http://www.br-online.de/podcast/' + key + '/cast.xml',
				station : 'br',
				logo : 'http://www.br-online.de/podcast/' + key + '/cover.jpg',
				title : data[key]
			});
	}
	data = {
		"artmix-galerie-audio" : "Artmix.Galerie",
		"bayerisches-feuilleton" : "Bayerisches Feuilleton",
		"bayernkommentar" : "Bayernkommentar",
		"breitengrad-die-auslandsreportage" : "Breitengrad – Die Auslandsreportage",
		"buergermeister-sindlasreuth" : "Bürgermeister Sindlasreuth",
		"diwan-buechermagazin" : "Diwan – Büchermagazin",
		"dossier-politik" : "Dossier Politik",
		"eins-zu-eins-der-talk" : "Eins-zu-eins: Der Talk",
		"ende-der-welt" : "Ende der Welt",
		"evangelische-perspektiven" : "Evangelische Perspektiven",
		"orange-mit-fruehbeis-zu-berge" : "orange Mit Frühbeis zu Berge"
	};
	for (var key in data) {
		if (key)
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

