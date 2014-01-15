exports.create = function() {
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
		for (var s = 0; s < 2; s++) {
			var sendungen = [];
			for (var i = 0; i < termine[s].length; i++) {
				var sendung = termine[s][i];
				var listdataitem = {
					properties : {
						itemId : sendung.livestreamurl,
						accessoryType : (s == 0) ? Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE : Ti.UI.LIST_ACCESSORY_TYPE_NONE,
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
				if (s == 0) {
					listdataitem.template = 'atemplate';
					listdataitem.progressbar = {
						value : sendung.progress // (0...1)
					};
					var width = parseInt((sendung.progress * 90)%90);
					console.log(width);
					listdataitem.progressview = {
						width : width // (0...1)
					};


				}
				sendungen.push(listdataitem);
			}
			sections[s] = Ti.UI.createListSection({
				headerTitle : (s == 0) ? 'on air @ ' + require('vendor/moment')().format('HH:mm') + ' Uhr' : ' in next future …',
				items : sendungen
			});
		}
		sections[0].updateItemAt(0, {
			progressbar : {
				value : 0.8
			}
		});
		listView.setSections(sections);
	};
	listView.addEventListener('itemclick', function(e) {
		console.log(e);
	});
	return listView;
};
