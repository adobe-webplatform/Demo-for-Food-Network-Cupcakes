/*global define THREE $ TweenMax*/
define([], function (require) {
	
	var Backbone = require('backbone'),
		Vars = require('app/models/vars'),
		UserEvent = require('app/events/user-event'),
		AppEvent = require('app/events/app-event'),
		Transition;
	
	require('tweenmax');

	Transition = function (canvas, context) {
		this.ctx = context;
		
		this.value = {r: 0};
		this.goal = 50;
		
		this.foregroundColor = "black";

		this.init = function () {
			var i,
				j = 0,
				dot,
				_x,
				_y,
				radius = this.goal,
				padding = -10,
                numNeeded;
			
            numNeeded = (window.innerWidth / radius - padding) * (window.innerHeight / radius - padding);

			this.dots = [];
			
			_x = padding - radius * 3;
			_y = padding - radius;
			
			for (i = 0; i < numNeeded; i += 1) {
				dot = {x: _x, y: _y, r: this.value.r};
				this.dots.push(dot);
				
				_x += padding + radius * 2;
				
				if (_x > canvas.width + radius) {
					j += 1;
					if (j % 2 !== 0) {
						_x = padding - radius * 3;
						_y += padding + radius;
					} else {
						_x = padding + radius;
						_y += padding + radius;
					}
				}
			}
		};
		
		this.draw = function () {
			this.value.r = this.goal;
			this.render();
		};
		
		this.animIn = function (callback) {
			new TweenMax.to(this.value, Vars.get('transitionTime'), {
				r: this.goal, 
				onUpdate: this.render.bind(this),
				onComplete: callback,
                ease: Quad.easeIn
			});
		};
	
		this.animOut = function (callback) {
			new TweenMax.to(this.value, Vars.get('transitionTime'), {
				r: 0, 
				onUpdate: this.render.bind(this),
				onComplete: callback,
                ease: Quad.easeOut
			});		
		};
		
		this.render = function () {
			var i,
				dot;
			
			this.ctx.clearRect(0, 0, canvas.width, canvas.height);
			//this.ctx.globalCompositeOperation = 'screen';
			
			for (i = 0; i < this.dots.length; i += 1) {
				dot = this.dots[i];
				this.ctx.fillStyle = this.foregroundColor;
				this.ctx.beginPath();
				this.ctx.arc(dot.x, dot.y, this.value.r, 0, 2 * Math.PI, false);
				this.ctx.closePath();
				this.ctx.fill();
			}
		};
		
		this.resize = function () {
            this.init();
		};
		
		this.init();
	};
		
	return Transition;
});
