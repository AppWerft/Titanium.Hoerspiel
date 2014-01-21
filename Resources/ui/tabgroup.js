exports.create = function() {// this sets the background color of the master UIView (when there are no windows/tab groups on it)
	var tabGroup = Ti.UI.createTabGroup({
		fullscreen : true,
		exitOnClose : true
	});

	var tab1 = Ti.UI.createTab({
		title : 'Radiosender',
		window : require('ui/stations.window').create()
	});

	var tab2 = Ti.UI.createTab({
		title : '>> Hörspiele',
		window : require('ui/timeline.window').create()
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
	tabGroup.addTab(tab2);
	tabGroup.addTab(tab1);
	tabGroup.addTab(tab3);
	tabGroup.addTab(tab4);

	tabGroup.addEventListener('open', require('ui/actionbar_menu.widget'));
	return tabGroup;
};
