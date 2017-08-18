
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		prePage: 0,
		recName: ''
	},
	mutations: {
		changePrePage (state, page) {
			state.prePage = page
		},
		storeRecName (state, val) {
			state.recName = val
		}
	}
})