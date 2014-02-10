exports.create = function() {
	var self = Ti.UI.createWindow({});
	self.add(require('ui/stations.listview').create());
	return self;
};
