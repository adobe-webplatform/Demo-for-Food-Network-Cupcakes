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
		NavItem = require('app/views/menu-item-view'),
		NavButton = require('app/views/menu-button-view'),
		Recipes = require('app/collections/recipes'),
		NavView;
	
	require('tweenmax');

	NavView = Backbone.View.extend({

		initialize: function () {	
			
			var pages = Vars.get('pages'),
				navItem, 
				i,
                left;

			this.$el = $('#menu');
            this.$body = $('body');
            this.$mainContainer = $('#main-container');
			this.items = [];

            this.button = new NavButton({title: 'menu', color: '#ff0000'});
            this.$body.append(this.button.$el);
            this.$breadcrumb = $('#nav-sub-button');

			for (i = 0; i < pages.length; i += 1) {
                //exclude missing title
                if (pages.get(i).get('title') !== '') {
                    navItem = new NavItem({
                        name: pages.get(i).get('name'), 
                        title: pages.get(i).get('title'), 
                        color: pages.get(i).get('color')
                    });
                    
                    this.$el.append(navItem.$el);
                    this.items.push(navItem);
                }
			}

            AppEvent.on('shownav', this.show.bind(this));
            AppEvent.on('hidenav', this.hide.bind(this));
            AppEvent.on('togglenav', this.toggle.bind(this));
            AppEvent.on('route', this.route.bind(this));

        },

        show: function () {
            if (!this.$body.hasClass('menu-in')) {
                this.$mainContainer.bind('click', this.hide.bind(this));
                this.$body.addClass('menu-in');
            }
        },

        hide: function () {
            if (this.$body.hasClass('menu-in')) {
                this.$mainContainer.unbind('click');
                this.$body.removeClass('menu-in');
            }
        },

        toggle: function () {
            if (this.$body.hasClass('menu-in')) {
                this.hide();
            } else {
                this.show();
            }
        },

        route: function () {

            var url = Backbone.history.fragment,
                name = '',
                recipe;

            //page
            if (url.indexOf('page') > -1) {
                url = url.replace('page/', '');
                name = url.replace('view-', '');
                
                if (name.indexOf('/') > -1) {
                    name = name.substring(0, name.indexOf('/'));
                    url = url.substring(0, url.lastIndexOf('/'));
                } else {
                    name = '';
                }
            }

            //recipe
            if (url.indexOf('recipe') > -1) {
                url = url.replace('recipe/', '');
                recipe = Recipes.findWhere({id: url});
                name = recipe.get('section');
                url = 'view-' + name;
            }

            this.setSubview(name, url);
        },

        /**
         * set subview
         */
        setSubview: function (title, url) {
            this.$breadcrumb.unbind('click');

            if (title !== '') {

                this.$breadcrumb.addClass('in');
                this.$breadcrumb.addClass(title);
                this.$breadcrumb.bind('click', this.handle_breadcrumb_CLICK.bind(this));
            } else {
                //this.$breadcrumb.removeClass('in');
                this.$breadcrumb.removeClass();
            }

            this.$breadcrumb.data('url', url);
            this.$breadcrumb.html(title);
        },

        handle_breadcrumb_CLICK: function (e) {
            var url = this.$breadcrumb.data('url');
            AppEvent.trigger('navigate', url);
        },
		
		render: function () {
			
		},
		
		resize: function () {
			
		}
	});
		
	return NavView;
});
