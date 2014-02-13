exports.create = function(_parent, _podcastlist) {
	var listView = Ti.UI.createListView({
		templates : {
			'template' : require('ui/templates').podcastTemplate
		},
		defaultItemTemplate : 'template',
		backgroundImage : '/default.png'
	});
	var filesize = 0;
	listView.progressviewwidget = require('ui/progress.widget').create();
	listView.podcastwidget = new (require('ui/radio.widget'))();
	var sections = [];
	var PodCast = require('ui/radio.widget');
	Ti.App.Model.getPodcast({
		podcastlist : _podcastlist,
		onprogress : function(e) {
			listView.progressviewwidget.setProgress(e);
			listView.progressviewwidget.setMessage('Bitte etwas Geduld.');
		},
		onload : function(_podcasts) {
			filesize = _podcasts.filesize;
			_parent.fireEvent('podcasts_loaded', {
				filesize : filesize
			});
			listView.progressviewwidget.hide();
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
	listView.progressviewwidget.show();
	listView.progressviewwidget.setTitle('Hole Podcastliste\n' + _podcastlist.title);
	_parent.add(listView.progressviewwidget);
	_parent.add(listView.podcastwidget.getView());

	listView.addEventListener('itemclick', function(e) {
		var item = e.section.getItemAt(e.itemIndex);
		var podcast = JSON.parse(e.itemId);
		//var state = Ti.App.Model.getMy(podcast);
		var opts = {
			options : ['jetzt anhören', '„nur“ vormerken', 'auch lokal speichern'],
			selectedIndex : 0,
			destructive : 2,
			title : podcast.title
		};

		var dialog = Ti.UI.createOptionDialog(opts);
		dialog.show();
		dialog.addEventListener('click', function(_evt) {
			switch (_evt.index) {
				//  Playing
				case 0:
					if (Ti.App.Model.getMobileplaywarning()) {
						var warndialog = Ti.UI.createAlertDialog({
							cancel : 1,
							buttonNames : ['Start', 'Abbruch'],
							message : 'Das Gerät ist im Mobilnetz. Das Abspielen des Podcasts würde Traffic verursachen und damit das Monatkontingent belasten. Dennoch abspielen?',
							title : 'Warnung vor Trafficverbrauch'
						});
						warndialog.show();
						warndialog.addEventListener('click', function(_e) {
							listView.podcastwidget.togglePlay(podcast);
							Ti.App.Model.recentMy({
								podcast : podcast,
								onload : function() {
								}
							});
						});
					} else {
						listView.podcastwidget.togglePlay(podcast);
						Ti.App.Model.recentMy({
							podcast : podcast,
							onload : function() {
							}
						});
					}
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
				// Downlaoding
				case 2:
					if (Ti.App.Model.getMobiledownload()) {
						listView.progressviewwidget.setTitle(podcast.title);
						listView.progressviewwidget.setProgress(0);
						listView.progressviewwidget.show();
						listView.progressviewwidget.title.text = podcast.title;
						Ti.App.Model.saveMy({
							podcast : podcast,
							onprogress : function(_p) {
								listView.progressviewwidget.setProgress(_p);
								listView.progressviewwidget.setMessage('schon da: ' + parseInt(_p * 100) + '%');
							},
							onload : function(_p) {
								listView.progressviewwidget.hide();
								item.cached.image = '/images/cached.png';
								e.section.updateItemAt(e.itemIndex, item);
							},
						});
						listView.progressviewwidget.show();
						listView.progressviewwidget.setMessage('Starte Herunterladen …');
					} else {
						var mobiledialog = Ti.UI.createAlertDialog({
							message : 'Der Podcast ist nicht runterladbar, weil das Gerät nicht im WLAN ist und Du das in den Einstellungen unterbunden hast',
							ok : 'OK',
							title : 'Einwand!'
						}).show();
					}
					break;

			}
		});
	});
	_parent.addEventListener('close', function() {
		listView.podcastwidget.close();
	});

	return listView;
};
