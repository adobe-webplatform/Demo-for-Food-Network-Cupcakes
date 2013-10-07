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
		NavItem = require('app/views/nav-item-view'),
		//NavButton = require('app/views/nav-button-view'),
		NavView;
	
	require('tweenmax');

	NavView = Backbone.View.extend({

		initialize: function () {	
			
			var pages = Vars.get('pages'),
				navItem, 
				i,
                left;
				
			this.$el = $('#navigation');
			this.items = [];
			this.visible = false;

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
        },

		render: function () {
			
		},
		
		resize: function () {
            
		}
	});
		
	return NavView;
});
