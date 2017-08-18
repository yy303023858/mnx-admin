<template>
	<div class="content-view" id="stu">
		<Spin size="large" fix v-if="spinShow"></Spin>
		<div class="view-title">
			<span>{{recName}}——投递管理</span>
		</div>
		<Card class="search_card">
			<Form ref="form" :model="form" :label-width="70">
				<Row>
					<Col span="4">
					<Form-item label="学校">
						<Input v-model="form.school" placeholder="请输入学校" @on-focus="selSchool"></Input>
					</Form-item>
					<Form-item label="专业">
						<Input v-model="form.major" placeholder="请输入专业" @on-change="searchMajor" @on-blur="closeSearchMajor"></Input>
						<div class="search_result" v-show="majorShow">
							<ul>
								<li class="result_item" v-for="item in majorResult" @click="selMajor(item.value)">{{item.value}}</li>
							</ul>
						</div>
					</Form-item>
					</Col>
					<Col span="4">
					<Form-item label="学历">
						<Select v-model="form.degree" placeholder="请选择学历">
							<Option value="2">大专</Option>
							<Option value="3">本科</Option>
							<Option value="4">硕士</Option>
							<Option value="6">博士</Option>
							<Option value="7">其他</Option>
						</Select>
					</Form-item>
					<Form-item label="投递阶段">
						<Select v-model="form.stage" placeholder="请选择投递阶段">
							<template v-for="item in stageArr">
								<Option :value="item.id">{{item.name}}</Option>
							</template>
						</Select>
					</Form-item>
					</Col>
					<Col span="4">
					<Form-item label="职位名称">
						<Select v-model="form.jobName" placeholder="请选择职位名称">
							<template v-for="item in jobNameArr">
								<Option :value="item">{{item}}</Option>
							</template>
						</Select>
					</Form-item>
					<Form-item label="学生姓名">
						<Input v-model="form.stuName" placeholder="请输入学生姓名"></Input>
					</Form-item>
					</Col>
					<Col span="8">
					<Form-item label="投递时间">
						<Row>
							<Col span="11">
							<Form-item>
								<Date-picker type="date" placeholder="选择日期" v-model="form.fromApplyDate"></Date-picker>
							</Form-item>
							</Col>
							<Col span="2" style="text-align: center">-</Col>
							<Col span="11">
							<Form-item>
								<Date-picker type="date" placeholder="选择日期" v-model="form.toApplyDate"></Date-picker>
							</Form-item>
							</Col>
						</Row>
					</Form-item>
					<Form-item label="毕业时间">
						<Row>
							<Col span="11">
							<Form-item>
								<Date-picker type="month" placeholder="选择日期" v-model="form.fromGraduateDate"></Date-picker>
							</Form-item>
							</Col>
							<Col span="2" style="text-align: center">-</Col>
							<Col span="11">
							<Form-item>
								<Date-picker type="month" placeholder="选择日期" v-model="form.toGraduateDate"></Date-picker>
							</Form-item>
							</Col>
						</Row>
					</Form-item>
					</Col>
					<Col span="4">
					<Form-item label="处理阶段">
						<Select v-model="form.sta" placeholder="请选择处理阶段">
							<Option value="1___">未处理</Option>
							<Option value="2___">待定</Option>
							<Option value="3___">不通过</Option>
							<Option value="4___">已淘汰</Option>
							<Option value="5___">确定offer</Option>
						</Select>
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
		<SelectUniversityModal :universityModal="universityModal" v-on:chooseSchool="receiveSchool" :max="6" :url="'/applications/findSchool?name='"></SelectUniversityModal>
	</div>
</template>
<script>
import SelectUniversityModal from '@/components/SelectUniversityModal/SelectUniversityModal'
import { dateToString } from '@/common/js/date.js'
import { formatDate } from '@/common/js/formatDate.js'
export default {
	data() {
		return {
			spinShow: false,
			universityModal: false,
			majorShow: false,
			pageTotal: 0,
			pageCurrent: 1,
			tempPageSize: 10,
			majorResult: [],
			stageArr: [],
			jobNameArr: [],
			self: this,
			recId: null,
			recName: '',
			data: [
				// {	
				// 	jobName: '研发培训生（车身内外饰）',
				// 	stuName: '关鑫',
				// 	school: '苏州科技大学',
				// 	major: '机械设计制造及其自动化',
				// 	degree: '本科',
				// 	endDate: '2017-06',
				// 	applyDate: '2017-05-24T21:02:40.074',
				// 	stageName: '初筛'
				// }
			],
			form: {
				school: '',
				major: '',
				degree: '',
				stage: '',
				jobName: '',
				stuName: '',
				fromApplyDate: '',
				toApplyDate: '',
				fromGraduateDate: '',
				toGraduateDate: '',
				sta: ''
			},
			columns: [
				{ type: 'index', width: 40, align: 'center' },
				{ title: '职位名称', key: 'jobName', align: 'center' },
				{ title: '学生姓名', key: 'stuName', align: 'center' },
				{ title: '学校', key: 'school', align: 'center' },
				{ title: '专业', key: 'major', align: 'center' },
				{ title: '学历', key: 'degree', align: 'center' },
				{ title: '毕业时间', key: 'endDate', align: 'center' },
				{ title: '投递时间', key: 'applyDate', align: 'center' },
				{ title: '投递阶段', key: 'stageName', align: 'center' }
			]
		}
	},
	created() {
		this.recId = this.$route.params.recId
		this.recName = this.$store.state.recName
		// 获取企业投递阶段
		this.$http.get('/recruiters/' + this.recId + '/flows')
			.then((res) => {
				if (res.data) {
					this.stageArr = res.data
				}
			})
		// 获取职位名称
		this.$http.get('/applications/' + this.recId + '/findTitle')
			.then((res) => {
				if (res.data) {
					this.jobNameArr = res.data
				}
			})
		// 获取公司学生申请表列表
		getApplicationData(this, 1, this.tempPageSize)
	},
	methods: {
		// 点击学校，弹出模态框
		selSchool() {
			this.universityModal = true
		},
		// 接受选择学校的模态框的数据
		receiveSchool(val) {
			if (val !== 'cancel') {
				this.form.school = val.join(',')
			}
			this.universityModal = false
		},
		// 搜索专业
		searchMajor() {
			if (this.form.major.length) {
				this.$http.get('/applications/findMajor?name=' + this.form.major)
					.then((res) => {
						if (res.data.length > 0) {
							this.majorShow = true
							this.majorResult = res.data
						} else {
							this.majorShow = false
						}
					}).catch((err) => {
						console.log(err)
					})
			} else {
				this.majorShow = false
			}
		},
		// 选择专业
		selMajor(val) {
			this.form.major = val
			this.majorShow = false
		},
		// 关闭专业搜索框
		closeSearchMajor() {
			setTimeout(() => {
				this.majorShow = false
			}, 100)
		},
		// 提交查询
		handleSubmit() {
			getApplicationData(this, 1, this.tempPageSize)
		},
		// 重置表单
		handleReset() {
			this.form = {
				school: '',
				major: '',
				degree: '',
				stage: '',
				jobName: '',
				stuName: '',
				fromApplyDate: '',
				toApplyDate: '',
				fromGraduateDate: '',
				toGraduateDate: '',
				sta: ''
			}
		},
		// 不知后端是否改page = 0 or 1 ?
		// 不知后端是否改page = 0 or 1 ?
		changePage(index) {
			// const pageNumber = index - 1

			getApplicationData(this, index, this.tempPageSize)
		},
		changePageSize(val) {
			this.tempPageSize = val
			this.pageCurrent = 1
			getApplicationData(this, 1, this.tempPageSize)
		}
	},
	components: {
		SelectUniversityModal
	}
}

function getApplicationData(thisVm, pageNumber, pageSize) {
	thisVm.spinShow = true
	thisVm.pageCurrent = pageNumber
	// 复制对象
	let dataObj = {}
	Object.assign(dataObj, thisVm.form)
	// 处理时间
	dataObj.fromApplyDate = dataObj.fromApplyDate ? formatDate(dateToString(dataObj.fromApplyDate)) : ''
	dataObj.toApplyDate = dataObj.toApplyDate ? formatDate(dateToString(dataObj.toApplyDate)) : ''
	dataObj.fromGraduateDate = dataObj.fromGraduateDate ? formatDate(dateToString(dataObj.fromGraduateDate)).substring(0, 7) : ''
	dataObj.toGraduateDate = dataObj.toGraduateDate ? formatDate(dateToString(dataObj.toGraduateDate)).substring(0, 7) : ''
	// 请求接口
	thisVm.$http.get('/applications/060a9367-83f5-4116-85e2-5e66913f4a2a?filter="rid":"' + thisVm.recId + '","pst":"' + dataObj.jobName + '","dgr":"' + dataObj.degree + '","scl":"' + dataObj.school + '","mj":"' + dataObj.major + '","stg":"' + dataObj.stage + '","sta":"' + dataObj.sta + '","nm":"' + dataObj.stuName + '","gdF":"' + dataObj.fromGraduateDate + '","gdT":"' + dataObj.toGraduateDate + '","dlF":"' + dataObj.fromApplyDate + '","dlT":"' + dataObj.toApplyDate + '","no":' + pageNumber + ',"sz":' + pageSize + ',"st":""')
		.then((res) => {
			if (res.data) {
				thisVm.pageTotal = res.data.total
				res.data.applicationListAdminDTOS.forEach((item) => {
					item.applyDate = item.applyDate.split('.')[0]
					item.applyDate = item.applyDate.replace('T', ' ')
				})
				thisVm.data = res.data.applicationListAdminDTOS
			}
			thisVm.spinShow = false
		}).catch((err) => {
			thisVm.spinShow = false
			console.log(err)
		})
}
</script>
<style>
.ivu-form .ivu-form-item-label {
	padding-right: 4px;
}
</style>
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