exports.get = function(_callback) {
	if (Ti.App.Properties.hasProperty('drlist'))
		_callback(Ti.App.Properties.getObject('dlrlist'));
	if (true == Ti.Network.online) {
		var xhr = Ti.Network.createHTTPClient({
			onload : function() {
				var html = this.responseText;
				var podcasts = {
					dlf : [],
					drk : [],
					drw : []
				};
				var regex = /<a\sclass="(.*?)"\s.*?href="(.*?podcast\.xml)".*?>(.*?)<\/a>/gm;
				var res = html.match(regex);
				regex = /class="([a-z][a-z][a-z]).*?href="(.*?podcast\.xml)".*?>(.*?)<\/a>/m;
				for (var i = 0; i < res.length; i++) {
					var station = res[i].match(regex)[1];
					try {
						podcasts[station].push({
							station : station,
							feed : res[i].match(regex)[2],
							title : res[i].match(regex)[3].replace(/&amp;/, '&')
						});
					} catch(E) {
						console.log(E);
					}

				}
				Ti.App.Properties.setObject('dlrlist', podcasts);
				_callback(podcasts);
			}
		});
		xhr.open('GET', 'http://www.deutschlandradio.de/podcasts.226.de.html', true);
		xhr.send();
		Ti.App.addEventListener('app:exit', xhr.abort);

	}
};

