<template>
	<div class="content-view">
		<Spin size="large" fix v-if="spinShow"></Spin>
		<div class="view-title">
			<span>公司管理</span>
			<Breadcrumb>
				<Breadcrumb-item>
					<router-link to="/">主页</router-link>
				</Breadcrumb-item>
				<Breadcrumb-item>公司管理</Breadcrumb-item>
			</Breadcrumb>
		</div>
		<Card class="search_card">
			<Form ref="form" :model="form" :label-width="120">
				<Row>
					<Col span="6">
					<Form-item label="公司名称" :label-width="64">
						<Input v-model="form.name" placeholder="请输入公司名称" @on-change="searchCompany" @on-blur="closeSearchCompany"></Input>
						<div class="search_result" v-show="companyShow">
							<ul>
								<li class="result_item" v-for="item in companyResult" @click="selCompany(item.fullName)">{{item.fullName}}</li>
							</ul>
						</div>
					</Form-item>
					<Form-item label="所在城市" :label-width="64">
						<Select v-model="form.city" placeholder="请选择所在城市">
							<template v-for="item in cityGroup">
								<Option :value="item">{{item}}</Option>
							</template>
						</Select>
					</Form-item>
					</Col>
					<Col span="10">
					<Form-item label="行业">
						<Select v-model="form.industry" placeholder="请选择行业">
							<Option value="互联网·游戏·软件">互联网·游戏·软件</Option>
							<Option value="电子·通信·硬件">电子·通信·硬件</Option>
							<Option value="金融">金融</Option>
							<Option value="生产·机械·制造">生产·机械·制造</Option>
							<Option value="房地产·建筑·物业">房地产·建筑·物业</Option>
							<Option value="服务·咨询·外包">服务·咨询·外包</Option>
							<Option value="制药·医疗">制药·医疗</Option>
							<Option value="广告·媒体">广告·媒体</Option>
							<Option value="教育·培训">教育·培训</Option>
							<Option value="物流·运输">物流·运输</Option>
							<Option value="贸易·消费">贸易·消费</Option>
							<Option value="能源·原材料">能源·原材料</Option>
							<Option value="政府·非赢利机构·其他">政府·非赢利机构·其他</Option>
						</Select>
					</Form-item>
					<Form-item label="简历投递日期">
						<Row>
							<Col span="11">
							<Form-item prop="fromEndDate">
								<Date-picker type="date" placeholder="选择日期" v-model="form.fromApplyDate"></Date-picker>
							</Form-item>
							</Col>
							<Col span="2" style="text-align: center">-</Col>
							<Col span="11">
							<Form-item prop="toEndDate">
								<Date-picker type="date" placeholder="选择日期" v-model="form.toApplyDate"></Date-picker>
							</Form-item>
							</Col>
						</Row>
					</Form-item>
					</Col>
				</Row>
				<div class="company-form-btn">
					<Button type="primary" @click="handleSubmit">查询</Button>
					<Button type="ghost" @click="handleReset" style="margin-left: 8px">重置</Button>
				</div>
			</Form>
		</Card>
		<Card class="form_card">
			<Table border :columns="columns" :data="data" :context="self"></Table>
			<div style="margin: 10px;overflow: hidden">
				<div style="float: right;">
					<Page :total="pageTotal" :current="pageCurrent" @on-change="changePage" @on-page-size-change="changePageSize" show-elevator show-total show-sizer></Page>
				</div>
			</div>
		</Card>
	</div>
</template>
<script>
import { dateToString } from '@/common/js/date.js'
import { formatDate } from '@/common/js/formatDate.js'
export default {
	data() {
		return {
			spinShow: false,
			companyShow: false,
			self: this,
			pageTotal: 0,
			pageCurrent: 1,
			tempPageSize: 10,
			companyResult: [],
			cityGroup: [],
			data: [
				{
					// fullName: '携程计算机有限公司',
					// appCount: 1000,
					// stuCount: 1000,
					// city: '北京',
					// industry: '互谅网'
				}
			],
			form: {
				name: '',
				city: '',
				fromApplyDate: '',
				toApplyDate: '',
				industry: ''
			},
			formValidate: {
				name: ''
			},
			columns: [
				{
					type: 'index',
					width: 40,
					align: 'center'
				},
				{
					title: '公司名称',
					key: 'fullName',
					align: 'center'
				},
				{
					title: '简历总量',
					key: 'appCount',
					align: 'center'
				},
				{
					title: '简历投递数',
					key: 'stuCount',
					align: 'center'
				},
				{
					title: '所在城市',
					key: 'city',
					align: 'center'
				},
				{
					title: '行业',
					key: 'industry',
					align: 'center'
				},
				{
					title: '操作',
					align: 'center',
					width: 160,
					render(row, column, index) {
						return `<i-button type="primary" size="small" disabled>职位管理</i-button>
			                        <i-button type="primary" size="small" @click.native="checkApplication(${index})">投递管理</i-button>`
					}
				}
			]
		}
	},
	created() {
		// 获取公司所在城市
		this.$http.get('/recruiters/city/060a9367-83f5-4116-85e2-5e66913f4a2a')
			.then((res) => {
				if (res.data) {
					this.cityGroup = res.data
				}
			})
		getCompanyData(this, this.$store.state.prePage, this.tempPageSize)
	},
	methods: {
		// 模糊搜索公司
		searchCompany() {
			if (this.form.name.length) {
				this.$http.get('/recruiters/recNameLike/060a9367-83f5-4116-85e2-5e66913f4a2a?name=' + this.form.name)
					.then((res) => {
						if (res.data.length) {
							this.companyShow = true
							this.companyResult = res.data
						} else {
							this.companyShow = false
						}
					}).catch((err) => {
						console.log(err)
					})
			} else {
				this.companyShow = false
			}
		},
		// 选择公司
		selCompany(val) {
			this.form.name = val
			this.companyShow = false
		},
		// 关闭搜索框
		closeSearchCompany() {
			setTimeout(() => {
				this.companyShow = false
			}, 100)
		},
		// 确定提交查询
		handleSubmit() {
			getCompanyData(this, 0, this.tempPageSize)
		},
		// 重置表单
		handleReset() {
			this.form = {
				name: '',
				city: '',
				fromApplyDate: '',
				toApplyDate: '',
				industry: ''
			}
		},
		// 投递管理
		checkApplication(index) {
			this.$store.commit('changePrePage', this.pageCurrent - 1)
			this.$store.commit('storeRecName', this.data[index].fullName)
			this.$router.push('/company/application/' + this.data[index].id)
		},
		changePage(index) {
			const pageNumber = index - 1
			getCompanyData(this, pageNumber, this.tempPageSize)
		},
		changePageSize(val) {
			this.tempPageSize = val
			getCompanyData(this, 0, this.tempPageSize)
		}
	}
}
function getCompanyData(thisVm, pageNumber, pageSize) {
	thisVm.spinShow = true
	let dataObj = {}
	Object.assign(dataObj, thisVm.form)
	dataObj.fromApplyDate = dataObj.fromApplyDate ? formatDate(dateToString(dataObj.fromApplyDate)) : ''
	dataObj.toApplyDate = dataObj.toApplyDate ? formatDate(dateToString(dataObj.toApplyDate)) : ''
	thisVm.$http.get('/recruiters/060a9367-83f5-4116-85e2-5e66913f4a2a?name=' + dataObj.name + '&city=' + dataObj.city + '&fromApplyDate=' + dataObj.fromApplyDate + '&toApplyDate=' + dataObj.toApplyDate + '&industry=' + dataObj.industry + '&page=' + pageNumber + '&size=' + pageSize)
		.then((res) => {
			if (res.data.data) {
				thisVm.pageCurrent = res.data.pageNo
				thisVm.pageTotal = res.data.totalCount
				thisVm.data = res.data.data
			}
			thisVm.spinShow = false
		}).catch((err) => {
			thisVm.spinShow = false
			console.log(err)
		})
}
</script>
<style scoped>
.search_result {
	position: absolute;
	left: 0;
	top: 32px;
	z-index: 30;
	width: 100%;
	max-height: 180px;
	overflow: auto;
	border: 1px solid #d7dde4;
	border-radius: 4px;
	background-color: #fff;
	text-indent: 7px;
}

.result_item:hover {
	background-color: #ebf7ff;
	cursor: pointer;
}
</style>