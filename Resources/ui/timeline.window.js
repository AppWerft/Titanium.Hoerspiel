exports.create = function() {
	var self = Ti.UI.createWindow({});
	self.listview = require('ui/timeline.listview').create(self);
	self.addEventListener('focus', function() {
		self.cron = setInterval(self.listview.update, 60000);
		setTimeout(self.listview.update,100);
	});
	self.addEventListener('blur', function() {
		self.cron &&  clearInterval(self.cron);
	});
	return self;
};
