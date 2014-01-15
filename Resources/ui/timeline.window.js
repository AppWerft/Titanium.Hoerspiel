exports.create = function() {
	var self = Ti.UI.createWindow({});
	self.listview = require('ui/timeline.listview').create();
	self.add(self.listview);
	self.addEventListener('focus', function() {
		self.listview.update();
		self.cron = setInterval(self.listview.update, 60000);
	});
	self.addEventListener('blur', function() {
		self.cron &&  clearInterval(self.cron);
	});
	return self;
};
