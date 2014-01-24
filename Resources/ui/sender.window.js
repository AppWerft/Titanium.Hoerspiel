exports.create = function(_sender) {
	var self = Ti.UI.createWindow({
		backgroundColor : 'white',
		fullscreen : true
	});
	var www = Ti.UI.createWebView({
		url : _sender.url,
		disableBounce : true,
		enableZoomControls : false
	});
	self.add(www);
	return self;
};
