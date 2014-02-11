exports.create = function() {
	console.log('Info: start map rendering  with laoding of module ============');
	var MapModule = require('ti.map');
	console.log('Info: start map rendering ======================================');
	var rc = MapModule.isGooglePlayServicesAvailable();
	switch (rc) {
		case MapModule.SUCCESS:
			Ti.API.info('Google Play services is installed.');
			break;
		case MapModule.SERVICE_MISSING:
			alert('Google Play services is missing. Please install Google Play services from the Google Play store.');
		  	break;
		case MapModule.SERVICE_VERSION_UPDATE_REQUIRED:
			alert('Google Play services is out of date. Please update Google Play services.');
			break;
		case MapModule.SERVICE_DISABLED:
			alert('Google Play services is disabled. Please enable Google Play services.');
			break;
		case MapModule.SERVICE_INVALID:
			alert('Google Play services cannot be authenticated. Reinstall Google Play services.');
			break;
		default:
			alert('Unknown error.');
			break;
	}
	if (rc != MapModule.SUCCESS) return Ti.UI.createView();
	console.log('Info: start map rendering >>>>>>>>======================================');
	var myMap = MapModule.createView({
		//userLocation : true,
		mapType : MapModule.NORMAL_TYPE,
		animate : false,
		userLocationButton : true,
		enableZoomControls : false,
		visible : true,
		region : {
			latitude : 33,
			longitude : 10,
			latitudeDelta : 5,
			longitudeDelta : 5
		}
	});
	return myMap;
};
