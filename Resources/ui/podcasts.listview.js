exports.create = function() {
	var listView = Ti.UI.createListView({
		top : 0,
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
	sections[1] = Ti.UI.createListSection({
		headerTitle : 'Deutsche Welle',
	});
	Ti.App.Model.getDWPodcasts(function(_podcasts) {
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
				summary : {
					text : podcast.summary
				},
				logo : {
					image : '/images/dw.png'
				}
			});
		}
		sections[1].setItems(items);
		listView.setSections(sections);
	});

	Ti.App.Model.getDLRPodcasts(function(_podcasts) {
		var stations = ['dlf', 'drk', 'drw'];
		var items = {
			dlf : [],
			drk : [],
			drw : []
		};
		for (var s = 0; s < stations.length; s++) {
			var station = stations[s];	
			for (var i = 0; i < _podcasts[station].length; i++) {
				var podcast = _podcasts[station][i];
				items[station].push({
					properties : {
						itemId : JSON.stringify(podcast),
						accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DETAIL
					},
					title : {
						text : podcast.title
					},
					logo : {
						image : '/images/' + station + '.png'
					}
				});
			}
		}
		sections[2] = Ti.UI.createListSection({
			headerTitle : 'Deutschlandfunk Köln',
			items :items.dlf
		});
		sections[3] = Ti.UI.createListSection({
			headerTitle : 'Deutschlandradio Kultur',
			items : items.drk
		});
		sections[4] = Ti.UI.createListSection({
			headerTitle : 'Deutschlandradio Wissen',
			items : items.drw
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
	listView.addEventListener('scrollto', function(_e) {
		if (_e.ndx < 6) {
			listView.scrollToItem(_e.ndx, 0);
			listView.scrollToItem(_e.ndx, 10);
		}
	});
	return listView;
};
