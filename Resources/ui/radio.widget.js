var W = '200dp', H = '50dp', HH = '66dp';

var getUrl = function(_args) {
	var xhr = Ti.Network.createHTTPClient({
		onload : function() {
			var foo = this.responseText.split('\n');
			var bar = [];
			for (var i = 0; i < foo.length; i++) {
				if (foo[i].match(/^http/))
					bar.push(foo[i]);
			}
			console.log(bar);
			_args.onload(bar[0]);
		}
	});
	xhr.open('GET', _args.m3u);
	xhr.send();
};

var Radio = function() {
	var self = this;
	this.cron = null;
	Ti.Android.currentActivity.addEventListener("pause", function() {
		console.log('PAUSED');
	});
	Ti.Android.currentActivity.addEventListener("resume", function() {
		console.log('PAUSED');
	});
	Ti.Android.currentActivity.addEventListener("start", function() {
		console.log('STARTD');
	});
	Ti.Android.currentActivity.addEventListener("stop", function() {
		console.log('PAUSED');
	});
	Ti.App.addEventListener('resumed', function() {
		console.log('Info: app resumed');
		if (self.playing) {
			console.log('Info: vu started');
			self.animatedvolumemeter.start();
		}
	});
	Ti.App.addEventListener('paused', function() {
		console.log('Info: app paused');
		if (self.playing)
			self.animatedvolumemeter.stop();
	});
	this.playing = false;
	this.last = {
		url : null,
		name : null
	};
	this.radiocontainer = Ti.UI.createView({
		width : W,
		height : HH,
		backgroundColor : 'black',
		bottom : '-' + HH
	});
	var images = [];
	for (var i = 0; i <= 16; i++)
		images.push('/images/vumeter/tmp-' + i + '.png');
	this.animatedvolumemeter = Ti.UI.createImageView({
		images : images,
		top : 0,
		repeatCount : 0,
		width : Ti.UI.FILL,
		height : H,
		duration : 100,
		opacity : 0.1
	});
	this.radiocontainer.addEventListener('blur', function() {
		self.animatedvolumemeter.stop();
	});
	this.label = Ti.UI.createLabel({
		color : 'white',
		bottom : '2dp',
		height : '16dp',
		textAlign : 'center',
		font : {
			fontSize : '10dp'
		}
	});
	this.progress = {
		value : 0,
		view : Ti.UI.createView({
			bottom : 0,
			height : '3dp',
			backgroundColor : 'gray'
		})
	};
	this.view = Ti.UI.createView({
		bottom : 0,
		height : '3dp',
		backgroundColor : 'gray',
		width : '1%',
	});
	this.radiocontainer.add(Ti.UI.createImageView({
		image : '/images/vumeter/tmp.png',
		top : 0,
		width : Ti.UI.FILL,
		height : H
	}));
	this.radiocontainer.add(this.animatedvolumemeter);
	this.radiocontainer.add(this.label);
	this.radiocontainer.add(this.progress.view);
	this.audioPlayer = Ti.Media.createAudioPlayer({
		allowBackground : true
	});

	this.audioPlayer.addEventListener('change', function(_e) {

		self.progress.value = 0;
		self.progress.view.setWidth(0);
		switch (_e.description) {
			case 'stopped':
				self.animatedvolumemeter.stop();
				self.animatedvolumemeter.setOpacity(0.1);
				self.playing = false;
				break;
			case 'playing':
				self.cron && clearInterval(self.cron);
				self.playing = true;
				self.animatedvolumemeter.start();
				self.animatedvolumemeter.setOpacity(1);
				break;
		}
	});
	this.radiocontainer.addEventListener('click', function() {
		if (self.audioPlayer.playing == true) {
			self.audioPlayer.stop();
			self.animatedvolumemeter.stop();
			Ti.Android && self.audioPlayer.release();
			self.radiocontainer.animate({
				bottom : '-' + HH
			});
		}
		require('vendor/ratingreminder').start();
	});

};
Radio.prototype.getView = function() {
	return this.radiocontainer;
};

Radio.prototype.togglePlay = function(_options) {
	console.log('Info: togglePlay to ' + _options.livestreamurl);
	var livestreamplaylisturl = _options.livestreamurl;
	var senderlongname = _options.senderlongname;
	if (senderlongname == this.last.name)
		return;
	if (this.audioPlayer.playing == true) {
		this.audioPlayer.stop();
		Ti.Android && this.audioPlayer.release();

		//	this.radiocontainer.remove(this.animatedvolumemeter);
		//	this.url = _livestreamplaylisturl;
	}
	if (this.last.url && this.last.url == livestreamplaylisturl) {
		this.radiocontainer.animate({
			bottom : '-' + HH
		});
		console.log('Info: same station ');

	} else {
		this.last.url = livestreamplaylisturl;
		this.last.name = senderlongname;
		console.log('Info: new station is fresh play/starting');
		this.radiocontainer.animate({
			bottom : 0
		});
		var self = this;
		this.label.setText(senderlongname);
		this.radiocontainer.animate({
			bottom : 0
		});
		this.cron = setInterval(function() {
			self.progress.value++;
			self.progress.view.setWidth(self.progress.value + '%')
		}, 100);
		getUrl({
			m3u : livestreamplaylisturl,
			onload : function(_url) {
				console.log('Info: new URL ' + _url);
				self.radiocontainer.animate({
					bottom : 0
				});
				self.audioPlayer.setUrl(_url + '?' + Math.random());
				self.audioPlayer.play();
			}
		});

	}
};

Radio.prototype.close = function() {
	if (this.audioPlayer.playing == true)
		this.audioPlayer.stop();
	Ti.Android && this.audioPlayer.release();

};

module.exports = Radio;
