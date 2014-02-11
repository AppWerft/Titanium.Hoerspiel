exports.create = function() {
	var self = Ti.UI.createWindow({});
	self.mapview = require('ui/map.widget').create();
	if (self.mapview.apiName != 'Ti.Proxy')
		self.add(self.mapview);
		self.publiclist = require('ui/publicstations.listview').create();
	self.alllist = require('ui/allstations.listview').create();

	self.add(self.publiclist);
	self.add(self.alllist);
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
	//self.setList('public');
	return self;
};
