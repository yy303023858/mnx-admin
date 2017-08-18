<template>
    <div class="content-view" id="stats-special">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="view-title">
            <span>专项统计</span>
            <Breadcrumb>
                <Breadcrumb-item>
                    <router-link to="/">主页</router-link>
                </Breadcrumb-item>
                <Breadcrumb-item>数据统计</Breadcrumb-item>
                <Breadcrumb-item>专项统计</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <Card class="search_card">
            <div class="searchCompany">
                <Input v-model="searchInput" placeholder="请输入查询的公司名字" @on-change="searchCompany" @on-blur="closeSearchCompany"></Input>
                <div class="search_result" v-show="showCompanyResult">
                    <ul>
                        <li v-for="item in searchCompanyData" class="search_result_item" @click="selectCompany(item)">{{item.recName}}</li>
                    </ul>
                </div>
            </div>
            <Button type="primary" @click="searchWithRecname">查询</Button>
            <Button type="primary" @click="addRecModal = true">添加客户公司</Button>
            <Modal v-model="addRecModal" title="客户专项统计" @on-ok="ok" @on-cancel="cancel">
                <Form ref="formValidate" :model="formValidate" :label-width="88">
                    <Form-item label="客户名称" prop="recName">
                        <Input v-model="formValidate.recName" placeholder="请输入公司名称" @on-change="search" @on-blur="closeSearch" icon="search" :disabled="isEdit"></Input>
                        <div class="search_result" v-show="showResult">
                            <ul>
                                <li v-for="item in searchResultData" class="search_result_item" @click="selectResult(item)">{{item.recName}}</li>
                            </ul>
                        </div>
                    </Form-item>
                    <Form-item label="目标简历数" prop="targetCount">
                        <Input v-model="formValidate.targetCount" placeholder="请输入目标简历数"></Input>
                    </Form-item>
                    <Form-item label="日期">
                        <Row>
                            <Col span="11">
                            <Form-item prop="startDate">
                                <Date-picker type="date" placeholder="选择日期" v-model="formValidate.startDate"></Date-picker>
                            </Form-item>
                            </Col>
                            <Col span="2" style="text-align: center">-</Col>
                            <Col span="11">
                            <Form-item prop="endDate">
                                <Date-picker type="date" placeholder="选择日期" v-model="formValidate.endDate"></Date-picker>
                            </Form-item>
                            </Col>
                        </Row>
                    </Form-item>
                </Form>
            </Modal>
            <Modal v-model="detailModal" title="简历完成情况" width="660">
                <Table border :columns="detailColumns" :data="detailData" width="628"></Table>
                <div slot="footer">
                    <div>
                        <Page :total="detailPageTotal" :current="detailPageCurrent" @on-change="detailChangePage" @on-page-size-change="detailChangePageSize" show-elevator show-total></Page>
                    </div>
                </div>
            </Modal>
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
import { formatDate } from '@/common/js/formatDate.js'
import { dateToString } from '@/common/js/date.js'
export default {
    data() {
        return {
            self: this,
            spinShow: false,
            isEdit: false,
            pageTotal: 0,
            detailPageTotal: 0,
            pageCurrent: 1,
            detailPageCurrent: 1,
            addRecModal: false,
            detailModal: false,
            showResult: false,
            tempDetailIndex: 0,
            tempPageSize: 10,
            tempDetailSize: 10,
            searchInput: '',
            showCompanyResult: false,
            columns: [
                {
                    title: '客户名称',
                    key: 'recName',
                    align: 'center',
                    render(row, column, index) {
                        return `<i-button type="text" @click="openDetailModal(${index})">{{data[${index}].recName}}</i-button>`
                    }
                },
                {
                    title: '日期',
                    key: 'date',
                    width: "28%",
                    align: 'center',
                    render(row, column, index) {
                        return `<span>{{data[${index}].startDate}}</span>
                                    <span>——</span>
                                    <span>{{data[${index}].endDate}}</span>`
                    }
                },
                {
                    title: '目标简历数',
                    key: 'targetCount',
                    width: "14%",
                    align: 'center'
                },
                {
                    title: '简历投递总量',
                    key: 'appCount',
                    width: "14%",
                    align: 'center'
                },
                {
                    title: '完成率',
                    key: 'appCompletionRate',
                    width: "13%",
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'kc',
                    align: 'center',
                    width: 150,
                    render(row, colume, index) {
                        return `<i-button type="primary" size="small" @click="editRec(${index})">修改</i-button>
                            <i-button type="primary" size="small" @click="deleteRec(${index})">删除</i-button>`
                    }
                }
            ],
            data: [
                // {
                //     recName: '携程计算机有限公司',
                //     targetCount: 20,
                //     startDate: '2017-02-02',
                //     endDate: '2017-02-02',
                //     appCompletionRate: '20%'
                // }
            ],
            detailColumns: [
                { title: '日期', key: 'statTime', align: 'center' },
                { title: '目标简历数', key: 'targetCount', align: 'center' },
                { title: '当日实收简历数', key: 'appAccount', align: 'center' },
                { title: '当日在线职位量', key: 'jobCount', align: 'center' },
                { title: '完成率', key: 'appCompletionRate', align: 'center' }
            ],
            detailData: [],
            formValidate: {
                id: {
                    recId: '',
                    uid: '02155bb9-7938-49b5-b00b-529f9e7d98b8'
                },
                recName: '',
                startDate: '',
                endDate: '',
                targetCount: '',
                adminName: 'admin'
            },
            searchResultData: [],
            searchCompanyData: [],
            recList: {}
        }
    },
    created() {
        recSpecialData(this, 0, 10)
    },
    methods: {
        // 模糊查询公司，搜索公司
        searchCompany() {
            if (this.searchInput.length) {
                this.$http.get('/stats/recruitersSpecials/recNameLike?uid=02155bb9-7938-49b5-b00b-529f9e7d98b8&recName=' + this.searchInput)
                    .then((response) => {
                        if (response.data.length) {
                            const temArr = []
                            response.data.forEach((item) => {
                                const obj = {}
                                obj.recName = item.fullName
                                obj.recId = item.id
                                temArr.push(obj)
                            })
                            this.searchCompanyData = temArr
                            this.showCompanyResult = true
                        }
                    }).catch((error) => {
                        this.$Message.error('查询客户出现错误')
                    })
            } else {
                this.showCompanyResult = false
            }
        },
        selectCompany(item) {
            this.searchInput = item.recName
            this.showCompanyResult = false
        },
        closeSearchCompany() {
            setTimeout(() => {
                this.showCompanyResult = false
            }, 100)
        },
        searchWithRecname() {
            recSpecialData(this, 0, this.tempPageSize)
        },
        // 模糊查询公司
        search() {
            if (this.formValidate.recName.length) {
                this.$http.get('/stats/recruitersSpecials/recNameLike?uid=02155bb9-7938-49b5-b00b-529f9e7d98b8&recName=' + this.formValidate.recName)
                    .then((response) => {
                        if (response.data.length) {
                            const temArr = []
                            response.data.forEach((item) => {
                                const obj = {}
                                obj.recName = item.fullName
                                obj.recId = item.id
                                temArr.push(obj)
                            })
                            this.searchResultData = temArr
                            this.showResult = true
                        }
                    }).catch((error) => {
                        this.$Message.error('查询客户出现错误')
                    })
            } else {
                this.showResult = false
            }
        },
        selectResult(item) {
            this.formValidate.id.recId = item.recId
            this.formValidate.recName = item.recName
            this.showResult = false
        },
        closeSearch() {
            setTimeout(() => {
                this.showResult = false
            }, 100);
        },
        ok() {
            if (this.isEdit) {
                // 修改客户公司
                const jsonData = {}
                Object.assign(jsonData, this.formValidate);
                jsonData.startDate = dateToString(jsonData.startDate)
                jsonData.endDate = dateToString(jsonData.endDate)
                this.$http.put('/stats/recruitersSpecials?uid=02155bb9-7938-49b5-b00b-529f9e7d98b8', jsonData)
                    .then((response) => {
                        if (response.data.success) {
                            this.$Message.success('修改成功')
                            recSpecialData(this, 0, this.tempPageSize)
                        } else {
                            this.$Message.error('修改失败')
                        }
                    }).catch((error) => {
                        this.$Message.error('错误')
                    })
                this.isEdit = false
                this.$refs.formValidate.resetFields()
            } else {
                if (this.formValidate.id.recId && this.formValidate.recName && this.formValidate.startDate && this.formValidate.endDate && this.formValidate.targetCount) {
                    // 添加客户公司
                    const jsonObj = this.formValidate
                    jsonObj.startDate = dateToString(jsonObj.startDate)
                    jsonObj.endDate = dateToString(jsonObj.endDate)
                    this.$http.post('/stats/recruitersSpecials?uid=02155bb9-7938-49b5-b00b-529f9e7d98b8', jsonObj)
                        .then((response) => {
                            if (response.data.success) {
                                this.$Message.success('添加成功')
                                recSpecialData(this, 0, this.tempPageSize)
                            } else {
                                this.$Message.error('添加失败')
                            }
                            this.$refs.formValidate.resetFields()
                        }).catch(() => {
                            this.$Message.error('错误')
                        })
                }
            }

        },
        cancel() {
            this.isEdit = false
            this.$refs.formValidate.resetFields()
        },
        editRec(index) {
            this.isEdit = true
            Object.assign(this.formValidate, this.data[index])
            this.addRecModal = true
        },
        deleteRec(index) {
            this.$http.delete('/stats/recruitersSpecials/02155bb9-7938-49b5-b00b-529f9e7d98b8/' + this.data[index].id.recId)
                .then((response) => {
                    if (response.data.success) {
                        this.$Message.success('删除成功')
                        recSpecialData(this, 0, this.tempPageSize)
                    } else {
                        this.$Message.error('删除成功')
                    }
                })
        },
        changePage(index) {
            const pageNumber = index - 1
            recSpecialData(this, pageNumber, this.tempPageSize)
        },
        changePageSize(val) {
            this.tempPageSize = val
            recSpecialData(this, 0, this.tempPageSize)
        },
        openDetailModal(index) {
            this.tempDetailIndex = index
            this.tempPageSize = 10
            detailData(this, 0, this.tempPageSize)
        },
        detailChangePage(index) {
            const pageNumber = index - 1
            detailData(this, pageNumber, this.tempDetailSize)
        },
        detailChangePageSize(val) {
            this.tempDetailSize = val
            detailData(this, 0, this.tempDetailSize)
        }
    }
}
function recSpecialData(thisVm, pageNumber, pageSize) {
    thisVm.spinShow = true
    thisVm.pageCurrent = pageNumber + 1
    thisVm.$http.get('/stats/recruitersSpecials/02155bb9-7938-49b5-b00b-529f9e7d98b8?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&recName=' + thisVm.searchInput)
        .then((response) => {
            console.log(response)
            if (response.data.list.length) {
                thisVm.spinShow = false
                thisVm.data = []
                thisVm.pageTotal = response.data.total
                response.data.list.forEach((item, index) => {
                    const arrIndex = index
                    item.startDate = formatDate(item.startDate)
                    item.endDate = formatDate(item.endDate)
                    item.appCompletionRate = item.appCompletionRate && item.appCompletionRate * 100 + '%'
                    thisVm.$set(thisVm.data, arrIndex, item)
                })
            }
        })
}
function detailData(thisVm, pageNumber, pageSize) {
    thisVm.spinShow = true
    thisVm.detailPageCurrent = pageNumber + 1
    thisVm.$http.get('/stats/recruitersSpecialStats?uid=02155bb9-7938-49b5-b00b-529f9e7d98b8&recId=' + thisVm.data[thisVm.tempDetailIndex].id.recId + '&pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&from=' + thisVm.data[thisVm.tempDetailIndex].startDate + '&to=' + thisVm.data[thisVm.tempDetailIndex].endDate)
        .then((res) => {
            thisVm.spinShow = false
            thisVm.detailData = []
            thisVm.detailPageTotal = res.data.total
            res.data.list.forEach((item, index) => {
                const arrIndex = index
                item.appCompletionRate = item.appCompletionRate && item.appCompletionRate * 100 + '%'
                thisVm.$set(thisVm.detailData, arrIndex, item)
            })
        })
    thisVm.detailModal = true
}
</script>
<style scoped>
.search_result {
    position: absolute;
    left: 0;
    top: 32px;
    z-index: 30;
    width: 100%;
    max-height: 300px;
    overflow: auto;
    border: 1px solid #d7dde4;
    border-radius: 4px;
    background-color: #fff;
    text-indent: 7px;
}

.search_result_item:hover {
    background-color: #ebf7ff;
    cursor: pointer;
}

.searchCompany {
    position: relative;
    display: inline-block;
    width: 300px;
    line-height: 32px;
}
</style>