<template>
    <div class="content-view" id="stu">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="view-title">
            <span>职位投递记录</span>
        </div>
        <div class="back_btn">
            <router-link to="/stu/students" class="link"><Button type="primary">返回</Button></router-link>  
        </div>
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
    export default {
        name: 'stuApplication',
        props: {
            stuId: {
                type: String
            }
        },
        data() {
            return {
                self: this,
                pageTotal: 0,
                pageCurrent: 1,
                spinShow: false,
                tempPageSize: 10,
                data: [
                  /*{
                    "positionName": "产品经理",
                    "companyId": "7ba03e57-41cd-49ff-8d46-8ab1faa05e44",
                    "deliveryId": "c4fd6524-ea09-4834-ac4a-b56d4af40a48",
                    "positionId": "d0e4556a-9b9c-4215-98cb-e191660d763f",
                    "stage": "待筛选",
                    "companyName": "东方网力科技股份有限公司",
                    "deliveryDate": "2016-11-28 17:56"
                  },
                  {
                    "positionName": "产品经理",
                    "companyId": "7ba03e57-41cd-49ff-8d46-8ab1faa05e44",
                    "deliveryId": "ddf89703-4f1c-4e83-86e3-7d0b48945f0f",
                    "positionId": "1bcd8ef3-dae7-4f7b-aae0-34d051d85326",
                    "stage": "待筛选",
                    "companyName": "东方网力科技股份有限公司",
                    "deliveryDate": "2016-11-28 17:56"
                  },
                  {
                    "positionName": "平台运营岗位",
                    "companyId": "7a564373-17a1-46b5-bb71-f21e06b038d6",
                    "deliveryId": "b0e84418-5669-4dc2-98f8-949f386809f8",
                    "positionId": "4da4e984-1afc-4876-ae2c-1be9401d00bc",
                    "stage": "offer",
                    "companyName": "趣分期（北京）信息技术有限公司",
                    "deliveryDate": "2016-11-03 16:26"
                }*/
                ],
                columns: [
                    {
                        type: 'index',
                        width: 40,
                        align: 'center'
                    },
                    {
                        title: '公司名称',
                        key: 'companyName',
                        align: 'center'
                    },
                    {
                        title: '职位名称',
                        key: 'positionName',
                        align: 'center'
                    },
                    {
                        title: '投递时间',
                        key: 'deliveryDate',
                        align: 'center'
                    },
                    {
                        title: '投递阶段',
                        key: 'stage',
                        align: 'center'
                    }
                ]
            }
        },
        created() {
            getStuData(this, 0, this.tempPageSize)
        },
        methods: {
            changePage(index) {
                const pageNumber = index - 1
                getStuData(this, pageNumber, this.tempPageSize)
            },
            changePageSize(val) {
                this.tempPageSize = val
                getStuData(this, 0, this.tempPageSize)
            }
        }
    }
    function getStuData(thisVm, pageNumber, pageSize) {
        thisVm.spinShow = true
        thisVm.pageCurrent = pageNumber + 1
        thisVm.$http.get('/student/'+ thisVm.$route.params.stuId +'/applicationRecord?page='+ pageNumber +'&size='+ pageSize)
        .then((res) => {
            if (res.data.data.length === 0) {
                thisVm.spinShow = false
            }
            if (res.data.data.length > 0) {
                thisVm.spinShow = false
                thisVm.data = res.data.data
                thisVm.pageTotal = res.data.totalCount
            }
        }).catch((err) => {
            console.log(err)
        })
    }
</script>
<style scoped>
.back_btn{margin-bottom: 16px;}
</style>