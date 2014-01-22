exports.create = function() {
	var self = Ti.UI.createView({
		visible : false,
		zIndex : 9999
	});
	self.add(Ti.UI.createView({
		backgroundColor : 'black',
		opacity : 0.8
	}));
	self.add(Ti.UI.createView({
		backgroundColor : 'black',
		opacity : 0.9,
		bottom : 0,
		height : '100dp'
	}));
	self.container = Ti.UI.createView({
		bottom : 0,left:'10dp',right:'10dp',
		layout : 'vertical',
		height : '100dp'
	});
	self.add(self.container);
	self.title = Ti.UI.createLabel({
		color : 'white',
		top : '5dp',
		height : '20dp',
		font : {
			fontWeight : 'bold',
			fontSize : '16dp'
		}
	});
	self.container.add(self.title);
	
	self.progress = Ti.UI.createProgressBar({
		width : '100%',
		min : 0,
		max : 1,
		height : '30dp',
		top : '5dp'
	});
	self.container.add(self.progress);
	self.progress.show();
	self.message = Ti.UI.createLabel({
		color : 'white',
		top : '10dp',textAlign:'left',
		font : {
			fontSize : '14dp'
		}
	});
	self.container.add(self.message);
	self.setProgress = function(e) {
		self.progress.setValue(e);
	};
	self.setTitle = function(_foo) {
		self.title.setText(_foo);
	};
	self.setProgress = function(e) {
		self.progress.setValue(e);
	};
	self.setMessage = function(_foo) {
		self.message.setText(_foo);
	};
	return self;

};
