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
            this.$el = $('#view-american');

            this.listItems = this.$el.find('.american-item');
            this.listItems.bind('click', this.handle_listItem_CLICK.bind(this));
		},

        handle_listItem_CLICK: function (e) {
            var listItem = $(e.target);

            e.preventDefault();

            AppEvent.trigger('navigate', 'view-american/' + listItem.data('url'));
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
