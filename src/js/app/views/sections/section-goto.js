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
            this.$el = $('#view-go-to');

            this.listItems = this.$el.find('li');
            this.listItems.bind('click', this.handle_listItem_CLICK.bind(this));
		},

        handle_listItem_CLICK: function (e) {
            var listItem = $(e.target);

            AppEvent.trigger('navigate', 'view-go-to/' + listItem.data('url'));
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
