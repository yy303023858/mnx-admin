<template>
    <div class="content-view">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="view-title">
            <span>首页-热招职位</span>
            <Breadcrumb>
                <Breadcrumb-item>
                    <router-link to="/">主页</router-link>
                </Breadcrumb-item>
                <Breadcrumb-item>广告位管理</Breadcrumb-item>
                <Breadcrumb-item>首页-热招职位</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <Card class="form_card">
            <h3 class="ad_hot_subtitle">首页-热招职位在线广告</h3>
            <Table border :columns="columns" :data="data" :context="self"></Table>
        </Card>
        <Card class="form_card">
            <h3 class="ad_hot_subtitle">首页-热招职位替补广告</h3>
            <Table border :columns="columns" :data="data" :context="self"></Table>
        </Card>
        <Modal v-model="changeAdShow" title="更换广告页面" @on-ok="" @on-cancel="">
            <Form :model="form" :label-width="62">
                <Form-item label="广告内容">
                    <Input v-model="form.content" placeholder="请输入广告内容"></Input>
                </Form-item>
                <Form-item label="投放时间" v-if="adOnline">
                    <Row>
                        <Col span="11">
                        <Date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择开始日期和时间" v-model="form.startTime"></Date-picker>
                        </Col>
                        <Col span="2" style="text-align: center;color: #657180">——</Col>
                        <Col span="11">
                        <Date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择开始日期和时间" v-model="form.endTime"></Date-picker>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item v-else label="投放方式">

                </Form-item>
            </Form>
        </Modal>
    </div>
</template>
<script>
export default {
    data() {
        return {
            self: this,
            spinShow: false,
            pageTotal: 0,
            pageCurrent: 1,
            tempPageSize: 10,
            changeAdShow: false,
            changeSpareAdShow: false,
            adOnline: true,
            form: {
                content: '',
                startTime: '',
                endTime: ''
            },
            data: [
                {
                    fullName: '携程计算机有限公司',
                    appCount: 1000,
                    stuCount: 1000,
                    city: '北京',
                    industry: '互联网'
                }
            ],
            columns: [
                {
                    type: 'index',
                    title: '广告位位置',
                    align: 'center'
                },
                {
                    title: '广告位名称',
                    key: 'fullName',
                    align: 'center'
                },
                {
                    title: '类型',
                    key: 'appCount',
                    align: 'center'
                },
                {
                    title: '链接',
                    key: 'stuCount',
                    align: 'center'
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 160,
                    render(row, column, index) {
                        return `<i-button type="primary" size="small" @click.native="changeAd(${index})">更换广告</i-button>
                        <i-button type="primary" size="small" @click.native="checkApplication(${index})">
                            <Icon type="arrow-up-a"></Icon>
                        </i-button>
                        <i-button type="primary" size="small" @click.native="checkApplication(${index})">
                            <Icon type="arrow-down-a"></Icon>
                        </i-button>`
                    }
                }
            ]
        }
    },
    methods: {
        changeAd() {
            this.changeAdShow = true
        }
    }
}
</script>
<style scoped>
.form_card{margin-bottom: 20px;}
.ad_hot_subtitle{margin-bottom: 8px;}
</style>



