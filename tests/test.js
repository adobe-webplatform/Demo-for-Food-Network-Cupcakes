/*global require*/
require.config({
	baseUrl: '../src/js/',
	
    shim: {
    
	},

    paths: {
	    tweenmax: 'vendor/greensock/TweenMax',
	    three: 'vendor/threejs/build/three',
        jquery: 'vendor/jquery/jquery',
        underscore: 'vendor/underscore-amd/underscore',
	    backbone: 'vendor/backbone-amd/backbone',
		balance: 'vendor/jquery.balancetext',
	    d3: 'vendor/d3/d3',
	    grid: 'vendor/grid-layout-polyfill',
        raf: 'vendor/RequestAnimationFrame',
		leap: 'vendor/leap.min'
    }
});

require(['app'], function (app) {
	
	var BgView = require('app/views/bg-view'),
		Vars = require('app/models/vars'),
		AssetList = require('app/collections/asset-list'),
		SpeechCommand = require('app/views/components/speech-command'),
		Recipes = require('app/collections/recipes'),
        RecipeTemplate = require('text!templates/recipe-template.html'),
		TimerView = require('app/views/timer-view'),
		RecipeQuantityView = require('app/views/recipe-quantity-view');
	
	require('balance');
	
	AssetList.load(function () {});
	app.start();
	
	test( "hello test", function() {
		ok( 1 == "1", "Passed!" );
	});
	
	//bg transitions
	test( "bg test", function () {
		var bg = new BgView();
		var goto = 1;
		var transition = Vars.get('pages').findWhere({id: goto}).get('transition');

		equal(bg.currentTransition, 0, 'bg first currentTransition is 0');
		
		bg.goto(goto);
		equal(bg.nextTransition, transition, 'bg goto nextTransition matches');
	});
	
	test('timer', function () {
		var timer = new TimerView();
		
		timer.reset();
		equal(timer.running, false, 'timer is initially stopped');

		timer.start();
		equal(timer.running, true, 'timer start works');
		
		timer.pause();
		equal(timer.running, false, 'timer pause works');
		
		timer.reset();
		equal(timer.running, false, 'timer reset stops running');
		
		equal(timer.parseTime(30), '00:00:30', '30 seconds');
		equal(timer.parseTime(60), '00:01:00', '1 minute');
		equal(timer.parseTime(90), '00:01:30', '1 minute 30 seconds');
		equal(timer.parseTime(120), '00:02:00', '2 minutes');
		equal(timer.parseTime(3600), '01:00:00', '1 hour');
		equal(timer.parseTime(5400), '01:30:00', '1 hour 30 minutes');
		equal(timer.parseTime(7200), '02:00:00', '2 hours');

	});
	
	//preloader
	asyncTest("preloader", function () {
		AssetList.empty();
		AssetList.load(function () {
			equal(AssetList.loaded, AssetList.size(), 'assets loaded');
			start();
		});
	});
	
	//transition test
	asyncTest( "transition anim callbacks", function() {
		var bg = new BgView();
		
		bg.transitions[0].animIn(function () {
			ok( true, "animIn callback works" );
			start();
		});
	});
	
	//bg test
	asyncTest( "bg goto", function() {
		var bg = new BgView();
		var goto = 1;
		var transition = Vars.get('pages').findWhere({id: goto}).get('transition');
		
		equal(bg.currentTransition, 0, 'bg first currentTransition is 0');

		bg.goto(goto);
		setTimeout(function() {
			equal(bg.currentTransition, transition, 'currentTransition updates');
		    start();
		}, 1001);	
	});
	
	//test for audio api
	test('speech command', function () {
		equal(SpeechCommand.queryResult('asdf'), false, 'query not found');
		equal(SpeechCommand.queryResult('go to cupcakes'), 'view-go-to', 'query found');
	});
	
	//test for templates
	test('recipe templates', function () {
		var template = _.template(RecipeTemplate),
			compiled = template({recipe: Recipes.models[0].toJSON()});
		
		equal(compiled, Recipes.getTemplate(Recipes.models[0].get('id')), 'templates match');
	});
	
	//navigate
	test("navigate", function() {
		app.navigate('view-go-to');
		equal(app.first, false, 'is not initial view');	
		equal(app.currentPage, 1, 'navigate updates view');	
		
		app.navigate('view-cover');
		equal(app.first, false, 'is not initial view');	
		equal(app.currentPage, 0, 'navigate updates view');	
	});
	
	test("navigate recipe", function () {
		
		app.recipe('chocolate-cupcake');
		equal(app.recipeView.visible, true, 'navigate to recipe works');
		app.navigate('view-go-to/chocolate');
		equal(app.recipeView.visible, false, 'navigate from recipe works');
	});
	
	test('fraction to decimial', function () {
		var qv = new RecipeQuantityView();
		equal(qv.fractionToDecimal('&frac12;'), 0.5, 'converts 1/2');
		equal(qv.fractionToDecimal('&frac34;'), 0.75, 'converts 3/4');
		equal(qv.fractionToDecimal('1&frac12;'), 1.5, 'converts 1 1/2');
		equal(qv.fractionToDecimal('2¾'), 2.75, 'converts 2¾');

	});
	
	test('decimal to fraction', function () {
		var qv = new RecipeQuantityView();

		equal(qv.decimalToFraction(0.25), '&frac14;', 'converts 0.25');
		equal(qv.decimalToFraction(0.5), '&frac12;', 'converts 0.5');
		equal(qv.decimalToFraction(0.75), '&frac34;', 'converts 0.75');
		equal(qv.decimalToFraction(1.5), '1&frac12;', 'converts 1.5');
		equal(qv.decimalToFraction(4.25), '4&frac14;', 'converts 4.25');

	});
});
