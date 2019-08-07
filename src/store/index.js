import Vue from 'vue';
import Vuex from 'Vuex';
import createLogger from 'vuex/dist/logger'

import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations';
import state from './state';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production' //调试工具

export default new Vuex.Store({
	actions,
	getters,
	mutations,
	state,
	strict: debug,
  	plugins: debug ? [createLogger()] : []
})