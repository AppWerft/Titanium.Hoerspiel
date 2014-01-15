var Radio = function() {
	this.view = Ti.UI.createView({
		width : '100dip',
		height : '25dip',
		bottom : 0
	});
	var images = [];
	for (var i = 0; i <= 16; i++)
		images.push('/images/vumeter/tmp-' + i + '.png');
	this.vu = Ti.UI.createImageView({
		images : images,
		touchEnabled : false,
		bottom : 0,
		width : '100dip',
		height : '25dip',
		duration : 40
	});
	var starter = Ti.UI.createImageView({
		image : images[0],
		bottom : 0,
		width : '100dip',
		height : '25dip',
		duration : 40
	});
	this.view.add(starter);
	this.audioPlayer = Ti.Media.createAudioPlayer({
		allowBackground : true
	});
	Ti.Android && Ti.UI.createNotification({
		message : 'Hole Radiosender …'
	}).show();
	self.add(vu);
	self.add(starter);
};

Radio.prototype.getView = function() {
	return this.view;
};

Radio.prototype.startPlay = function(_m3u) {
	Ti.App.Model.getUrl({
		m3u : _m3u,
		onload : function(_url) {
			Ti.Android && Ti.UI.createNotification({
				message : 'Starte Wiedergabe …'
			}).show();
			this.audioPlayer.setUrl(_url);
		}
	});
	if (this.audioPlayer.playing == true) {
		this.audioPlayer.stop();
		this.vu.stop();
	} else {
		console.log(_sender.livestream.url);
		this.vu.start();
		this.audioPlayer.play();
	}
};

Radio.prototype.close = function() {
	if (this.audioPlayer.playing == true)
		this.audioPlayer.stop();  
	Ti.Android && this.audioPlayer.release();

};

module.exports = Radio;
