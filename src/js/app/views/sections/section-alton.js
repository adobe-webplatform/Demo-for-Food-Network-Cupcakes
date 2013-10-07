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
            this.$el = $('#view-frosting_alton');

            this.listItems = this.$el.find('.alton-item');
            this.listItems.bind('click', this.handle_listItem_CLICK.bind(this));
		},

        handle_listItem_CLICK: function (e) {
            var listItem = $(e.target),
                url = listItem.data('url');

            e.preventDefault();

            if (url.indexOf('recipe') > -1) {
                url = url.substring(url.indexOf('/') + 1);
                AppEvent.trigger('recipe', url);
            } else {
                AppEvent.trigger('navigate', 'view-frosting/' + url);
            }
        },

        start: function () {
            AppEvent.trigger('hidenav');
        },

        stop: function () {

        },
		
		render: function () {
		
        },
		
		resize: function () {

		},
		
		destroy: function () {
			
		}
	});
		
	return View;
});
