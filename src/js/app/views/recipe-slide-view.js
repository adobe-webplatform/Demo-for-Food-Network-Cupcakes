/*global define THREE $ TweenMax Quad*/
define([], function (require) {
	
	var Backbone = require('backbone'),
		Vars = require('app/models/vars'),
		UserEvent = require('app/events/user-event'),
		AppEvent = require('app/events/app-event'),
		RecipeSlideView;
	
	require('tweenmax');

	RecipeSlideView = Backbone.View.extend({

		initialize: function () {

            if (document.getElementById('recipe-slide-container')) {
                return;
            }

            this.el = document.createElement('div');
            this.el.id = 'recipe-slide-container';
            this.el.className = 'recipe-slide-container';

            this.currentSlide = 0;
            this.slides = [];

			UserEvent.on('keydown', this.keydown.bind(this));
			AppEvent.on('next', this.next.bind(this));
			AppEvent.on('previous', this.previous.bind(this));
			AppEvent.on('minimize', this.close.bind(this));

            $('.recipe-directions').addClass('flow');
            this.namedFlow = document.webkitGetNamedFlows().namedItem('recipeFlow');

            $('#recipe').removeClass('scrollable');

            if (this.namedFlow.overset === true) {
                this.addSlide();
            }
            
		},

        addUI: function () {
            var ui,
                title;

            ui = document.createElement('div');
            ui.id = 'recipe-slide-ui';
            this.el.appendChild(ui);

            title = document.createElement('div');
            title.id = 'recipe-slide-title';
            title.className = 'red';
            title.innerHTML = $('#recipe-content h5').html();
            ui.appendChild(title);

            this.state = document.createElement('div');
            this.state.id = 'recipe-slide-state';
            this.state.innerHTML = (this.currentSlide + 1) + '/' + this.slides.length;
            ui.appendChild(this.state);

            this.closeBtn = document.createElement('div');
            this.closeBtn.id = 'recipe-slide-close';
            this.closeBtn.addEventListener('click', this.handle_slideClose_CLICK.bind(this));
            ui.appendChild(this.closeBtn);

            this.nextBtn = document.createElement('div');
            this.nextBtn.id = 'recipe-slide-next';
            this.nextBtn.className = 'recipe-slide-nav';
            this.nextBtn.addEventListener('click', this.next.bind(this));
            ui.appendChild(this.nextBtn);

            this.prevBtn = document.createElement('div');
            this.prevBtn.id = 'recipe-slide-prev';
            this.prevBtn.className = 'recipe-slide-nav';
            this.prevBtn.addEventListener('click', this.previous.bind(this));
            ui.appendChild(this.prevBtn);

            this.updateBtns();
            this.updateTransitions();
        },

        addSlide: function () {
            var slide = document.createElement('div'),
                card = document.createElement('div');

            slide.className = 'recipe-slide';
            card.className = 'recipe-slide-card';

            slide.appendChild(card);
            this.el.appendChild(slide);
            this.slides.push(slide);

            //check to add more
            setTimeout(function () {
                if (this.namedFlow.overset === true && this.slides.length < 20) {
                    this.addSlide();
                } else {
                    this.slidesAdded();
                }
            }.bind(this), 10);
        },

        slidesAdded: function () {
            $(this.slides[this.currentSlide]).addClass('in');
            this.addUI();
        },

        keydown: function (e) {
            switch (e.keyCode) {
            case 39:
                this.next();
                break;
            case 37:
                this.previous();
                break;
            }
        },

        next: function () {
            if (this.currentSlide < this.slides.length - 1) {
                this.currentSlide += 1;
                this.update();
            }
        },

        previous: function () {
            if (this.currentSlide > 0) {
                this.currentSlide -= 1;
                this.update();
            }
        },

        close: function () {
            $('#close-btn').addClass('in');
            $('#recipe-slide-container').remove();
            this.destroy();
        },

        updateBtns: function () {
            if (this.slides.length < 2) {
                this.nextBtn.style.display = 'none';
                this.prevBtn.style.display = 'none';
            } else if (this.currentSlide == this.slides.length - 1) {
                this.nextBtn.style.display = 'none';
                this.prevBtn.style.display = 'block';
            } else if (this.currentSlide === 0) {
                this.prevBtn.style.display = 'none';
                this.nextBtn.style.display = 'block';
            } else {
                this.nextBtn.style.display = 'block';
                this.prevBtn.style.display = 'block';
            }
        },

        updateTransitions: function () {
            var instance = this;
            
            $('.recipe-slide').removeClass('left');
            $('.recipe-slide').removeClass('right');

            $(this.slides).each(function (i) {
                if (i < instance.currentSlide) {
                    $(this).addClass('left');
                } else {
                    $(this).addClass('right');
                }
            });
        },

        update: function () {
            this.updateBtns();
            this.state.innerHTML = (this.currentSlide + 1) + '/' + this.slides.length;
            
            this.updateTransitions();

            $('.recipe-slide').removeClass('in');
            $(this.slides[this.currentSlide]).addClass('in');
        },

        handle_slideClose_CLICK: function (e) {
            e.preventDefault();
            this.close();
        },

		resize: function () {
			
		},

        destroy: function () {
            $('#recipe').addClass('scrollable');
            AppEvent.off('next', this.next);
			AppEvent.off('previous', this.previous);
			UserEvent.off('keydown', this.keydown);
            $('.recipe-directions').removeClass('flow');
        }
	});
		
	return RecipeSlideView;
});
