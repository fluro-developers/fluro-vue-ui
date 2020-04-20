import Vue from 'vue/dist/vue'; // Use Vue UMD version on dev server.
import FluroVueUI from '../dist/es/index';

Vue.use(FluroVueUI);

// eslint-disable-next-line no-new
new Vue({
	el: '#app',
	render: h => h('hello')
});
