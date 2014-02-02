exports.get = function(_callback) {
	if (Ti.App.Properties.hasProperty('drlist'))
		_callback(Ti.App.Properties.getObject('dlrlist'));
	if (true == Ti.Network.online) {
		var xhr = Ti.Network.createHTTPClient({
			onload : function() {
				var station = '';
				var html = this.responseText.replace(/\n/, '');
				var podcasts = {
					dlf : [],
					drk : [],
					drw : [{
						feed : 'http://www.dradiowissen.de/podcast-agenda.363.de.podcast.xml',
						title : 'Agenda',
						station : 'drw'
					}, {
						feed : 'http://www.dradiowissen.de/globus.26.de.podcast.xml',
						station : 'drw',
						title : 'Globus'
					}, {
						feed : 'http://www.dradiowissen.de/hoersaal.86.de.podcast.xml',
						title : 'Hörsaal',
						station : 'drw'
					}, {
						feed : 'http://www.dradiowissen.de/kultur.11.27.de.podcast.xml',
						title : 'Kultur',
						station : 'drw'
					}, {
						feed : 'http://www.dradiowissen.de/medien.25.de.podcast.xml',
						title : 'Medien',
						station : 'drw'
					}, {
						feed : 'http://www.dradiowissen.de/meine-zukunft.28.de.podcast.xml',
						title : 'Meine Zukunft',
						station : 'drw'
					}, {
						feed : 'http://www.dradiowissen.de/natur.24.de.podcast.xml',
						title : 'Natur'
					}, {
						feed : 'http://www.dradiowissen.de/podcast-wissensnachrichten-des-tages.307.de.podcast.xml',
						title : 'Wissensnachrichten des Tages',
						station : 'drw'
					}, {
						feed : 'http://www.dradiowissen.de/redaktionskonferenz.91.de.podcast.xml',
						title : 'Redaktionskonferenz',
						station : 'drw'
					}, {
						feed : 'http://www.dradiowissen.de/spielraum.8.29.de.podcast.xml',
						title : 'Spielraum',
						station : 'drw'
					}, {
						feed : 'http://www.dradiowissen.de/online-talk.125.de.podcast',
						title : 'Online-Talk',
						station : 'drw'
					}]
				};
				var match, pattern = /<a.*?href="(.*?podcast\.xml)".*?>\s*<img.*?src="(.*?)".*?class="dradioImage".*?title="(.*?)".*?><\/a>/gim;
				while (match = pattern.exec(html)) {
					match.shift();
					console.log(match);
					var feed = match[0];
					var logo = match[1];
					var title = match[2].replace(/^Podcast /, '');
					if (feed.match(/deutschlandradiokultur/))
						station = 'drk';
					if (feed.match(/deutschlandfunk/))
						station = 'dlf';

					try {
						podcasts[station].push({
							station : station,
							feed : feed,
							logo : logo,
							title : title.replace(/&amp;/, '&')
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

