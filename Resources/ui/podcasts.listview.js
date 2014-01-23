exports.create = function() {
	function getItems(_podcasts, _station) {
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
					image : (podcast.logo) ? podcast.logo: '/images/' + _station + '.png'
				}
			});
		}
		return items;
	};
	var listView = Ti.UI.createListView({
		top : 0,
		templates : {
			'template' : require('ui/templates').podcastsTemplate
		},
		defaultItemTemplate : 'template',
		backgroundColor : 'white'
	});
	var sections = [], items = [];

	sections[0] = Ti.UI.createListSection({
		headerTitle : 'Hessischer Rundfunk 2',
		items : getItems(require('model/podcasts/hr2').list, 'hr2')
	});
	sections[1] = Ti.UI.createListSection({
		headerTitle : 'Westdeutscher Rundfunk',
	});
	require('model/podcasts/wdr').get(function(_podcasts) {
		sections[1].setItems(getItems(_podcasts, 'wdr'));
		listView.setSections(sections);
	});
	require('model/podcasts/dlr').get(function(_podcasts) {
		sections[2] = Ti.UI.createListSection({
			headerTitle : 'Deutschlandfunk Köln',
			items : getItems(_podcasts.dlf, 'dlf')
		});
		sections[3] = Ti.UI.createListSection({
			headerTitle : 'Deutschlandradio Kultur',
			items : getItems(_podcasts.drk, 'drk')
		});
		sections[4] = Ti.UI.createListSection({
			headerTitle : 'Deutschlandradio Wissen',
			items : getItems(_podcasts.drw, 'drw')
			});
		listView.setSections(sections);
	});
	sections[5] = Ti.UI.createListSection({
		headerTitle : 'Schweizer Rundfunk 2 Kultur',
	});
	require('model/podcasts/srf2').get(function(_podcasts) {
		sections[5].setItems(getItems(_podcasts, 'srf2'));
		listView.setSections(sections);
	});
	sections[6] = Ti.UI.createListSection({
		headerTitle : 'Deutsche Welle',
	});
	sections[6].setItems(getItems(require('model/podcasts/dw').get(), 'dw'));

	listView.addEventListener('itemclick', function(e) {
		var win = require('ui/podcast.window').create(JSON.parse(e.itemId));
		if (Ti.Android)
			win.open();
		else
			self.tab.open(win);
	});
	listView.addEventListener('scrollto', function(_e) {
		if (_e.ndx < 8) {
			listView.scrollToItem(_e.ndx, 0);
			listView.scrollToItem(_e.ndx, 10);
		}
	});
	return listView;
};
