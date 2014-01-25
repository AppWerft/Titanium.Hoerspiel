/*var win = Ti.UI.createWindow();
var webview = Ti.UI.createWebView({
	url : 'http://www.appcelerator.com/',
	height : Ti.UI.FILL
});
win.add(webview);
webview.addEventListener('load', function(e) {
	console.log('====================');
	console.log(e.source);
	var val = webview.evalJS("document.querySelector('#menu-item-3062').innerHTML");
	console.log(val);
});
*/
 (function() {
 Ti.App.Model = new (require('model/radio'))();
 Ti.App.Twitter = new (require('model/twitter_adapter'))();
 require('ui/tabgroup').create();
 })();
 