exports.create = function() {// this sets the background color of the master UIView (when there are no windows/tab groups on it)
	var tabGroup = Ti.UI.createTabGroup({
		fullscreen : true,
		exitOnClose : true
	});

	//tabGroup.addEventListener('open', require('ui/actionbar_menu.widget'));
	/*require('ui/actionbar_menu.widget')(
	 tabGroup
	 );*/

	var actionBar;
	tabGroup.addEventListener("open", function() {
		if (Ti.Platform.osname === "android") {
			if (! tabGroup.getActivity()) {
				Ti.API.error("Can't access action bar on a lightweight window.");
			} else {
				actionBar = tabGroup.getActivity().actionBar;
				if (actionBar) {
					actionBar.title = "Hörspielkalender";
					actionBar.onHomeIconItemSelected = function() {
						Ti.API.info("Home icon clicked!");
					};
				}
				/*var abe = require('com.alcoapps.actionbarextras');
				abe.setExtras({
					title : 'Hörspielkalender',
					subtitle : 'Gerade laufende und nächste Hörspiele',
					backgroundColor : '#ff4f00'
				});*/
			}
		}
	});
	var tab1 = Ti.UI.createTab({
		title : '>> on Air',
		window : require('ui/timeline.window').create()
	});
	var tab2 = Ti.UI.createTab({
		title : 'Radiosender',
		window : require('ui/stations.window').create()
	});

	

	var tab3 = Ti.UI.createTab({
		title : 'Podcasts',
		window : require('ui/podcasts.window').create()
	});

	var tab4 = Ti.UI.createTab({
		title : 'Mein Radio',
		window : require('ui/myradio.window').create()
	});

	//
	//  add tabs
	//
	tabGroup.addTab(tab1);
	tabGroup.addTab(tab3);
	tabGroup.addTab(tab4);
	tabGroup.addTab(tab2);
	
	tab1.addEventListener('focus', function(_e) {
		actionBar.setTitle('Hörspielkalender');
	});
	tab2.addEventListener('focus', function(_e) {
		actionBar.setTitle('Alle Sender im Überblick');

	});
	tab3.addEventListener('focus', function(_e) {
		actionBar.setTitle('Podcasts (auch zum Mitnehmen)');

	});
	tab4.addEventListener('focus', function(_e) {
		actionBar.setTitle('Mein Radio');

	});
	tabGroup.open();

};
