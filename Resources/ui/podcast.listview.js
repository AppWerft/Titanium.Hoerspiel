exports.create = function(_parent, _podcastlist) {
	var listView = Ti.UI.createListView({
		templates : {
			'template' : require('ui/templates').podcastTemplate
		},
		defaultItemTemplate : 'template',
		backgroundImage : '/default.png'
	});
	var filesize = 0;
	listView.progressview = require('ui/progress.widget').create();
	listView.podcastwidget = new (require('ui/radio.widget'))();
	var sections = [];
	var PodCast = require('ui/podcast.widget');
	Ti.App.Model.getPodcast({
		podcastlist : _podcastlist,
		onprogress : function(e) {
			listView.progressview.setProgress(e);
			listView.progressview.setMessage('Bitte etwas Geduld.');
		},
		onload : function(_podcasts) {
			filesize = _podcasts.filesize;
			listView.progressview.hide();
			var items = [];
			for (var i = 0; i < _podcasts.podcasts.length; i++) {
				var podcast = _podcasts.podcasts[i];
				var item = {
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
					},
					cached : {
						image : (podcast.cached) ? '/images/cached.png' : '/images/nil.png'
					},
					faved : {
						image : (podcast.faved) ? '/images/faved.png' : '/images/nil.png'
					}
				};
				if (!podcast.summary)
					item.summary.height = 0;
				if (!podcast.author)
					item.author.height = 0;

				items.push(item);
			}
			sections[0] = Ti.UI.createListSection({
				//headerTitle : _podcast.channel.image.title,
				items : items
			});
			listView.setSections(sections);
		}
	});
	listView.progressview.show();
	listView.progressview.setTitle('Hole Podcastliste\n' + _podcastlist.title);
	_parent.add(listView.progressview);
	_parent.add(listView.podcastwidget.getView());

	listView.addEventListener('itemclick', function(e) {
		var item = e.section.getItemAt(e.itemIndex);
		var podcast = JSON.parse(e.itemId);
		//var state = Ti.App.Model.getMy(podcast);
		var opts = {
			options : ['Jetzt anhören', 'Vormerken', 'Lokal speichern', 'Kanal abonnieren'],
			selectedIndex : 0,
			destructive : 2,
			title : podcast.title
		};

		var dialog = Ti.UI.createOptionDialog(opts);
		dialog.show();
		dialog.addEventListener('click', function(_evt) {
			switch (_evt.index) {
				case 0:
					listView.podcastwidget.togglePlay(podcast);
					Ti.App.Model.recentMy({
						podcast : podcast,
						onload : function() {
						}
					});
					break;
				case 1:
					Ti.App.Model.favMy({
						podcast : podcast,
						onload : function() {
						}
					});
					item.faved.image = '/images/faved.png';
					e.section.updateItemAt(e.itemIndex, item);

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
							listView.progressview.setMessage('schon da: ' + parseInt(_p * 100) + '%');
						},
						onload : function(_p) {
							listView.progressview.hide();
							item.cached.image = '/images/cached.png';
							e.section.updateItemAt(e.itemIndex, item);
						},
					});
					listView.progressview.show();
					listView.progressview.setMessage('Starte Herunterladen …');
					break;
				case 3:
					Ti.App.Model.saveChannel({
						filesize : filesize,
						podcastlist : _podcastlist
					});
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
