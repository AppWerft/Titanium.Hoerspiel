exports.create = function(_e) {
	function getContenttype(_url, _callback) {
		var xhr = Ti.Network.createHTTPClient({
			autoRedirect : true,
			onerror : function() {
				console.log('Error');
			},
			onload : function() {
				var type = this.getResponseHeader('Content-Type');
				if (type)
					_callback(type.split('/')[0]);
			}
		});
		xhr.open('HEAD', _url);
		xhr.send();
	}
	var dialog = null;	
	var tweetdata = _e.rowData;
	var uri_pattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
	var uri = tweetdata.tweet.match(uri_pattern);
	var options = ['Twitter-Profil'];
	if (uri != null) {
		getContenttype(uri[0], function(_type) {
			
		});
		options.push('externer Web-Link');

	}
	

	dialog = Ti.UI.createOptionDialog({
		options : options,
		title : tweetdata.user.name
	});

	dialog.show();
	dialog.addEventListener('click', function(_d) {
		switch(_d.index) {
			case 0:
				var win = require('ui/twitter/profil.window').create(tweetdata.user);
				break;
			case 1:
				var win = Ti.UI.createWindow({
					fullscreen : true,
					navBarHidden : true
				});
				win.add(Ti.UI.createWebView({
					url : uri[0]
				}));
				win.addEventListener('longpress', function() {
					win.close();
				});
				break;
		}
		if (win)
			win.open();
	});
};
