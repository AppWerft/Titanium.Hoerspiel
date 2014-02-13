exports.create = function(_sender) {
	var self = Ti.UI.createWindow({
		backgroundColor : 'white',
		fullscreen : true
	});
	var www = Ti.UI.createWebView({
		url : _sender.url,
		disableBounce : true,
		enableZoomControls : true
	});
	self.add(www);
	self.addEventListener("open", function() {
		if (Ti.Android && self.getActivity()) {
			var activity = self.getActivity();
			var actionbar = activity.actionBar;
			actionbar && actionbar.setTitle(_sender.longname);
		}
	});
	return self;
};
