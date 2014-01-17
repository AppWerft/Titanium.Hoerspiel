exports.create = function() {
	var listView = Ti.UI.createListView({
		templates : {
			'template' : require('ui/templates').podcastTemplate
		},
		defaultItemTemplate : 'template',
		backgroundColor : 'white'
	});
	var sections = [];
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
				}
			});
		}
		sections[0] = Ti.UI.createListSection({
			headerTitle : 'DeutschlandRadio',
			items : items
		});
		listView.setSections(sections);
	});
	listView.addEventListener('itemclick', function(e) {
		var win = require('ui/sender.window').create(JSON.parse(e.itemId));
		if (Ti.Android)
			win.open();
		else
			self.tab.open(win);
	});
	return listView;
};
