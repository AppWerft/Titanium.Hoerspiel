var W = '200dp', H = '50dp', HH = '66dp';

var PodCast = function() {
	this.last = {
		url : null,
		name : null
	};
	this.playercontainer = Ti.UI.createView({
		width : W,
		height : HH,
		zIndex : 9999,
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
		duration : 190,
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

	this.playercontainer.add(Ti.UI.createImageView({
		image : '/images/vumeter/tmp.png',
		top : 0,
		width : Ti.UI.FILL,
		height : H
	}));
	this.playercontainer.add(this.animatedvolumemeter);
	this.playercontainer.add(this.label);
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
	this.playercontainer.addEventListener('click', function() {
		if (self.audioPlayer.playing == true) {
			self.audioPlayer.stop();
			self.animatedvolumemeter.stop();
			Ti.Android && self.audioPlayer.release();
			self.playercontainer.animate({
				bottom : '-' + HH
			});
		}
		require('vendor/ratingreminder').start();
	});

};
PodCast.prototype.getView = function() {
	return this.playercontainer;
};

PodCast.prototype.togglePlay = function(_options) {
	var podcasturl = _options.media;
	var podcasttitle = _options.title.substr(24) + '…';
	if (podcasttitle == this.last.name)
		return;
	if (this.audioPlayer.playing == true) {
		this.audioPlayer.stop();
		Ti.Android && this.audioPlayer.release();

		//	this.playercontainer.remove(this.animatedvolumemeter);
		//	this.url = _podcasturl;
	}
	if (this.last.url && this.last.url == podcasturl) {
		this.playercontainer.animate({
			bottom : '-' + HH
		});
		console.log('Info: same station ');

	} else {
		this.last.url = podcasturl;
		this.last.name = podcasttitle;
		console.log('Info: new station is fresh play/starting');
		this.playercontainer.animate({
			bottom : 0
		});
		var self = this;
		this.label.setText(podcasttitle);
		this.playercontainer.animate({
			bottom : 0
		});

		self.playercontainer.animate({
			bottom : 0
		});
		self.audioPlayer.setUrl(podcasturl + '?' + Math.random());
		self.audioPlayer.play();

	}
};

PodCast.prototype.close = function() {
	if (this.audioPlayer.playing == true)
		this.audioPlayer.stop();
	Ti.Android && this.audioPlayer.release();

};

module.exports = PodCast;
