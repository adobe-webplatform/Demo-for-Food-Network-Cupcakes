/*global define THREE $ TweenMax requestAnimationFrame cancelAnimationFrame boxBlurCanvasRGBA*/
define([], function (require) {
	
	var Backbone = require('backbone'),
		Vars = require('app/models/vars'),
		AssetList = require('app/collections/asset-list'),
		UserEvent = require('app/events/user-event'),
		AppEvent = require('app/events/app-event'),
		View;
	
	require('tweenmax');
	require('vendor/tweenmax/src/uncompressed/plugins/ColorPropsPlugin');
	require('raf');

	View = Backbone.View.extend({

		initialize: function () {			
			this.$el = $('#view-cover');

			//TweenLite.ticker.useRAF(false);

            this.colorlist = [
                'rgb(27, 177, 178)', 
                'rgb(238, 54, 64)', 
                '#00a7c4', 
                '#ab76c4'
            ];

			this.$canvas = $('#cover-canvas');
			this.canvas = this.$canvas[0];
			this.ctx = this.canvas.getContext('2d');
		
            //color canvas
            this.colorcanvas = document.createElement('canvas');
            this.colorcanvas.width = this.canvas.width;
            this.colorcanvas.height = this.canvas.height;
            this.colorctx = this.colorcanvas.getContext('2d');

            //draw canvas
            this.drawcanvas = document.createElement('canvas');
            this.drawcanvas.width = this.canvas.width;
            this.drawcanvas.height = this.canvas.height;
            this.drawctx = this.drawcanvas.getContext('2d');

		    this.cupcake = AssetList.findWhere({name: 'cover-cupcake'}).get('object');
		    this.cupcakemask = AssetList.findWhere({name: 'cover-mask'}).get('object');
            
			this.mouse = {x: 0, y: 0};
            this.delta = 0;
            this.animating = false;

		},
		
		start: function () {
            AppEvent.trigger('hidenav');
			this.applyRandomColor();
		},

        setup: function () {
	
        },

        handle_CLICK: function (e) {
	
        },

        applyRandomColor: function () {
            var color = this.colorlist[Math.floor(Math.random() * this.colorlist.length)];

			this.tween = TweenMax.to(this, 2, {
	        	colorProps: {color: color}, 
	            onUpdate: this.drawColor.bind(this),
	            onComplete: this.updateColor.bind(this)
	        });

        },

		updateColor: function () {
			clearTimeout(this.to);
			this.to = setTimeout(this.applyRandomColor.bind(this), 3000);
		},
		
        drawColor: function () {
            this.colorctx.clearRect(0, 0, this.colorcanvas.width, this.colorcanvas.height);

            this.colorctx.fillStyle = this.color;
            this.colorctx.rect(0, 0, this.colorcanvas.width, this.colorcanvas.height);
            this.colorctx.fill();

            this.colorctx.globalCompositeOperation = 'destination-atop';
            this.colorctx.drawImage(this.cupcakemask, 0, 0, this.cupcakemask.width, this.cupcakemask.height);

            this.render();
        },

		render: function () {
            this.ctx.globalAlpha = 1;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(this.cupcake, 0, 0, this.cupcake.width, this.cupcake.height);

            this.ctx.globalAlpha = 0.3;
            this.ctx.globalCompositeOperation = 'color-burn';
            this.ctx.drawImage(this.colorcanvas, 0, 0, this.canvas.width, this.canvas.height);
        },
		
		resize: function () {

		},
		
		stop: function () {
            this.destroy();
		},
		
		destroy: function () {
            TweenMax.killTweensOf(this);
		}
	});
		
	return View;
});
