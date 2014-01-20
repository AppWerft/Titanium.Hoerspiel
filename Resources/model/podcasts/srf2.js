function isArray(o) {
	return Object.prototype.toString.call(o) === '[object Array]';
}

exports.get = function(_callback) {
	var yql = 'SELECT * FROM html WHERE url="http://www.srf.ch/radio-srf-2-kultur/podcasts#!program=pr-radio-srf-2-kultur" and xpath="//li[contains(@class,\'shows\')]"';
	if (true == Ti.Network.online) {
		Ti.Yahoo.yql(yql, function(e) {
			if (e.success) {
				var feeds = [];
				for (var i = 0; i < e.data.li.length; i++) {
					var feed = e.data.li[i];
					var node = (isArray(feed.div.div)) ? feed.div.div[0] :feed.div.div;
					try {
					//	console.log(node.ul.li[0].div.input.value)
						feeds.push({
							feed : node.ul.li[0].div.input.value,
							station : 'srf2',
							logo : feed.a.img.src,
							title : feed.div.h3.a.content,
							summary : feed.div.p
						});
					} catch(E) {
					}
				}
				_callback(feeds);
			} else {
				console.log('Error: srf2');
			}
		});
	}
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
