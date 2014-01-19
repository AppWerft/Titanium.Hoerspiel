exports.get = function(_callback) {
	var yql = 'SELECT * FROM html WHERE url="http://www.srf.ch/radio-srf-2-kultur/podcasts#!program=pr-radio-srf-2-kultur" and xpath="//li[contains(@class,\'shows\')]';
	if (true == Ti.Network.online) {
		Ti.Yahoo.yql(yql, function(e) {
			if (e.success) {
				var feeds = [];
				for (var i = 0; i < e.data.li.length; i++) {
					var feed = e.data.li[i];
					feeds.push({
						feed : feed.a.href,
						station : 'srf2',
						title : feed.h2.content.trim(),
						summary : feed.p
					});
				}
				_callback(feeds);
			}

			if (e.success) {
				var rss = e.data;
				//		console.log(rss);
			}
		});
	}
	var example = {
		"class" : "shows",
		"a" : {
			"class" : "icon-container",
			"href" : "/sendungen/1gegen100",
			"img" : {
				"alt" : "1 gegen 100",
				"height" : "81",
				"src" : "/extension/srf_shared/design/standard/images//placeholders/grey16-9.gif",
				"style" : "",
				"title" : "1 gegen 100",
				"width" : "144"
			}
		},
		"div" : {
			"class" : "module-content",
			"h3" : {
				"class" : "tv",
				"a" : {
					"href" : "/sendungen/1gegen100",
					"content" : "1 gegen 100"
				}
			},
			"p" : "Gameshow, in der ein Kandidat gegen 100 Kontrahenten antritt.",
			"div" : {
				"class" : "podcast",
				"ul" : {
					"class" : "unstyled",
					"li" : [{
						"h4" : "Link kopieren und in Podcast-Software einfügen:",
						"div" : [{
							"label" : {
								"for" : "559698-sd",
								"content" : "SD"
							},
							"input" : {
								"class" : "input-xlarge",
								"id" : "559698-sd",
								"name" : "aac-feed",
								"type" : "text",
								"value" : "http://feeds.sf.tv/podcast/1gegen100"
							}
						}, {
							"label" : {
								"for" : "559698-hd",
								"content" : "HD"
							},
							"input" : {
								"class" : "input-xlarge",
								"id" : "559698-hd",
								"name" : "hd-feed",
								"type" : "text",
								"value" : "http://www.srf.ch/podcasts/feeds/video/1gegen100-hd.xml"
							}
						}]
					}, {
						"h4" : {
							"class" : "pull-left",
							"content" : "In iTunes abonnieren:"
						},
						"ul" : {
							"class" : "author-icons unstyled pull-right",
							"li" : [{
								"a" : {
									"class" : "video",
									"href" : "itpc://feeds.sf.tv/podcast/1gegen100",
									"content" : "SD"
								}
							}, {
								"a" : {
									"class" : "video",
									"href" : "itpc://www.srf.ch/podcasts/feeds/video/1gegen100-hd.xml",
									"content" : "HD"
								}
							}]
						}
					}]
				}
			}
		}
	};

};