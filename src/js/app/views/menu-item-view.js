/*global define THREE $ TweenMax*/
define([], function (require) {

	var Backbone = require('backbone'),
		Vars = require('app/models/vars'),
		AssetList = require('app/collections/asset-list'),
		UserEvent = require('app/events/user-event'),
		AppEvent = require('app/events/app-event'),
		NavItemView;
	
	require('tweenmax');

	NavItemView = Backbone.View.extend({

		initialize: function () {			
			this.$el = $('<div class="menu-item">');
			
			this.title = this.options.title;
			this.name = this.options.name;
			this.color = this.options.color;

			this.titleString = '<span>' + this.options.title.replace(/ /g, '</span> <span>') + '</span>';
			this.$title = $('<span class="menu-item-title">');
			this.$title.html(this.titleString);

			this.$el.bind('click', this.click.bind(this));
			this.$el.bind('mouseover', this.mouseover.bind(this));
			this.$el.bind('mouseout', this.mouseout.bind(this));
			this.$el.bind('touchstart', this.mouseover.bind(this));
			this.$el.bind('touchend', this.mouseout.bind(this));
			
            this.$el.attr('id', 'menu-item-' + this.name);
            this.$el.css({'background-color': this.color});

			this.$el.append(this.$title);
			
			this.render();
		},

        setPosition: function (pos) {
            this.$el.css('left', pos);
        },

		click: function () {
			AppEvent.trigger('navigate', this.name);
		},
		
		mouseover: function (e) {
            e.stopPropagation();
            this.$el.css('background-color', '#fffabf');
            this.$title.css('color', '#858264');
		},
		
		mouseout: function (e) {
            e.stopPropagation();
            this.$el.css('background-color', this.color);
            this.$title.css('color', '#ffffff');
		},
		
		render: function () {
						
		},

		resize: function () {

		}	
    });

	return NavItemView;
});
