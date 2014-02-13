exports.get = function(_callback) {
	var podcasts = [{
		feed : 'http://www.ndr.de/ndr2/programm/podcasts/podcast2966.xml',
		station : 'ndr',
		logo : 'http://www.ndr.de/mediathek/mediathekbild102_v-podcast.jpg',
		title : 'NDR 2 - Buchtipp'
	},{
		feed : 'http://www.ndr.de/ndr2/programm/podcasts/podcast2968.xml',
		station : 'ndr',
		logo : 'http://www.ndr.de/mediathek/mediathekbild104_v-podcast.jpg',
		title : 'NDR 2 - Filmtipp'
	},{
		feed : 'http://www.ndr.de/ndr2/programm/podcasts/podcast2956.xml',
		station : 'ndr',
		logo : 'http://www.ndr.de/mediathek/mediathekbild224_v-podcast.jpg',
		title : 'NDR 2 - Frühstück bei Stefanie'
	},{
		feed : 'http://www.ndr.de/ndr2/programm/podcasts/podcast2974.xml',
		station : 'ndr',
		logo : 'http://www.ndr.de/mediathek/mediathekbild222_v-podcast.jpg',
		title : 'Kurier um 12'
	},{
		feed : 'http://www.ndr.de/ndr2/programm/podcasts/podcast2976.xml',
		station : 'ndr',
		logo : 'http://www.ndr.de/mediathek/mediathekbild252_v-podcast.jpg',
		title : 'DR 2 - Der NDR 2 Kurier um 5'
	},{
		feed : 'http://www.ndr.de/ndr2/programm/podcasts/podcast2974.xml',
		station : 'ndr',
		logo : 'http://www.ndr.de/mediathek/mediathekbild280_v-podcast.jpg',
		title : 'NDR 2 - Moment mal'
	},{
		feed : 'http://www.ndr.de/ndr2/programm/podcasts/podcast2958.xml',
		station : 'ndr',
		logo : 'http://www.ndr.de/mediathek/mediathekbild226_v-podcast.jpg',
		title : "NDR 2 - Stimmt's?"
	},{
		feed : 'http://www.ndr.de/ndr2/programm/podcasts/podcast2964.xml',
		station : 'ndr',
		logo : 'http://www.ndr.de/mediathek/mediathekbild108_v-podcast.jpg',
		title : 'NDR 2 - Der Startalk zum Film der Woche'
	},{
		feed : 'http://www.ndr.de/ndr2/programm/podcasts/podcast2970.xml',
		station : 'ndr',
		logo : 'http://www.ndr.de/mediathek/mediathekbild110_v-podcast.jpg',
		title : 'NDR 2 - Tietjen talkt'
	},{
		feed : 'http://www.ndr.de/ndr2/programm/podcasts/podcast4044.xml',
		station : 'ndr',
		logo : 'http://www.ndr.de/regional/mecklenburg-vorpommern/nandu113_v-podcast.jpg',
		title : 'Wer piept denn da?'
	},{
		feed : 'http://www.ndr.de/ndr2/programm/podcasts/podcast4235.xml',
		station : 'ndr',
		logo : 'http://www.ndr.de/ndr2/programm/comedy/stefanie/fruehstueck1881_v-podcast.jpg',
		title : "NDR 2 - Udo Martens - so seh' ich es"
	},{
		feed : 'http://www.ndr.de/ndr2/programm/podcasts/podcast4169.xml',
		station : 'njoy',
		logo : 'http://www.n-joy.de/techniklink101_v-podcast.jpg',
		title : 'N-JOY - Inside Multimedia'
	},{
		feed : 'http://www.ndr.de/ndr2/programm/podcasts/podcast4167.xml',
		station : 'njoy',
		logo : 'http://www.ndr.de/mediathek/mediathekbild266_v-podcast.jpg',
		title : 'N-JOY - Supermerkel'
	},{
		feed : 'http://www.ndr.de/ndr2/programm/podcasts/podcast.xml',
		station : 'njoy',
		logo : '',
		title : ''
	}];
	_callback && _callback(podcasts);
	return podcasts;
};

