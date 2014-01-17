exports.create = function(_sender) {
	var self = Ti.UI.createWindow({
		backgroundColor : 'white'
	});
	self.add(require('ui/stations.listview').create());
	return self;
};
