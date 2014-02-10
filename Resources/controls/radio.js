const RADIOLIST = 'Radio_ListFavsSaves';
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, "");
};
String.prototype.ltrim = function() {
	return this.replace(/^\s+/, "");
};
String.prototype.rtrim = function() {
	return this.replace(/\s+$/, "");
};
if (!Array.isArray) {
	Array.isArray = function(vArg) {
		return Object.prototype.toString.call(vArg) === "[object Array]";
	};
}
var getFilehandle = function(filename) {
	var dir = Ti.Filesystem.isExternalStoragePresent() ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'cachefolder') : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'cachefolder');
	if (!dir.exists()) {
		dir.createDirectory('cachefolder');
	};
	if (filename)
		return Ti.Filesystem.isExternalStoragePresent() ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'cachefolder', filename) : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'cachefolder', filename);
	return Ti.Filesystem.isExternalStoragePresent() ? Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, 'cachefolder') : Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'cachefolder');
};

var Radio = function() {
	var sql = null;
	var link = Ti.Database.open(RADIOLIST);
	if (link) {
		var queries = [//
		'BEGIN', //
		'CREATE TABLE IF NOT EXISTS myfavsandsaves (id TEXT, podcast TEXT, ctime INTEGER, mtime INTEGER, count INTEGER,faved INTEGER, localcached INTEGER)', //
		'DROP TABLE IF EXISTS termine', //
		'DROP TABLE IF EXISTS sender', //
		'CREATE TABLE IF NOT EXISTS podcastchannels (id TEXT, title TEXT, station TEXT, logo TEXT, url TEXT, lastentry NUMERIC, filesize NUMERIC, ctime NUMERIC, done NUMERIC,total NUMERIC,podcast TEXT)', //
		'CREATE TABLE IF NOT EXISTS termine (wd NUMERIC, start NUMERIC, stop NUMERIC, name TEXT, senderid TEXT, sendungid TEXT,livestreamurl TEXT)', //
		'CREATE TABLE IF NOT EXISTS sender(id TEXT,name TEXT,longname TEXT, livestreamurl TEXT)', //
		'CREATE TABLE IF NOT EXISTS myfavstations (id TEXT,name TEXT,longname TEXT, logo TEXT,ctime NUMERIC,mtime NUMERIC, playlisturl TEXT, livestreamurl TEXT)', //
		'COMMIT'//
		];
		//
		while ( sql = queries.shift()) {
			console.log('Info: sql=' + sql);
			link.execute(sql + ';');
		}
		link.close();
		this.getAllStationList();
		return this;
	} else
		console.log('Warning: cannot access DB !!!!!!!!!');
};

Radio.prototype.getAllStationList = function() {
	// result of:
	// http://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20html%20WHERE%20url%3D%22http%3A%2F%2Fwww.listenlive.eu%2Fgermany.html%22%20and%20xpath%3D%22%2F%2Ftbody%22&format=json&diagnostics=true&callback=
	var list = JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'model', 'stations.json').read().text).query.results.tbody.tr;
	var tr = null, stations = [], found = false, station = null;
	list.shift();
	// supress header
	while ( tr = list.shift()) {
		if (tr.td[0].strong) {
			station = {
				link : tr.td[0].strong.a.href,
				title : tr.td[0].strong.a.strong
			};
		} else {
			station = {
				link : tr.td[0].a.href,
				title : tr.td[0].a.strong
			};
		}
		station.location = tr.td[1].p;
		station.speed = tr.td[3].content;
		station.genre = tr.td[4].p;
		if (tr.td[2].push) {
			console.log('!');
		} else {
			if (tr.td[2].img.alt == 'MP3') {
				station.media = tr.td[3].a.href;
				stations.push(station);
				//			console.log(station);
			}
		}
	}
	list = null;
	console.log(stations.length);

};

Radio.prototype.getMobileplaywarning = function() {
	return (Ti.Network.getNetworkType() != Ti.Network.NETWORK_MOBILE || !Ti.App.Properties.getProperty('mobilewarning')) ? false : true;
};
Radio.prototype.getMobiledownload = function() {
	return (Ti.Network.getNetworkType() != Ti.Network.NETWORK_MOBILE || !Ti.App.Properties.getProperty('downloadonlywifi')) ? true : false;
};
Radio.prototype.getQuota = function() {
	var dir = getFilehandle();
	var files = dir.getDirectoryListing();
	var filesize = 0;
	var maxmem = Ti.App.Properties.getString('maxmem') || 900;
	if (files) {
		for (var i = 0; i < files.length; i++) {
			filesize += (getFilehandle(files[i]).size) / 1000000;
		}
		var quota = {
			maxmem : maxmem,
			filesize : filesize,
			quota : filesize / maxmem
		};
		Ti.App.fireEvent("quota", {
			"quota" : quota
		});
		return quota;
	} else
		return null;
};

Radio.prototype.resolvePlaylist = function(_args) {
	var uri_pattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			var foo = this.responseText.split('\n');
			var bar = [];
			for (var i = 0; i < foo.length; i++) {
				if (foo[i][0] == '#')
					continue;
				var uri = foo[i].match(uri_pattern);
				if (uri)
					bar.push(uri);
			}
			_args.onload(bar[0][0]);
		}
	});
	xhr.open('GET', _args.playlist);
	xhr.send();
	Ti.App.addEventListener('app:exit', xhr.abort);

};

Radio.prototype.getAllFiles = function() {

};

Radio.prototype.getMy = function() {
	var link = Ti.Database.open(RADIOLIST);
	var list = {
		faved : [],
		cached : [],
		recent : [],
		channels : []
	};
	if (link) {
		var res = link.execute('SELECT * FROM myfavsandsaves ORDER BY mtime DESC');
		while (res.isValidRow()) {
			var entry = {
				mtime : res.fieldByName('mtime'),
				ctime : res.fieldByName('ctime'),
				count : res.fieldByName('count'),
				id : res.fieldByName('id'),
				cached : (res.fieldByName('localcached')) ? true : false,
				faved : (res.fieldByName('faved')) ? true : false,
			};
			try {
				var podcast = JSON.parse(res.fieldByName('podcast'));
				for (var key in podcast) {
					entry[key] = podcast[key];
				}
			} catch(E) {
				console.log('Warning: cannot parse JSON from DB');
			}
			if (entry.count > 0)
				entry.recent = true;
			if (entry.title) {
				if (entry.cached)
					list.cached.push(entry);
				if (entry.faved)
					list.faved.push(entry);
				if (entry.recent)
					list.recent.push(entry);
			}
			res.next();
		}
		link.close();
		return list;
	}
	console.log('Warning: cannot link to DB');
	return null;
};

Radio.prototype.saveMy = function(_args) {
	var id = Ti.Utils.md5HexDigest(_args.podcast.media);
	var self = this;
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			var db = Ti.Database.open(RADIOLIST);
			var fh = getFilehandle(id);
			fh.write(this.responseData);
			var res = db.execute('SELECT count(*) as total FROM myfavsandsaves WHERE id=?', id);
			var now = (new Date).getTime();
			if (res.isValidRow()) {
				var total = res.fieldByName('total');
				console.log('Info: ' + total + ' gefunden');
			}
			if (total) {
				db.execute('UPDATE myfavsandsaves SET localcached=1 WHERE id=?', id);
			} else
				db.execute('INSERT INTO myfavsandsaves VALUES (?,?,?,?,?,?,?)', id, JSON.stringify(_args.podcast), now, now, 0, 0, 1);
			self.getQuota();
			_args.onload && (_args.onload(true));
			db.close();
		},
		ondatastream : function(_e) {
			_args.onprogress && _args.onprogress(_e.progress);
			var length = xhr.getResponseHeader('Content-Length') / 1000;
		}
	});
	xhr.open('GET', _args.podcast.media);
	xhr.send();
	Ti.App.addEventListener('app:exit', xhr.abort);

};

Radio.prototype.favMy = function(_args) {
	var id = Ti.Utils.md5HexDigest(_args.podcast.media);
	var db = Ti.Database.open(RADIOLIST);
	var res = db.execute('SELECT count(*) as total FROM myfavsandsaves WHERE id=?', id);
	var now = (new Date).getTime();
	if (res.isValidRow()) {
		var total = res.fieldByName('total');
		console.log('Info: ' + total + ' gefunden');
	}
	if (total) {
		db.execute('UPDATE myfavsandsaves SET faved=1 WHERE id=?', id);
	} else
		db.execute('INSERT INTO myfavsandsaves VALUES (?,?,?,?,?,?,?)', id, JSON.stringify(_args.podcast), now, now, 0, 1, 0);
	_args.onload && (_args.onload(true));
	db.close();

};

Radio.prototype.saveChannel = function(_podcasts) {
	var id = Ti.Utils.md5HexDigest(_podcasts.feed);
	var db = Ti.Database.open(RADIOLIST);
	var res = db.execute('SELECT count(*) as total FROM podcastchannels WHERE id=?', id);
	var now = (new Date).getTime();
	if (res.isValidRow()) {
		var total = res.fieldByName('total');
	}
	//(id , title , station , logo , url , lastentry , filesize )
	if (!total)
		db.execute('INSERT INTO podcastchannels VALUES (?,?,?,?,?,"",?,?,0,0,0)', id, // id o feed (md5 hash of url)
		_podcasts.title, // title
		_podcasts.station, // station
		_podcasts.logo, //
		_podcasts.feed, //
		_podcasts.filesize, // for cheap version control
		(new Date()).getTime());
	// ctime
	db.close();
};
Radio.prototype.isChannelsaved = function(_podcasts) {
	var db = Ti.Database.open(RADIOLIST);
	var id = Ti.Utils.md5HexDigest(_podcasts.feed);
	var total = 0;
	var res = db.execute('SELECT count(*) as total FROM podcastchannels WHERE id=?', id);
	if (res.isValidRow()) {
		total = res.fieldByName('total');
		console.log('Info: ' + total + ' gefunden (' + id + ')');
		res.close();
	}
	db.close();
	return (total) ? true : false;
};

Radio.prototype.getChannels = function() {
	var db = Ti.Database.open(RADIOLIST);
	var moment = require('vendor/moment');
	moment.lang('de');
	var res = db.execute('SELECT *,url as media FROM podcastchannels ORDER BY ctime DESC');
	var channels = [];
	var fields = ['id', 'total', 'podcast', 'title', 'station', 'logo', 'url', 'lastentry', 'filesize', 'ctime', 'done'];
	while (res.isValidRow()) {
		var channel = {};
		for (var i = 0; i < fields.length; i++) {
			channel[fields[i]] = res.fieldByName(fields[i]);
		}
		channel.feed = channel.url;
		channel.lastentry_i18n = moment.unix(channel.lastentry).format('LLLL');
		channel.ctime_i18n = moment(channel.ctime).format('LLLL');

		if (!channel.logo)
			channel.logo = '/images/' + channel.station + '.png';
		channels.push(channel);
		res.next();
	}
	res.close();
	db.close();
	return channels;
};

Radio.prototype.recentMy = function(_args) {
	var id = Ti.Utils.md5HexDigest(_args.podcast.media);
	var db = Ti.Database.open(RADIOLIST);
	var res = db.execute('SELECT count(*) as total FROM myfavsandsaves WHERE id=?', id);
	var now = (new Date).getTime();
	if (res.isValidRow()) {
		var total = res.fieldByName('total');
		console.log('Info: ' + total + ' gefunden');
	}
	if (total) {
		db.execute('UPDATE myfavsandsaves SET count=count+1 WHERE id=?', id);
	} else
		db.execute('INSERT INTO myfavsandsaves VALUES (?,?,?,?,?,?,?)', id, JSON.stringify(_args.podcast), now, now, 1, 0, 0);
	_args.onload && (_args.onload(true));
	db.close();

};

Radio.prototype.importRadiolist = function(_callback) {
	console.log('Info: start importing radiolist');
	var self = this, groups;
	groups = (Ti.App.Properties.hasProperty(RADIOLIST)) ? Ti.App.Properties.getList(RADIOLIST) : JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'controls', 'senderliste.json').read().text);
	var md5 = Ti.Utils.md5HexDigest(JSON.stringify(groups));
	// persists in DB + properties;
	require('controls/persistence').save(RADIOLIST, groups);
	_callback(groups);
	if (Ti.Network.online) {
		var yql = 'SELECT * FROM xml WHERE url="' + Ti.App.Properties.getString('radiourl') + '"';
		Ti.Yahoo.yql(yql, function(e) {
			if (e.success) {
				if (e.data.senderliste) {
					groups = e.data.senderliste.senderfamilie;
					require('controls/persistence').save(RADIOLIST, groups);
					if (md5 != Ti.Utils.md5HexDigest(JSON.stringify(groups)))
						_callback(groups);
				}
			} else
				_callback(groups);
		});
	} else
		_callback(groups);
};

Radio.prototype.fetchChannelSize = function() {
	var options = arguments[0] || {};
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			var filesize = this.getResponseHeader('Content-Length');
			options.onload(filesize);
		}
	});
	xhr.open('HEAD', options.podcast.feed);
	xhr.send();
};

Radio.prototype.getPodcast = function(_args) {
	var link = Ti.Database.open(RADIOLIST);
	function Elem2Text(_elem, _key) {
		var foo = _elem.getElementsByTagName(_key);
		return (foo.length) ? foo.item(0).textContent : null;
	}

	function getMyState(id) {
		var q = 'SELECT * FROM myfavsandsaves WHERE id="' + id + '"';
		var res = link.execute(q);
		var item = {};
		if (res.isValidRow()) {
			item = {
				mtime : res.fieldByName('mtime'),
				ctime : res.fieldByName('ctime'),
				count : res.fieldByName('count'),
				cached : res.fieldByName('localcached'),
				faved : res.fieldByName('faved'),
				meta : JSON.parse(res.fieldByName('meta'))
			};
		} else
			item = {};
		res.close();
		return item;
	}

	if (true == Ti.Network.online) {
		var xhr = Ti.Network.createHTTPClient({
			timeout : 60000,
			ondatastream : function(e) {
				_args.onprogress(e.progress);
			},
			onload : function() {
				var filesize = this.getResponseHeader('Content-Length');
				Ti.Android && Ti.UI.createNotification({
					message : 'Podcastliste empfangen. (' + Math.round(filesize / 1000) + 'kB)'
				});
				var moment = require('vendor/moment');
				moment.lang('de');
				var doc = this.responseXML.documentElement;
				var logo = doc.getElementsByTagName("itunes:image");
				var items = doc.getElementsByTagName("item");
				var podcasts = [];
				Ti.Android && Ti.UI.createNotification({
					message : items.length + ' Podcasts gefunden.'
				}).show();
				var moment = require('vendor/moment');
				moment.lang('de');
				for (var c = 0; c < items.length; c++) {
					var item = items.item(c);
					var title = Elem2Text(item, "title").replace(/&quot;/g, '"').replace(/#39;/g, '"');
					var duration = Elem2Text(item, "itunes:duration");
					var author = Elem2Text(item, "itunes:author");
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
						var id = Ti.Utils.md5HexDigest(media);
					}
					var res = (description) ? /src="(.*?)"/g.exec(description) : null;
					var state = getMyState(id) || {};
					var pubdate_unix = moment(Elem2Text(item, "pubDate")).unix();
					if (title.match(/\[PDF\]/i))
						continue;
					if (summary) {
						summary = summary.replace(/(<.*$)/, '');
					}
					podcasts.push({
						pubdate : moment.unix(pubdate_unix).format("LLLL"),
						pubdate_unix : pubdate_unix,
						title : title,
						faved : state.faved,
						cached : state.cached,
						filesysize : filesize,
						duration : (duration) ? duration : 'keine Angabe',
						author : author,
						station : _args.podcastlist.station,
						media : media,
						summary : (summary) ? summary.trim() : null,
						pict : (res) ? res[1] : '/images/' + _args.podcastlist.station + '.png'
					});
				}
				podcasts.sort(function(a, b) {
					if (a.pubdate_unix == b.pubdate_unix)
						return 0;
					if (a.pubdate_unix < b.pubdate_unix)
						return 1;
					if (a.pubdate_unix > b.pubdate_unix)
						return -1;
				});
				var db = Ti.Database.open(RADIOLIST);
				var lastentry = podcasts[0].pubdate_unix;
				db.execute('UPDATE podcastchannels SET total=?,lastentry=?,filesize=? WHERE id=?', podcasts.length, lastentry, filesize, Ti.Utils.md5HexDigest(_args.podcastlist.feed));
				db.close();
				_args.onload({
					podcasts : podcasts,
					filesize : filesize,
					lastentry : podcasts[0].pubdate,
					total : podcasts.length
				});
				doc = null;
				link.close();
			}
		});
		xhr.open('GET', _args.podcastlist.feed, true);
		xhr.send();
		Ti.App.addEventListener('app:exit', xhr.abort);
	} else
		link.close();
};

Radio.prototype.getStationGroups = function() {
	return Ti.App.Properties.getList(RADIOLIST);
};

Radio.prototype.getSendungen = function() {
	var moment = require('vendor/moment');
	var now = parseInt(moment().format('HH')) * 60 + parseInt(moment().format('m'));
	function res2termin(res) {
		var hh = Math.floor(res.fieldByName('start') / 60);
		var mm = Math.ceil(res.fieldByName('start') % 60);
		if (mm < 10)
			mm = '0' + mm;
		var duration = res.fieldByName('stop') - res.fieldByName('start');
		return {
			media : res.fieldByName('livestreamurl'),
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
	var q = 'SELECT DISTINCT termine.*,sender.longname AS longname FROM termine,sender WHERE sender.id=termine.senderid AND wd=' + wd + ' AND stop>' + stop + ' ORDER BY start';
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

module.exports = Radio;
