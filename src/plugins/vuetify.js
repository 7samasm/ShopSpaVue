import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify from 'vuetify/lib';


Vue.use(Vuetify);
const opts = {
	iconfont: 'md',
	rtl: false
}
export default new Vuetify(opts);
