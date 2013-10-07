/*global define THREE $ TweenMax*/
/*
 * Copyright (c) 2013 Adobe Systems Incorporated. All rights reserved.

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define([], function (require) {
	
	var Backbone = require('backbone'),
		Vars = require('app/models/vars'),
		UserEvent = require('app/events/user-event'),
		AppEvent = require('app/events/app-event'),
		TransitionDots = require('app/views/components/mask-transition-dots'),
		TransitionCircle = require('app/views/components/mask-transition-circle'),
		MaskView;
	
	require('tweenmax');

	MaskView = Backbone.View.extend({

		initialize: function () {

            if ($('html').hasClass('ipad')) {
                return;
            }

			this.canvas = {width: window.innerWidth, height: window.innerHeight};
            this.setSize();
			this.ctx = document.getCSSCanvasContext('2d', 'mask', this.canvas.width, this.canvas.height);
					
			this.transitions = [
				new TransitionDots(this.canvas, this.ctx),
				new TransitionCircle(this.canvas, this.ctx)
			];
			
			this.currentTransition = 0;
			
			AppEvent.on('seek', this.seek.bind(this));
			AppEvent.on('transition', this.goto.bind(this));
			UserEvent.on('resize', this.resize.bind(this));
			
			this.seek(0);
		},
		
		seek: function (num) {
			var page = Vars.get('pages').findWhere({id: num});
			this.currentTransition = page.get('mask');
			
			this.transitions[this.currentTransition].draw();
		},
		
		goto: function (num) {
			var page = Vars.get('pages').findWhere({id: num});
			this.nextTransition = page.get('mask');
			
			this.transitions[this.currentTransition].animOut(this.handle_ANIM_OUT.bind(this));
		},
		
		handle_ANIM_OUT: function () {
			this.currentTransition = this.nextTransition;
			this.transitions[this.currentTransition].animIn(null);
		},
		
		render: function () {
			
		},

        setSize: function () {
            var width = window.innerWidth,
                height = window.innerHeight;

            if (width > 1024 || height > 1000) {
                width = width * 0.5;
                height = height * 0.5;
            }

            this.canvas.width = width;
            this.canvas.height = height;
        },
		
		resize: function () {
            clearTimeout(this.resizeTimeout);

            this.resizeTimeout = setTimeout(function () { //throttle resize

                this.setSize();
                this.ctx = document.getCSSCanvasContext('2d', 'mask', this.canvas.width, this.canvas.height);
                this.transitions[this.currentTransition].resize();
                this.transitions[this.currentTransition].draw();
            }.bind(this), 200);
		}
	});
		
	return MaskView;
});
