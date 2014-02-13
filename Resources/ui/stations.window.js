exports.create = function() {
	var self = Ti.UI.createWindow({});
	self.container = Ti.UI.createScrollableView({
		scrollingEnabled : false,
		showPagingControl : true
	});
	self.views = [require('ui/publicstations.listview').create(), require('ui/allstations.listview').create(), require('ui/map.widget').create()];
	self.addEventListener('focus', function() {
		self.container.setViews(self.views);
	});
	self.add(self.container);
	self.setList = function(_type) {
		switch (_type) {
			case 'public':
				self.container.scrollToView(0);
				break;
			case 'all':
				self.container.scrollToView(1);
				break;
			case 'map' :
				self.container.scrollToView(2);
				break;
		}
	};
	self.setList('public');
	return self;
};
