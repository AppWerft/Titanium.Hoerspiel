exports.create = function() {
	var self = Ti.UI.createWindow({
		fullscreen : true,
		backgroundColor : '#fff'
	});
	self.tweetList = Ti.UI.createTableView({
		height : Ti.UI.FILL,
		backgroundColor : '#fff'
	});
	self.tweetList.addEventListener('click', require('ui/twitter/dialog.widget').create);
	
	function updateTweetsOnGUI() {
		Ti.App.Twitter.fetch('search_tweets', 'Hörspiel', function(_response) {
			console.log('Info: tweets = ' + _response.statuses.length);
			var rows = [];
			for (var i = 0; i < _response.statuses.length; i++) {
				rows.push(require('ui/twitter/tweet').create(_response.statuses[i]));
			}
			self.tweetList.setData(rows);
		});
	}


	self.add(self.tweetList);

	self.addEventListener('reload!', function() {
		updateTweetsOnGUI();
	});
	self.dialog = require('ui/twitter/tweetwriter.widget').create();
	self.addEventListener('write!', function() {
		Ti.App.Twitter.autorize(function(_reply) {
			if (_reply.success == true) {
				self.dialog.show();
			}
		});
	});
	updateTweetsOnGUI();
	return self;
};

