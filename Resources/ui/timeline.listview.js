exports.create = function(_parent) {
	var listView = Ti.UI.createListView({
		templates : {
			'atemplate' : require('ui/templates').timelineactiveTemplate,
			'ptemplate' : require('ui/templates').timelinepassiveTemplate
		},
		defaultItemTemplate : 'ptemplate',
		backgroundColor : 'white'
	});
	var onairView = Ti.UI.createView({
		height : '50dp',
		backgroundColor : '#3C3A37'
	});
	onairView.add(Ti.UI.createImageView({
		width : '40dp',
		height : '45dp',
		left : '10dp',
		image : '/images/onair.png'
	}));
	onairView.now = Ti.UI.createLabel({
		left : '60dp',
		color : 'red',
		text : '00:00',
		font : {
			fontFamily : 'Astronaut',
			fontSize : '50dp'
		}
	});
	onairView.add(onairView.now);
	var sections = [];
	listView.update = function() {
		var termine = Ti.App.Model.getSendungen();
		if (termine[0].length == 0)
			onairView.height = 0;
		for (var s = 0; s < 3; s++) {
			var sendungen = [];
			if (termine[s])
				for (var i = 0; i < termine[s].length; i++) {
					var sendung = termine[s][i];
					var listdataitem = {
						properties : {
							itemId : JSON.stringify(sendung),
							accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_NONE,
						},
						title : {
							text : sendung.name
						},
						time : {
							text : (s == 0) ? 'seit ' + sendung.start + ' Uhr' : sendung.start + ' Uhr (' + sendung.duration + ' min.)'
						},
						stationlogo : {
							image : Ti.Filesystem.getFile('/images/' + sendung.senderid + '.png') ? '/images/' + sendung.senderid + '.png' : '/images/nil.png'
						}
					};
					if (s == 2)
						listdataitem.time.text = 'morgen ' + listdataitem.time.text;
					if (s == 0) {
						listdataitem.template = 'atemplate';
						var width = parseInt((sendung.progress * 90) % 90);
						listdataitem.play = {
							image : '/images/play.png'
						};
						listdataitem.progressview = {
							width : width // (0...1)
						};
					}
					sendungen.push(listdataitem);
				}
			var headertitles = ['', ' in den nächsten Stunden', 'Morgen'];
			if (s > 0) {
				sections[s] = Ti.UI.createListSection({
					headerTitle : headertitles[s],
					items : sendungen
				});
			} else {

				sections[0] = Ti.UI.createListSection({
					headerView : onairView,
					items : sendungen
				});
			}
		}
		listView.setSections(sections);
	};
	_parent.add(listView);

	listView.radiowidget = new (require('ui/radio.widget'))();
	_parent.add(listView.radiowidget.getView());
	listView.addEventListener('itemclick', function(e) {
		var options = JSON.parse(e.itemId);
		options.isplaylisturl = true;
		listView.radiowidget.togglePlay(options);

	});
	listView.cron = setInterval(function() {
		onairView.now.setText(require('vendor/moment')().format('HH:mm:ss'));
	}, 1000);

	return listView;
};
