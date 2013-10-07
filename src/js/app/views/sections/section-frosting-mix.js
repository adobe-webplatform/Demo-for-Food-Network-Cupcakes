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
            this.$el = $('#view-frosting_mix-ins');

            this.listItems = this.$el.find('.frosting-mix-item');
            this.listItems.bind('click', this.handle_listItem_CLICK.bind(this));

            this.slideHolder = $('#frosting-mix-in-slides');
            this.slideHolder[0].addEventListener('webkitTransitionEnd', this.handle_listItem_TRANSITION_COMPLETE.bind(this));
            this.slides = this.$el.find('.frosting-mix-slide');

            $('#f-mix-slide-1').show();
		},

        handle_listItem_CLICK: function (e) {
            e.preventDefault();

            this.next = $(e.target).data('int');
            if (!this.next) {
                this.next = $(e.target).parent().data('int');
            }

            this.slideHolder.addClass('hide');
        },

        handle_listItem_TRANSITION_COMPLETE: function () {
            if (this.slideHolder.hasClass('hide')) {
                this.slides.hide();
                $('#f-mix-slide-' + this.next).show();
                this.slideHolder.removeClass('hide');
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
