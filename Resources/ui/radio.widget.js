exports.create = function(_url) {
	var self = Ti.UI.createView({
		backgroundColor : 'white',
		width : '100dip',
		height : '25dip',
	});
	var images = [];
	for (var i = 0; i <= 16; i++)
		images.push('/images/vumeter/tmp-' + i + '.png');
	var vu = Ti.UI.createImageView({
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
	self.add(starter);
	var audioPlayer = Ti.Media.createAudioPlayer({
		allowBackground : true
	});
	Ti.Android && Ti.UI.createNotification({
		message : 'Hole Radiosender …'
	}).show();
	Ti.App.Model.getUrl({
		m3u : _url,
		onload : function(url) {
			Ti.Android && Ti.UI.createNotification({
		message : 'Starte Wiedergabe …'
	}).show();
			audioPlayer.setUrl(url);
		}
	});
	self.add(vu);
	self.add(starter);
	starter.addEventListener('click', function() {
		if (audioPlayer.playing == true) {
			audioPlayer.stop();
			vu.stop();
		} else {
			console.log(_sender.livestream.url);
			vu.start();
			audioPlayer.play();
		}
	});
	self.addEventListener('close', function() {
		if (audioPlayer.playing == true)
			audioPlayer.stop();
		Ti.Android && audioPlayer.release();
	});
	return self;
};
