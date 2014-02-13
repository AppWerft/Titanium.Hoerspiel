exports.create = function() {
	var self = Ti.UI.createView();
	self.listView = Ti.UI.createListView({
		templates : {
			'template' : require('ui/templates').allstationsTemplate
		},
		defaultItemTemplate : 'template',
	});
	self.listView.radiowidget = new (require('ui/radio.widget'))();
	self.add(self.listView);
	self.add(self.listView.radiowidget.getView());
	var allstations = Ti.App.Model.getAllStationList();
	var sections = [], i;
	for (var location in allstations) {
		var stations = [];
		var group = allstations[location];
		for (var s = 0; s < group.length; s++) {
			var sender = group[s];
			stations.push({
				properties : {
					itemId : JSON.stringify(sender),
					accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DETAIL
				},
				longname : {
					text : sender.longname
				},
				genre : {
					text : sender.genre
				}
			});
		}
		sections.push(Ti.UI.createListSection({
			headerTitle : location,
			items : stations
		}));
	}
	self.listView.setSections(sections);
	self.listView.addEventListener('itemclick', function(e) {
		var station = JSON.parse(e.itemId);
		var opts = {
			options : ['Reinhören', 'Webseite besuchen'],
			title : station.longname
		};

		var dialog = Ti.UI.createOptionDialog(opts);
		dialog.show();
		dialog.addEventListener('click', function(_evt) {
			console.log(station);
			switch (_evt.index) {
				case 0:
					var options = {
						isplaylisturl : true,
						media : station.livestream.url,
						senderlongname : station.longname
					};
					self.listView.radiowidget.togglePlay(options);
					break;
				case 1:
					var win = require('ui/sender.window').create({
						url : station.programmurl,
						longname : station.longname
					});
					if (Ti.Android)
						win.open();
					else
						_parent.tab.open(win);
					break;

			}
		});
	});
	return self;
};
