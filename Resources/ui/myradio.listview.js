/*  .type: which panel as  string
 *  .onclick: _callback on itemclick, controlsplayer in parent
 */
exports.create = function(_args) {
	function updateList() {
		switch (_args.type) {
			case 'channels':
				var podcasts = Ti.App.Model.getChannels();
				break;
			default:
				var podcasts = Ti.App.Model.getMy()[_args.type.key];
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
			headerView : headerView,
			items : items
		})];
		var quota = (Ti.App.Model.getQuota()) ? Ti.App.Model.getQuota().quota : 0;
		quotaView.setValue(quota);
		self.setSections(sections);
	}

	var self = Ti.UI.createListView({
		templates : {
			'template' : require('ui/templates').podcastTemplate
		},
		defaultItemTemplate : 'template',
		backgroundColor : 'white'
	});
	var headerView = Ti.UI.createView({
		height : '30dp',
		backgroundColor : 'gray'
	});

	var quotaView = Ti.UI.createProgressBar({
		min : 0,
		max : 1,
		value : 0,
		bottom : '5dp',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		left : '200dp',
		right : '10dp'
	});
	//if (_args.type == 'cached') {
		headerView.add(quotaView);
		quotaView.show();
	//}
	headerView.add(Ti.UI.createLabel({
		left : '40dp',
		textAlign : 'left',
		color : 'white',
		font : {
			fontWeight : 'bold'
		},
		text : _args.type.title
	}));
	headerView.add(Ti.UI.createImageView({
		left : '5dp',
		width : '25dp',
		height : '25dp',
		image : '/images/' + _args.type.key + '.png'
	}));
	self.addEventListener('itemclick', function(_evt) {
		_args.onclick && _args.onclick(JSON.parse(_evt.itemId));
	});
	self.update = updateList;
	return self;
};
