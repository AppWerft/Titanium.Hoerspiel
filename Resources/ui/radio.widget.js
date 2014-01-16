var W = '200dp', H = '50dp', HH = '66dp';

var Radio = function() {
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
		duration : 123,
		opacity : 0.1
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

	this.radiocontainer.add(Ti.UI.createImageView({
		image : '/images/vumeter/tmp.png',
		top : 0,
		width : Ti.UI.FILL,
		height : H
	}));
	this.radiocontainer.add(this.animatedvolumemeter);
	this.radiocontainer.add(this.label);
	this.audioPlayer = Ti.Media.createAudioPlayer({
		allowBackground : true
	});
	var self = this;
	this.audioPlayer.addEventListener('change', function(_e) {
		switch (_e.description) {
			case 'stopped':
				self.animatedvolumemeter.stop();
				self.animatedvolumemeter.setOpacity(0.1);
			break;
			case 'playing':
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
	});

};

Radio.prototype.getView = function() {
	return this.radiocontainer;
};

Radio.prototype.togglePlay = function(_options) {
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
		Ti.App.Model.getUrl({
			m3u : livestreamplaylisturl,
			onload : function(_url) {
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
