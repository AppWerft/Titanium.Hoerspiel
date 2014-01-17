exports.create = function(_parent, _data) {
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
		Ti.App.Model.getPodcast(_data, function(_podcast) {
			var items = [];
			for (var i = 0; i < _podcast.channel.item.length; i++) {
				var podcast = _podcast.channel.item[i];
				var res = /src="(.*?)"/g.exec(podcast.description);
				var moment = require('vendor/moment');
				moment.lang('de');
				var ctime = moment(podcast.pubDate).format('LLLL');

				items.push({
					properties : {
						itemId : JSON.stringify(podcast),
						accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DETAIL
					},
					title : {
						text : podcast.title
					},
					author : {
						text : ( typeof podcast['itunes:author'] == 'string') ? podcast['itunes:author'] : podcast['itunes:author'].text
					},
					duration : {
						text : 'Dauer: ' + ( typeof podcast['itunes:duration'] == 'string') ? podcast['itunes:duration'] : podcast['itunes:duration'].text
					},
					pubdate : {
						text : ctime
					},
					pict : {
						image : (res) ? res[1] : '/images/'+_data.station + '.png'					}
				});
			}
			sections[0] = Ti.UI.createListSection({
				headerTitle : _podcast.channel.image.title,
				items : items
			});
			listView.setSections(sections);
		});
	}, 10);
	_parent.add(listView.podcastwidget.getView());
	listView.addEventListener('itemclick', function(e) {
		listView.podcastwidget.togglePlay(JSON.parse(e.itemId));
	});
	_parent.addEventListener('close', function() {
		listView.podcastwidget.close();
	});

	return listView;
};
