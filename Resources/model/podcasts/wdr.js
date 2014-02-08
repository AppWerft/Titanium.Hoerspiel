exports.get = function(_callback) {
	var podcasts = [{
		feed : 'http://podcast.wdr.de/radio/hoerspiel.xml',
		station : 'wdr',
		logo : 'http://www.gratis-hoerspiele.de/wp-content/uploads/2012/01/hassel-150x150.png',
		title : 'Hörspiele im WDR'
	}, {
		feed : 'http://podcast.wdr.de/radio/leonardo.xml',
		station : 'wdr',
		logo : 'http://www1.wdr.de/radio/podcasts/wdr5/podcast_evo_solution100_v-TeaserAufmacher.jpg',
		title : 'Leonardo im WDR'
	}, {
		feed : 'http://podcast.wdr.de/radio/baerenbude.xml',
		station : 'wdr',
		logo : 'http://www1.wdr.de/themen/baerenbude100_v-TeaserAufmacher.jpg',
		title : 'Bärenbude – Kinderprogramm'
	}, {
		feed : 'http://podcast.wdr.de/radio/zeitzeichen.xml',
		station : 'wdr',
		logo : 'http://www.wdr5.de/sendungen/zeitzeichen/zeitzeichen_symbolbild100_v-TeaserNormal.jpg',
		title : 'Zeitzeichen'
	}, {
		feed : 'http://podcast.wdr.de/radio/philosophischesradio.xml',
		station : 'wdr',
		logo : 'http://www1.wdr.de/radio/podcasts/wdr5/podcast_dasphilosophischeradio100_v-TeaserAufmacher.jpg',
		title : 'Das philosophische Radio'
	}];
	_callback && _callback(podcasts);
	return podcasts;
};

