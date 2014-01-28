exports.create = function(_type) {
	function updateList() {
		switch (_type) {
			case 'channels':
				var podcasts = Ti.App.Model.getChannels();
				break;
			default:
				var podcasts = Ti.App.Model.getMy()[_type.key];
				break;
		}

		var items = [];
		for (var i = 0; i < podcasts.length; i++) {
			var podcast = podcasts[i];
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
					image : '/images/nil.png'
				},
				faved : {
					image : '/images/nil.png'
				},
				summary : {
					height : 0
				}
			});
		}
		var sections = [Ti.UI.createListSection({
			headerTitle : _type.title,
			items : items
		})];
		self.setSections(sections);
	}

	var self = Ti.UI.createListView({
		templates : {
			'template' : require('ui/templates').podcastTemplate
		},
		defaultItemTemplate : 'template',
		backgroundColor : 'white'
	});
	self.addEventListener('focus', updateList);
	self.update = updateList;
	return self;
};
