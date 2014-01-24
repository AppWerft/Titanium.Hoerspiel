exports.create = function() {
	var self = Ti.UI.createWindow({
		fullscreen : true,
		backgroundColor : '#fff'
	});

	self.tweetList = Ti.UI.createTableView({
		height : Ti.UI.FILL,
		backgroundColor : '#fff'
	});
	self.tweetList.addEventListener('click', function(_e) {
		var uri_pattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
		var uri = _e.rowData.tweet.match(uri_pattern);
		var options = ['Twitter.Profil'];
		if (uri)
			options.push('ext. Link');
		var dialog = Ti.UI.createOptionDialog({
			options : options,
			title : _e.rowData.user.name
		});
		dialog.show();
		dialog.addEventListener('click', function(_d) {
			return;
			switch(_d.index) {
				case 0:
					var win = require('ui/twitterprofil.window').create(_e.rowData.user);
					break;
				case 1:
					var win = Ti.UI.createWindow({
						fullscreen : false
					});
					win.add(Ti.UI.createWebView({
						url : uri[0]
					}));
					win.addEventListener('longpress', function() {
						won.close();
					});
					break;
			}
			if (!win)
				return;
			if (Ti.Android)
				win.open();
			else
				self.tab.open(win, {
					animate : true
				});
		});
	});
	function updateTweetsOnGUI() {
		Ti.App.Twitter.fetch('search_tweets', 'Hörspiel', function(_response) {
			console.log('Info: tweets = ' +_response.statuses.length);
			var rows = [];
			for (var i = 0; i < _response.statuses.length; i++) {
				var tweet = _response.statuses[i];
				console.log(tweet.entities);
				var row = Ti.UI.createTableViewRow({
					user : tweet.user,
					tweet : tweet.text,
					hasChild : true,
					height : Ti.UI.SIZE
				});
				row.add(Ti.UI.createLabel({
					text : tweet.user.name + ', ' + tweet.user.location,
					top : '5dp',
					left : '100dp',
					right : '5dp',
					color : 'silver',
					height : '24dp',
					font : {
						fontSize : '14dp'

					}
				}));
				row.add(Ti.UI.createLabel({
					text : tweet.text,
					top : '25dp',
					bottom : '10dp',
					left : '100dp',
					right : '5dp',
					color : 'black',
					font : {
						fontSize : '16dp'

					},
					height : Ti.UI.SIZE
				}));
				row.add(Ti.UI.createImageView({
					left : 0,
					width : '70dp',
					height : '70dp',
					top : '10dp',
					image : tweet.user.profile_image_url

				}));
				rows.push(row);
			}
			self.tweetList.setData(rows);
		});
	}


	self.add(self.tweetList);
	/*self.tweetButton.addEventListener('click', function() {
	 return;
	 self.tweetButton.setOpacity(0);
	 Ti.App.Twitter.autorize(function(_reply) {
	 if (_reply.success == true) {
	 var tweetWin = require('ui/tweet.window').create();
	 tweetWin.open();
	 }
	 });
	 });*/
	self.addEventListener('focus', function() {
		updateTweetsOnGUI();
	});
	self.addEventListener('reload!', function() {
		updateTweetsOnGUI();
	});
	self.addEventListener('write!', function() {
		Ti.App.Twitter.autorize(function(_reply) {
			if (_reply.success == true) {
				var tweetWin = require('ui/tweet.window').create();
				tweetWin.open();
			}
		});
	});
	return self;
};

