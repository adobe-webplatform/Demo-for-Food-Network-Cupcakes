/*global define THREE $ TweenMax*/
define([], function (require) {

	var Backbone = require('backbone'),
		Vars = require('app/models/vars'),
		AssetList = require('app/collections/asset-list'),
		UserEvent = require('app/events/user-event'),
		AppEvent = require('app/events/app-event'),
		NavButtonView;
	
	require('tweenmax');

	NavButtonView = Backbone.View.extend({

		initialize: function () {			
			this.$el = $('<div id="nav-button-container">');
			
            this.addNavButton();
            this.addNavSubButton();
		},

        addNavSubButton: function () {
            this.$navSubButton = $('<div id="nav-sub-button">');
			
			this.$el.append(this.$navSubButton);
        },

        addNavButton: function () {
            this.$navButton = $('<div id="nav-button">');
			
            this.title = this.options.title;
			this.name = this.options.name;
			this.color = this.options.color;

			this.titleString = '<span>' + this.options.title.replace(/ /g, '</span> <span>') + '</span>';
			this.$title = $('<span class="nav-button-title">');
			this.$title.html(this.titleString);

			this.$navButton.bind('click', this.click.bind(this));
			
			this.$navButton.append(this.$title);
			this.$el.append(this.$navButton);
        },

		click: function () {
			AppEvent.trigger('togglenav');
		},
		
		mouseover: function () {
		
        },
		
		mouseout: function () {
		
        },
		
		render: function () {
						
		},

		resize: function () {

		}	
    });

	return NavButtonView;
});
