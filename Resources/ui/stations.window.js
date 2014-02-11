exports.create = function() {
	var self = Ti.UI.createWindow({});
	self.publiclist = require('ui/publicstations.listview').create();
	self.alllist = require('ui/allstations.listview').create();
	self.mapview = require('ui/map.widget').create();
	console.log(self.mapview.apiName);
	console.log(self.publiclist.apiName);
	self.add(self.publiclist);
	self.add(self.alllist);
	self.add(self.mapview);
	self.setList = function(_type) {
		switch (_type) {
			case 'public':
				self.publiclist.setVisible(true);
				self.alllist.setVisible(false);
				self.mapview.setVisible(false);
				break;
			case 'map' :
				break;
				self.alllist.setVisible(false);
				self.mapview.setVisible(true);
				self.publiclist.setVisible(false);
				break;
			case 'all':
				self.alllist.setVisible(true);
				self.publiclist.setVisible(false);
				self.mapview.setVisible(false);
				break;
		}
	};
	self.setList('public');
	return self;
};
