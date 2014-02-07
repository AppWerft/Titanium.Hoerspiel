exports.create = function() {
	var self = Ti.UI.createWindow({});
	Ti.App.addEventListener('app:dataready', function() {self.add(require('ui/stations.listview').create());
	});return self;
};
