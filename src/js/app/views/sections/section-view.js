/*global define THREE $ TweenMax*/
define([], function (require) {
	
	var Backbone = require('backbone'),
		Vars = require('app/models/vars'),
		UserEvent = require('app/events/user-event'),
		AppEvent = require('app/events/app-event'),
		View;
	
	require('tweenmax');

	View = Backbone.View.extend({

		initialize: function () {			
		
		},
		
		start: function () {
            AppEvent.trigger('hidenav');
		},
		
		handle_MOUSE_MOVE: function (e) {

		},
		
		animate: function () {

		},
		
		render: function () {

		},
		
		resize: function () {

		},
		
		stop: function () {

		},
		
		destroy: function () {
			
		}
	});
		
	return View;
});
