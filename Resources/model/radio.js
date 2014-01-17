const RADIOLIST = 'RadioList';

var Radio = function() {
	this.importList();
	return this;
};

Radio.prototype.importList = function() {
	var self = this;
	function importIntoDB(groups) {
		var link = Ti.Database.open(RADIOLIST);
		link.execute('DROP TABLE IF EXISTS termine');
		link.execute('DROP TABLE IF EXISTS sender');
		link.execute('CREATE TABLE IF NOT EXISTS termine (wd NUMERIC, start NUMERIC, stop NUMERIC, name TEXT, senderid TEXT, sendungid TEXT,livestreamurl TEXT)');
		link.execute('CREATE TABLE IF NOT EXISTS sender(id TEXT,name TEXT,longname TEXT,livestreamurl TEXT)');
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

							//		console.log('wd='+termine[t].tag+' start='+start+ ' stop=' +stop);
						}
					}
				}
			}
		}
		link.execute('COMMIT');
		link.close();
		Ti.App.Properties.setList(RADIOLIST, groups);
	};
	if (!Ti.App.Properties.hasProperty(RADIOLIST)) {// app is virgin
		var groups = JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model', 'senderliste.json').read().text);
		Ti.App.Properties.setList(RADIOLIST, groups);
		importIntoDB(groups);
	}
	if (Ti.Network.online) {
		var yql = 'SELECT * FROM xml WHERE url="' + Ti.App.Properties.getString('radiourl') + '"';
		Ti.Yahoo.yql(yql, function(e) {
			if (e.success) {
				var groups = e.data.senderliste.senderfamilie;
				importIntoDB(groups);
			}
		});
	}
};

Radio.prototype.getDLRPodcasts = function() {
	if (true == Ti.Network.online) {
		var xhr = Ti.Network.createHTTPClient({
			onload : function() {
				var html = this.responseText;
				var podcasts = [];
				var regex = /<a\s.*?href="(.*?podcast\.xml)".*?>(.*?)<\/a>/gm;
				var res = html.match(regex);
				regex = /href="(.*?podcast\.xml)".*?>(.*?)<\/a>/m;
				for (var i = 0; i < res.length; i++) {
					podcasts.push({
						feed : res[i].match(regex)[1],
						title : res[i].match(regex)[2]
					});
				}
			}
		});
		xhr.open('GET', 'http://www.deutschlandradio.de/podcasts.226.de.html', true);
		xhr.send();
	}
};

Radio.prototype.getStationGroups = function() {
	return Ti.App.Properties.getList(RADIOLIST);
};

Radio.prototype.getSendungen = function() {
	console.log('Info: try to open ' + RADIOLIST);
	var moment = require('vendor/moment');
	var now = parseInt(moment().format('HH')) * 60 + parseInt(moment().format('m'));
	function res2termin(res) {
		var hh = Math.floor(res.fieldByName('start') / 60);
		var mm = Math.ceil(res.fieldByName('start') % 60);
		if (mm < 10)
			mm = '0' + mm;
		var duration = res.fieldByName('stop') - res.fieldByName('start');
		return {
			livestreamurl : res.fieldByName('livestreamurl'),
			start : hh + ':' + mm,
			duration : duration,
			senderid : res.fieldByName('senderid'),
			senderlongname : res.fieldByName('longname'),
			name : res.fieldByName('name'),
			progress : (now - parseInt(res.fieldByName('start'))) / duration
		};
	}

	try {
		var link = Ti.Database.open(RADIOLIST);
	} catch(E) {
		return [[], [], []];
	}
	var stop = parseInt(moment().format('H') * 60) + parseInt(moment().format('m'));
	var wd = moment().format('d');
	var q = 'SELECT termine.*,sender.longname AS longname FROM termine,sender WHERE sender.id=termine.senderid AND wd=' + wd + ' AND stop>' + stop + ' ORDER BY start';
	var res = link.execute(q);
	var termine = [[], [], []];
	while (res.isValidRow()) {
		termin = res2termin(res);
		if (now >= res.fieldByName('start'))
			termine[0].push(termin);
		else {
			termine[1].push(termin);
		}
		res.next();
	}
	res.close();
	wd = (wd + 1) % 7;
	if (!wd)
		wd = 7;
	var q = 'SELECT termine.*,sender.longname AS longname FROM termine,sender WHERE sender.id=termine.senderid AND wd=' + wd + ' ORDER BY start';
	var res = link.execute(q);
	while (res.isValidRow()) {
		termine[2].push(res2termin(res));
		res.next();
	}
	res.close();
	link.close();
	return termine;
};

Radio.prototype.getUrl = function(_args) {
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			var foo = this.responseText.split('\n');
			var bar = [];
			for (var i = 0; i < foo.length; i++) {
				if (foo[i][0] != '#')
					bar.push(foo[i]);
			}
			_args.onload(bar[0]);
		}
	});
	xhr.open('GET', _args.m3u);
	xhr.send();
};

module.exports = Radio;
