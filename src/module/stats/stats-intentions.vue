<template>
    <div class="content-view">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="view-title">
            <span>自主注册客户</span>
            <Breadcrumb>
                <Breadcrumb-item><router-link to="/">主页</router-link></Breadcrumb-item>
                <Breadcrumb-item>数据统计</Breadcrumb-item>
                <Breadcrumb-item>自主注册客户</Breadcrumb-item>
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
                spinShow: true,
				columns: [
                    {
                        title: '日期',
                        key: 'date',
                        align: 'center'
                    },
                    {
                        title: '自主注册客户总量',
                        key: 'soe_total',
                        align: 'center'
                    },
                    {
                        title: '待处理客户量',
                        key: 'soe_total_pending',
                        align: 'center'
                    },
                    {
                        title: '跟进中客户量',
                        key: 'soe_total_follow',
                        align: 'center'
                    },
                    {
                        title: '已签单客户量',
                        key: 'soe_total_signed',
                        align: 'center'
                    },
                    {
                        title: '已拒绝客户量',
                        key: 'soe_total_reject',
                        align: 'center'
                    }
                ],
                data: [
                    /*{
                        date: '2017-03-30',
                        soe_total: '20',
                        soe_total_pending: '20',
                        soe_total_follow: '20',
                        soe_total_signed: '20',
                        soe_total_reject: '20',
                    }*/
                ],
                formValidate: {
                    from: '',
                    to: '',
                    type : '',
                    total: 0,
                    pageNumber: 0,
                    pageSize: 10
                }
			}
		},
        created() {
            getCountData(this, 0, "STAT_INTENTIONS", '/stats/recruiter/day/02155bb9-7938-49b5-b00b-529f9e7d98b8')
        },
		methods: {
			handleSubmit() {
                getCountData(this, 0, "STAT_INTENTIONS", '/stats/recruiter/day/02155bb9-7938-49b5-b00b-529f9e7d98b8')
            },
            changePage(index) {
                const pageNumber = index - 1
                getCountData(this, pageNumber, "STAT_INTENTIONS", '/stats/recruiter/day/02155bb9-7938-49b5-b00b-529f9e7d98b8')
            },
            changePageSize(val) {
                this.formValidate.pageSize = val
                getCountData(this, 0, "STAT_INTENTIONS", '/stats/recruiter/day/02155bb9-7938-49b5-b00b-529f9e7d98b8')
            }
		}
	}
</script>
<style></style>