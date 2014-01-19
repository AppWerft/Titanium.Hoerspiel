exports.create = function() {
	var listView = Ti.UI.createListView({
		templates : {
			'template' : require('ui/templates').podcastsTemplate
		},
		defaultItemTemplate : 'template',
		backgroundColor : 'white'
	});
	var sections = [], items = [];
	var wdr = [{
		feed : 'http://podcast.wdr.de/radio/hoerspiel.xml',
		title : 'Hörspiele im WDR'
	}, {
		feed : 'http://podcast.wdr.de/radio/leonardo.xml',
		title : 'Leonardo im WDR'
	}, {
		feed : 'http://podcast.wdr.de/radio/baerenbude.xml',
		title : 'Bärenbude – Kinderprogramm'
	}, {
		feed : 'http://podcast.wdr.de/radio/zeitzeichen.xml',
		title : 'Zeitzeichen'
	}, {
		feed : 'http://podcast.wdr.de/radio/philosophischesradio.xml',
		title : 'Das philosophische Radio'
	}];
	for (var i = 0; i < wdr.length; i++) {
		items.push({
			properties : {
				itemId : JSON.stringify({
					feed : wdr[i].feed,
					title : wdr[i].title,
					station : 'wdr'
				}),
				accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DETAIL
			},
			title : {
				text : wdr[i].title,
			},
			logo : {
				image : '/images/wdr.png'
			}
		});
	}
	sections[0] = Ti.UI.createListSection({
		headerTitle : 'Westdeutscher Rundfunk',
		items : items
	});
	Ti.App.Model.getDLRPodcasts(function(_podcasts) {
		var items = [];
		for (var i = 0; i < _podcasts.length; i++) {
			var podcast = _podcasts[i];
			items.push({
				properties : {
					itemId : JSON.stringify(podcast),
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DETAIL
				},
				title : {
					text : podcast.title
				},
				logo : {
					image : '/images/' + podcast.station + '.png'
				}
			});
		}
		sections[1] = Ti.UI.createListSection({
			headerTitle : 'DeutschlandRadio',
			items : items
		});
		listView.setSections(sections);
	});
	listView.addEventListener('itemclick', function(e) {
		var win = require('ui/podcast.window').create(JSON.parse(e.itemId));
		if (Ti.Android)
			win.open();
		else
			self.tab.open(win);
	});
	return listView;
};
