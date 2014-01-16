exports.create = function(_parent) {
	var listView = Ti.UI.createListView({
		templates : {
			'atemplate' : require('ui/templates').timelineactiveTemplate,
			'ptemplate' : require('ui/templates').timelinepassiveTemplate
		},
		defaultItemTemplate : 'ptemplate',
		backgroundColor : 'white'
	});
	listView.update = function() {
		var termine = Ti.App.Model.getSendungen();
		var sections = [];
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
					if (s ==2) listdataitem.time.text = 'morgen ' + listdataitem.time.text;
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
			var headertitles = ['on air @ ' + require('vendor/moment')().format('HH:mm') + ' Uhr', ' in next future', 'tomorrow'];
			sections[s] = Ti.UI.createListSection({
				headerTitle : headertitles[s],
				items : sendungen
			});
		}
		listView.setSections(sections);
	};
	_parent.add(listView);
	
	var Radio = require('ui/radio.widget');
	listView.radiowidget = new Radio();
	_parent.add(listView.radiowidget.getView());
	listView.addEventListener('itemclick', function(e) {
		var item = e.section.getItemAt(e.itemIndex);
		listView.radiowidget.togglePlay(JSON.parse(e.itemId));
		//e.section.updateItemAt(e.itemIndex, item);

	});
	
	return listView;
};
