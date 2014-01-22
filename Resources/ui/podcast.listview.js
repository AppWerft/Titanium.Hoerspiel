exports.create = function(_parent, _podcastlist) {
	var listView = Ti.UI.createListView({
		templates : {
			'template' : require('ui/templates').podcastTemplate
		},
		defaultItemTemplate : 'template',
		backgroundImage : '/default.png'
	});
	listView.progressview = require('ui/progress.widget').create();
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
	_parent.add(listView.progressview);
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
		//var state = Ti.App.Model.getMy(podcast);
		var opts = {
			cancel : 3,
			options : ['Jetzt hören', 'Vormerken', 'Speichern', 'Kanal abonnieren'],
			selectedIndex : 3,
			destructive : 0,
			title : podcast.title
		};

		var dialog = Ti.UI.createOptionDialog(opts);
		dialog.show();
		dialog.addEventListener('click', function(_evt) {
			switch (_evt.index) {
				case 0:
					listView.podcastwidget.togglePlay(podcast);
					break;
				case 2:
					listView.progressview.setTitle(podcast.title);	
					listView.progressview.setProgress(0);
					listView.progressview.show();
					listView.progressview.title.text = podcast.title;
					Ti.App.Model.saveMy({
						podcast : podcast,
						onprogress : function(_p) {
							listView.progressview.setProgress(_p);
						},
						onload : function(_p) {
							listView.progressview.hide();
						},
					});
					listView.progressview.setMessage('Starte Herunterladen …');	
					break;
				default:
					Ti.UI.createNotification({
						message : 'Das ist noch nicht realisiert,'
					}).show();
			}
		});
	});
	_parent.addEventListener('close', function() {
		listView.podcastwidget.close();
	});
	
	return listView;
};
