// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.setBackgroundColor('#fff');

var RadioModel = require('model/radio');
Ti.App.Model = new RadioModel();

// create tab group
var tabGroup = Ti.UI.createTabGroup({
	navBarHidden : true
});


var tab1 = Ti.UI.createTab({
	title : 'Stations',
	window : require('ui/stations.window').create()
});

var tab2 = Ti.UI.createTab({
	title : 'Timeline',
	window : require('ui/timeline.window').create()
});

var tab3 = Ti.UI.createTab({
	title : 'Podcasts',
	window : require('ui/podcasts.window').create()
});




//
//  add tabs
//
tabGroup.addTab(tab2);
tabGroup.addTab(tab1);
tabGroup.addTab(tab3);


// open tab group
tabGroup.open();
