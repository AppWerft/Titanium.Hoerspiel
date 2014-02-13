exports.create = function() {
	function addAnnotation(_args) {
		console.log(_args.city);
		require('vendor/geo.resolve').get({
			city : _args.city
		}, function(_e) {
			console.log(_e);
		});

	}

	var rc = require('controls/geo').init(function(_e) {
		console.log(_e.coords);
	});
	var TiMap = require('ti.map');
	var self = Ti.UI.createView();
	var Map = TiMap.createView({
		mapType : TiMap.NORMAL_TYPE,
		animate : false,
		userLocationButton : true,
		enableZoomControls : false,
		region : {
			latitude : 52,
			longitude : 10,
			latitudeDelta : 10,
			longitudeDelta : 10
		}
	});
	var allstations = Ti.App.Model.getAllStationList();
	var location;
	for (location in allstations) {
		addAnnotation({
			city : location,
			stations : allstations[location]
		});
	}
	self.add(Map);
	return self;

};
