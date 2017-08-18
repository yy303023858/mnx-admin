
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		isEdit: false,
		companyInfo: {}
	},
	mutations: {
		changeCompanyInfo (state, obj) {
			// 点击编辑的时候，把公司信息添加到store中
			state.companyInfo = obj
		},
		resetEdit(state) {
			state.isEdit = false
		},
		openEdit(state) {
			state.isEdit = true
		}
	}
})