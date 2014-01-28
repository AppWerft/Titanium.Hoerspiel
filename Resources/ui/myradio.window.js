exports.create = function() {
	var self = Ti.UI.createWindow({
		backgroundImage : 'default.png'
	});
	var types = [{
		key : 'cached',
		title : 'Offline - Podcast'
	}, {
		key : 'faved',
		title : 'Lieblingspodcasts'
	}, {
		key : 'recent',
		title : 'Letztgehörte Beiträge'
	}, {
		key : 'channels',
		title : 'Vorgemerkte 	Kanäle'
	}];
	var listviews = [];
	for (var i = 0; i < types.length; i++) {
		listviews.push(require('ui/myradio.listview').create(types[i]));
	}
	self.scrollableView = Ti.UI.createScrollableView({
		bottom : '20dp',
		views : listviews,
		backgroundColor : 'white'
	});
	self.add(self.scrollableView);
	var navitexts = ['✦ ● ● ●', '● ✦ ● ●', '● ● ✦ ●','● ● ● ✦'];
	var navi = Ti.UI.createLabel({
		bottom : 0,
		height : '20dp',
		opacity : 0.6,
		text : '✦ ● ●'
	});
	self.add(navi);
	var PodCast = require('ui/podcast.widget');
	self.podcastwidget = new PodCast();
	self.scrollableView.addEventListener('scrollend', function(_e) {
		listviews[_e.currentPage].update();
		navi.setText(navitexts[_e.currentPage]);
	});
	listviews[0].update();
	return self;
};
