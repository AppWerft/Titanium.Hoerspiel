var W = '200dp', H = '46dp', HH = '61dp';

var Radio = function() {
	var self = this;
	this.cron = null;
	this.playing = false;
	this.last = {
		url : null,
		name : null
	};
	this.radiocontainer = Ti.UI.createView({
		width : W,
		height : HH,
		zIndex : 9999,
		backgroundColor : 'black',
		bottom : '-' + HH
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
	this.vumeter = require('ui/vumeter').create({
		width : W,
		height : H,
		top : 0
	});
	this.radiocontainer.add(this.vumeter);
	this.radiocontainer.add(this.label);
	this.radiocontainer.add(this.progress.view);
	Ti.App.audioPlayer = Ti.Media.createAudioPlayer({
		allowBackground : true
	});

	Ti.App.audioPlayer.addEventListener('change', function(_e) {
		self.progress.value = 0;
		self.progress.view.setWidth(0);
		switch (_e.description) {
			case 'stopped':
				self.vumeter.stop();
				self.playing = false;
				break;
			case 'playing':
				self.cron && clearInterval(self.cron);
				self.playing = true;
				self.vumeter.start();
				break;
		}
	});
	this.radiocontainer.addEventListener('click', function() {
		if (Ti.App.audioPlayer.playing == true) {
			Ti.App.audioPlayer.stop();
			self.vumeter.stop();
			Ti.Android && Ti.App.audioPlayer.release();
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
	console.log('Info: togglePlay to ' + _options.media);
	var media = _options.media;
	var senderlongname = _options.senderlongname || _options.title;
	if (senderlongname == this.last.name)
		return;
	if (Ti.App.audioPlayer.playing == true) {
		Ti.App.audioPlayer.stop();
		Ti.Android && Ti.App.audioPlayer.release();

		//	this.radiocontainer.remove(this.animatedvolumemeter);
		//	this.url = _livestreamplaylisturl;
	}
	if (this.last.url && this.last.url == media) {
		this.radiocontainer.animate({
			bottom : '-' + HH
		});
		console.log('Info: same station ');

	} else {
		this.last.url = media;
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
			self.progress.view.setWidth(self.progress.value + '%');
		}, 500);
		if (_options.isplaylisturl)
			Ti.App.Model.resolvePlaylist({
				playlist : media,
				onload : function(_url) {
					console.log('Info: new URL ' + _url);
					self.radiocontainer.animate({
						bottom : 0
					});
					Ti.App.audioPlayer.setUrl(_url);
					Ti.App.audioPlayer.play();
				}
			});
		else {
			self.radiocontainer.animate({
				bottom : 0
			});
			Ti.App.audioPlayer.setUrl(media);
			Ti.App.audioPlayer.play();
		}

	}
};

Radio.prototype.close = function() {
	if (Ti.App.audioPlayer.playing == true)
		Ti.App.audioPlayer.stop();
	Ti.Android && Ti.App.audioPlayer.release();

};

module.exports = Radio;
