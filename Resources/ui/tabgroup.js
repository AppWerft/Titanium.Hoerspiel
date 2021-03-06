exports.create = function() {// this sets the background color of the master UIView (when there are no windows/tab groups on it)
	var self = Ti.UI.createTabGroup({
		fullscreen : true,
		exitOnClose : true,
	});
	self.orientationModes = [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT];
	self.open();
	if (Ti.Network.online == false) {
		alert("Radio2Go braucht das Internet.");
	}
	self.addEventListener("open", function(e) {
		if (Ti.Android) {
			self.activity = self.getActivity();
			self.activity.addEventListener('androidback', function() {
				Ti.App.fireEvent('app:exit');
				setTimeout(function() {
					self.activity.finish();
				}, 3000);
			});
			self.actionBar = self.activity.actionBar;
			if (self.actionBar) {
				self.activity.onCreateOptionsMenu = function(e) {
					e.menu.clear();
					e.activity = self.activity;
					e.actionBar = self.actionBar;
					self.activeTab && self.activeTab.fireEvent('onCreateOptionsMenu', e);
				};
				self.activity.invalidateOptionsMenu();
			}
		}
	});
	self.addEventListener('focus', function(e) {
		self.getActivity().invalidateOptionsMenu();
	});
	var tabs = [Ti.UI.createTab({
		title : '>> on Air',
		window : require('ui/timeline.window').create()
	}), Ti.UI.createTab({
		title : 'Radiosender',
		window : require('ui/stations.window').create()
	}), Ti.UI.createTab({
		title : 'Podcasts',
		window : require('ui/podcasts.window').create()
	}), Ti.UI.createTab({
		title : 'Depot',
		window : require('ui/myradio.window').create()
	}), Ti.UI.createTab({
		title : 'Twitter',
		window : require('ui/twitter/start.window').create()
	})];
	for (var i = 0; i < tabs.length; i++) {
		self.addTab(tabs[i]);
	}
	tabs[0].addEventListener('onCreateOptionsMenu', function() {
		self.actionBar.setTitle('Hörspielkalender');
		self.actionBar.setIcon('/images/appicon.png');
	});
	tabs[1].addEventListener('onCreateOptionsMenu', function(_e) {
		self.actionBar.setTitle('Öffentlich-rechtliche Sender');
		self.actionBar.setIcon('/images/appicon.png');
		_e.menu.add({
			title : "Karte der Sender",
			icon : '/images/map.png',
			showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			itemId : 0,
			visible : false
		}).addEventListener("click", function() {
			self.actionBar.setTitle('Karte aller Sender');
			tabs[1].window.setList('map');
		});

		_e.menu.add({
			title : "Alle Sender",
			icon : '/images/out.png',
			showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			itemId : 1
		}).addEventListener("click", function() {
			if (self.allstations) {
				_e.menu.getItem(1).setIcon('/images/out.png');
				_e.menu.getItem(0).setVisible(false);

				self.actionBar.setTitle('Öffentlich-rechtliche Sender');
				tabs[1].window.setList('public');

				self.allstations = false;
			} else {
				tabs[1].window.setList('all');
				self.actionBar.setTitle('Alle Sender');
				_e.menu.getItem(1).setIcon('/images/in.png');
				_e.menu.getItem(0).setVisible(true);

				self.allstations = true;
			}
			//Ti.UI.Android.openPreferences();
			//e.activity.invalidateOptionsMenu();
		});

	});
	tabs[2].addEventListener('onCreateOptionsMenu', function(_e) {
		self.actionBar.setTitle('Podcasts (auch zum Mitnehmen)');
		self.actionBar.setIcon('/images/appicon.png');
	});

	tabs[3].addEventListener('onCreateOptionsMenu', function(e) {
		if (e.actionBar) {
			self.actionBar.setTitle('Mein Podcast-Depot');
			self.actionBar.setIcon('/images/appicon.png');
		}
		e.menu.add({
			title : "Einstellungen",
			icon : '/images/preferences.png',
			showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			itemId : 1
		}).addEventListener("click", function() {
			Ti.UI.Android.openPreferences();
			//e.activity.invalidateOptionsMenu();
		});

	});
	tabs[4].addEventListener('onCreateOptionsMenu', function(e) {
		if (e.actionBar) {
			self.actionBar.setTitle('Hörspiel@Twitter');
			self.actionBar.setIcon('/images/twitter.png');
		}
		e.menu.add({
			title : "Nachladen",
			icon : '/images/reload.png',
			showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			itemId : 0
		}).addEventListener("click", function() {
			tabs[4].window.fireEvent('reload!');
			e.activity.invalidateOptionsMenu();
		});
		e.menu.add({
			title : "Einloggen",
			icon : '/images/pencil.png',
			showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
			itemId : 101
		}).addEventListener("click", function() {
			tabs[4].window.fireEvent('write!');
			//e.activity.invalidateOptionsMenu();
		});
	});

};
