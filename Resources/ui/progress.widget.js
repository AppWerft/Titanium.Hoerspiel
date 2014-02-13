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
                bottom : 0,
                left : '10dp',
                right : '10dp',
                layout : 'vertical',
                height : '100dp'
        });
        self.add(self.container);
        self.title = Ti.UI.createLabel({
                color : 'white',
                top : '5dp',
                height : '40dp',
                width : Ti.UI.FILL,
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
                height : '35dp',
                top : 0
        });
        self.container.add(self.progress);
        self.progress.show();
        self.message = Ti.UI.createLabel({
                color : 'white',
                width : Ti.UI.FILL,
                top : '10dp',
                textAlign : 'left',
                font : {
                        fontSize : '10dp'
                }
        });
        self.actind = Ti.UI.createActivityIndicator({
                left : '5dp',
                style : Titanium.UI.ActivityIndicatorStyle.PLAIN
        });
        self.container.add(self.actind);
        self.actind.show();
        self.container.add(self.message);
        self.setProgress = function(e) {
                self.progress.setValue(e);
        };
        self.setTitle = function(_foo) {
                self.title.setText(_foo);
        };
        
        self.setMessage = function(_foo) {
                self.message.setText(_foo);
        };
        return self;

};