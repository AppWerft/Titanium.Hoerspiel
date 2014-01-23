exports.create = function() {
	function updateList() {
		var podcasts = Ti.App.Model.getMy();
		var types = ['cached', 'faved', 'recent'];
		for (var t = 0; t < types.length; t++) {
			var type = types[t];
			var items = [];
			console.log(podcasts[type]);
			if (podcasts[type])
				for (var i = 0; i < podcasts[type].length; i++) {
					var podcast = podcasts[type][i];
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
						},
						cached : {
							image :  '/images/nil.png'
						},
						faved : {
							image :  '/images/nil.png'
						},
						summary : {
							height : 0
						}
					});
				}
			console.log(items);
			sections[t].setItems(items);
		}
		listView.setSections(sections);
	}

	var self = Ti.UI.createWindow({
		backgroundImage : 'default.png'
	});
	var listView = Ti.UI.createListView({
		templates : {
			'template' : require('ui/templates').podcastTemplate
		},
		defaultItemTemplate : 'template',
		backgroundImage : '/default.png'
	});
	self.add(listView);
	listView.progressview = require('ui/progress.widget').create();
	var sections = [];
	sections[0] = Ti.UI.createListSection({
		headerTitle : 'Meine gespeicherten Podcasts',
	});
	sections[1] = Ti.UI.createListSection({
		headerTitle : 'Meine vorgemerkten Podcasts',
	});
	sections[2] = Ti.UI.createListSection({
		headerTitle : 'Meine letztlich gehörten Podcasts',
	});
	listView.setSections(sections);
	var PodCast = require('ui/podcast.widget');
	listView.podcastwidget = new PodCast();
	self.addEventListener('focus', updateList);
	return self;
};
