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
			this.pattern = this.ctx.createPattern(AssetList.findWhere({name: 'linen-texture'}).get('object'), 'repeat');
		};
		
		this.draw = function () {
			this.value.r = Math.max(window.innerWidth, window.innerHeight);
			this.render();
		};
		
		this.animIn = function (callback) {
			new TweenMax.to(this.value, Vars.get('transitionTime'), {
				r: window.innerWidth, 
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
			this.ctx.clearRect(0, 0, canvas.width, canvas.height);
			
			this.ctx.globalCompositeOperation = 'normal';
			
			this.ctx.fillStyle = this.backgroundColor;
			this.ctx.rect(0, 0, canvas.width, canvas.height);
			this.ctx.fill();
			
			this.ctx.globalCompositeOperation = 'multiply';
						
			this.ctx.fillStyle = this.foregroundColor;
			this.ctx.beginPath();
			this.ctx.arc(canvas.width / 2, canvas.height / 2, this.value.r, 0, 2 * Math.PI, false);
			this.ctx.closePath();
			this.ctx.fill();
			
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
