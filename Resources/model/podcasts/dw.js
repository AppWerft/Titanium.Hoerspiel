exports.get = function(_callback) {
	if (Ti.App.Properties.hasProperty('dwlist'))
		_callback(Ti.App.Properties.getList('dwlist'));
	var yql = 'SELECT * FROM html WHERE url="http://mediacenter.dw.de/german/podcasts/" and xpath="//div[contains(@class,\'news\') and contains(@class,\'minHeight\')]"';
	if (true == Ti.Network.online) {
		Ti.Yahoo.yql(yql, function(e) {
			if (e.success) {
				var feeds = [];
				for (var i = 0; i < e.data.div.length; i++) {
					var feed = e.data.div[i];
					feeds.push({
						feed : feed.a.href,
						station : 'dw',
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
};
