/*global define THREE $ TweenMax webkitSpeechRecognition console*/
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
		SpeechCommand;
	
	SpeechCommand = function () {

        /**
         * mapping terms to pages
         */
        this.map = [
            {
                url: 'view-go-to/marbling',
                array: [
                    'marbling techniques',
                    'marbling',
                    'marble',
                    'marble cupcakes',
                    'marble cupcake'
                ]
            },
            {
                url: 'view-go-to/vanilla-mix',
                array: [
                    'vanilla mix ins',
                    'vanilla mix in',
                    'vanilla mix-ins',
                    'vanilla mix-in',
                    'vanilla mixins',
                    'vanilla mixin',
                    'vanilla mix'
                ]
            },
            {
                url: 'view-go-to/chocolate-mix',
                array: [
                    'chocolate mix ins',
                    'chocolate mix in',
                    'chocolate mix-ins',
                    'chocolate mix-in',
                    'chocolate mixins',
                    'chocolate mixin',
                    'chocolate mix'
                ]
            },
            {
                url: 'view-go-to/v-buttercream',
                array: [
                    'vanilla buttercream',
                    'vanilla american',
                    'vanilla american buttercream'
                ]
            },
            {
                url: 'view-go-to/c-buttercream',
                array: [
                    'chocolate buttercream',
                    'chocolate american',
                    'chocolate american buttercream'
                ]
            },
            {
                url: 'view-go-to/vanilla',
                array: [
                    'go to vanilla cupcakes',
                    'go to vanilla cupcake',
                    'goto vanilla cupcakes',
                    'goto vanilla cupcake',
                    'vanilla cupcakes',
                    'vanilla cupcake'
                ]
            },
            {
                url: 'view-go-to/chocolate',
                array: [
                    'go to chocolate cupcakes',
                    'go to chocolate cupcake',
                    'goto chocolate cupcakes',
                    'goto chocolate cupcake',
                    'chocolate cupcakes',
                    'chocolate cupcake'
                ]
            },
            {
                url: 'view-go-to',
                array: [
                    'go to cupcake',
                    'go to cupcakes',
                    'goto cupcake',
                    'goto cupcakes',
                    'go to cups',
                    'go to cup',
                    'goto',
                    'go to'
                ]
            },
            {
                url: 'view-american',
                array: [
                    'great american cupcake over',
                    'great american cupcake',
                    'american',
                    'cupcake over'
                ]
            },
            {
                url: 'view-frosting',
                array: [
                    'frosting guide',
                    'frosting'
                ]
            },
            {
                url: 'view-cover',
                array: [
                    'home',
                    'cover'
                ]
            }
        ];

        /**
         * reserved keywords for application
         */
        this.keywords = [
            {key: 'down'},
            {key: 'up'},
            {key: 'close', method: function () {
                AppEvent.trigger('close');
            }},
            {key: 'maximize', method: function () {
                AppEvent.trigger('maximize');
            }},
            {key: 'minimize', method: function () {
                AppEvent.trigger('minimize');
            }},
            {key: 'back', method: function () {
                AppEvent.trigger('back');
            }},
            {key: 'forward', method: function () {
                AppEvent.trigger('forward');
            }},
            {key: 'next', method: function () {
                AppEvent.trigger('next');
            }},
            {key: 'previous', method: function () {
                AppEvent.trigger('previous');
            }},
            {key: 'menu', method: function () {
                AppEvent.trigger('menu');
            }},
            {key: 'recipe', method: function () {
                var recipeBtn,
                    recipe;

                recipeBtn = $('.in').find('.recipe-btn');

                if (recipeBtn) {
                    recipe = recipeBtn.data('recipe');
                    AppEvent.trigger('recipe', recipe);
                }
            }},
            {key: 'video'},
            {key: 'tip'},
            {key: 'timer', method: function () {
                AppEvent.trigger('timer');
            }},
            {key: 'fullscreen', method: function () {
                var request = document.body.requestFullScreen || document.body.webkitRequestFullScreen || document.body.mozRequestFullScreen,
                    cancel = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen,
                    isfull = document.fullScreen || document.webkitIsFullScreen || document.mozfullScreen;

                if (isfull === true) {
                    cancel();
                } else {
                    request();
                }
            }}
        ];
		
		this.init = function () {
            if (window.location.protocol !== 'https:') {
                console.error('SPEECH RECOGNITION NOT SUPPORTED', window.location.protocol == 'https:');
                return;
            }

			if ('webkitSpeechRecognition' in window) {
                this.$icon = $('#speech-btn');
                this.$bubble = $('#speech-bubble');
                this.$label = $('#speech-label');

                this.$icon.addClass('in');

                AppEvent.on('speech', this.toggle.bind(this));
			} else {
				console.error('SPEECH RECOGNITION NOT SUPPORTED', 'webkitSpeechRecognition' in window);
			}
		};

        this.toggle = function () {
            if (this.listening !== true) {
                this.start();
            } else {
                this.stop();
            }
        };
		
        /**
         * start voice recognition
         */
		this.start = function () {
			this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;

            this.recognition.addEventListener('result', this.handle_recognition_RESULT.bind(this));
            this.recognition.addEventListener('error', this.handle_recognition_ERROR.bind(this));
            this.recognition.addEventListener('end', this.handle_recognition_END.bind(this));
            this.recognition.addEventListener('start', this.handle_recognition_START.bind(this));
			
            this.recognition.start();

            this.listening = true;
		};

        this.stop = function () {
            this.recognition.removeEventListener('result');
            this.recognition.removeEventListener('error');
            this.recognition.removeEventListener('end');
            this.recognition.removeEventListener('start');

            this.recognition.stop();
            this.recognition = null;
                
            this.$label.html('OFF');
            this.$icon.removeClass('active');
            this.$bubble.removeClass('in');

            this.listening = false;
        };

        /**
         * voice recognition result event
         */
        this.handle_recognition_RESULT = function (e) {
            var interim_transcript = '',
                transcript,
                i = 0,
                keyword,
                url;

            for (i = e.resultIndex; i < e.results.length; i += 1) {
                transcript = e.results[i][0].transcript;

                if (e.results[i].isFinal) {
                    this.final_transcript += transcript;
                } else {
                    interim_transcript += transcript;
                }
            }

            this.$bubble.html(interim_transcript);

            if (this.final_transcript !== '') {
                
                keyword = this.queryKeyword(this.final_transcript);

                if (keyword !== false) {
                
                    keyword();
                    
                } else {
                    url = this.queryResult(this.final_transcript);
                    this.$bubble.html(this.final_transcript);
                    
                    if (url) {
                        this.$bubble.addClass('good');
                        AppEvent.trigger('navigate', url);
                    } else {
                        this.$bubble.addClass('bad');
                    }
                }
                    
                this.recognition.stop();
            }
        };

        this.handle_recognition_ERROR = function (e) {
			console.error('SPEECH RECOGNITION ERROR', e);
        };
        
        this.handle_recognition_START = function () {
            console.log('RECOGNITION: start');

			this.final_transcript = '';
            
            this.$label.html('ON');
            this.$icon.addClass('active');

            this.$bubble.addClass('in');
            this.$bubble.removeClass('bad');
            this.$bubble.removeClass('good');
            this.$bubble.html('...');
        };

        this.handle_recognition_END = function () {
            console.log('RECOGNITION: end');

            this.$bubble.removeClass('in');
            this.$icon.removeClass('active');
            this.$label.html('OFF');
            this.$bubble.html('...');

			this.recognition.start();
        };

        this.queryKeyword = function (result) {
            var i;

            result = result.toLowerCase();

            for (i = 0; i < this.keywords.length; i += 1) {
                if (this.keywords[i].key == result) {
                    return this.keywords[i].method;
                }
            }

            return false;
        };

        /**
         * query result against map
         */
        this.queryResult = function (result) {
            var i,
                j,
                map;

            result = result.toLowerCase();

            for (i = 0; i < this.map.length; i += 1) {
                map = this.map[i];

                for (j = 0; j < map.array.length; j += 1) {
                    if (map.array[j] == result) {
                        console.log('FOUND', map.url);
                        return map.url;
                    }
                }
            }

            console.log('NOT FOUND', result);
            return false;
        };
		
	};
		
	return new SpeechCommand();
});
