/*global define THREE $ TweenMax*/
define([], function (require) {
	
	var Backbone = require('backbone'),
		Vars = require('app/models/vars'),
		UserEvent = require('app/events/user-event'),
		AppEvent = require('app/events/app-event'),
		ToggleView;
	
	require('tweenmax');

	ToggleView = Backbone.View.extend({

		initialize: function () {	
		    this.el = this.options.el;

            this.$sections = this.$el.find('.container-toggle-section');
            this.sections = [];
            this.$sections.each(this.addSection.bind(this));
            $(this.sections[0]).show();

            this.$el.find('.list-toggle-button').each(this.addButton.bind(this));
        },

        addSection: function (index, value) {
            $(value).hide();
            this.sections.push(value);
        },

        addButton: function (index, value) {
            $(value).data('id', index);
            value.addEventListener('click', this.handle_button_CLICK.bind(this));
        },

        handle_button_CLICK: function (e) {

            var number = $(e.target).data('id'),
                section = this.sections[number];

            this.$sections.hide();
            $(section).show();
        },

		render: function () {
			
		},
		
		resize: function () {
			
		}
	});
		
	return ToggleView;
});
