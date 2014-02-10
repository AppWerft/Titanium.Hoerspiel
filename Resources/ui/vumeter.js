exports.create = function(_options) {
	var self = Ti.UI.createView({
		top : 0,
		width : _options.width,
		backgroundImage : '/images/vumeter/bg.png',
		height : _options.height
	});
	self.vu = Ti.UI.createWebView({
		top : 0,
		width : _options.width,
		enableZoomControls : false,
		height : _options.height,
		disableBouncing : true,
		visible : false,
		url : '/images/vumeter/meter.gif'
	});
	self.add(self.vu);
	self.stop = function() {
		self.vu.hide();
	};
	self.start = function() {
		console.log('Info: show zappler');
		self.vu.show();
		self.vu.visible = true;
	};
	return self;
};
