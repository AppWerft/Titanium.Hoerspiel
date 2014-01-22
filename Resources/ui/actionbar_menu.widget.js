module.exports = function(_e) {
	var elem = _e;
	return;
	var activity = elem.getActivity();
	if (activity) {
		/*var abe = require('com.alcoapps.actionbarextras');
		 abe.setExtras({
		 title : 'Hörspielkalender',
		 subtitle : 'Gerade laufende und nächste Hörspiele',
		 backgroundColor : '#ff4f00'
		 });*/
		var ab = activity.actionBar;
		if (ab) {
			ab.setTitle('Gerade laufende/nächste Hörspiele');
			console.log('Info:actionbar found');
			console.log(ab);
			ab.displayHomeAsUp = true;
		} else {
		}
	} else {
	}

};
