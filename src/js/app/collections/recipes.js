/*global define _*/
define([], function (require) {
    var Backbone = require('backbone'),
        Recipe = require('app/models/recipe'),
        RecipeTemplate = require('text!templates/recipe-template.html'),
        Recipes;

	Recipes = Backbone.Collection.extend({
		model: Recipe,

        initialize: function () {
            var i,
                template,
                obj;

            this.models = [
                new Recipe({
                    id: 'vanilla-cupcake',
                    section: 'go-to',
                    title: 'GO-TO VANILLA CUPCAKES',
                    makes: {amt: '12 cupcakes', alt: 'or about 40 mini cupcakes'},
                    time: {active: '25 min', total: '1 hr 55 min'},
                    ingredients: [
                        {amt: '1&frac12;', desc: 'cups all-purpose flour'},
                        {amt: '1&frac12;', desc: 'teaspoons baking powder'},
                        {amt: '&frac14;', desc: 'teaspoon fine salt'},
                        {amt: '2', desc: 'large eggs, at room temperature'},
                        {amt: '&frac23;', desc: 'cup sugar'},
                        {amt: '1&frac12;', desc: 'sticks (6 ounces) unsalted butter, melted'},
                        {amt: '2', desc: 'teaspoons pure vanilla extract'},
                        {amt: '1', desc: 'cup milk'}
                    ],
                    directions: '<p>Preheat the oven to 350ºF and position a rack in the middle of the oven. Line one 12-cup standard muffin tin or two 24-cup mini-muffin tins with cupcake liners.</p><p>Whisk the flour, baking powder and salt together in a medium bowl.</p><p>In another medium bowl, beat the eggs and sugar with an electric mixer until light and foamy, about 2 minutes. While beating, gradually pour in the butter and then the vanilla.</p><p>While mixing slowly, add half the dry ingredients. Then add all the milk and follow with the rest of the dry ingredients. Take care not to overmix the batter. Divide the batter evenly in the prepared tin.</p><p>Bake until a tester inserted in the center of the cakes comes out clean, rotating the tin about halfway through, 18 to 20 minutes (10 to 12 minutes for minis). Cool the cupcakes on a rack in the tin for 10 minutes, and then remove from the tin. Cool on the rack completely. Decorate as desired.</p>'
                }),

                new Recipe({
                    id: 'chocolate-cupcake',
                    section: 'go-to',
                    title: 'GO-TO CHOCOLATE CUPCAKES',
                    makes: {amt: '12 cupcakes', alt: 'or about 48 mini cupcakes'},
                    time: {active: '30 min', total: '2 hrs'},
                    ingredients: [
                        {amt: '6', desc: 'tablespoons unsalted butter, cut into pieces'},
                        {amt: '&frac12;', desc: 'cup unsweetened Dutch-processed cocoa'},
                        {amt: '&frac13;', desc: 'cup freshly brewed coffee'},
                        {amt: '1', desc: 'cup all-purpose flour'},
                        {amt: '1', desc: 'cup sugar'},
                        {amt: '&frac12;', desc: 'teaspoon baking powder'},
                        {amt: '&frac12;', desc: 'teaspoon baking soda'},
                        {amt: '&frac12;', desc: 'teaspoon fine salt'},
                        {amt: '&frac13;', desc: 'cup sour cream'},
                        {amt: '1', desc: 'teaspoon pure vanilla extract'},
                        {amt: '2', desc: 'large eggs, at room temperature'}
                    ],
                    directions: "<p>Preheat the oven to 350&deg;F and position a rack in the middle of the oven. Line one 12-cup standard muffin tin or two 24-cup mini-muffin tins with cupcake liners.</p><p>Combine the butter, cocoa, coffee and &frac13; cup water in a microwave-safe bowl. Cover with plastic wrap and microwave on high until the butter melts, about 1 minute. Whisk to combine.</p><p>Meanwhile, whisk the flour, sugar, baking powder, baking soda and salt in a large bowl. Beat the sour cream, vanilla and eggs in a small bowl. Whisk the hot cocoa mixture into the dry ingredients. Stir in the sour cream mixture just to combine (don’t overmix).</p><p>Divide the batter evenly in the prepared muffin tin, filling about three-quarters of the way full. Bake until a toothpick inserted in the center of the cakes comes out clean, 18 to 20 minutes (16 to 18 minutes for minis).</p><p>Cool the cupcakes on a rack in the tin for 10 minutes, and then remove from the tin. Cool on the rack completely. Decorate as desired.</p>"
                }),
            
                new Recipe({
                    id: 'v-buttercream',
                    section: 'go-to',
                    title: 'vanilla american buttercream frosting',
                    makes: {amt: '2 &frac34; cups', alt: 'enough for 12 cupcakes'},
                    time: {active: '20 min', total: '20 min'},
                    ingredients: [
                        {amt: '2', desc: 'sticks (8 ounces) unsalted butter, at room temperature'},
                        {amt: '4', desc: 'cups confectioners\' sugar (1-pound box)'},
                        {amt: '', desc: 'Pinch fine salt'},
                        {amt: '2', desc: 'teaspoons vanilla extract'},
                        {amt: '&frac12;', desc: 'tablespoons milk'}
                    ],
                    directions: "<p>Combine the butter, sugar and salt in the bowl of a stand mixer fitted with a paddle attachment (or in a large bowl if using a handheld electric mixer). Mix on low speed until mostly incorporated. Add the vanilla, increase the speed to medium-high and mix until smooth. Adjust the consistency with milk as desired. Use immediately, or refrigerate in an airtight container up to 3 days. Allow to come to room temperature and mix on medium-high until smooth.</p>"
                }),

                new Recipe({
                    id: 'c-buttercream',
                    section: 'go-to',
                    title: 'chocolate american buttercream frosting',
                    makes: {amt: '2 cups', alt: 'enough for 12 cupcakes'},
                    time: {active: '15 min', total: '15 min'},
                    ingredients: [
                        {amt: '6', desc: 'tablespoons unsalted butter, melted'},
                        {amt: '&frac34;', desc: 'cup cocoa powder'},
                        {amt: '1&frac12;', desc: 'teaspoons vanilla extract'},
                        {amt: '', desc: 'Pinch fine salt'},
                        {amt: '4', desc: 'cups confectioners\' sugar (1-pound box)'},
                        {amt: '6', desc: 'tablespoons milk'}
                    ],
                    directions: "<p>Combine the butter and cocoa powder in the bowl of a stand mixer fitted with a paddle attachment (or in a large bowl if using a handheld electric mixer). Mix on low speed until combined. Add the vanilla and salt. Continue to mix on low speed, adding the sugar a cup at a time and alternating with additions of the milk. Increase the speed to medium-high and mix until smooth. Use immediately, or refrigerate in an airtight container up to 3 days. Allow to come to room temperature and mix on medium-high until smooth.</p>"
                }),

                new Recipe({
                    id: 'marbling',
                    section: 'go-to',
                    title: 'go-to marble cupcakes',
                    makes: {amt: '12 cupcakes', alt: ''},
                    time: {active: '25 min', total: '1 hr 55 min'},
                    ingredients: [
                        {amt: '1&frac12;', desc: 'cups all-purpose flour'},
                        {amt: '1&frac12;', desc: 'teaspoons baking powder'},
                        {amt: '&frac14;', desc: 'teaspoon fine salt'},
                        {amt: '2', desc: 'large eggs, at room temperature'},
                        {amt: '&frac23;', desc: 'cup sugar'},
                        {amt: '1&frac12;', desc: 'sticks (6 ounces) unsalted butter, melted'},
                        {amt: '2', desc: 'teaspoons pure vanilla extract'},
                        {amt: '&frac12;', desc: 'cup milk'},
                        {amt: '2', desc: 'tablespoons cocoa powder'}
                    ],
                    directions: "<p>Preheat the oven to 350ºF and position a rack in the middle of the oven. Line one 12-cup standard muffin tin with cupcake liners.</p><p>Whisk the flour, baking powder and salt together in a medium bowl.</p><p>In another medium bowl, beat the eggs and sugar with an electric mixer until light and foamy, about 2 minutes. While beating, gradually pour in the butter and then the vanilla.</p><p>While mixing slowly, add half the dry ingredients. Then add all the milk and follow with the rest of the dry ingredients. Take care not to overmix the batter.</p><p>Remove one-third of the batter (about 1 cup) and stir in the cocoa powder. Fill the liners evenly with yellow and chocolate batter, according to the marbling method you are following. </p><p>Bake until a tester inserted in the center of the cakes comes out clean, 18 to 20 minutes. Cool the cupcakes on a rack in the tin for 10 minutes, and then remove from the tin. Cool on the rack completely. Decorate as desired.</p>"
                }),

                new Recipe({
                    id: 'boston-cream',
                    section: 'american',
                    title: 'Boston Cream pie Cupcakes',
                    makes: {amt: '24 cupcakes', alt: ''},
                    time: {active: '20 min', total: '1 hr 35 min'},
                    ingredients: [
                        {amt: '3', desc: 'cups cold whole milk'},
                        {amt: '2', desc: '3.4-ounce boxes vanilla instant pudding and pie filling mix'},
                        {amt: '2', desc: 'tablespoons pure vanilla extract'},
                        {amt: '24', desc: 'pre-made cupcakes baked from a cake mix'},
                        {amt: '1', desc: 'cup heavy cream'},
                        {amt: '1', desc: '12-ounce package semisweet chocolate morsels'}
                    ],
                    directions: "<p>Combine the milk, instant pudding mix and vanilla in a large bowl. Beat the mixture with a hand mixer until it thickens, about 2 minutes. Place the mixture in the refrigerator for 15 minutes. </p><p>Remove the liners from the cupcakes and cut the tops off. Spread about 2 tablespoons of the pudding mix on the bottoms and then set the tops back on.</p><p>Heat the cream in a small, heavy saucepan over medium heat until bubbles appear around the edges. Remove from the heat, add the chocolate morsels to the pan and whisk until smooth. </p><p>Spoon or drizzle the glaze over the cupcakes.</p>"
                }),

                new Recipe({
                    id: 'brownie',
                    section: 'american',
                    title: 'Brownie Cupcakes Á LA MODE',
                    makes: {amt: '12 cupcakes', alt: ''},
                    time: {active: '20 min', total: '1 hr 50 min'},
                    ingredients: [
                        {amt: '1&frac12;', desc: 'sticks (5 ounces) unsalted butter, softened and cut into pieces'},
                        {amt: '&frac14;', desc: 'cup unsweetened cocoa powder'},
                        {amt: '3', desc: 'ounces unsweetened chocolate, finely chopped'},
                        {amt: '&frac23;', desc: 'cup boiling water'},
                        {amt: '1&frac14;', desc: 'cups sugar'},
                        {amt: '1', desc: 'teaspoon vanilla extract'},
                        {amt: '2', desc: 'large eggs'},
                        {amt: '1', desc: 'cup all-purpose flour'},
                        {amt: '&frac12;', desc: 'teaspoon fine salt'},
                        {amt: '&frac12;', desc: 'teaspoon baking powder'},
                        {amt: '&frac14;', desc: 'teaspoon baking soda'},
                        {amt: '&frac12;', desc: 'cup finely chopped toasted walnuts'},
                        {amt: '&frac13;', desc: 'cup semisweet chocolate chips'},
                        {amt: '1', desc: 'pint vanilla ice cream'},
                        {amt: '&frac14;', desc: 'cup prepared hot fudge sauce'},
                        {amt: '2', desc: 'tablespoons rainbow colored sprinkles'},
                        {amt: '12', desc: 'jarred maraschino cherries with stems, drained and patted dry'}
                    ],
                    directions: "<p>Preheat the oven to 350ºF and line one 12-cup standard muffin tin with paper cupcake liners.</p><p>In a large bowl, combine the butter, cocoa powder and chocolate. Pour the boiling water over and let stand 5 minutes. Whisk until smooth, and then whisk in the sugar, vanilla and eggs. Whisk in the flour, salt, baking powder and baking soda until just combined. Fold in the walnuts and  chocolate chips. Divide the batter among the prepared liners so they are about three-quarters full.</p><p>Bake until a toothpick inserted into the center comes out with moist crumbs, 22 to 24 minutes. Cool in the tins 5 minutes, and then cool completely on a wire rack. </p><p>While the cupcakes bake and cool, scoop 12 small scoops of ice cream onto a large plate or baking sheet and place in the freezer until hard. </p><p>To assemble, scoop off a small piece of the cupcake to make a concave top, and then top each cupcake with a scoop of ice cream. Drizzle the ice cream with hot fudge, and top with some sprinkles and a cherry.</p>"
                }),

                new Recipe({
                    id: 'cheesecake',
                    section: 'american',
                    title: 'CHEESECAKE CUPCAKES',
                    makes: {amt: '24 cupcakes', alt: ''},
                    time: {active: '30 min', total: '2 hrs 10 min'},
                    ingredients: [
                        {amt: '1&frac12;', desc: 'cups graham cracker crumbs'},
                        {amt: '&frac14;', desc: 'cup granulated sugar'},
                        {amt: '&frac14;', desc: 'teaspoon ground cinnamon'},
                        {amt: '&frac13;', desc: 'cup (about 5 tablespoons) unsalted butter, melted'},
                        {amt: '2', desc: 'cups all-purpose flour'},
                        {amt: '1', desc: 'teaspoon baking powder'},
                        {amt: '&frac14;', desc: 'teaspoon baking soda'},
                        {amt: '', desc: 'Pinch fine sea salt'},
                        {amt: '1&frac12;', desc: 'sticks (6 ounces) unsalted butter, at room temperature'},
                        {amt: '1&frac12', desc: 'cups granulated sugar'},
                        {amt: '3', desc: 'large eggs'},
                        {amt: '1', desc: 'teaspoon vanilla extract'},
                        {amt: '&frac34;', desc: 'cup sour cream'},
                        {amt: '&frac12;', desc: 'cup milk'},
                        {amt: '8', desc: 'ounces cream cheese, at room temperature'},
                        {amt: '&frac13;', desc: 'cup granulated sugar'},
                        {amt: '1', desc: 'large egg'},
                        {amt: '3', desc: 'ounces cream cheese, at room temperature'},
                        {amt: '4', desc: 'tablespoons unsalted butter, at room temperature'},
                        {amt: '&frac13;', desc: 'cup sour cream'},
                        {amt: '&frac12;', desc: 'teaspoon lemon juice'},
                        {amt: '1&frac12;', desc: 'cups confectioners\' sugar'},
                        {amt: '', desc: 'Graham cracker pieces, for garnish'}
                    ],
                    directions: "<h6>For the crust</h6><p>Preheat the oven to 350ºF. Line two 12-cup standard muffin tins with paper liners.</p><p>Combine the graham cracker crumbs, granulated sugar, cinnamon and butter in a small bowl. Drop a heaping tablespoon of graham cracker mixture into each muffin cup. Press to create a firm layer of crust on the bottom. Bake 7 minutes. Set aside to cool completely.</p><h6>For the cupcakes:</h6><p>Combine the flour, baking powder, baking soda and salt in a medium bowl.</p><p>Using a hand mixer or stand mixer, cream the butter and granulated sugar together until fluffy, 2 to 3 minutes. Add the eggs, one at a time, scraping down the bowl between additions. Beat in the vanilla.</p><p>Whisk together the sour cream and the milk. Add the flour mixture and milk mixture in three additions, alternating between wet and dry ingredients and starting and ending with flour mixture. Beat just until well combined, taking care not to overmix. </p><h6>For the filling:</h6><p>Beat the cream cheese and granulated sugar in a bowl with an electric mixer at medium speed until light and fluffy, about 3 minutes. Beat in the egg just until combined. Spoon the filling into a pastry bag fitted with a medium-size plain tip (Ateco 800). Insert the tip into the top of each cupcake batter and squeeze the filling until the batter rises to fill each cup about three-quarters of the way up the side of the tin.</p><p>Bake until lightly golden and a toothpick inserted about 3/4 inch from the edge of the cupcakes comes out clean, 18 to 20 minutes. Cool the cupcakes in the tins on a rack for 10 minutes, and then remove from the tins and cool completely. </p><h6>For the frosting: </h6><p>Using an electric or stand mixer, beat the cream cheese and butter together at medium speed until fluffy, about 2 minutes. Scrape down the sides of the bowl. Beat in the sour cream and lemon juice. On low speed, gradually add the confectioners’ sugar and beat until well combined. </p><p>Frost the cupcakes as desired. Garnish with graham cracker pieces.</p>"
                }),

                new Recipe({
                    id: 'key-lime',
                    section: 'american',
                    title: 'KEY LIME PIE CUPCAKES',
                    makes: {amt: '24 cupcakes', alt: ''},
                    time: {active: '50 min', total: '3 hrs'},
                    ingredients: [
                        {amt: '2', desc: 'sticks (8 ounces) unsalted butter, at room temperature'},
                        {amt: '1&frac12;', desc: 'cups granulated sugar'},
                        {amt: '4', desc: 'large eggs'},
                        {amt: '1', desc: 'teaspoon vanilla extract'},
                        {amt: '3', desc: 'cups all-purpose flour'},
                        {amt: '1', desc: 'tablespoon baking powder'},
                        {amt: '&frac12;', desc: 'teaspoon finely grated lime zest'},
                        {amt: '&frac12;', desc: 'teaspoon fine salt'},
                        {amt: '1', desc: 'cup milk'},
                        {amt: '', desc: 'Key Lime Curd'},
                        {amt: '', desc: 'Key Lime Frosting'},
                        {amt: '&frac12;', desc: 'cup graham cracker crumbs'},
                        {amt: '', desc: 'Key lime slices, for garnish, optional'}
                    ],
                    directions: "<p>Preheat the oven to 350ºF. Line two 12-cup standard muffin tins with paper liners.</p><p>Cream the butter in a large bowl with an electric mixer until smooth. Gradually add the granulated sugar and beat until light and fluffy, about 3 minutes. Add the eggs, one at a time, scraping down the sides of the bowl between additions. Beat in the vanilla.</p><p>Combine the flour, baking powder, lime zest and salt in a medium bowl. Add one-third of the flour mixture to the butter mixture; beat in half the milk. Repeat additions, ending with the flour. Beat until combined, taking care not to overmix.</p><p>Divide the batter between the prepared muffin tins, filling the cups two-thirds full. Bake until a toothpick inserted into the center of the cupcakes comes out clean and the tops spring back when pressed gently, 18 to 22 minutes. Cool the cupcakes in the tins on a rack for 10 minutes, and then remove from the tins and cool completely.</p><h6>To assemble:</h6><p>Pour the Key Lime Curd into a squeeze bottle with 1/4-inch opening. Fill the cupcakes with curd by inserting the tip into the top of each cupcake and squeezing a couple tablespoons of filling into each cupcake; the cupcake will feel heavier and curd may be visible as it comes up to the top of the cupcake.</p><p>Stir the Key Lime Frosting and dip the top of each cupcake into the frosting, allowing any excess to drip off.</p><p>Roll the edge of each cupcake in the graham cracker crumbs and place on a serving platter. Garnish with a slice of Key lime if desired.</p>"
                }),

                new Recipe({
                    id: 'chocolate-chip',
                    section: 'american',
                    title: 'CHOCOLATE CHIP COOKIE CUPCAKES',
                    makes: {amt: '48 mini cupcakes', alt: ''},
                    time: {active: '40 min', total: '2 hrs 15 min'},
                    ingredients: [
                        {amt: '', desc: 'Cookie Crust'},
                        {amt: '1', desc: 'cup all-purpose flour'},
                        {amt: '&frac12;', desc: 'teaspoon fine salt'},
                        {amt: '&frac14;', desc: 'teaspoon baking soda'},
                        {amt: '1', desc: 'stick (4 ounces) unsalted butter at room temperature'},
                        {amt: '&frac13;', desc: 'cup packed light brown sugar'},
                        {amt: '&frac13;', desc: 'cup granulated sugar'},
                        {amt: '1', desc: 'large egg'},
                        {amt: '1', desc: 'teaspoon pure vanilla extract'},
                        {amt: '&frac12;', desc: 'cup mini chocolate chips'},
                        {amt: '1', desc: 'cup all-purpose flour'},
                        {amt: '&frac34;', desc: 'teaspoon baking powder'},
                        {amt: '&frac12;', desc: 'teaspoon fine salt'},
                        {amt: '2', desc: 'large egss, at room temperature'},
                        {amt: '&frac12;', desc: 'cup packed light brown sugar'},
                        {amt: '6', desc: 'tablespoons unsalted butter, melted'},
                        {amt: '1&frac12;', desc: 'teaspoons pure vanilla extract'},
                        {amt: '&frac13;', desc: 'cup milk, at room temperature'},
                        {amt: '2', desc: 'tablespoons cocoa powder'},
                        {amt: '1', desc: 'tablespoon unsalted butter, melted'},
                        {amt: '&frac14;', desc: 'teaspoon pure vanilla extract'},
                        {amt: '', desc: 'Pinch fine salt'},
                        {amt: '&frac34;', desc: 'cup confectioners\' sugar'},
                        {amt: '2', desc: 'tablespoons milk'}
                    ],
                    directions: "<p>Preheat the oven to 350ºF and position the oven rack to the middle. Line two 24-cup mini-muffin tins with cupcake liners. </p><h6>For the cookie crust: </h6><p>Combine the flour, salt and baking soda in a small bowl and set aside. Beat the butter and both sugars together in the bowl of a stand mixer fitted with a paddle attachment on medium-high speed until creamy, about 4 minutes (or in a large bowl if using an electric mixer). Add the egg and vanilla and beat until incorporated, about 1 minute. Adjust the speed to low, add the flour mixture and beat until incorporated. Fold in the chocolate chips.</p><p>Drop 1 heaping teaspoon of cookie dough into each liner and press down firmly. Bake until slightly puffed and golden, 12 to 15 minutes. Cool until warm to the touch, and then press down the crust once more. Cool completely.</p><h6>For the brown sugar cake: </h6><p>Whisk the flour, baking powder and salt together in a medium bowl. In the bowl of a stand mixer fitted with the paddle attachment, beat the eggs and light brown sugar together on medium-high speed until light and foamy, about 2 minutes (or in a large bowl if using a hand-held electric mixer). While beating, gradually pour in the butter and then the vanilla. </p><p>While mixing slowly, add half the dry ingredients, then add all the milk, and follow with the rest of the dry ingredients. Take care not to overmix the batter. Drop 1 heaping teaspoon of batter on top of each cookie crust.</p><p>Bake until a tester inserted in the center of the cakes comes out clean, rotating the tins about halfway through, 10 to 12 minutes. Cool the cupcakes on a rack in the tins for 10 minutes, and then remove from the tins and cool on the rack completely. </p><h6>For the chocolate frosting: </h6><p>Combine the cocoa powder and butter in the bowl of a stand mixer fitted with the paddle attachment (or in a large bowl if using a hand-held electric mixer). Mix on low until combined. Add the vanilla and salt. Continue to mix on low speed and add the confectioners’ sugar and milk in alternating batches. Increase the speed to medium-high and mix until fully incorporated and smooth. </p><p>Fill a pastry bag fitted with a round or star tip and pipe small chocolate drops on top of each cupcake.</p>"
                }),

                new Recipe({
                    id: 'peach-cobbler',
                    section: 'american',
                    title: 'PEACH COBBLER CUPCAKES',
                    makes: {amt: '12 cupcakes', alt: ''},
                    time: {active: '1 hr', total: '2 hrs 25 min'},
                    ingredients: [
                        {amt: '', desc: 'Baking spray with flour'},
                        {amt: '&frac12;', desc: 'cup pecan halves'},
                        {amt: '1&frac14;', desc: 'cups all-purpose flour'},
                        {amt: '&frac34;', desc: 'teaspoon baking soda'},
                        {amt: '&frac12;', desc: 'teaspoon fine salt'},
                        {amt: '1', desc: 'stick unsalted butter (4 ounces), at room temperature'},
                        {amt: '&frac23;', desc: 'cup granulated sugar'},
                        {amt: '2', desc: 'large eggs, at room temperature'},
                        {amt: '&frac12;', desc: 'teaspoon lemon zest'},
                        {amt: '&frac13;', desc: 'cup sour cream'},
                        {amt: '24', desc: 'frozen peach wedges thawed and patted dry'},
                        {amt: '&frac14;', desc: 'cup peach preserves'},
                        {amt: '1', desc: 'tablespoon lemon juice (from about &frac12; a lemon)'}
                    ],
                    directions: "<h6>For the cupcakes: </h6><p>Preheat the oven to 350ºF and position a rack in the middle of the oven. Line one 12-cup standard muffin tin with cupcake liners and spray the top of the tin lightly with baking spray. </p><p>Spread the pecans out on a baking sheet and bake until nicely toasted, 8 to 10 minutes. Allow to cool, and then pulse in a food processor until finely grounded. Whisk together with the flour, baking powder, baking soda and salt. Set aside.</p><p>Combine the butter and granulated sugar in the bowl of a stand mixer fitted with a paddle attachment (or in a large bowl if using a hand-held electric mixer). Beat on medium-high speed until light and fluffy, about 5 minutes. Add the eggs one at a time, beating to incorporate after each addition. Scrape down the sides of the bowl as needed. Beat in the lemon zest.</p><p>Adjust the speed to low and add the flour mixture and sour cream in alternating batches, beginning and ending with the flour. Divide the batter evenly in the tin, filling about two-thirds of the way full. Top each with 2 peach wedges. Bake until the edges are golden and a toothpick inserted in the center comes out clean, 22 to 24 minutes. </p><p>Cool the cupcakes on a rack in the tin for 10 minutes, and then remove. Cool on the rack completely. </p><p>Combine the peach preserves and lemon juice in a small microwave-safe bowl and heat for a few seconds just to warm through. Generously brush the tops of each cupcake with the preserves.</p><h6>For the pecan crumble:</h6><p>Combine the flour, pecans, brown sugar, butter and salt. Spread out on a rimmed baking sheet and bake until golden, about 15 minutes, rotating the pan about halfway through. Allow to cool completely, and then crumble. Store in an airtight container.</p><h6>For the cream topping: </h6><p>Combine the sour cream, heavy cream and confectioners’ sugar in a medium bowl. Whip on medium-high speed until stiff peaks form, about 4 minutes. Makes 3 cups.</p><p>Top each cupcake with the cream topping and sprinkle with the pecan crumble.Serve immediately. </p>"
                }),

                new Recipe({
                    id: 'red-velvet',
                    section: 'american',
                    title: 'RED VELVET CONE CAKES',
                    makes: {amt: '24 cupcakes', alt: ''},
                    time: {active: '20 min', total: '1 hr 40 min'},
                    ingredients: [
                        {amt: '24', desc: 'flat-bottomed wafer ice cream cones'},
                        {amt: '1&frac14;', desc: 'cups all-purpose flour'},
                        {amt: '&frac14;', desc: 'cup cocoa powder'},
                        {amt: '1', desc: 'teaspoon baking powder'},
                        {amt: '1', desc: 'teaspoon baking soda'},
                        {amt: '&frac12;', desc: 'teaspoon fine salt'},
                        {amt: '1', desc: 'stick unsalted butter, softened'},
                        {amt: '&frac34;', desc: 'cup granulated sugar'},
                        {amt: '&frac13;', desc: 'cup vegetable oil'},
                        {amt: '2', desc: 'eggs'},
                        {amt: '&frac12;', desc: 'cup well-shaken buttermilk'},
                        {amt: '1', desc: 'tablespoon red food coloring'},
                        {amt: '2', desc: 'teaspoons white vinegar'},
                        {amt: '1', desc: 'teaspoon vanilla extract'}
                    ],
                    directions: "<h6>For the cakes:</h6><p>Preheat the oven to 350ºF. Arrange an oven rack in the middle of the oven. Put the ice cream cones into a 24-cup mini-muffin tin.</p><p>Whisk the flour, cocoa powder, baking powder, baking soda and salt in a medium bowl and set aside. </p><p>In a large mixing bowl, using a hand-held mixer, cream the butter and granulated sugar together until light and fluffy. Add the vegetable oil and eggs and beat well. Then add the buttermilk, food coloring, white vinegar and vanilla. Beat until just combined, and then add the dry ingredients and mix until smooth. </p><p>Divide the batter among the ice cream cones, filling halfway (about 2 tablespoons). Bake in the center rack of the oven until a tester inserted into the center of the cakes comes out clean, about 20 minutes. Remove from the oven and cool completely on a wire rack before frosting.</p><h6>For the icing: </h6><p>In a medium bowl, beat the cream cheese and butter together until smooth and creamy. Stir in the vanilla. Add the confectioners’ sugar, ½ cup at a time, until the desired consistency is reached.</p><h6>To assemble: </h6><p>Use a small ice cream scoop and place a scoop of frosting on top of the cones. Garnish with sprinkles or red sugar hearts.</p>"
                }),

                new Recipe({
                    id: 'smores',
                    section: 'american',
                    title: 'S\'MORES CUPCAKES',
                    makes: {amt: '12 cupcakes', alt: ''},
                    time: {active: '35 min', total: '2 hrs'},
                    ingredients: [
                        {amt: '&frac34;', desc: 'cup all-purpose flour'},
                        {amt: '1&frac14;', desc: 'cup finely ground graham crachers'},
                        {amt: '&frac12;', desc: 'teaspoons baking powder'},
                        {amt: '1&frac12;', desc: 'sticks unsalted butter, at room temperature'},
                        {amt: '&frac12;', desc: 'cup packed light brown sugar'},
                        {amt: '2', desc: 'large eggs'},
                        {amt: '1', desc: 'teaspoon vanilla extract'},
                        {amt: '&frac23;', desc: 'cup milk'}
                     ],
                    directions: "<h6>For the cupcakes: </h6><p>Preheat the oven to 350ºF. Line one 12-cup standard muffin tin with paper cupcake liners.</p><p>In a small bowl, whisk the flour, ground graham crackers, baking powder and salt. Set aside. </p><p>In a stand mixer fitted with the paddle attachment, beat the butter and brown sugar on medium speed until combined. Increase the speed to medium-high and continue to beat, stopping once or twice to scrape down the sides of the bowl, until light and fluffy, 3 to 5 minutes. Add the eggs and vanilla and beat until combined. Add the flour mixture and milk, alternating, starting and ending with the flour mixture, until just combined. </p><p>Divide the batter between the muffin cups, filling each about two-thirds full. Bake until golden brown, or a toothpick inserted in the center comes out clean and the top springs back to the touch, about 25 minutes. Cool in the tin 5 minutes, and then transfer to a wire rack to cool completely.</p><h6>For the Filling:</h6><p>While the cupcakes cool, prepare the filling: Combine the chocolate, cream and corn syrup in a medium bowl and microwave in 30-second intervals on high, stirring, until smooth. Set aside until cooled and thickened slightly, about 30 minutes.</p><h6>For the meringue frosting:</h6><p>Bring 1 inch of water to a simmer in a saucepan that can hold a heatproof stand mixer’s bowl above the water. Combine the egg whites, granulated sugar and cream of tartar in the stand mixer bowl. Set the bowl above the simmering water and whisk until the sugar is dissolved and the egg whites are warm to the touch, turn white and are beginning to get fluffy. Transfer the bowl to the stand mixer, fitted with a whisk attachment, and whip on high speed until the meringue is cooled, fluffy and very thick. Beat in the vanilla.</p><h6>To assemble: </h6><p>Place the chocolate filling in a pastry bag or resealable plastic bag fitted with a small round tip (about ¹⁄8-inch diameter) and snip the end. Pierce the center of each cupcake with the pastry tip and gently squeeze in the chocolate filling until it begins to come out of the top of the cupcake. Repeat with the remaining cupcakes.</p><p>Pipe or swirl the meringue frosting onto each cupcake. If desired, brown the meringue with a kitchen torch or place briefly under the broiler. Garnish with a chocolate square.</p>"
                }),

                new Recipe({
                    id: 'tiramisu',
                    section: 'american',
                    title: 'TIRAMISU "CUP"CAKES',
                    makes: {amt: '6 "cup"cakes', alt: ''},
                    time: {active: '25 min', total: '1 hr 55 min'},
                    ingredients: [
                        {amt: '4', desc: 'tablespoons unsalted butter melted and cooled slightly, plus more for greasing'},
                        {amt: '&frac34;', desc: 'cup plus 2 tablespoons cake flour'},
                        {amt: '&frac34;', desc: 'teaspoon baking powder'},
                        {amt: '&frac14;', desc: 'teaspoon fine salt'},
                        {amt: '2', desc: 'large eggs'},
                        {amt: '&frac23;', desc: 'cup granulated sugar'},
                        {amt: '1', desc: 'tablespoon milk'},
                        {amt: '&frac34;', desc: 'teaspoon vanilla extract'},
                        {amt: '&frac12;', desc: 'cup confectioners\' sugar'},
                        {amt: '&frac12;', desc: 'cup coffee liqueur, such as Tia Maria'},
                        {amt: '1', desc: 'tablespoon instant espresso powder'},
                        {amt: '1', desc: 'tablespoon unsweetened cocoa powder'},
                        {amt: '&frac14;', desc: 'cup hot water'},
                        {amt: '1', desc: 'cup mascarpone cheese, at room temperature'},
                        {amt: '&frac12;', desc: 'cup heavy cream'},
                        {amt: '', desc: 'Cocoa powder or chocolate shavings, for garnish, optional'}
                    ],
                    directions: "<p>Preheat the oven to 325ºF and place 6 lightly buttered oven-safe 4-ounce coffee cups on a rimmed baking sheet. </p><p>Sift the flour, baking powder and salt into a medium bowl and set aside. In the bowl of a stand mixer on medium-high speed, beat the eggs for 4 minutes. They will begin to lighten in color and become frothy. Add the granulated sugar and continue to beat for an additional 4 minutes. Reduce the mixer speed to low and stir in the flour mixture until just combined. Then mix in the melted butter, milk and 1/2 teaspoon of the vanilla. Divide the batter among the cups and bake until the tops are golden brown, lightly spring back to the touch and a toothpick inserted into the center comes out clean, 25 to 30 minutes. </p><p>While the cupcakes bake, mix together 1/4 cup of the confectioners’ sugar, the liqueur, espresso powder, cocoa powderand hot water, and stir until dissolved. </p><p>When the cupcakes come out of the oven, poke 8 to 10 holes in each using a wooden skewer. Evenly but slowly spoon the coffee syrup over each cupcake. Let cool completely.</p><p>When the cupcakes are cool, beat the mascarpone with the heavy cream and the remaining 1/4 cup confectioners’ sugar and remaining 1/4 teaspoon vanilla until soft peaks form. Divide among the cupcakes. Garnish each cupcake with a dusting of cocoa powder and/or chocolate shavings if using.</p>"
                }),

                new Recipe({
                    id: 'cream-cheese',
                    section: 'frosting',
                    title: 'CREAM CHEESE',
                    makes: {amt: '', alt: ''},
                    time: {active: '', total: ''},
                    ingredients: [
                        {amt: '2', desc: '8-ounce packages cream cheese, at room temperature'},
                        {amt: '2&frac12;', desc: 'sticks (6 ounces) unsalted butter, cubed, at room temperature'},
                        {amt: '2', desc: 'cups confectioners\' sugar'},
                        {amt: '1', desc: 'teaspoon pure vanilla extract'}
                    ],
                    directions: "<p>Beat the cream cheese in a large bowl with an electric mixer until smooth and fluffy. Gradually beat in the butter, beating until smooth. Sift the sugar into the bowl and beat until smooth. Add the vanilla and beat until light and fluffy. Refrigerate until slightly chilled and firm, about 20 minutes.</p>"
                }),

                new Recipe({
                    id: 'swiss-butter-cream',
                    section: 'frosting',
                    title: 'SWISS BUTTER CREAM',
                    makes: {amt: '', alt: ''},
                    time: {active: '', total: ''},
                    ingredients: [
                        {amt: '&frac34;', desc: 'cup sugar'},
                        {amt: '2', desc: 'teaspoons freshly squeezed lemon juice'},
                        {amt: '', desc: 'Pinch fine salt'},
                        {amt: '4', desc: 'large egg whites'},
                        {amt: '3', desc: 'sticks (12 ounces) unsalted butter cut into 1&frac12;-inch chunks, at room temperature'},
                        {amt: '', desc: 'Flavoring suggestions (see directions)'}
                    ],
                    directions: "<p>Bring a few inches of water to a boil in a saucepan that can hold a heatproof stand mixer’s bowl above the water. </p><p>Add the sugar, lemon juice, salt and egg whites to the mixing bowl, and whisk together by hand. Set the bowl above the boiling water and whisk until the mixture is warm to the touch and the sugar completely dissolves. Transfer to the stand mixer fitted with the whisk attachment and beat at medium-high speed until cool and the whites hold stiff peaks, 10 to 15 minutes. </p><p>Toss in a couple of chunks of butter at a time, making sure the pieces are incorporated before adding more. After all the butter is added, continue whisking on medium-high speed. The mixture will deflate and appear curdled. Continue whisking until the buttercream comes back together to form a smooth and spreadable consistency. Slowly drizzle in the optional flavoring while beating until smooth and light. (If the frosting is very soft or begins to break, refrigerate until set but still spreadable and then beat until light before using.)</p><h6>Chocolate</h6><p>Remove the buttercream from the stand mixer into a large bowl and, in three batches, fold in 6 ounces melted and cooled bittersweet chocolate.</p><h6>Citrus</h6><p>Stir in the zest of half a lemon or orange.</p><h6>Boozy</h6><p>Stir in 2 tablespoons coffee-flavored liqueur and 1 tablespoon vodka.</p>"
                }),

                new Recipe({
                    id: 'seven-minute',
                    section: 'frosting',
                    title: 'SEVEN MINUTE',
                    makes: {amt: '', alt: ''},
                    time: {active: '', total: ''},
                    ingredients: [
                        {amt: '4', desc: 'large egg whites'},
                        {amt: '&frac34;', desc: 'cup sugar'},
                        {amt: '&frac14;', desc: 'teaspoon cream of tartar'},
                        {amt: '', desc: 'Pinch fine salt'}
                    ],
                    directions: "<p>Bring a few inches of water to a boil in a saucepan that can hold a heatproof stand mixer’s bowl above the water. </p><p>Add the egg whites, sugar, cream of tartar and salt to the bowl and whisk together by hand. Set the bowl above the boiling water and whisk until the mixture is warm to the touch and the sugar dissolves, 1 to 2 minutes. Transfer to the stand mixer fitted with the whisk attachment and beat at medium-high speed until the whites are cooled and form a stiff meringue, about 5 minutes. If not using immediately, cover and store at room temperature. </p>"
                }),

                new Recipe({
                    id: 'ganache-frosting',
                    section: 'frosting',
                    title: 'GANACHE FROSTING',
                    makes: {amt: '3 &frac12; cups', alt: ''},
                    time: {active: '10 minutes', total: '10 minutes'},
                    ingredients: [
                        {amt: '16', desc: 'ounces bittersweet chocolate, chopped fine'},
                        {amt: '16', desc: 'ounces (2 cups) heavy cream'}
                    ],
                    directions: "<p>Place the chopped chocolate into the bowl of a food processor.</p><p>Heat the heavy cream in a quart-size, microwavable container and microwave on high until it just begins to simmer, 3 to 4 minutes; be careful not to allow the cream to boil over. Pour the cream over the chocolate and let stand for 2 minutes. Process by pulsing several times in the food processor until the chocolate mixture is smooth. Use as is for glazing. </p><p>If you wish to make a lighter frosting, allow it to come to room temperature, about 2 hours. Once at room temperature, place in the bowl of a stand mixer and whisk on high for 2 to 3 minutes. </p>"
                }),

                new Recipe({
                    id: 'chocolate-chiffon',
                    section: 'frosting',
                    title: 'CHOCOLATE CHIFFON CUPCAKES',
                    makes: {amt: '24 cups', alt: ''},
                    time: {active: '30 min', total: '2 hrs'},
                    ingredients: [
                        {amt: '5&frac14;', desc: 'ounces cake flour'},
                        {amt: '1&frac12;', desc: 'teaspoons baking powder'},
                        {amt: '1', desc: 'teaspoon kosher salt'},
                        {amt: '5', desc: 'large eggs separated'},
                        {amt: '6', desc: 'ounces sugar'},
                        {amt: '&frac14;', desc: 'cup vegetable oil'},
                        {amt: '1', desc: 'teaspoon vanilla extract'},
                        {amt: '&frac12;', desc: 'teaspoon plus &frac18; teaspoon cream of tartar'},
                        {amt: '', desc: 'Frosting such as Royal Icing or Ganache'},
                        {amt: '', desc: 'White and blue sprinkles for garnish, optional'}
                    ],
                    directions: "<p>Preheat the oven to 325ºF. Place paper cupcake liners into two 12-cup standard muffin tins and set aside. If you prefer, set 12 ovenproof coffee mugs on an 113/4-by-8-inch baking sheet and set aside.</p><p>In a medium mixing bowl, whisk together the flour, baking powder and salt. Set aside.</p><p>Place the egg yolks and 5 ounces of the sugar into the bowl of a stand mixer and whisk on high until the mixture becomes pale yellow and “ribbons” when lifted, about 2 minutes. Add 1/4 cup water, the vegetable oil and vanilla and whisk to combine. Add the dry ingredients and whisk just to combine. Transfer the batter to a mixing bowl.</p><p>Place the egg whites and cream of tartar into a clean bowl and whisk on high, using the whisk attachment, until it becomes foamy. Decrease the speed to low and gradually add the remaining 1 ounce of sugar. Increase the speed to high and continue whisking until stiff peaks form, about 2 minutes.</p><p>Transfer one-third of the egg whites to the batter and whisk until well combined. Add the remaining egg whites and fold in gently. Transfer the batter into the prepared muffin tins or coffee mugs, evenly dividing the batter among the cups. Place both muffin tins on the middle rack of the oven or, if using mugs, place the baking sheet with the mugs on the bottom rack of the oven. Bake for 16 to 18 minutes if using muffin tins or 28 to 30 minutes if using coffee mugs. Bake until a toothpick comes out clean or the cupcakes reach an internal temperature of 205ºF to 210ºF. Remove from the oven to a cooling rack and allow to cool completely before frosting. Garnish with white and blue sprinkles if desired.</p>"
                }),

                new Recipe({
                    id: 'royal-icing',
                    section: 'frosting',
                    title: 'ROYAL ICING',
                    makes: {amt: '3 &frac12; cups', alt: ''},
                    time: {active: '10 min', total: '10 min'},
                    ingredients: [
                        {amt: '3', desc: 'ounces pasteurized egg whites'},
                        {amt: '1', desc: 'teaspoon vanilla extract'},
                        {amt: '4', desc: 'cups confectioners\'s sugar'},
                        {amt: '', desc: 'food coloring if desired'}
                    ],
                    directions: "<p>In the large bowl of a stand mixer, combine the egg whites and vanilla and beat until frothy. Add the confectioners’ sugar gradually and mix on low speed until the sugar is incorporated and the mixture is shiny. Turn the speed up to high and beat until the mixture forms stiff, glossy peaks. This should take 5 to 7 minutes. Add food coloring if desired. For immediate use, transfer the icing to a pastry bag or heavy-duty storage bag and pipe as desired. If using a storage bag, clip the corner. Store in an airtight container in the refrigerator for up to 3 days. </p>"
                })

            ];

            this.templates = [];

            for (i = 0; i < this.models.length; i += 1) {
                template = _.template(RecipeTemplate);
                obj = {
                    id: this.models[i].id, 
                    template: template({recipe: this.models[i].toJSON()})
                };
                this.templates.push(obj);
            }

        },

        getTemplate: function (id) {
            var i;

            for (i = 0; i < this.templates.length; i += 1) {
                if (this.templates[i].id == id) {
                    return this.templates[i].template;
                }
            }
        }

	});
	
	return new Recipes();
});
