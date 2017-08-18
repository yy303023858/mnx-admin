<template>
    <div class="content-view">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="view-title">
            <span>公司数据统计</span>
            <Breadcrumb>
                <Breadcrumb-item><router-link to="/">主页</router-link></Breadcrumb-item>
                <Breadcrumb-item>数据统计</Breadcrumb-item>
                <Breadcrumb-item>公司数据统计</Breadcrumb-item>
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
    import { getCountData } from '@/common/js/getCountData.js'
	export default {
		data() {
			return {
				self: this,
				pageTotal: 0,
                pageCurrent: 1,
                spinShow: false,
				columns: [
                    {
                        title: '日期',
                        key: 'date',
                        align: 'center'
                    },
                    {
                        title: '签单KA客户量',
                        key: 'rec_total_ka',
                        align: 'center'
                    },
                    {
                        title: '签单自主申请客户量',
                        key: 'rec_total_self',
                        align: 'center'
                    },
                    {
                        title: '客户公司总量',
                        key: 'rec_total',
                        align: 'center'
                    },
                    {
                        title: '待审核客户公司量',
                        key: 'rec_audit_total',
                        align: 'center'
                    },
                    {
                        title: '有在线职位的客户公司量',
                        key: 'rec_online_req_total',
                        align: 'center'
                    }
                ],
                data: [
                    /*{
                        date: '2017-03-30',
                        rec_total_ka: '20',
                        rec_total_self: '20',
                        rec_total: '20',
                        rec_audit_total: '20',
                        rec_online_req_total: '20'
                    }*/
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
            getCountData(this, 0, 'STAT_RECRUITERS', '/stats/recruiter/day/02155bb9-7938-49b5-b00b-529f9e7d98b8')
        },
		methods: {
			handleSubmit() {
                getCountData(this, 0, 'STAT_RECRUITERS', '/stats/recruiter/day/02155bb9-7938-49b5-b00b-529f9e7d98b8')
			},
			changePage(index) {
                const pageNumber = index - 1
                getCountData(this, pageNumber, 'STAT_RECRUITERS', '/stats/recruiter/day/02155bb9-7938-49b5-b00b-529f9e7d98b8')
			},
            changePageSize(val) {
                this.formValidate.pageSize = val
                getCountData(this, 0, 'STAT_RECRUITERS', '/stats/recruiter/day/02155bb9-7938-49b5-b00b-529f9e7d98b8')
            }
		}
	}
</script>
<style></style>