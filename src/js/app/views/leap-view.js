/*global define THREE $ Leap*/
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
		LeapView,
        _animating;
	
    require('leap');

	LeapView = Backbone.View.extend({

		initialize: function () {	
		    if (Leap) {
                Leap.loop({enableGestures: true}, this.update.bind(this));
            }
		},

        update: function (frame) {
            if (!_animating &&
                frame.gestures.length > 0 && 
                frame.gestures[0].type == 'swipe' &&
                frame.gestures[0].state == 'stop') {

                if (frame.gestures[0].direction[0] > 0) {
                    AppEvent.trigger('previous');
                } else {
                    AppEvent.trigger('next');
                }

                _animating = true;

                setTimeout(function () {
                    _animating = false;
                }, 1000); //throttle
            }
        }
	});
		
	return LeapView;
});
