var images = [];
for (var i = 0; i <= 16; i++)
	images.push('/images/vumeter/tmp-' + i + '.png');

exports.timelineactiveTemplate = {
	properties : {
		height : '100dip',
		onDisplayItem : function(_e) {
			console.log(JSON.stringify(_e));
		}
	},
	childTemplates : [{
		type : 'Ti.UI.ImageView',
		bindId : 'play',
		properties : {
			width : '40dp',
			height : '44dp',
			right : '5dp'
		}
	}, {
		type : 'Ti.UI.ImageView',
		bindId : 'stationlogo',
		properties : {
			width : '90dip',
			height : '90dip',
			top : 0,
			left : 0
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'title',
		properties : {
			color : '#333',
			font : {
				fontFamily : 'Helvetica',
				fontWeight : 'bold',
				fontSize : '18dp',
			},
			top : '10dp',
			left : '100dip',
			right : '30dp'
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'time',
		properties : {
			color : '#333',
			font : {
				fontFamily : 'Helvetica',
				fontSize : '14dp',
			},
			bottom : '10dp',
			left : '100dip',
		}
	}, {
		type : 'Ti.UI.View',
		properties : {
			backgroundColor : '#080',
			bottom : '1dp',
			left : 0,
			width : '90dip',
			height : '7dp'
		}
	}, {
		type : 'Ti.UI.View',
		bindId : 'progressview',
		properties : {
			backgroundColor : 'red',
			bottom : '1dp',
			left : 0,
			width : '1dip',
			height : '7dp'
		}
	}]
};
exports.timelinepassiveTemplate = {
	properties : {
		height : '60dip'
	},
	childTemplates : [{
		type : 'Ti.UI.ImageView',
		bindId : 'stationlogo',
		properties : {
			width : '60dip',
			opacity : 0.8,
			height : '60dip',
			top : 0,
			left : 0
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'title',
		properties : {
			color : '#333',
			opacity : 0.8,
			font : {
				fontFamily : 'Helvetica',
				fontWeight : 'bold',
				fontSize : '18dp',
			},
			top : '10dp',
			left : '70dip',
			opacity : 0.8
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'time',
		properties : {
			color : '#333',
			font : {
				fontFamily : 'Helvetica',
				fontSize : '14dp',
			},
			top : '36dp',
			left : '70dip',
		}
	}]
};
exports.listTemplate = {
	properties : {
		height : '62dip'
	},
	childTemplates : [{
		type : 'Ti.UI.ImageView',
		bindId : 'stationlogo',
		properties : {
			width : '60dip',
			height : '60dip',
			top : 0,
			left : 0
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'stationname',
		properties : {
			color : '#333',
			font : {
				fontFamily : 'Helvetica',
				fontSize : '18dp',
			},
			left : '70dip',
		}
	}]
};

