exports.create = function(_options){
	console.log(_options);
	var self = Ti.UI.createView({
		height : '36dp',
		backgroundColor : 'gray'
	});
	if (_options.key == 'cached') {
		var quota = (Ti.App.Model.getQuota()) ? Ti.App.Model.getQuota().quota : 0.02;
		var quotaView = Ti.UI.createProgressBar({
			min : 0,
			max : 1,
			value : quota,
			bottom : '5dp',
			height : '30dp',
			width : Ti.UI.FILL,
			left : '200dp',
			right : '10dp'
		});
		Ti.App.addEventListener('quota', function(_evt) {
			quotaView.setValue(_evt.quota.quota);
		});
		self.add(quotaView);
		quotaView.show();
	}
	self.add(Ti.UI.createLabel({
		left : '40dp',
		textAlign : 'left',
		color : 'white',
		font : {
			fontWeight : 'bold'
		},
		text : _options.title
	}));
	self.add(Ti.UI.createImageView({
		left : '5dp',
		width : '32dp',
		height : '32dp',
		image : '/images/' + _options.key + '.png'
	}));
	return self;
};
