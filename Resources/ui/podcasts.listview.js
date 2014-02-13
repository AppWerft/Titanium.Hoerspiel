exports.create = function() {
	function getItems(_podcasts, _station) {
		var items = [];
		for (var i = 0; i < _podcasts.length; i++) {
			var podcast = _podcasts[i];
			podcast.title && items.push({
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
					image : (podcast.logo) ? podcast.logo : '/images/' + _station + '.png',
					defaultImage : '/images/' + _station + '.png'
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
		headerTitle : 'Norddeutscher Rundfunk',
	});
	sections[6].setItems(getItems(require('model/podcasts/ndr').get(), 'ndr'));

	sections[7] = Ti.UI.createListSection({
		headerTitle : 'Deutsche Welle',
	});
	sections[7].setItems(getItems(require('model/podcasts/dw').get(), 'dw'));

	sections[8] = Ti.UI.createListSection({
		headerTitle : 'Mitteldeutscher Rundfunk',
	});
	sections[8].setItems(getItems(require('model/podcasts/mdr').get(), 'mdr'));

	sections[9] = Ti.UI.createListSection({
		headerTitle : 'Bayrischer Rundfunk',
	});
	sections[9].setItems(getItems(require('model/podcasts/br').get(), 'br'));

	sections[10] = Ti.UI.createListSection({
		headerTitle : 'Radio Berlin-Brandenburg',
	});
	sections[10].setItems(getItems(require('model/podcasts/rbb').get(), 'rbb'));
	sections[11] = Ti.UI.createListSection({
		headerTitle : 'Südwestfunk',
	});
	sections[11].setItems(getItems(require('model/podcasts/swr').get(), 'swr'));
	sections[12] = Ti.UI.createListSection({
		headerTitle : 'Oesterreichischer Rundfunk',
	});
	sections[12].setItems(getItems(require('model/podcasts/orf').get(), 'orf'));
	
	
	sections[13] = Ti.UI.createListSection({
		headerTitle : 'RAI Bozen Südtirol',
	});
	sections[13].setItems(getItems(require('model/podcasts/raibz').get(), 'raibz'));

	sections[14] = Ti.UI.createListSection({
		headerTitle : 'freie-radios.net',
	});
	sections[14].setItems(getItems(require('model/podcasts/rwb').get(), 'rwb'));

	sections[15] = Ti.UI.createListSection({
		headerTitle : 'Ohrcast',
	});
	sections[15].setItems(getItems(require('model/podcasts/ohrcast').get(), 'ohrcast'));
	listView.addEventListener('itemclick', function(e) {
		var win = require('ui/podcast.window').create(JSON.parse(e.itemId));
		if (Ti.Android)
			win.open();
		else
			self.tab.open(win);
	});
	listView.addEventListener('scrollto', function(_e) {
		try {
			listView.scrollToItem(_e.ndx, 0);
		} catch(E) {
		}
	});
	return listView;
};
