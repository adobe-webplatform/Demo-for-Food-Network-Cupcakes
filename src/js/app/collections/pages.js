/*global define $*/
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
        Page = require('app/models/page'),
		SectionView = require('app/views/sections/section-view'),
		SectionCover2 = require('app/views/sections/section-cover-2d'),
		SectionGoto = require('app/views/sections/section-goto'),
		SectionAmerican = require('app/views/sections/section-american'),
		SectionFrosting = require('app/views/sections/section-frosting'),
		SectionAlton = require('app/views/sections/section-alton'),
		SectionFrostingMix = require('app/views/sections/section-frosting-mix'),
        Pages;

    Pages = Backbone.Collection.extend({
		model: Page,

        initialize: function () {
            var instance = this;

            this.views = [
				new SectionCover2(),
				new SectionGoto(),
				new SectionAmerican(),
				new SectionFrosting(),
				new SectionAlton(),
				new SectionFrostingMix()
			];

            $('.view').each(function (i) {
                var $this = $(this),
					page = new Page(),
					view = new SectionView(); //make this a basic view w/ start() method
								
				page.set({
					'id': i, 
					'name': $this.attr('id'), 
					'title': $this.data('title'), 
					'url': $this.data('url') ? 'page/' + $this.data('url') : 'page/' + $this.attr('id'), 
					'view': instance.views[i] ? instance.views[i] : view,
                    'color': $this.data('color'),
					'transition': $this.data('transition'),
					'mask': $this.data('mask')
				});

				instance.add(page);
			});
			
            Vars.set('pages', this);
        }
	});
	
	return Pages;
});
