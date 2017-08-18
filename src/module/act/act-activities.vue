<template>
    <div class="content-view" id="stu">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="view-title">
            <span>活动管理</span>
            <Breadcrumb>
                <Breadcrumb-item><router-link to="/">主页</router-link></Breadcrumb-item>
                <Breadcrumb-item>活动管理</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <Card class="search_card">
        	<Form ref="formValidate" :model="formValidate" :label-width="70">
        		<Row>
        			<Col span="9">
        				<Row>
        					<Col span="12">
        						<Form-item label="活动名称" prop="name">
					                <Input v-model="formValidate.name" placeholder="请输入活动名称"></Input>
					            </Form-item>
        					</Col>
        					<Col span="12">
        						<Form-item label="状态" prop="status" :label-width="60">
								    <Select v-model="formValidate.status" placeholder="请选择状态">
								        <Option value="">全部</Option>
								        <Option value="1">未开始</Option>
								        <Option value="3">举办中</Option>
								        <Option value="4">已结束</Option>
								        <Option value="5">已删除</Option>
								    </Select>
								</Form-item>
        					</Col>
        				</Row>
        			</Col>
        			<Col span="6">
                        <Form-item>
            				<div class="company-form-btn">
    		        	        <Button type="primary" @click="handleSubmit">查询</Button>
    		        	        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
    		        	    </div>
                        </Form-item>
        			</Col>
                    <router-link to="/act/createAct/ "><Button type="primary" @click="" style="float:right;">创建活动</Button></router-link>
        		</Row>
        	</Form>
        </Card>
        <Card class="form_card">
        	<Table border :columns="columns" :data="data" :context="self"></Table>
            <Modal
                v-model="linkShow"
                title="链接">
                <ul>
                    <li class="link-item"><strong class="link-title">活动名称</strong><span>{{linkShowData.name}}</span></li>
                    <li class="link-item"><strong class="link-title">活动地点</strong><span>{{linkShowData.address}}</span></li>
                    <li class="link-item"><strong class="link-title">网页端网址</strong><span>{{linkShowData.urlWeb}}</span></li>
                    <li class="link-item"><strong class="link-title">微信端网址</strong><span>{{linkShowData.urlWX}}</span></li>
                    <li class="link-item"><strong class="link-title">微信分享</strong><qriously :value="linkShowData.urlWX" :size="300" /></li>
                </ul>
                <div slot="footer"></div>
            </Modal>
        	<div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="pageTotal" :current="pageCurrent" @on-change="changePage" @on-page-size-change="changePageSize" show-elevator show-total show-sizer></Page>
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
	export default {
		data() {
			return {
				spinShow: false,
                linkShow: false,
                linkShowData: {
                    urlWX: 'hello'
                },
				self: this,
				pageTotal: 0,
                pageCurrent: 1,
                tempPageSize: 10,
                activeData: null,
				formValidate: {
				    name: '',
                    status: ''
				},
				data: [
					// {
					// 	name: '2010年书法大赛',
					// 	urlWeb: 'http://www.minixiao.com/activity/st/36ac7879-21b9-4ac9-bf79-c6c66dad56fe.html',
					// 	startTime: '2016-10-14 00:00:00',
					// 	endTime: '2017-07-31 10:25:00',
					// 	address: '上海市徐汇区漕河泾开发区桂平路391心B座90楼',
					// 	status: '3'
					// }
				],
				columns: [
                    {
                        type: 'index',
                        width: 40,
                        align: 'center'
                    },
                    {
                        title: '活动名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '链接',
                        align: 'urlWeb',
                        align: 'center',
                        render(row, column, index) {
                            return `<i-button type="text" @click.native="clickLink(${index})">链接</i-button>`
                        }
                    },
                    {
                        title: '活动时间',
                        key: 'date',
                        align: 'center',
                        width: 300,
                        render(row, column, index) {
                        	return `<span>{{data[${index}].startTime}}</span>——<span>{{data[${index}].endTime}}</span>`
                        }
                    },
                    {
                        title: '活动地点',
                        key: 'address',
                        align: 'center'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render(row, column, index) {
                        	return `<i-button type="primary" size="small" @click.native="editActivity(${index})">编辑</i-button>
                        			<i-button type="primary" size="small" @click.native="delActivity(${index})">删除</i-button>
                        			<i-button type="primary" size="small" disabled>报名管理</i-button>
                        			<i-button type="primary" size="small" disabled>简历导出</i-button>`
                        }
                    }
                ]
			}
		},
        created() {
            getActivities(this, this.$store.state.prePage, this.tempPageSize)
        },
		methods: {
            handleSubmit() {
                getActivities(this, 0, this.tempPageSize)
            },
            handleReset(name) {
                this.$refs[name].resetFields()
            },
            clickLink(index) {
                this.linkShow = true
                this.linkShowData = this.data[index]
            },
            editActivity(index) {
                this.$store.commit('changePrePage', this.pageCurrent - 1)
                this.$router.push('/act/createAct/' + this.data[index].id)
            },
            delActivity(index) {
                this.$http.delete('/activity/' + this.data[index].id)
                .then((res) => {
                    if (res.status === 200) {
                        getActivities(this, this.pageCurrent - 1, this.tempPageSize)
                    }
                })
            },
			changePage(index) {
                const pageNumber = index - 1
                getActivities(this, pageNumber, this.tempPageSize)
			},
			changePageSize(val) {
				this.tempPageSize = val
                getActivities(this, 0, this.tempPageSize)
			}
		}
	}
    function getActivities(thisVm, pageNumber, pageSize) {
        thisVm.spinShow = true
        thisVm.$http.get('/activity?page='+ pageNumber +'&size=' + pageSize + '&status='+ thisVm.formValidate.status +'&name=' + thisVm.formValidate.name)
        .then((res) => {
            if (res.data) {
                thisVm.spinShow = false
                thisVm.pageTotal = res.data.totalElements
                thisVm.pageCurrent = res.data.number + 1
                thisVm.data = []
                res.data.content.forEach((item, index) => {
                    switch (item.status) {
                        case 1:
                            item.status = '未开始'
                            break;
                        case 3:
                            item.status = '举办中'
                            break;
                        case 4:
                            item.status = '已结束'
                            break;
                        case 5:
                            item.status = '已删除'
                            break;
                        default:
                            item.status = ''
                            break;
                    }
                    thisVm.$set(thisVm.data, index, item)
                })
            }
        })
    }
</script>
<style scoped>
.company-form-btn{margin-left: 36px;transform: translateX(0);text-align: left;}
.link-item{display: flex;padding-bottom: 20px;font-size: 14px;}
.link-title{width: 100px;flex: 0 0 100px;}
</style>