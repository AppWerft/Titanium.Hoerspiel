exports.create = function(_parent, _podcastlist) {
	var listView = Ti.UI.createListView({
		templates : {
			'template' : require('ui/templates').podcastTemplate
		},
		defaultItemTemplate : 'template',
		backgroundImage : '/default.png'
	});
	var sections = [];
	var PodCast = require('ui/podcast.widget');
	listView.podcastwidget = new PodCast();

	setTimeout(function() {
		Ti.App.Model.getPodcast({
			podcastlist : _podcastlist,
			onprogress : function(e) {
				progress.setValue(e);
			},
			onload : function(_podcasts) {
				progress.hide();
				var items = [];
				for (var i = 0; i < _podcasts.length; i++) {
					var podcast = _podcasts[i];
					items.push({
						properties : {
							itemId : JSON.stringify(podcast),
							accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DETAIL
						},
						title : {
							text : podcast.title
						},
						author : {
							text : podcast.author
						},
						summary : {
							text : podcast.summary
						},
						duration : {
							text : 'Dauer: ' + podcast.duration
						},
						pubdate : {
							text : 'Sendezeit: ' + podcast.pubdate
						},
						pict : {
							image : podcast.pict
						}
					});
				}
				sections[0] = Ti.UI.createListSection({
					//headerTitle : _podcast.channel.image.title,
					items : items
				});
				listView.setSections(sections);
			}
		});
	}, 10);
	_parent.add(listView.podcastwidget.getView());
	var progress = Ti.UI.createProgressBar({
		height : '50dp',
		bottom : '10dp',
		min : 0,
		max : 1,
		value : 0,
		width : '90%',
		zIndex : 9999
	});
	_parent.add(progress);
	progress.show();
	listView.addEventListener('itemclick', function(e) {
		var podcast = JSON.parse(e.itemId);
		console.log(podcast);
		//var state = Ti.App.Model.getMy(podcast);
		var opts = {
			cancel : 2,
			options : ['Jetzt hören', 'Vormerken', 'Speichern', 'Kanal abonnieren'],
			selectedIndex : 3,
			destructive : 0,
			title : podcast.title
		};

		var dialog = Ti.UI.createOptionDialog(opts);
		dialog.show();
		dialog.addEventListener('click', function(_evt) {
			if (_evt.index == 0)
				listView.podcastwidget.togglePlay(podcast);
		});
	});
	_parent.addEventListener('close', function() {
		listView.podcastwidget.close();
	});

	return listView;
};
