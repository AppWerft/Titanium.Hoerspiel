/*  .key: which panel as  string
 *  .onclick: _callback on itemclick, controlsplayer in parent
 */
exports.create = function() {
	var options = arguments[0] || {}, items = [];
	var section = Ti.UI.createListSection({
		headerView : require('ui/headerview.widget').create(options),
	});
	function updateList() {
		console.log('Info: start updateList with: ' + options.key);
		switch (options.key) {
			case 'channels':
				var podcasts = Ti.App.Model.getChannels();
				break;
			default:
				var podcasts = Ti.App.Model.getMy()[options.key];
				break;
		}
		items = [];
		var Item = require('ui/channelitem.widget');
		for (var i = 0; i < podcasts.length; i++) {
			var podcast = podcasts[i];
			switch (options.key) {
				case 'channels':
					var item = new Item(podcast,section,i);
					items.push(item);
					break;
				default:
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
		}
		section.setItems(items);
	}// ends of updateList

	var self = Ti.UI.createListView({
		templates : {
			'template' : (options.key == 'channels') ? require('ui/templates').channelsTemplate : require('ui/templates').podcastTemplate
		},
		defaultItemTemplate : 'template',
		borderWidth : 0.4,
		borderColor : '#66f',
		backgroundColor : 'white',
		sections : [section]
	});

	self.addEventListener('itemclick', function(_evt) {
		var podcast = JSON.parse(_evt.itemId);
		if (options.key != 'channels')
			options.onclick && options.onclick(podcast);
		else {
			var win = require('ui/podcast.window').create(podcast);
			if (Ti.Android)
				win.open();
			else
				self.tab.open(win);
		}
	});
	self.addEventListener('swipe', function(_evt) {
		console.log(_evt);
	});
	self.update = updateList;
	return self;
};
