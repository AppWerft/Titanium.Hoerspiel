var fontFamily = (Ti.Android) ? 'Droid Sans' : 'Helvetica Neue';
exports.timelineactiveTemplate = {
	properties : {
		height : '100dip',
		backgroundImage : 'white'

	},
	childTemplates : [{
		type : 'Ti.UI.ImageView',
		bindId : 'play',
		properties : {
			width : '40dp',
			opacity : 0.5,
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
				fontFamily : fontFamily,
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
				fontFamily : fontFamily,
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
				fontFamily : fontFamily,
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
				fontFamily : fontFamily,
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
				fontFamily : fontFamily,
				fontSize : '18dp',
			},
			left : '70dip',
		}
	}]
};

exports.podcastsTemplate = {
	properties : {
		height : '50dip'
	},
	childTemplates : [{
		type : 'Ti.UI.Label',
		bindId : 'title',
		properties : {
			color : '#333',
			font : {
				fontFamily : fontFamily,
				fontSize : '18dp',
				fontWeight : 'bold'
			},
			left : '60dip',
		}
	}, {
		type : 'Ti.UI.ImageView',
		bindId : 'logo',
		properties : {
			width : '50dp',

			height : '50dp',
			left : '0dp'
		}
	}, {
		type : 'Ti.UI.Label',
		bindId : 'summary',
		properties : {
			color : '#333',
			font : {
				fontFamily : fontFamily,
				fontSize : '14dp',

			},
			height : Ti.UI.SIZE,
			top : '60dp',
			right : '10dp',
			bottom : '5dp',
			left : '10dip',
		}
	}]
};

exports.podcastTemplate = {
	properties : {
		height : Ti.UI.SIZE,
		backgroundColor : 'white'
	},
	childTemplates : [{
		type : 'Ti.UI.ImageView',
		bindId : 'pict',
		properties : {
			width : '70dip',
			height : '70dip',
			top : 0,
			left : 0
		}
	}, {
		type : 'Ti.UI.ImageView',
		bindId : 'cached',
		properties : {
			width : '20dip',
			height : '20dip',
			bottom : '5dp',
			left : '30dp',
			image : '/images/nil.png'
		}
	}, {
		type : 'Ti.UI.ImageView',
		bindId : 'faved',
		properties : {
			width : '20dip',
			height : '20dip',
			bottom : '5dp',
			left : '2dp',
			image : '/images/nil.png'
		}
	}, {
		type : 'Ti.UI.View',
		properties : {
			layout : 'vertical',
			top : 0,
			left : 0
		},
		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'title',
			properties : {
				color : '#666',
				top : '5dp',
				font : {
					fontFamily : fontFamily,
					fontSize : '18dp',
					fontWeight : 'bold'
				},
				left : '80dip',
				right : '30dp',
				height : Ti.UI.SIZE
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'summary',
			properties : {
				color : '#333',
				top : 0,
				height : Ti.UI.SIZE,
				font : {
					fontFamily : fontFamily,
					fontSize : '14dp',
				},
				left : '80dip',
				right : '30dp',
				height : Ti.UI.SIZE
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'author',
			properties : {
				color : '#333',
				top : 0,
				height : Ti.UI.SIZE,
				font : {
					fontFamily : fontFamily,
					fontSize : '14dp',
				},
				left : '80dip',
				right : '30dp',
				height : Ti.UI.SIZE
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'pubdate',
			properties : {
				color : '#333',
				top : '2dp',
				font : {
					fontFamily : fontFamily,
					fontSize : '10dp',
				},
				left : '80dip',
				height : Ti.UI.SIZE,
				right : '30dp',
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'duration',
			properties : {
				color : '#333',
				top : '0dp',
				font : {
					fontFamily : fontFamily,
					fontSize : '12dp',
				},
				left : '80dip',
				height : Ti.UI.SIZE,
				right : '30dp',
				bottom : '5dp'
			}
		}]
	}]
};
exports.channelsTemplate = {
	properties : {
		height : Ti.UI.SIZE,
		backgroundColor : 'white'
	},
	childTemplates : [{
		type : 'Ti.UI.ImageView',
		bindId : 'logo',
		properties : {
			width : '70dip',
			height : '70dip',
			top : '0dp',
			left : 0
		}
	}, {
		type : 'Ti.UI.ActivityIndicator',
		bindId : 'ai',
		properties : {
			style : Titanium.UI.ActivityIndicatorStyle.PLAIN,
			bottom : '5dp',
			left : '80dp',
			visible : true
		}
	}, {
		type : 'Ti.UI.View',
		properties : {
			layout : 'vertical',
			top : 0,
			left : 0
		},
		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'title',
			properties : {
				color : '#666',
				top : '5dp',
				font : {
					fontFamily : fontFamily,
					fontSize : '18dp',
					fontWeight : 'bold'
				},
				left : '80dip',
				right : '30dp',
				height : Ti.UI.SIZE
			}
		}, {
			type : 'Ti.UI.ImageView',
			bindId : 'newicon',
			properties : {
				width : '40dip',
				height : 0,
				image:'/images/new.png',
				top : '0dp',
				visible : false,
				left : '80dp'
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'mtime',
			properties : {
				color : '#333',
				top : '2dp',
				font : {
					fontFamily : fontFamily,
					fontSize : '10dp',
				},
				left : '80dip',
				height : Ti.UI.SIZE,
				right : '30dp',
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'total',
			properties : {
				color : '#333',
				top : '2dp',
				font : {
					fontFamily : fontFamily,
					fontSize : '10dp',
					fontWeight : 'bold'
				},
				left : '80dip',
				height : Ti.UI.SIZE,
				right : '30dp',
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'ctime',
			properties : {
				color : '#333',
				top : '2dp',
				font : {
					fontFamily : fontFamily,
					fontSize : '10dp',
				},
				left : '80dip',
				height : Ti.UI.SIZE,
				right : '30dp',
			}
		}]
	}]
};
