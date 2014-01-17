exports.create = function(_sender) {
	var self = Ti.UI.createWindow({
		backgroundColor : 'white'
	});
	self.add(require('ui/podcasts.listview').create());
	return self;
};
