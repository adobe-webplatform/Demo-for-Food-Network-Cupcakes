/*global define THREE $ TweenMax requestAnimationFrame cancelAnimationFrame*/
define([], function (require) {
	
	var Backbone = require('backbone'),
		Vars = require('app/models/vars'),
		UserEvent = require('app/events/user-event'),
		AppEvent = require('app/events/app-event'),
		View;
	
	require('tweenmax');
	require('three');
	require('raf');

	View = Backbone.View.extend({

		initialize: function () {			
			this.$el = $('#view-cover');
			this.canvas = $('#cover-canvas')[0];
			this.mouse = {x: 0, y: 0};
		
            this.animating = false;

            //this.addScene();
		},
		
		start: function () {
            AppEvent.trigger('shownav');
            //this.animating = true;
            //this.animate();
			//$(document).bind('mousemove', this.handle_MOUSE_MOVE.bind(this));
		},

        addScene: function () {
            var SCREEN_WIDTH = window.innerWidth,
				SCREEN_HEIGHT = window.innerHeight,
                loader;
		
            if (typeof(testing) == 'undefined') {
                loader = new THREE.JSONLoader();
                loader.load('assets/models/cupcake.js', this.handle_MODEL_LOADED.bind(this));
            }
								
			this.scene = new THREE.Scene();
			
			this.ambientLight = new THREE.AmbientLight(0xcccccc);
			this.scene.add(this.ambientLight);
			
			this.spotLight = new THREE.SpotLight(0xcccccc, 0.9, 500);
			this.spotLight.position.set(0.05, 0.05, 1);
			this.scene.add(this.spotLight);
			
			this.camera = new THREE.PerspectiveCamera(35, SCREEN_WIDTH / SCREEN_HEIGHT, 2, 5000);
			
			this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, antialias: true});
			this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
		},

        handle_MODEL_LOADED: function (geometry, materials) {

            var material;

            materials[0] = new THREE.MeshPhongMaterial({ 
                ambient: 0xefefef, 
                color: 0xeddfb8, 
                specular: 0x000000, 
                map: THREE.ImageUtils.loadTexture("assets/images/textures/cake.jpg"),
                bumpMap: THREE.ImageUtils.loadTexture("assets/images/textures/cake_bw.jpg"),
                bumpScale: 0.5, 
                shininess: 0, 
                metal: false
            });
                            
            materials[1] = new THREE.MeshPhongMaterial({
                ambient: 0x240703, 
                color: 0xbf7e2c, 
                specular: 0xfbe6b7,
                bumpMap: THREE.ImageUtils.loadTexture("assets/images/textures/wrapper_bw.jpg"),
                transparent: true,
                opacity: 0.9,
                side: THREE.DoubleSide
            });
            
            materials[2] = materials[3] = new THREE.MeshLambertMaterial({
                ambient: 0xbd6780, 
                color: 0xbf758c, 
                specular: 0xe7bcd0,
                shininess: 30, 
                metal: true,
                side: THREE.DoubleSide
            });
            
            material = new THREE.MeshFaceMaterial(materials);
            
            this.cupcake = new THREE.Mesh(geometry, material);
            this.cupcake.position.y = -40;
            this.cupcake.position.z = -200;
            this.cupcake.scale.set(50, 50, 50);
            this.scene.add(this.cupcake);
            
            this.cupcake.castShadow = true;
            this.cupcake.receiveShadow = true;
            
            this.spotLight.target = this.cupcake;
            
            this.render();
		},

		handle_MOUSE_MOVE: function (e) {
			this.mouse.y = e.pageY;
			this.mouse.x = e.pageX;	
		},
		
		animate: function () {
            console.log('animating cover');
			if (this.cupcake) {
				this.cupcake.rotation.x = this.mouse.y / (window.innerHeight * 2);
				this.cupcake.rotation.y = 45 + this.mouse.x / (window.innerWidth * 2);				
			}

			this.render();

            if (this.animating) {
                this.interval = requestAnimationFrame(this.animate.bind(this));
            }
		},
		
		render: function () {
            //this.renderer.clear();
			//this.renderer.render(this.scene, this.camera);
		},
		
		resize: function () {

		},
		
		stop: function () {
            //this.renderer.clear();
            //cancelAnimationFrame(this.interval);
            //this.animating = false;
			//$(document).unbind('mousemove', this.handle_MOUSE_MOVE.bind(this));
		},
		
		destroy: function () {
			this.scene = null;
			this.cupcake = null;
			this.spotLight = null;
			this.ambientLight = null;
			this.renderer = null;
			this.camera = null;
		}
	});
		
	return View;
});
