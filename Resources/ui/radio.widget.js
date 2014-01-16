var W = '200dp', H = '50dp', HH = '70dp';

var Radio = function() {
	this.last = {
		url : null,
		name : null
	};
	this.view = Ti.UI.createView({
		width : W,
		height : '70dp',
		borderWidth : 1,
		zIndex : 9999,
		backgroundColor : 'black',
		bottom : '-20dp'
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
		duration : 123,
		opacity : 0.1
	});
	this.label = Ti.UI.createLabel({
		color : 'white',
		bottom : '2dp',
		height : '20dp',
		textAlign : 'center',
		font : {
			fontSize : '12dp'
		}
	});
	this.volumemeterbackground = Ti.UI.createImageView({
		image : '/images/vumeter/tmp.png',
		top : 0,
		width : Ti.UI.FILL,
		height : H
	});
	this.view.add(this.volumemmeter_background);
	this.view.add(this.animatedvolumemeter);
	this.view.add(this.label);
	this.audioPlayer = Ti.Media.createAudioPlayer({
		allowBackground : true
	});

};

Radio.prototype.getView = function() {
	return this.view;
};

Radio.prototype.togglePlay = function(_options) {
	var m3u = _options.livestreamurl;
	var name = _options.senderlongname;
	if (this.audioPlayer.playing == true) {
		Ti.Android && Ti.UI.createNotification({
			message : 'Beende\n' + this.last.name
		}).show();
		this.audioPlayer.stop();
		Ti.Android && this.audioPlayer.release();
		this.animatedvolumemeter.setOpacity('0.1');
		//	this.view.remove(this.animatedvolumemeter);
		//	this.url = _m3u;
	}
	if (this.last.url && this.last.url == m3u) {
		this.view.animate({
			bottom : '-' + H
		});
		console.log('Info: same station ');

	} else {
		this.last.url = m3u;
		this.last.name = name;
		console.log('Info: new station is fresh play/starting');
		this.view.animate({
			bottom : 0
		});
		Ti.Android && Ti.UI.createNotification({
			message : 'Verbinde mit\n' + name
		}).show();
		var self = this;
		this.label.setText(name);
		this.view.animate({
			bottom : 0
		});
		Ti.App.Model.getUrl({
			m3u : m3u,
			onload : function(_url) {
				self.audioPlayer.setUrl(_url + '?' + Math.random());
				self.animatedvolumemeter.setOpacity(1);
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
