const RADIOLIST = 'RadioListFavsSaves';
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, "");
};
String.prototype.ltrim = function() {
	return this.replace(/^\s+/, "");
};
String.prototype.rtrim = function() {
	return this.replace(/\s+$/, "");
};

var Radio = function() {
	this.importList();
	return this;
};

Radio.prototype.favMy = function(_args) {
	var id = Ti.Utils.md5HexDigest(_args.url);
	var link = Ti.Database.open(RADIOLIST);
	var res = link.execute('SELECT count(*) as total FROM myfavsandsaves WHERE id=?', id);
	var now = (new Date).getTime();
	if (res.isValidRow())
		var total = res.fieldByName('total');
	if (total)
		link.execute('UDATE myfavsandsaves SET mtime=?,meta=? WHERE id=?', now, JSON.stringify(_args.meta));
	else
		link.execute('INSERT INTO myfavsandsaves VALUES (?,?,?,?,?,?,?)', id, JSON.stringify(_args.meta), now, now, 0, 1, 0);
	link.close();
	_args.onload && (_args.onload(true));

};
Radio.prototype.saveMy = function(_args) {
	var id = Ti.Utils.md5HexDigest(_args.podcast.media);
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			var link = Ti.Database.open(RADIOLIST);
			var fh = Ti.Filesystem.isExternalStoragePresent() ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, id) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, id);
			fh.write(this.responseData);
			var res = link.execute('SELECT count(*) as total FROM myfavsandsaves WHERE id=?', id);
			var now = (new Date).getTime();
			if (res.isValidRow()) {
				var total = res.fieldByName('total');
				console.log('Info: ' + total + ' gefunden');
			}
			if (total) {
				var q ='UDATE myfavsandsaves SET cached=1 WHERE id="'+id+'"';
				console.log(q);
				link.execute(q);
			}
			else
				link.execute('INSERT INTO myfavsandsaves VALUES (?,?,?,?,?,?,?)', id, JSON.stringify(_args.podcasts), now, now, 0, 1, 0);
			link.close();
			_args.onload && (_args.onload(true));
		},
		ondatastream : function(_e) {
			_args.onprogress && _args.onprogress(_e.progress);
		}
	});
	xhr.open('GET', _args.podcast.media);
	xhr.send();
};

Radio.prototype.getMy = function(_podcast) {
	var link = Ti.Database.open(RADIOLIST);
	var id = _podcast.id;
	var q = 'SELECT * FROM myfavsandsaves WHERE id="' + id + '"';
	var res = link.execute(q);
	var item = {};
	if (res.isValidRow()) {
		item = {
			mtime : res.fieldByName('mtime'),
			ctime : res.fieldByName('ctime'),
			count : res.fieldByName('count'),
			local : res.fieldByName('local'),
			meta : JSON.parse(res.fieldByName('meta'))
		};
	}
	res.close();
	link.close();
	var fh = Ti.Filesystem.isExternalStoragePresent() ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, id) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, id);
	item.url = (fh.exists()) ? fh.nativePath : _podcast.url;
	return item;
};

Radio.prototype.importList = function() {
	var self = this;
	function importIntoDB(groups) {
		var link = Ti.Database.open(RADIOLIST);
		link.execute('CREATE TABLE IF NOT EXISTS myfavsandsaves (id TEXT, podcast TEXT, ctime NUMERIC, mtime NUMERIC, count NUMERIC,faved NUMERIC, cached NUMERIC)');
		link.execute('DROP TABLE IF EXISTS termine');
		link.execute('DROP TABLE IF EXISTS sender');
		link.execute('CREATE TABLE IF NOT EXISTS termine (wd NUMERIC, start NUMERIC, stop NUMERIC, name TEXT, senderid TEXT, sendungid TEXT,livestreamurl TEXT)');
		link.execute('CREATE TABLE IF NOT EXISTS sender(id TEXT,name TEXT,longname TEXT,livestreamurl TEXT)');
		link.close();
		link = Ti.Database.open(RADIOLIST);
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

Radio.prototype.getPodcast = function(_args) {
	function Elem2Text(_elem, _key) {
		var foo = _elem.getElementsByTagName(_key);
		return (foo.length) ? foo.item(0).textContent : null;
	}

	if (true == Ti.Network.online) {
		Ti.Android && Ti.UI.createNotification({
			message : 'Retrieving podcast\n„' + _args.podcastlist.title + "“"
		}).show();
		var xhr = Ti.Network.createHTTPClient({
			ondatastream : function(e) {
				_args.onprogress(e.progress);
			},
			onload : function() {
				Ti.Android && Ti.UI.createNotification({
					message : 'Podcastliste empfangen. (' + Math.round(this.responseText.length / 1000) + 'kB)'
				});
				var moment = require('vendor/moment');
				moment.lang('de');
				var doc = this.responseXML.documentElement;
				var items = doc.getElementsByTagName("item");
				var podcasts = [];
				Ti.Android && Ti.UI.createNotification({
					message : items.length + ' Podcasts gefunden.'
				}).show();
				for (var c = 0; c < items.length; c++) {
					var item = items.item(c);
					var title = Elem2Text(item, "title");
					var duration = Elem2Text(item, "itunes:duration");
					var author = Elem2Text(item, "itunes:author");
					var pubdate = moment(Elem2Text(item, "pubDate")).format('LLLL');
					var description = Elem2Text(item, "description");
					var summary = Elem2Text(item, "itunes:summary");
					if (!summary && description) {
						var text = /<img .*?>(.*?)</g.exec(description);
						if (text) {
							summary = text[1];
						}
					}
					var enclosure = item.getElementsByTagName("enclosure");
					if (enclosure && enclosure.getLength() > 0) {
						var media = enclosure.item(0).getAttribute('url');
					}
					var res = (description) ? /src="(.*?)"/g.exec(description) : null;
					podcasts.push({
						title : title,
						duration : (duration) ? duration : 'keine Angabe',
						author : author,
						pubdate : pubdate,
						station : _args.podcastlist.station,
						media : media,
						summary : (summary) ? summary.trim() : null,
						pict : (res) ? res[1] : '/images/' + _args.podcastlist.station + '.png'
					});
				}
				_args.onload(podcasts);

			}
		});
		xhr.open('GET', _args.podcastlist.feed, true);
		xhr.send();
	}
};

Radio.prototype.getStationGroups = function() {
	return Ti.App.Properties.getList(RADIOLIST);
};

Radio.prototype.getSendungen = function() {
	//	console.log('Info: try to open ' + RADIOLIST);
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
	var wd = moment().format('e');
	if (wd == 0)
		wd = 7;
	var q = 'SELECT termine.*,sender.longname AS longname FROM termine,sender WHERE sender.id=termine.senderid AND wd=' + wd + ' AND stop>' + stop + ' ORDER BY start';
	var res = link.execute(q);
	var termine = [[], [], []];
	while (res.isValidRow()) {
		termin = res2termin(res);
		//	console.log(termin);
		if (now >= res.fieldByName('start'))
			termine[0].push(termin);
		else {
			termine[1].push(termin);
		}
		res.next();
	}
	res.close();
	var q = 'SELECT termine.*, sender.longname AS longname FROM termine,sender WHERE sender.id=termine.senderid AND wd=' + wd + ' ORDER BY start';
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
