// this sets the background color of the master UIView (when there are no windows/tab groups on it)
var RadioModel = require('model/radio');
Ti.App.Model = new RadioModel();
require('ui/tabgroup').create().open();
