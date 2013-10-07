/*global define*/
define([], 
	function (require) {
		
	var Backbone = require('backbone'),
		Vars = require('app/models/vars'),
		Asset = require('app/models/asset'),
		AssetList;
	
	AssetList = Backbone.Collection.extend({
		model: Asset,
		
		initialize: function () {
			var i;
			
			this.loaded = 0;
			
			this.models = [
				new Asset({name: "linen-texture", url: "assets/images/textures/fabric_bg.jpg", type: "img"}),
				new Asset({name: "white-cupcake", url: "assets/images/section-1/white_cupcake.png", type: "img"}),
				new Asset({name: "nav-item-cupcake", url: "assets/images/nav-item/cupcake.png", type: "img"}),
				new Asset({name: "nav-item-frosting", url: "assets/images/nav-item/frosting.png", type: "img"}),
				new Asset({name: "black-cupcake", url: "assets/images/section-1/black_cupcake.png", type: "img"}),
				new Asset({name: "cover-cupcake", url: "assets/images/cover/SunnyAnderson_ChocolateCupcake_BlackForestCupcake.png", type: "img"}),
				new Asset({name: "cover-mask", url: "assets/images/cover/SunnyAnderson_ChocolateCupcake_BlackForestCupcake_mask.png", type: "img"})
			];

		},
		
		load: function (callback) {
			var i,
				asset,
				img;
			
			this.handle_load_COMPLETE = callback;
			
			for (i = 0; i < this.size(); i += 1) {
				asset = this.at(i);
				asset.set('id', i);

				if (asset.get('type') == 'img') {
					img = new Image();
					img.src = asset.get('url');
					img.addEventListener('load', this.handle_img_LOAD.bind(this));
					asset.set('object', img);
					
                    console.log("LOAD::", asset.get('url'));
				}
			}

		},
		
		handle_img_LOAD: function () {
			this.loaded += 1;
            console.log("LOADED");
			
			if (this.loaded == this.size()) {
				this.handle_load_COMPLETE();
			}
		},
		
		empty: function () {
			this.loaded = 0;
		}
	});
	
	return new AssetList();
});
