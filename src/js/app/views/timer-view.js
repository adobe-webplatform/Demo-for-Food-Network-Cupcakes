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
		TimerView,
        _time = 1200;
	
	require('tweenmax');

	TimerView = Backbone.View.extend({

		initialize: function () {
            this.$el = $('#timer');
            this.$ui = $('#timer-ui');
            this.$openButton = $('#timer-btn');
            this.$playButton = $('#timer-pause-btn');
            this.$timeLabel = $('#timer-time');
            this.isOpen = false;

            this.$openButton.bind('click', this.toggleVisibility.bind(this));
            this.$playButton.bind('click', this.togglePlay.bind(this));
			
            this.reset();
		},

        determineBakeTime: function () {
        
            var directions,
                startIndex,
                endIndex,
                substring,
                times;

            directions = $('.recipe-directions').html().toLowerCase();
            startIndex = directions.indexOf('bake');
            substring = directions.substring(startIndex);
            endIndex = substring.indexOf('minutes') + startIndex;
            substring = directions.substring(startIndex, endIndex);
            times = substring.match(/\d+/g) ? substring.match(/\d+/g) : [];
            
            if (times.length > 0) {
                this.show();
                this.setTime(times[0] * 60);
            } else {
                this.hide();
            }
        },

        setTime: function (t) {
            _time = t;
            this.currentTime = _time;
            this.render();
        },

        reset: function () {
            this.pause();
            clearInterval(this.interval);
            this.startOffset = 0;
            this.currentTime = _time;
            this.running = false;
            this.render();
        },

        show: function () {
            this.$el.addClass('in');
        },

        hide: function () {
            this.close();
            this.$el.removeClass('in');
        },

        toggleVisibility: function () {
            if (this.isOpen === true) {
                this.close();
            } else {
                this.open();
            }
        },

        open: function () {
            this.$ui.addClass('in');
            this.isOpen = true;
            //this.determineBakeTime();
        },

        close: function () {
            this.$ui.removeClass('in');
            this.isOpen = false;
            this.reset();
        },

        togglePlay: function () {
            if (this.running === true) {
                this.pause();
            } else {
                if (this.currentTime < _time) {
                    this.unpause();
                } else {
                    this.start();
                }
            }
        },

        /**
         * start timer
         */
        start: function () {
            this.startTime = new Date().getTime();
            this.interval = setInterval(this.update.bind(this), 100);
            this.$playButton.addClass('play');
            this.running = true;
        },

        /**
         * pauses timer
         * tracks time of pause to calculate pause duration when resuming counting
         */
        pause: function () {
            this.startPause = new Date().getTime();
            clearInterval(this.interval);
            this.$playButton.removeClass('play');
            this.running = false;
        },

        /**
         * resumes timer
         * sets startOffset to represent duration of pause since last counting
         */
        unpause: function () {
            this.startOffset += (new Date().getTime() - this.startPause);
            this.interval = setInterval(this.update.bind(this), 100);
            this.$playButton.addClass('play');
            this.running = true;
        },

        /**
         * update
         * calculates time based on passed timestamp including offset of any pause duration
         */
        update: function () {
            var time = new Date().getTime() - this.startTime - this.startOffset;
            time = Math.floor(time / 1000); 
            time = _time - time;
            this.currentTime = time;
            this.render();

            if (this.currentTime === 0) {
                //stop and alert!
                this.reset();
            }
        },

        /**
         * update 
         */
        render: function () {
            //todo parse this
            this.$timeLabel.html(this.parseTime(this.currentTime));
        },

        parseTime: function (time) {
            var hours,
                minutes,
                seconds,
                hoursuffix,
                minutesuffix,
                timestring = '';
            
            seconds = time % 60;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            minutes = Math.floor(time / 60) % 60;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            hours = Math.floor(time / (60 * 60)) % 24;
            hours = hours < 10 ? '0' + hours : hours;

            return hours + ':' + minutes + ':' + seconds;
        },

		resize: function () {
			
		}
	});
		
	return TimerView;
});
