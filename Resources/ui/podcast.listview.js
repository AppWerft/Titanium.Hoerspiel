exports.create = function(_parent, _podcastlist) {

	function cleanXML(foo) {
		console.log( typeof foo);
		switch (typeof foo) {
			case 'string':
				return foo;
			case 'object':
				return foo.text;
			default:
				return '';
		}
	};
	var listView = Ti.UI.createListView({
		templates : {
			'template' : require('ui/templates').podcastTemplate
		},
		defaultItemTemplate : 'template',
		backgroundColor : 'white'
	});
	var sections = [];
	var PodCast = require('ui/podcast.widget');
	listView.podcastwidget = new PodCast();

	setTimeout(function() {
		Ti.App.Model.getPodcast(_podcastlist, function(_podcasts) {
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
		});
	}, 10);
	_parent.add(listView.podcastwidget.getView());
	listView.addEventListener('itemclick', function(e) {
		var podcast = JSON.parse(e.itemId);
		var state =Ti.App.Model.getMy(podcast);
		var opts = {
			cancel : 2,
			options : ['Jetzt hören', 'Vormerken', 'Speichern','Kanal abonnieren'],
			selectedIndex : 3,
			destructive : 0,
			title :podcast.title
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
