exports.get = function(_callback) {
	var podcasts = [{
		feed : 'http://www.freie-radios.net/portal/podcast.php?rss',
		station : 'rwb',
		logo : '/images/rwb.png',
		title : 'Audioportal Freier Radios'
	}];
	_callback && _callback(podcasts);
	return podcasts;
};

