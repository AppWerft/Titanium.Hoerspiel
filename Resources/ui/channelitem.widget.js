var Item = function(_podcast, _section) {
	var item = {
		properties : {
			itemId : JSON.stringify(_podcast),
			accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE
		},
		title : {
			text : _podcast.title
		},
		ctime : {
			text : 'gemerkt am: ' + _podcast.ctime_i18n
		},
		mtime : {
			text : 'letzter Podcast: ' + _podcast.lastentry_i18n
		},
		total : {
			text : 'Anzahl der Podcasts: ' + _podcast.total
		},
		logo : {
			image : _podcast.logo
		},
		ai : {
			visible : true
		}
	};
	Ti.App.Model.fetchChannelSize({
		podcast : _podcast,
		onload : function(_filesize) {
			if (_filesize != _podcast.filesize) {
				Ti.UI.createNotification({
					message : "„" + _podcast.title + '“\nhat neuen Beitrag gesendet.'
				}).show();
			}
			item.ai.visible = false;

		}
	});
	return item;
};
module.exports = Item;
