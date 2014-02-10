exports.create = function() {
	var self = Ti.UI.createWindow({});
	self.listview = require('ui/timeline.listview').create(self);
	Ti.App.Model.importRadiolist(function() {
		console.log('Info: radio list ready, start listview update' );
		self.listview.update();
		self.cron = setInterval(self.listview.update, 60000);
			self.addEventListener('blur', function() {
			self.cron && clearInterval(self.cron);
		});
	});
	return self;
};
