<template>
    <div class="content-view">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="view-title">
            <span>投递数据统计</span>
            <Breadcrumb>
                <Breadcrumb-item><router-link to="/">主页</router-link></Breadcrumb-item>
                <Breadcrumb-item>数据统计</Breadcrumb-item>
                <Breadcrumb-item>投递数据统计</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <Card class="search_card">
            <Form ref="formValidate" :model="formValidate" :label-width="50" inline>
                <Form-item label="日期">
                    <Row>
                        <Col span="11">
                            <Form-item prop="from">
                                <Date-picker type="date" placeholder="选择日期" v-model="formValidate.from"></Date-picker>
                            </Form-item>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <Form-item prop="to">
                                <Date-picker type="date" placeholder="选择日期" v-model="formValidate.to"></Date-picker>
                            </Form-item>
                        </Col>
                    </Row>
                </Form-item>
            <Button type="primary" @click="handleSubmit('formValidate')">查询</Button>
            </Form>
        </Card>
        <Card class="form_card">
        	<Table border :columns="columns" :data="data" :context="self" ></Table>
        	<div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="pageTotal" :current="pageCurrent" @on-change="changePage" @on-page-size-change="changePageSize" show-elevator show-total show-sizer></Page>
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
    import { getCountData } from '@/common/js/getCountData.js'
	export default {
		data() {
			return {
				self: this,
				pageTotal: 0,
                pageCurrent: 1,
				columns: [
                    {
                        title: '日期',
                        key: 'date',
                        align: 'center'
                    },
                    {
                        title: '当日申请表创建量',
                        key: 'app_total',
                        align: 'center'
                    },
                    {
                        title: '当日站内申请表创建量',
                        key: 'app_total_inner',
                        align: 'center'
                    },
                    {
                        title: '当日站外申请表创建量',
                        key: 'app_total_outer',
                        align: 'center'
                    },
                    {
                        title: '当日站内投递成功申请量',
                        key: 'app_total_inner_finished',
                        align: 'center'
                    },
                    {
                        title: '当日创建申请表用户量',
                        key: 'app_total_user_created',
                        align: 'center'
                    },
                    {
                        title: '当日在PC端创建申请表用户量',
                        key: 'app_total_user_created_pc',
                        align: 'center'
                    },
                    {
                        title: '当日在移动端创建申请表用户量',
                        key: 'app_total_user_created_mobi',
                        align: 'center'
                    },
                    {
                        title: '截止当日站内待投递申请表总量',
                        key: 'app_total_inner_pending',
                        align: 'center'
                    }
                ],
                data: [
                    // {
                    //     date: '2017-03-30',
                    //     app_total: '2034',
                    //     app_total_inner: '201',
                    //     app_total_outer: '240',
                    //     app_total_inner_finished: '230',
                    //     kc: '20',
                    //     app_total_inner_pending: '204'
                    // }
                ],
                formValidate: {
                    from: null,
                    to: null,
                    type : "",
                    total: 0,
                    pageNumber: 0,
                    pageSize: 10
                }
			}
		},
        created() {
            getCountData(this, 0, 'STAT_APPLICATION  ', '/stats/stu/day/02155bb9-7938-49b5-b00b-529f9e7d98b8')
        },
		methods: {
			handleSubmit() {
                getCountData(this, 0, 'STAT_APPLICATION  ', '/stats/stu/day/02155bb9-7938-49b5-b00b-529f9e7d98b8')
			},
			changePage(index) {
                const pageNumber = index - 1
                getCountData(this, pageNumber, 'STAT_APPLICATION  ', '/stats/stu/day/02155bb9-7938-49b5-b00b-529f9e7d98b8')
			},
            changePageSize(val) {
                this.formValidate.pageSize = val
                getCountData(this, 0, 'STAT_APPLICATION  ', '/stats/stu/day/02155bb9-7938-49b5-b00b-529f9e7d98b8')
            }
		}
	}
</script>
<style></style>