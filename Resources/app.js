(function() {
	Ti.App.Model = new (require('model/radio'))();
	Ti.App.Twitter = new (require('model/twitter_adapter'))();
	require('ui/tabgroup').create();
})();
