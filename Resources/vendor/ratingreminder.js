exports.start = function() {
	var now = new Date().getTime();
	var remindToRate = Ti.App.Properties.getString('RemindToRate');
	if (!remindToRate) {
		Ti.App.Properties.setString('RemindToRate', now);
	} else if (remindToRate < now) {
		var alertDialog = Ti.UI.createAlertDialog({
			title : 'Please rate this app!',
			message : 'Would you take a moment to rate this app?',
			buttonNames : ['OK', 'Remind Me Later', 'Never'],
			cancel : 2
		});
		alertDialog.addEventListener('click', function(evt) {
			switch (evt.index) {
				case 0:
					Ti.App.Properties.setString('RemindToRate', Number.MAX_VALUE);
					// NOTE: replace this with your own iTunes link; also, this won't WON'T WORK IN THE SIMULATOR!
					if (Ti.Android) {
						Ti.Platform.openURL('https://play.google.com/store/apps/details?id=de.appwerft.hoerspiel');
					} else {
						Ti.Platform.openURL('URL TO YOUR APP IN THE ITUNES STORE');
					}
					break;
				case 1:
					// "Remind Me Later"? Ok, we'll remind them tomorrow when they launch the app.
					Ti.App.Properties.setString('RemindToRate', now + (1000 * 60 * 60 * 24));
					break;
				case 2:
					Ti.App.Properties.setString('RemindToRate', Number.MAX_VALUE);
					break;
			}
		});
		alertDialog.show();
	}
};

