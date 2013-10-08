/*global require Modernizr $*/
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

require.config({
    shim: {

    },

    paths: {
	    tweenmax: 'vendor/greensock/TweenMax',
	    three: 'vendor/threejs/build/three',
        jquery: 'vendor/jquery/jquery',
        balance: 'vendor/jquery.balancetext',
        underscore: 'vendor/underscore-amd/underscore',
	    backbone: 'vendor/backbone-amd/backbone',
        leap: 'vendor/leap.min',
        raf: 'vendor/RequestAnimationFrame'
    }
});


require(['app', 'jquery'], function (app) {

    if (!regionsSupported()) {
        return;
    }

    var $preloader = $('#preloader');
    $preloader.bind('webkitTransitionEnd', function () {
        $preloader.hide();
    });
    $preloader.addClass('out');

    Modernizr.addTest('backgroundclip', function () {
        var div = document.createElement('div');

        if ('backgroundClip' in div.style) {
            return true;
        }

        'Webkit Moz O ms Khtml'.replace(/([A-Za-z]*)/g, function (val) { 
            if (val + 'BackgroundClip' in div.style) {
                return true;
            }
        });

    });

    //specific device stuff
    if (navigator.userAgent.match(/iPad/i) !== null) {
        $('html').addClass('ipad');
    }

	app.load();
});
