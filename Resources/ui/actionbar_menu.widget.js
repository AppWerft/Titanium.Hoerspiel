module.exports = function(_e) {
	var elem = _e.source;
	var activity = elem.activity;
	if (activity) {
		console.log('Info:activity found');
		var abextras = require('com.alcoapps.actionbarextras');
		abextras.setExtras({
			title : 'Hörspielkalender',
			subtitle : 'Gerade laufende und nächste Hörspiele',
			backgroundColor : '#ff4f00'
		});
		var ab = activity.actionBar;
		if (ab) {
			console.log('Info:actionbar found');
			ab.displayHomeAsUp = true;
		} else {
		}
	} else {
	}

	//
};
