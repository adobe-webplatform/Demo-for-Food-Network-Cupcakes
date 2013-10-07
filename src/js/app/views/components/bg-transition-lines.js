/*global define THREE $ TweenMax*/
define([], function (require) {
	
	var Backbone = require('backbone'),
		Vars = require('app/models/vars'),
		AssetList = require('app/collections/asset-list'),
		UserEvent = require('app/events/user-event'),
		AppEvent = require('app/events/app-event'),
		Transition;
	
	require('tweenmax');

	Transition = function (canvas, context, fg, bg) {
		this.ctx = context;
		
		this.value = {r: 0};
		
		this.foregroundColor = fg ? fg : "#efe1d8";
		this.backgroundColor = bg ? bg : "#ead7c9";
		
		this.init = function () {
			var i,
				j = 0,
				line,
                numNeeded,
				_x,
				_y,
				radius = 10,
				padding = 20;
				
			this.pattern = this.ctx.createPattern(AssetList.findWhere({name: 'linen-texture'}).get('object'), 'repeat');
            
			this.lines = [];
			
			_x = padding + radius;
			numNeeded = (window.innerWidth + window.innerHeight) / _x;

			for (i = 0; i < numNeeded; i += 1) {
				line = {x: _x, y: _y, r: this.value.r};
				this.lines.push(line);
				
				_x += padding + radius * 2;
			}
		};
		
		this.draw = function () {
			this.value.r = 10;
			this.render();
		};
		
		this.animIn = function (callback) {
			new TweenMax.to(this.value, Vars.get('transitionTime'), {
				r: 10, 
				onUpdate: this.render.bind(this),
				onComplete: callback
			});
		};
	
		this.animOut = function (callback) {
			new TweenMax.to(this.value, Vars.get('transitionTime'), {
				r: 0, 
				onUpdate: this.render.bind(this),
				onComplete: callback
			});		
		};
		
		this.render = function () {
			var i,
				line;
			
			this.ctx.clearRect(0, 0, canvas.width, canvas.height);

			this.ctx.globalCompositeOperation = 'normal';
			
			this.ctx.fillStyle = this.backgroundColor;
			this.ctx.rect(0, 0, canvas.width, canvas.height);
			this.ctx.fill();
						
			for (i = 0; i < this.lines.length; i += 1) {
				line = this.lines[i];
				this.ctx.strokeStyle = this.foregroundColor;
				this.ctx.lineWidth = this.value.r;
				this.ctx.beginPath();
				this.ctx.moveTo(0, line.x);
				this.ctx.lineTo(line.x, 0);
				this.ctx.stroke();
			}
			
			this.ctx.globalCompositeOperation = 'multiply';
			this.ctx.fillStyle = this.pattern;
			this.ctx.rect(0, 0, canvas.width, canvas.height);
			this.ctx.fill();
		};
		
		this.resize = function () {

		};
		
		this.init();
	};
		
	return Transition;
});
