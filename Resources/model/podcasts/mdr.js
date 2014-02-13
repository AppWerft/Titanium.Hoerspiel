exports.get = function(_callback) {
	var podcasts = [{
		feed : 'http://www.mdr.de/mdr1-radio-sachsen/podcast/deutsch/audiogalerie-retter100-podcast.xml',
		station : 'mdrsa',
		logo : 'http://www.mdr.de/sachsen/fremdwoerterbuch104_v-standard169_zc-c9ec17fa.jpg',
		title : "Der Retter der deutschen Sprache"
	}, {
		feed : 'http://www.mdr.de/mdr1-radio-sachsen/podcast/reisetipp/audiogalerie-reisetipp100-podcast.xml',
		station : 'mdrsa',
		logo : 'http://www.mdr.de/mdr1-radio-sachsen/Koffer104_v-standard169_zc-c9ec17fa.jpg',
		title : "Reisetipps"
	}, {
		feed : 'http://www.mdr.de/mdr1-radio-sachsen/podcast/garten/audiogalerie-garten100-podcast.xml',
		station : 'mdrsa',
		logo : 'http://www.mdr.de/mdr-sachsen-anhalt/bild186600_v-standard169_zc-c9ec17fa.jpg?version=54374',
		title : "Gartensprechstunde"
	}, {
		feed : 'http://www.mdr.de/mdr1-radio-sachsen/podcast/tierarzt/audiogalerie-tierarzt100-podcast.xml',
		station : 'mdrsa',
		logo : 'http://www.mdr.de/figarino/start/bild144998_v-standard169_zc-c9ec17fa.jpg?version=37145',
		title : "Tierarztsprechstunde"
	}, {
		feed : 'http://www.mdr.de/mdr-thueringen/podcast/augenblick/audiogalerie354-podcast.xml',
		station : 'mdrthue',
		logo : 'http://www.mdr.de/brisant/bild111502_v-standard43_zc-698fff06.jpg?version=29150',
		title : "Augenblick mal"
	}, {
		feed : 'http://www.mdr.de/mdr-thueringen/podcast/becker/audiogalerie128-podcast.xml',
		station : 'mdrthue',
		logo : 'http://www.mdr.de/mdr-thueringen/podcast/becker/bild224080_v-standard43_zc-698fff06.jpg?version=5959',
		title : "Beckers Wochenrückblick"
	}, {
		feed : 'http://www.mdr.de/mdr-thueringen/podcast/kulturnacht/audiogalerie380-podcast.xml',
		station : 'mdrthue',
		logo : 'http://www.mdr.de/thueringen/dnt112_v-standard43_zc-698fff06.jpg?version=44214',
		title : "Kulturnacht"
	}, {
		feed : 'http://www.mdr.de/mdr-thueringen/podcast/oldie-geschichten/audiogalerie450-podcast.xml',
		station : 'mdrthue',
		logo : 'http://www.mdr.de/mdr-thueringen/bild214198_v-standard43_zc-698fff06.jpg?version=57496',
		title : "Oldie-Geschichten"
	}, {
		feed : 'http://www.mdr.de/mdr-sachsen-anhalt/podcast/angedacht/audiogalerie200-podcast.xml',
		station : 'mdrsan',
		logo : 'http://www.mdr.de/lexi-tv/bild48176_v-standard43_zc-698fff06.jpg?version=22607',
		title : "Angedacht!"
	}, {
		feed : 'http://www.mdr.de/mdr-sachsen-anhalt/podcast/poelitz/audiogalerie122-podcast.xml',
		station : 'mdrsan',
		logo : 'http://www.mdr.de/mdr-sachsen-anhalt/podcast/poelitz/poelitz100_v-standard43_zc-698fff06.jpg?version=12249',
		title : "Das Pölitz-Frühstück"
	}, {
		feed : 'http://www.mdr.de/mdr-sachsen-anhalt/podcast/geschichten/audiogalerie124-podcast.xml',
		station : 'mdrsan',
		logo : 'http://www.mdr.de/sachsen-anhalt/beatrix_oranienbaum104_v-standard43_zc-698fff06.jpg?version=41812',
		title : "Geschichten aus Sachsen-Anhalt"
	}, {
		feed : '',
		station : 'mdrfig',
		logo : '',
		title : ""
	}];

	_callback && _callback(podcasts);
	return podcasts;
};

