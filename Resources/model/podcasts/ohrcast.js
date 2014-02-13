exports.get = function(_callback) {
	var podcasts = [{
		feed : 'http://www.hoerspieltipps.net/ohrcast/ohrcast.xml',
		station : 'ohrcast',
		logo : '/images/ohrcast.png',
		title : "Ohrcast"
	}];

	_callback && _callback(podcasts);
	return podcasts;
};

