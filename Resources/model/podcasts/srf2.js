function isArray(o) {
	return Object.prototype.toString.call(o) === '[object Array]';
}

exports.get = function(_callback) {
	var yql = 'SELECT * FROM html WHERE url="http://www.srf.ch/radio-srf-2-kultur/podcasts#!program=pr-radio-srf-2-kultur" and xpath="//li[contains(@class,\'shows\')]"';
	if (true == Ti.Network.online) {
		Ti.Yahoo.yql(yql, function(e) {
			if (e.success) {
				var feeds = [];
				if (e.data) {
					for (var i = 0; i < e.data.li.length; i++) {
						var feed = e.data.li[i];
						var node = (isArray(feed.div.div)) ? feed.div.div[0] : feed.div.div;
						try {
							feeds.push({
								feed : node.ul.li[0].div.input.value,
								station : 'srf2',
								title : feed.div.h3.a.content,
								summary : feed.div.p
							});
						} catch(E) {
							console.log(E);
						}
					}
					Ti.App.Properties.setList('srf2', feeds);
				}
				_callback(Ti.App.Properties.hasProperty('srf2') && Ti.App.Properties.getList('srf2'));
			} else {
				_callback(Ti.App.Properties.hasProperty('srf2') && Ti.App.Properties.getList('srf2'));

			}
		});
	}

	var x = '';

	var example = {
		"class" : "shows",
		"div" : {
			"h3" : {
				"a" : {
					"content" : "1 gegen 100"
				}
			},
			"p" : "Gameshow, in der ein Kandidat gegen 100 Kontrahenten antritt.",
			"div" : {
				"ul" : {
					"li" : [{
						"div" : [{
						}, {
							"input" : {
								"value" : "http://www.srf.ch/podcasts/feeds/video/1gegen100-hd.xml"
							}
						}]
					}, {
					}]
				}
			}
		}
	};
};
