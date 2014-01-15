exports.create = function() {

	var listView = Ti.UI.createListView({
		templates : {
			'template' : require('ui/templates').listTemplate
		},
		defaultItemTemplate : 'template',
		backgroundColor : 'white'
	});
	var groups = Ti.App.Model.getStationGroups();
	var sections = [];
	for (var i = 0; i < groups.length; i++) {
		var group = (Object.prototype.toString.call(groups[i].sender) === '[object Array]') ? groups[i].sender : [groups[i].sender];
		var stations = [];
		for (var s = 0; s < group.length; s++) {
			var sender = group[s];
			//console.log(JSON.stringify(sender));
			stations.push({
				properties : {
					itemId : JSON.stringify(sender),
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DETAIL
				},
				stationname : {
					text : sender.name
				},
				stationlogo : {
					image : Ti.Filesystem.getFile('/images/' + sender.id + '.png') ? '/images/' + sender.id + '.png' : '/images/nil.png'
				}
			});
		}
		sections[i] = Ti.UI.createListSection({
			headerTitle : groups[i].name,
			items : stations
		});
	}
	listView.setSections(sections);
	listView.addEventListener('itemclick', function(e) {
		var win = require('ui/sender.window').create(JSON.parse(e.itemId));
		if (Ti.Android)
			win.open();
		else
			self.tab.open(win);
	});
	return listView;
};
