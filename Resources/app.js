/*var win = Ti.UI.createWindow();
var webview = Ti.UI.createWebView({
	url : 'http://www.appcelerator.com/',
});
win.add(webview);
win.open();
webview.addEventListener('load', function(e) {
	console.log(webview.evalJS('document.title'));
});
*/
 (function() {
 Ti.App.Model = new (require('model/radio'))();
 Ti.App.Twitter = new (require('model/twitter_adapter'))();
 require('ui/tabgroup').create();
 })();
Ti.UI.Android.openPreferences();