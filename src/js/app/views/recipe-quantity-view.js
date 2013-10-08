/*global define THREE $ */
define([], function (require) {
	;;
	var Backbone = require('backbone'),
		Vars = require('app/models/vars'),
		UserEvent = require('app/events/user-event'),
		AppEvent = require('app/events/app-event'),
		RecipeQuantityView;
	
	RecipeQuantityView = Backbone.View.extend({

		initialize: function () {

            var makesText,
                makesArray,
                makesAmt;

            if ($('#recipe-content .recipe-table').length) {
                makesText = $('#recipe-content .recipe-table .red')[0].innerHTML;
                makesArray = makesText.split(' ');
                makesAmt = makesArray[0];
            
                this.baseValue = makesAmt;
            }
            
            this.$table = $('.recipe-table');
            this.$ui = $('#recipe-quantity-ui');
            this.$btn = $('#recipe-quantity-btn');
            this.$input = $('#recipe-quantity-input');
            this.$quantityEl = this.$table.find('td .red').first();
            this.$values = $('#recipe-content .recipe-ingredients td .red');

            this.value = this.getValue();
            this.valueArray = [];

            this.$values.each(this.collectValues.bind(this));

            this.$table.bind('mousedown', this.handle_quantity_MOUSE_DOWN.bind(this));
		},

        getValue: function () {
            var valueString,
                value;

            valueString = this.$quantityEl.text();
            value = this.fractionToDecimal(valueString);

            return value;
        },

        collectValues: function (i, el) {
            var valueString,
                value;

            valueString = $(el).html();
            value = this.fractionToDecimal(valueString);

            this.valueArray.push(value);
        },

        handle_quantity_MOUSE_DOWN: function (e) {
            this.quantityDelta = e.pageY;

            var selectBlocker = document.createElement('div');
            selectBlocker.id = 'selectBlocker';
            document.body.appendChild(selectBlocker);

            $(document.body).bind('mousemove', this.handle_quantity_MOUSE_MOVE.bind(this));
            $(document.body).bind('mouseup', this.handle_quantity_MOUSE_UP.bind(this));
        },

        handle_quantity_MOUSE_UP: function (e) {
            var selectBlocker = document.getElementById('selectBlocker');
            document.body.removeChild(selectBlocker);

            $(document.body).unbind('mousemove');
            $(document.body).unbind('mouseup');
        },


        handle_quantity_MOUSE_MOVE: function (e) {
            var difference = (this.quantityDelta - e.pageY) / 10,
                newValue;
            
            newValue = Math.round(this.value + difference);

            if (newValue > this.value) {
                this.updateValues(newValue, this.value);
            } else {
                //this.updateValues(1, this.value);
                this.updateValues(this.value, this.value);
            }
        },

        updateValues: function (value, amount) {
            var difference = value / amount,
                fullstring = this.$quantityEl.text(),
                suffix = fullstring.replace(/([^a-zA-Z"]+)/, '');

            function replaceValue(i, el) {
                var $el = $(el),
                    decimal,
                    newValue;

                decimal = this.valueArray[i]; 

                if (!isNaN(decimal)) {
                    decimal *= difference;
                    //newValue = decimal.toFixed(2);
                    newValue = (Math.floor(decimal * 4) / 4).toFixed(2);
                    newValue = this.decimalToFraction(newValue);
                    $el.html(newValue);
                }
            }

            value = (Math.floor(value * 4) / 4).toFixed(2);
            value = this.decimalToFraction(value);

            this.$quantityEl.html(value + ' ' + suffix);
            this.$values.each(replaceValue.bind(this));
        },

        destroy: function () {
            
        },

        /*
         * convert fraction string to decimal
         */
        fractionToDecimal: function (fraction) {
            var fracstring = fraction,
                numberarray,
                wholenumber,
                decimal,
                entity,
                unicode,
                unicodeMap = {
                    '188': '&frac14;',
                    '189': '&frac12;',
                    '190': '&frac34;',
                    '8531': '&frac13;',
                    '8532': '&frac23;'
                },
                i;

            if (typeof(fraction) !== 'string') {
                return 0;
            }

            //if not entity, convert char to entity
            if (fracstring.indexOf('&') == -1) {

                fracstring = fracstring.replace(/[a-zA-Z\s]/g, '');
                wholenumber = isNaN(parseFloat(fracstring)) ? '' : parseFloat(fracstring);

                for (i = 0; i < fracstring.length; i += 1) {
                    unicode = fracstring.charCodeAt(i);

                    if (unicodeMap[unicode]) {
                        entity = unicodeMap[unicode];
                        wholenumber += entity;
                    }
                }

                fracstring = wholenumber.toString();
            }

            //convert entity to decimal
            if (fracstring.indexOf('&frac') > 0) {
                
                numberarray = fracstring.split('&frac');
                wholenumber = numberarray[0];
                fracstring = numberarray[1];
                fracstring.replace(';', '');

                decimal = fracstring[0] / fracstring[1];
                decimal += parseInt(wholenumber, 10);

            } else if (fracstring.indexOf('&frac') > -1) {

                fracstring = fracstring.replace('&frac', '');
                fracstring = fracstring.replace(';', '');

                decimal = fracstring[0] / fracstring[1];

            } else {
                decimal = parseFloat(fracstring);
            }

            return decimal;
        },

        /*
         * convert decimal number to fraction string
         */
        decimalToFraction: function (decimal) {
            var _n = [],
                _d = [],
                _numerator,
                _denominator,
                _wholenumber = 0,
                _fractionstring;

            if (decimal % 1 === 0) {
                return Math.round(decimal).toString();
            } else {
                _wholenumber = decimal - (decimal % 1);
                decimal = decimal % 1;
            }

            decimal = decimal.toString();

            function getMaxNumerator(f)
            {
                var f2, ixe, digits, ix, L, numDigits, L2, numIntDigits, numDigitsPastDecimal, i;
                
                f2 = null;
                ixe = f.toString().indexOf("E");
                
                if (ixe == -1) {
                    ixe = f.toString().indexOf("e");
                }
                
                if (ixe == -1) {
                    f2 = f.toString();
                } else {
                    f2 = f.toString().substring(0, ixe);
                }

                digits = null;
                ix = f2.toString().indexOf(".");
                
                if (ix == -1) {
                    digits = f2;
                } else if (ix === 0) {
                    digits = f2.substring(1, f2.length);
                } else if (ix < f2.length) {
                    digits = f2.substring(0, ix) + f2.substring(ix + 1, f2.length);
                }

                L = digits;
                numDigits = L.toString().length;
                L2 = f;
                numIntDigits = L2.toString().length;
                
                if (L2 === 0) {
                    numIntDigits = 0;
                }

                numDigitsPastDecimal = numDigits - numIntDigits;

                for (i = numDigitsPastDecimal; i > 0 && L % 2 === 0; i -= 1) {
                    L /= 2;
                }

                for (i = numDigitsPastDecimal; i > 0 && L % 5 === 0; i -= 1) {
                    L /= 5;
                }

                return L;
            }

            function approximateFractions() {
                var d, numerators, denominators, maxNumberator, d2, calcD, prevCalcD, i, L2, maxNumerator;
                d = decimal;

                numerators = [0, 1];
                denominators = [1, 0];

                maxNumerator = getMaxNumerator(d);
                d2 = d;
                calcD = prevCalcD = NaN;
                for (i = 2; i < 1000; i += 1)  {
                    L2 = Math.floor(d2);
                    numerators[i] = L2 * numerators[i - 1] + numerators[i - 2];
                    if (Math.abs(numerators[i]) > maxNumerator) {
                        return;
                    }

                    denominators[i] = L2 * denominators[i - 1] + denominators[i - 2];

                    calcD = numerators[i] / denominators[i];
                    if (calcD == prevCalcD) {
                        return;
                    }

                    _n.push(numerators[i]);
                    _d.push(denominators[i]);

                    if (calcD == d) {
                        return;
                    }

                    prevCalcD = calcD;
                    d2 = 1 / (d2 - L2);
                }
            }

            approximateFractions();

            _numerator = _n[_n.length - 1];
            _denominator = _d[_d.length - 1];

            if (_numerator > _denominator) {
                _wholenumber += Math.floor(_numerator / _denominator);
                _numerator -= _denominator;
                _fractionstring = _wholenumber + '&frac' + _numerator + _denominator + ';';
            } else if (_wholenumber > 0) {
                _fractionstring = _wholenumber + '&frac' + _numerator + _denominator + ';';
            } else {
                _fractionstring = '&frac' + _numerator + _denominator + ';';
            }

            return _fractionstring;
        }
        
	});

	return RecipeQuantityView;
});
