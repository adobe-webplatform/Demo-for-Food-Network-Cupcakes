/*global define THREE $ TweenMax Quad*/
define([], function (require) {

	var Backbone = require('backbone'),
		Vars = require('app/models/vars'),
		UserEvent = require('app/events/user-event'),
		AppEvent = require('app/events/app-event'),
		TimerView = require('app/views/timer-view'),
		SlideView = require('app/views/recipe-slide-view'),
        RecipeQuantityView = require('app/views/recipe-quantity-view'),
		RecipeView;
	
	require('tweenmax');

	RecipeView = Backbone.View.extend({

		initialize: function () {	
			this.$el = $('#recipe');
			this.$content = $('#recipe-content');
            this.visible = false;
			this.timer = new TimerView();
		},

        start: function (template) {
            this.$content.html(template);
            this.$el.show();
            this.timer.determineBakeTime();
			this.$slideBtn = $('#slide-btn-view');

            this.$slideBtn.bind('click', this.handle_slideBtn_CLICK.bind(this));
            AppEvent.on('maximize', this.maximize.bind(this));

            setTimeout(function () { //ensure content is added
                this.quantityUI = new RecipeQuantityView();
            }, 10);
        },

        show: function (template) {
            if (this.visible === false) {
                this.start(template);
                this.$el.addClass('in');
                this.visible = true;
            }
        },

        animIn: function (template) {
            if (this.visible === false) {
                this.start(template);
                setTimeout(function () {
                    this.$el.addClass('in');
                }.bind(this), 10);
                
                this.visible = true;
            }
        },

        hide: function () {
            if (this.visible === true) {
                this.$el.removeClass('in');
                this.$el.hide();
                this.visible = false;
                this.$content.scrollTop(0);
            }
        },

        animOut: function () {
            if (this.visible === true) {
                this.$el.removeClass('in');
                this.visible = false;
                this.$content.scrollTop(0);
            }
        },

        maximize: function () {
            $('#close-btn').removeClass('in');
            this.slides = new SlideView();
            this.$content.append(this.slides.el);
        },

        handle_slideBtn_CLICK: function (e) {
            e.preventDefault();
            this.maximize();
        }

	});
		
	return RecipeView;
});
