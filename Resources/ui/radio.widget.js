var W = '200dp', H = '50dp';
var Radio = function() {
	this.view = Ti.UI.createView({
		width : W,
		height : H,
		bottom : '-' + H
	});
	var images = [];
	for (var i = 0; i <= 16; i++)
		images.push('/images/vumeter/tmp-' + i + '.png');
	this.vu = Ti.UI.createImageView({
		images : images,
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,

		touchEnabled : false,
		bottom : 0,
		duration : 140
	});
	this.starter = Ti.UI.createImageView({
		image : '/images/vumeter/tmp.png',
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		bottom : 0,
		duration : 40
	});
	this.view.add(this.starter);
	this.audioPlayer = Ti.Media.createAudioPlayer({
		allowBackground : true
	});

};

Radio.prototype.getView = function() {
	return this.view;
};

Radio.prototype.togglePlay = function(_m3u) {
	var self = this;
	if (this.audioPlayer.playing == true) {
		Ti.Android && Ti.UI.createNotification({
			message : 'Entbinde von Sender …'
		}).show();
		console.log('is playing => stop');
		this.audioPlayer.stop();
		this.vu.stop();
		this.view.remove(self.vu);
	//	this.url = _m3u;
	}
	if (this.url == _m3u) {
		console.log('Info: same station and is playing');
		
		delete this.url;
		this.view.animate({
			bottom : '-' + H
		});
	} else {
		this.view.animate({
			bottom : 0
		});
		Ti.Android && Ti.UI.createNotification({
			message : 'Verbinde mit Sender …'
		}).show();
		
		Ti.App.Model.getUrl({
			m3u : _m3u,
			onload : function(_url) {
				console.log(_url);
				self.audioPlayer.setUrl(_url);
				self.vu.start();
				self.view.add(self.vu);
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
