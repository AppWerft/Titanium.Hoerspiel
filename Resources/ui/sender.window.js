exports.create = function(_sender) {
	var self = Ti.UI.createWindow({
		backgroundColor : 'white'
	});
	console.log(_sender);
	var www = Ti.UI.createWebView({
		url : _sender.url,
		disableBounce : true,
		enableZoomControls : false
	});
	self.add(www);
	var images = [];
	for (var i = 0; i <= 16; i++)
		images.push('/images/vumeter/tmp-' + i + '.png');
	var vu = Ti.UI.createImageView({
		images : images,
		touchEnabled : false,
		bottom : 0,
		width : '200dip',
		height : '50dip',
		duration : 40
	});
	var starter = Ti.UI.createImageView({
		image : images[0],
		bottom : 0,
		width : '200dip',
		height : '50dip',
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
		m3u : _sender.livestream.url,
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
