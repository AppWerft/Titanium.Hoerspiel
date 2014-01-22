exports.create = function(_data) {
	var self = Ti.UI.createWindow({
		backgroundColor : 'white',
		fullscreen : true
	});
	self.add(require('ui/podcast.listview').create(self, _data));
	self.addEventListener("open", function() {
		if (Ti.Platform.osname === "android") {
			if (! self.getActivity()) {
				Ti.API.error("Can't access action bar on a lightweight window.");
			} else {
				actionBar = self.getActivity().actionBar;
				if (actionBar) {
					actionBar.setDisplayHomeAsUp(true);
					actionBar.setTitle(_data.title);
					actionBar.setLogo('/images/'+_data.station + '.png');
				//	actionBar.setIcon('/images/'+_data.station + '.png');
					actionBar.onHomeIconItemSelected = function() {
						self.close();
						Ti.API.info("Home icon clicked! " + '/assets/'+_data.station + '.png');
					};
				}
				/*var abe = require('com.alcoapps.actionbarextras');
				abe.setExtras({
					title : 'Hörspielkalender',
					subtitle : 'Gerade laufende und nächste Hörspiele',
					backgroundColor : '#ff4f00'
				});*/
			}
		}
	});
	return self;
};
