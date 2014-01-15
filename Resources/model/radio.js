var Radio = function() {
	this.importList();
	return this;
};

Radio.prototype.importList = function() {
	if (Ti.Network.online) {
		var yql = 'SELECT * FROM xml WHERE url="' + Ti.App.Properties.getString('radiourl') + '"';
		Ti.Yahoo.yql(yql, function(e) {
			if (e.success) {
				var groups = e.data.senderliste.senderfamilie;
				var link = Ti.Database.open('radio');
				link.execute('DROP TABLE IF EXISTS termine');
				link.execute('DROP TABLE IF EXISTS sender');
				link.execute('CREATE TABLE IF NOT EXISTS termine (wd NUMERIC, start NUMERIC, stop NUMERIC, name TEXT, senderid TEXT, sendungid TEXT,livestreamurl TEXT)');
				link.execute('CREATE TABLE IF NOT EXISTS sender(id TEXT,name TEXT,longname TEXT,livestreamurl TEXT)');
				link.execute('DELETE FROM termine');
				link.execute('DELETE FROM sender');
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
									link.execute('INSERT INTO termine VALUES (?,?,?,?,?,?,?)',
									  termine[t].tag, 
									  start, 
									  stop, 
									  sendungen[s].name, 
									  sender.id, 
									  sendungen[s].id,
									  sender.livestream.url);
									
									//		console.log('wd='+termine[t].tag+' start='+start+ ' stop=' +stop);
								}
							}
						}

					}
				}
				link.close();
				Ti.App.Properties.setList('list', e.data.senderliste.senderfamilie);
			}
		});
	}
};
Radio.prototype.getStationGroups = function() {
	return Ti.App.Properties.getList('list');
};

Radio.prototype.getSendungen = function() {
	var link = Ti.Database.open('radio');
	var moment = require('vendor/moment');
	var stop = parseInt(moment().format('H') * 60) + parseInt(moment().format('m'));
	var wd = moment().format('d');
	var q = 'SELECT * FROM termine WHERE  wd=' + wd + ' AND stop>' + stop + ' ORDER BY start';
	var res = link.execute(q);
	var termine = [[], []];
	while (res.isValidRow()) {
		var hh = Math.floor(res.fieldByName('start') / 60);
		var mm = Math.ceil(res.fieldByName('start') % 60);
		if (mm < 10)
			mm = '0' + mm;
		var duration = res.fieldByName('stop') - res.fieldByName('start');
		var now = parseInt(moment().format('HH')) * 60 + parseInt(moment().format('m'));
		var termin = {
			livestreamurl : res.fieldByName('livestreamurl'),
			start : hh + ':' + mm,
			duration : duration,
			senderid : res.fieldByName('senderid'),
			name : res.fieldByName('name'),
			progress : (now - parseInt(res.fieldByName('start'))) / duration
		};
		if (now >= res.fieldByName('start'))
			termine[0].push(termin);
		else {
			termine[1].push(termin);
		}
		console.log(JSON.stringify(termin));
		res.next();
	}
	res.close();
	link.close();
	return termine;
};

Radio.prototype.getUrl = function(_args) {
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			_args.onload(this.responseText.split('\n')[0]);
		}
	});
	xhr.open('GET', _args.m3u);
	xhr.send();
};

module.exports = Radio;
