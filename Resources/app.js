(function() {
	Ti.App.Model = new (require('controls/radio'))();
	Ti.App.Twitter = new (require('controls/twitter_adapter'))();
	require('ui/tabgroup').create();
})();
//