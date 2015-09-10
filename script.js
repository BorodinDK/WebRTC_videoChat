
var gui = require('nw.gui');
var win = gui.Window.get();

var trayMenu = new gui.Menu();

//trayMenu.append(new gui.MenuItem({ label: 'Открыть консоль', click: win.showDevTools }));
trayMenu.append(new gui.MenuItem({ type: 'separator' }));
trayMenu.append(new gui.MenuItem({ label: 'Выход', click: gui.App.quit }));


var tray = new gui.Tray({ icon: 'icon.png', menu: trayMenu });
tray.on('click', function() {
	win.show();
	win.showDevTools();
});


win.on('close', function() {
	win.hide();
	return false;
});

var app = {
	init: function(){
		app.audio = new Audio('sound.wav');
		//app.audio = document.getElementsByTagName('audio')[0];
		app.audio.loop = true;
		app.call.view();
		app.call.init();
		app.mic.init();
		app.video.init();
	},
	name: 'Василий',
	dialog: {
		view: function(){
			win.width = 800;
			document.body.classList.add('connect');
		},
		hide: function(){
			win.width = 605;
			document.body.classList.remove('connect');
		}
	},
	call: {
		view: function(){
			app.audio.play();
			document.body.classList.add('call');
		},
		hide: function(){
			app.audio.pause();
			app.audio.currentTime = 0;
			document.body.classList.remove('call');
		},
		init:function(){
			app.call.work = true;
			app.call.btn = document.querySelectorAll('.call_btn');
			for (var i = 0; i < app.call.btn.length; i++){
				app.call.btn[i].addEventListener('click', function(){
					if(app.call.work) app.call.end(); else app.call.on();
				});
			}
		},
		end: function(){

			app.call.hide();
			app.call.work = false;
			for (var i = 0; i < app.call.btn.length; i++){
				app.call.btn[i].classList.remove('active');
			}
		},
		on: function(){
			app.call.view();
			app.call.work = true;
			for (var i = 0; i < app.call.btn.length; i++){
				app.call.btn[i].classList.add('active');
			}
		}
	},
	mic: {
		init:function(){
			app.mic.work = true;
			app.mic.btn = document.querySelectorAll('.mic_btn');
			for (var i = 0; i < app.mic.btn.length; i++){
				app.mic.btn[i].addEventListener('click', function(){
					if(app.mic.work) app.mic.off(); else app.mic.on();
				});
			}
		},
		off: function(){
			app.mic.work = false;
			for (var i = 0; i < app.mic.btn.length; i++){
				app.mic.btn[i].classList.add('active');
			}
		},
		on: function(){
			app.mic.work = true;
			for (var i = 0; i < app.mic.btn.length; i++){
				app.mic.btn[i].classList.remove('active');
			}
		}
	},
	video: {
		init:function(){
			app.video.work = true;
			app.video.btn = document.querySelectorAll('.video_btn');
			for (var i = 0; i < app.video.btn.length; i++){
				app.video.btn[i].addEventListener('click', function(){
					if(app.video.work) app.video.off(); else app.video.on();
				});
			}
		},
		off: function(){
			app.video.work = false;
			for (var i = 0; i < app.video.btn.length; i++){
				app.video.btn[i].classList.add('active');
			}
		},
		on: function(){
			app.video.work = true;
			for (var i = 0; i < app.video.btn.length; i++){
				app.video.btn[i].classList.remove('active');
			}
		}
	}
};




document.addEventListener('DOMContentLoaded', app.init, false);