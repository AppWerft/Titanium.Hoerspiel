// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.setBackgroundColor('#fff');

var RadioModel = require('model/radio');
Ti.App.Model = new RadioModel();

// create tab group
var tabGroup = Ti.UI.createTabGroup({
	navBarHidden : true
});

//
// create base UI tab and root window
//
var win1 = Ti.UI.createWindow({
	title : 'Stations'
	
});
var tab1 = Ti.UI.createTab({
	title : 'Stations',
	window : require('ui/stations.window').create()
});


//
// create controls tab and root window
//
var win2 = Ti.UI.createWindow({
	title : 'Zeitleiste',
	backgroundColor : '#fff'
});
var tab2 = Ti.UI.createTab({
	title : 'Timeline',
	window : require('ui/timeline.window').create()
});




//
//  add tabs
//
tabGroup.addTab(tab2);
tabGroup.addTab(tab1);

// open tab group
tabGroup.open();
