exports.init = function() {
	Ti.Geolocation.Android.addLocationProvider(Ti.Geolocation.Android.createLocationProvider({
		name : Ti.Geolocation.PROVIDER_GPS,
		minUpdateTime : 60,
		minUpdateDistance : 100
	}));
	console.log('Info: Provider added');
	Ti.Geolocation.Android.addLocationRule(Ti.Geolocation.Android.createLocationRule({
		provider : Ti.Geolocation.PROVIDER_GPS,
		accuracy : 1000,
		maxAge : 300000,
		minAge : 10000
	}));
	console.log('Info: location rule added');
	Ti.Geolocation.getCurrentPosition(function(e) {
	});
	var TiMap = require('ti.map');
	var rc = TiMap.isGooglePlayServicesAvailable();
	switch (rc) {
		case TiMap.SUCCESS:
			break;
		case TiMap.SERVICE_MISSING:
			alert('„Google Play services“ fehlt. Bitte im Playstore installieren.');
			break;
		case TiMap.SERVICE_VERSION_UPDATE_REQUIRED:
			alert('Google Play services is out of date. Please update Google Play services.');
			break;
		case TiMap.SERVICE_DISABLED:
			alert('Google Play services is disabled. Please enable Google Play services.');
			break;
		case TiMap.SERVICE_INVALID:
			alert('Google Play services cannot be authenticated. Reinstall Google Play services.');
			break;
		default:
			alert('Unknown error.');
			break;
	}
	console.log('Info: GooglePlayServices tested with result: ' + rc);
	return rc;
};

