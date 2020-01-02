import Vue from 'vue';
import VueCurrencyFilter from 'vue-currency-filter'

Vue.use(VueCurrencyFilter,
{
	symbol : 'SDG',
	thousandsSeparator: '.',
	fractionCount: 2,
	fractionSeparator: ',',
	symbolPosition: 'back',
	symbolSpacing: true
})