
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		prePage: 0
	},
	mutations: {
		changePrePage (state, page) {
			state.prePage = page
		}
	}
})