exports.save = function(RADIOLIST, groups) {
	var link =Ti.Database.open(RADIOLIST);
	console.log('Info: start saving to DB, groups length = '+ groups.length);
	link.execute('BEGIN');
	// Sendergruppen
	for (var i = 0; i < groups.length; i++) {
		var group = (Object.prototype.toString.call(groups[i].sender) === '[object Array]') ? groups[i].sender : [groups[i].sender];
		var stations = [];
		// Sender (Stationen)
		for (var g = 0; g < group.length; g++) {
			var sender = group[g];
			link.execute('INSERT INTO sender VALUES (?,?,?,?)', sender.id, sender.name, sender.longname, sender.livestream.url);
			var sendungen = (Object.prototype.toString.call(sender.sendung) === '[object Array]') ? sender.sendung : [sender.sendung];
			for (var s = 0; s < sendungen.length; s++) {
				var sendung = sendungen[s];
				if (!sendung)
					continue;
				var termine = (Object.prototype.toString.call(sendung.sendetermin) === '[object Array]') ? sendung.sendetermin : [sendung.sendetermin];
				for (var t = 0; t < termine.length; t++) {
					if (termine[t].dauer) {
						var tmp = termine[t].zeit.split(':');
						var start = 60 * parseInt(tmp[0]) + parseInt(tmp[1]);
						var stop = start + parseInt(termine[t].dauer);
						link.execute('INSERT INTO termine VALUES (?,?,?,?,?,?,?)', termine[t].tag, start, stop, sendungen[s].name, sender.id, sendungen[s].id, sender.livestream.url);
						//DEBUG      self.resolvePlaylist(sender.livestream.url);
						//		console.log('wd='+termine[t].tag+' start='+start+ ' stop=' +stop);
					}
				}
			}
		}
	}
	link.execute('COMMIT');
	Ti.App.Properties.setList(RADIOLIST,groups);
	link.close();
};
