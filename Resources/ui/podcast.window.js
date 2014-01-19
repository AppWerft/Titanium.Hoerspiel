exports.create = function(_data) {
	var self = Ti.UI.createWindow({
		backgroundColor: 'white'
	});
	self.add(require('ui/podcast.listview').create(self, _data));
	return self;
};
