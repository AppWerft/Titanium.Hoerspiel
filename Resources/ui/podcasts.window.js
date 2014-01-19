const W = 60	;
exports.create = function(_sender) {
	var self = Ti.UI.createWindow({
		backgroundColor : 'white',
		layout : 'vertical'
	});
	var stations = ['wdr', 'dw', 'dlf', 'drk', 'drw', 'srf2','ndr', 'hr','mdr','br'];
	var width = stations.length * W + 'dp';
	var stationsview = Ti.UI.createScrollView({
		width : Ti.UI.FILL,
		backgroundColor : '#111',
		contentWidth : width,
		height : W + 'dp',
		contentHeight : W+'dp',
		horizontalWrap : false,
		scrollType : 'horizontal',
		top : 0,
		layout : 'horizontal'
	});
	for (var i = 0; i < stations.length; i++) {
		stationsview.add(Ti.UI.createImageView({
			image : '/images/' + stations[i] + '.png',
			width : W + 'dp',
			height : W + 'dp',
			left : '5dp',
			top : 0,
			station : stations[i],
			ndx : i
		}));
	}
	self.add(stationsview);
	stationsview.addEventListener('click', function(_e) {
		self.podcastslist.fireEvent('scrollto', {
			station : _e.source.station,
			ndx : _e.source.ndx
		});
		stationsview.contentOffset = {
			x : 75 * _e.source.ndx,
			y : 0
		};
	});
	self.podcastslist = require('ui/podcasts.listview').create();
	self.add(self.podcastslist);
	return self;
};
