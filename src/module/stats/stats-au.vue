<template>
    <div class="content-view">
        <!-- <Spin size="large" fix v-if="spinShow"></Spin> -->
        <div class="view-title">
            <span>用户活跃度</span>
            <Breadcrumb>
                <Breadcrumb-item><router-link to="/">主页</router-link></Breadcrumb-item>
                <Breadcrumb-item>数据统计</Breadcrumb-item>
                <Breadcrumb-item>用户活跃度</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <Card class="search_card" id="au_card">
            <Button-group class="au_inline">
                <Button @click="tabBtn('整体')" v-bind:class="{ tabBtnActive: btnType==='整体' }">整体</Button>
                <Button @click="tabBtn('PC')" v-bind:class="{ tabBtnActive: btnType==='PC' }">PC</Button>
                <Button @click="tabBtn('微信')" v-bind:class="{ tabBtnActive: btnType==='微信' }">微信</Button>
            </Button-group>
            <Select v-model="formValidate.pickerType" class="au_inline" id="au_select">
                <Option value="month">月报</Option>
                <Option value="date">日报</Option>
            </Select>
            <div v-show="formValidate.pickerType === 'month'" class="au_inline">
                <Date-picker type="month" placeholder="选择月份" v-model="formValidate.validityMin" class="au_inline"></Date-picker>
                <Date-picker type="month" placeholder="选择月份" v-model="formValidate.validityMax" class="au_inline"></Date-picker>
            </div>
            <div v-show="formValidate.pickerType === 'date'" class="au_inline">
                <Date-picker type="date" placeholder="选择日期" v-model="formValidate.validityMin" class="au_inline"></Date-picker>
                <Date-picker type="date" placeholder="选择日期" v-model="formValidate.validityMax" class="au_inline"></Date-picker>
            </div>
            <Button type="primary" @click="handleSubmit" class="au_inline">查询</Button>
        </Card>

        <Card class="form_card">
            <Table border :columns="columns" :data="data" :context="self" ></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="pageTotal" :current="pageCurrent" @on-change="changePage" show-elevator show-total></Page>
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
	export default {
		data() {
			return {
				self: this,
				pageTotal: 0,
                pageCurrent: 1,
                btnType:'整体',
                isActive: true,
                columns: [
                {
                    title: '日期',
                    key: 'date',
                    align: 'center'
                },
                {
                    title: '当日申请表创建量',
                    key: 'ka',
                    align: 'center'
                },
                {
                    title: '当日站内申请表创建量',
                    key: 'kb',
                    align: 'center'
                },
                {
                    title: '当日站外申请表创建量',
                    key: 'total',
                    align: 'center'
                },
                {
                    title: '当日站内投递成功申请量',
                    key: 'kc',
                    align: 'center'
                },
                {
                    title: '当日创建申请表用户量',
                    key: 'kc',
                    align: 'center'
                },
                {
                    title: '截止当日站内待投递申请表总量',
                    key: 'kc',
                    align: 'center'
                }
                ],
                data: [
                {
                    date: '2017-03-30',
                    ka: '20',
                    kb: '20',
                    kc: '20',
                    total: '20',
                }
                ],
                formValidate: {
                    validityMinMonth: '',
                    validityMaxMonth: '',
                    validityMinDate: '',
                    validityMaxDate: '',
                    pickerType: 'month'
                }
            }
        },
        methods: {
            tabBtn(val) {
                this.btnType = val
            },
            handleSubmit() {

            },
            changePage() {

            }
       }
   }
</script>
<style>
    .au_inline{display: inline-block;margin-right: 10px;}
    .ivu-btn.tabBtnActive{background-color: #39f;border-color: #39f;}
    .tabBtnActive span{color: #fff;}
    #au_select{width: 100px;}
    #au_card{padding-bottom: 24px;}
</style>