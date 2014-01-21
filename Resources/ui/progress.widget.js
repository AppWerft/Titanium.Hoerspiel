exports.create = function() {
	var self = Ti.UI.createView({
		visible : false,
		zIndex : 9999
	});
	self.add(Ti.UI.createView({
		backgroundColor : 'black',
		opacity : 0.7
	}));
	self.add(Ti.UI.createView({
		backgroundColor : 'black',
		opacity : 0.9,
		bottom : 0,
		height : '100dp'
	}));
	self.container = Ti.UI.createView({
		bottom : 0,
		height : '100dp'
	});
	self.title = Ti.UI.createLabel({
		color : 'white',
		top : '5dp',
		font : {
			fontWeight : 'bold'
		}
	});
	self.container.add(self.title);
	self.progress = Ti.UI.createProgressBar({
		width : '90%',
		min : 0,
		max : 1,
		height : '30dp',
		bottom : '40dp'
	});
	self.add(self.progress);
	self.progress.show();
	self.setProgress = function(e) {
		self.progress.setValue(e);
	};
	return self;

};
