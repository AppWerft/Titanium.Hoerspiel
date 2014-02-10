exports.create = function() {
	function togglePlay(_podcast) {
		self.podcastwidget.togglePlay(_podcast);
	}

	var self = Ti.UI.createWindow({
		backgroundImage : 'default.png'
	});

	self.podcastwidget = new (require('ui/radio.widget'))();

	var types = [{
		key : 'channels',
		title : 'Vorgemerkte Kanäle'
	}, {
		key : 'cached',
		title : 'Offline - Podcast'
	}, {
		key : 'faved',
		title : 'Lieblingspodcasts'
	}, {
		key : 'recent',
		title : 'Letztgehörte Beiträge'
	}];
	var depotlistviews = [];
	for (var i = 0; i < types.length; i++) {
		depotlistviews.push(require('ui/myradio.listview').create({
			key : types[i].key,
			title : types[i].title,
			onclick : togglePlay
		}));
	}

	self.scrollableView = Ti.UI.createScrollableView({
		bottom : '20dp',
		views : depotlistviews,
		showPagingControl : true,
		backgroundColor : 'white'
	});
	self.add(self.scrollableView);

	var navitexts = ['✦ ● ● ●', '● ✦ ● ●', '● ● ✦ ●', '● ● ● ✦'];
	var navi = Ti.UI.createLabel({
		bottom : 0,
		height : '20dp',
		opacity : 0.6,
		text : '✦ ● ●'
	});
	self.add(navi);
	self.scrollableView.addEventListener('scrollend', function(_e) {
		console.log('Info: scrollend received ndx=' + _e.currentPage);
		depotlistviews[_e.currentPage].update();
		navi.setText(navitexts[_e.currentPage]);
	});
	self.addEventListener('focus', function() {
		console.log('Info: focus of depot received ndx=' + self.scrollableView.currentPage);
		console.log(depotlistviews[i]);
		depotlistviews[self.scrollableView.currentPage].update && depotlistviews[self.scrollableView.currentPage].update();
	});
	self.add(self.podcastwidget.getView());

	return self;

};
