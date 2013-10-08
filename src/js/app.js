/*global define $ requestAnimationFrame TweenMax Quad Modernizr*/
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
	
	var App,
		AppRouter = require('app-router'), 
		Vars = require('app/models/vars'),
		Backbone = require('backbone'),
		BgView = require('app/views/bg-view'),
		MaskView = require('app/views/mask-view'),
		MenuView = require('app/views/menu-view'),
		NavView = require('app/views/nav-view'),
		RecipeView = require('app/views/recipe-view'),
		VideoView = require('app/views/video-view'),
        LeapView = require('app/views/leap-view'),
		ToggleGalleryView = require('app/views/toggle-container-view'),
		Recipes = require('app/collections/recipes'),
		AssetList = require('app/collections/asset-list'),
		SpeechCommand = require('app/views/components/speech-command'),
		UserEvent = require('app/events/user-event'),
		AppEvent = require('app/events/app-event'),
		Pages = require('app/collections/pages'),
		Page = require('app/models/page');

	require('tweenmax');
	require('balance');

    App = Backbone.View.extend({
		
        initialize: function () {
			this.first = true;
            this.historySize = 0;

            /* use active for touch */
            document.addEventListener("touchstart", function () {}, true);

            /* prevent scrolling of viewport */
			document.ontouchmove = function (e) { 
                e.preventDefault(); 
            }; 

            /* allow scrolling on certain elements */
            setTimeout(function () {
                if ($('html').hasClass('ipad')) {
                    $('#menu').addClass('scrollable');
                    $('#recipe-content').addClass('scrollable');
                }

                $('.scrollable').on('touchmove', function (e) {
                    e.stopPropagation();  
                });
            }, 100);
            
        },
		
        /**
         * load assets
         */
		load: function () {
			AssetList.load(this.start.bind(this));
		},
		
        /**
         * start application
         */
		start: function () {
			
			this.pages = new Pages();
			this.router = new AppRouter();
			this.bg = new BgView();
			this.mask = new MaskView();
			this.menu = new MenuView();
			this.nav = new NavView();
            this.recipeView = new RecipeView();
            this.videoView = new VideoView();
            this.leapView = new LeapView();

            $('.toggle-gallery-view').each(function () {
                var toggleview = new ToggleGalleryView({el: this});
            });
			
            if (typeof(testing) == 'undefined') {
                SpeechCommand.init();
            }

            //add clip text
            if (Modernizr.backgroundclip === true) {
                $('.cliptext').addClass('clipping');
            }

			this.addEventListeners();
			
			Backbone.history.start();
        },

        back: function () {
            window.history.back();
        },

        forward: function () {
            window.history.forward();
        },

        /**
         * handle close button
         */
        close: function () {
            if (this.historySize > 1) {
                window.history.back();
            } else {
                this.navigate('view-cover');
            }
        },
		
        /**
         * navigate to recipe         
         */
        recipe: function (name) {
			this.router.navigate('recipe/' + name, {trigger: true});
        },

        /**
         * navigate to video
         */
        video: function (name) {
			this.router.navigate('video/' + name, {trigger: true});
        },

        /**
         * navigate to page
         */
		navigate: function (name) {
			this.router.navigate('page/' + name, {trigger: true});
		},

        /**
         * handle router for recipe
         */
        handle_recipe_ROUTER: function () {
            var uri = Backbone.history.fragment,
                id = uri.replace('recipe/', ''),
                template = Recipes.getTemplate(id),
                page;

			if (this.first === true) {
                this.recipeView.show(template);
				AppEvent.trigger('seek', 0);
                AppEvent.trigger('hidenav');
                this.first = false;
            } else {
                this.recipeView.animIn(template);
            }

            this.$closeBtn.addClass('in');
        },
		
        /** 
         * handle router for video
         */
        handle_video_ROUTER: function () {
            var uri = Backbone.history.fragment;

            this.$closeBtn.addClass('in');
        },
	
        /**
         * handle router for page
         */
		handle_page_ROUTER: function () {
            var uri = Backbone.history.fragment === '' ? 'page/view-cover' : Backbone.history.fragment,
				page;

            this.prevPage = this.currentPage;
			page = this.pages.findWhere({url: uri});
			this.currentPage = page.get('id');
            
            this.$closeBtn.removeClass('in');

			if (this.first === true || this.recipeView.visible === true) {
				this.first = false;
				AppEvent.trigger('seek', this.currentPage);
			} else {
				AppEvent.trigger('transition', this.currentPage);
			}

            this.recipeView.animOut();
        },

        /**
         * immediate transition to page
         */
		handle_SEEK: function (id) {
			var page = this.pages.findWhere({id: id});
			
			$('.view').removeClass('in');
			$('#' + page.get('name')).addClass('in');
            new TweenMax.set($('.view.in'), {opacity: 1});
            TweenMax.killAll();
			page.get('view').start();
			
            try {
                $('.balance-text').balanceText();
            } catch (e) {}
		},
		
        /**
         * animated transition to page
         */
		handle_TRANSITION: function (id) {
			
            if (typeof(this.prevPage) !== 'undefined') {
                var prevPage = this.pages.findWhere({id: this.prevPage});
                prevPage.get('view').stop();
            }

			new TweenMax.to($('.view.in'), Vars.get('transitionTime'), {
				opacity: 0, 
				onComplete: this.handle_TRANSITION_COMPLETE.bind(this), 
				onCompleteParams: [id],
				ease: Quad.easeIn
			});
		},
		
        /**
         * finish animated transition to page
         */
		handle_TRANSITION_COMPLETE: function (id) {
			$('.view.in').removeClass('in');
			
			var page = this.pages.findWhere({id: id});
			$('#' + page.get('name')).addClass('in');

            try {
                $('.balance-text').balanceText();
            } catch (e) {}
			
			new TweenMax.fromTo($('#' + page.get('name')), Vars.get('transitionTime'), 
            {
                opacity: 0
            }, 
            {
                opacity: 1, 
                ease: Quad.easeOut,
                onComplete: function () {
                    TweenMax.killAll();
			        page.get('view').start();
                }
            });
		},
		
        /**
         * key events
         */
		handle_KEYDOWN: function (e) {
			UserEvent.trigger('keydown', e);
		},
		
        /**
         * mousewheel events
         */
        handle_MOUSEWHEEL: function (e) {
			UserEvent.trigger('mousewheel', e.originalEvent);
		},
		
        /**
         * resize events
         */
		handle_RESIZE: function (e) {
            //$('.balance-text').balanceText();
			UserEvent.trigger('resize', e);	
		},
		
        /**
         * add all event listeners
         */
		addEventListeners: function () {
            $('body').bind('keydown', this.handle_KEYDOWN.bind(this));
			$('body').bind('mousewheel', this.handle_MOUSEWHEEL.bind(this));
			$(window).bind('resize', this.handle_RESIZE);

            $('.video-btn').bind('click', function (e) {
                e.preventDefault();
                AppEvent.trigger('video', $(e.target).data('video'));
            });

            $('.recipe-btn').bind('click', function (e) {
                e.preventDefault();
                AppEvent.trigger('recipe', $(e.target).data('recipe'));
            });

            this.$closeBtn = $('#close-btn');
            this.$closeBtn.bind('click', function (e) {
                e.preventDefault();
                AppEvent.trigger('close');
            });

            $('#speech-btn').bind('click', function (e) {
                e.preventDefault();
                AppEvent.trigger('speech');
            });

			this.router.on('route:page', this.handle_page_ROUTER, this);
			this.router.on('route:video', this.handle_video_ROUTER, this);
			this.router.on('route:recipe', this.handle_recipe_ROUTER, this);
			this.router.on('route', function () {
                this.historySize += 1;
                AppEvent.trigger('route');
            }, this);

			AppEvent.on('seek', this.handle_SEEK, this);
			AppEvent.on('transition', this.handle_TRANSITION, this);
			AppEvent.on('navigate', this.navigate, this);

            AppEvent.on('back', this.back.bind(this));
            AppEvent.on('forward', this.forward.bind(this));

			AppEvent.on('recipe', this.recipe, this);
			AppEvent.on('video', this.video, this);
			AppEvent.on('close', this.close, this);
        }

    });

	return new App();
});
