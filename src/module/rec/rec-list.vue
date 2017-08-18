<template>
    <div class="content-view">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="view-title">
            <span>公司查询</span>
            <Breadcrumb>
                <Breadcrumb-item>
                    <router-link to="/">主页</router-link>
                </Breadcrumb-item>
                <Breadcrumb-item>客户管理</Breadcrumb-item>
                <Breadcrumb-item>公司查询</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <!-- <p>{{formValidate}}</p> -->
        <Card class="search_card">
            <Form ref="formValidate" :model="formValidate" :label-width="110">
                <Row>
                    <Col span="6">
                    <Form-item label="公司名称" prop="fullName">
                        <Input v-model="formValidate.fullName" placeholder="请输入公司名称" name="fullName"></Input>
                    </Form-item>
                    <Form-item label="城市" prop="city">
                        <Input v-model="formValidate.city" placeholder="请输入所在城市" name="city"></Input>
                    </Form-item>
                    </Col>
                    <Col span="10">
                    <Form-item label="公司创建时间" :label-width="140">
                        <Row>
                            <Col span="11">
                            <Form-item prop="createMin">
                                <Date-picker type="date" placeholder="选择日期" v-model="formValidate.createMin" name="createMin"></Date-picker>
                            </Form-item>
                            </Col>
                            <Col span="2" style="text-align: center">-</Col>
                            <Col span="11">
                            <Form-item prop="createMax">
                                <Date-picker type="date" placeholder="选择日期" v-model="formValidate.createMax" name="createMax"></Date-picker>
                            </Form-item>
                            </Col>
                        </Row>
                    </Form-item>
                    <Form-item label="使用有效期截止时间" :label-width="140">
                        <Row>
                            <Col span="11">
                            <Form-item prop="validityMin">
                                <Date-picker type="date" placeholder="选择日期" v-model="formValidate.validityMin" name="validityMin"></Date-picker>
                            </Form-item>
                            </Col>
                            <Col span="2" style="text-align: center">-</Col>
                            <Col span="11">
                            <Form-item prop="validityMax">
                                <Date-picker type="date" placeholder="选择日期" v-model="formValidate.validityMax" name="validityMax"></Date-picker>
                            </Form-item>
                            </Col>
                        </Row>
                    </Form-item>
                    </Col>
                    <Col span="8">
                    <Form-item label="简历已下载次数" prop="cvdownloadTimes">
                        <Select v-model="formValidate.cvdownloadTimes" placeholder="请选择限制条件">
                            <Option value="">全部</Option>
                            <Option value="unused">未用</Option>
                            <Option value="used">已用</Option>
                            <Option value="useup">用完</Option>
                            <Option value="infinite">不限次数</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="销售负责人" prop="salesInfo">
                        <Input v-model="formValidate.salesInfo" placeholder="请输入负责人姓名"></Input>
                    </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                    <Form-item label="是否有薪资面议权限" :label-width="150" prop="wagePermision">
                        <Radio-group v-model="formValidate.wagePermision">
                            <Radio label="">不限</Radio>
                            <Radio label="true">是</Radio>
                            <Radio label="false">否</Radio>
                        </Radio-group>
                    </Form-item>
                    </Col>
                </Row>
                <div class="company-form-btn">
                    <Button type="primary" @click="handleSubmit('formValidate')">查询</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </div>
            </Form>
        </Card>
        <Card class="form_card">
            <Table border :columns="columns" :data="data" :context="self"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="pageTotal" :current="pageCurrent" @on-change="changePage" show-elevator show-total></Page>
                </div>
            </div>
        </Card>
        <Modal v-model="showSetting" title="简历下载设置" @on-ok="okDownloadSet" @on-cancel="cancelDownloadSet">
            <Form :label-width="100">
                <Form-item label="简历下载有效期">
                    <Row>
                        <Col span="11">
                        <Form-item prop="startDate">
                            <Date-picker type="date" placeholder="选择日期" v-model="startDate"></Date-picker>
                        </Form-item>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                        <Form-item prop="endDate">
                            <Date-picker type="date" placeholder="选择日期" v-model="endDate"></Date-picker>
                        </Form-item>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item label="简历可下载次数">
                    <Input v-model="limitCount" placeholder="不限量下载请填9999"></Input>
                </Form-item>
            </Form>
        </Modal>
    </div>
</template>
<script>
import { dateToString } from '@/common/js/date.js'
import { formatDate } from '@/common/js/formatDate.js'
export default {
    data() {
        return {
            self: this,
            pageTotal: 0,
            pageCurrent: 1,
            limitCount: '',
            startDate: '',
            endDate: '',
            tempIndex: '',
            spinShow: false,
            showSetting: false,
            columns: [
                {
                    title: '公司名称',
                    key: 'fullName',
                    align: 'center'
                },
                {
                    title: '城市',
                    key: 'city',
                    align: 'center'
                },
                {
                    title: '公司创建时间',
                    key: 'createdOn',
                    align: 'center'
                },
                {
                    title: '使用有效期截止',
                    key: 'validityEnd',
                    align: 'center'
                },
                {
                    title: '销售负责人',
                    key: 'salesInfo',
                    align: 'center'
                },
                {
                    title: '简历下载有效期',
                    key: 'cvDowndloadEnd',
                    align: 'center'
                },
                {
                    title: '简历可下载次数',
                    key: 'limitCount',
                    align: 'center',
                    render(row, column, index) {
                        return `<span>{{data[${index}].limitCount === 9999 ? '不限' : data[${index}].limitCount}}</span>`
                    }
                },
                {
                    title: '简历已下载次数',
                    key: 'downloadedCount',
                    align: 'center'
                },
                {
                    title: '简历下载剩余次数',
                    key: 'balance',
                    align: 'center',
                    render(row, column, index) {
                        return `<span>{{data[${index}].limitCount === 9999 ? '不限' : data[${index}].balance}}</span>`
                    }
                },
                {
                    title: '是否有薪资面议权限',
                    key: 'wagePermision',
                    align: 'center',
                    render(row, column, index) {
                        return `<i-switch v-model="data[${index}].wagePermision" @on-change="change(${index})"></i-switch>`;
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    // width: 302,
                    render(row, column, index) {
                        return `<i-button type="primary" size="small" @click="show(${index})" disabled>定制申请表</i-button>
                            <i-button type="primary" size="small" @click="downloadSetting(${index})">简历下载设置</i-button>
                            <i-button type="primary" size="small" @click="editRec(${index})">编辑</i-button>
                            <i-button type="primary" size="small" @click="resetPassword(${index})">重置密码</i-button>`;
                    }
                }
            ],
            data: [],
            formValidate: {
                fullName: '',
                city: '',
                phone: '',
                salesInfo: '',
                wagePermision: '',
                createMin: '',
                createMax: '',
                validityMin: '',
                validityMax: '',
                cvdownloadTimes: ''
            }
        }
    },
    created() {
        // 页面初始化，获取列表
        getRecInfos(this, 0)
    },
    methods: {
        handleSubmit(name) {
            const vm = this
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // 格式化时间
                    getRecInfos(this, 0)
                } else {
                    this.$Message.error('表单验证失败!')
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields()
        },

        // 简历下载设置
        downloadSetting(index) {
            this.showSetting = true
            this.tempIndex = index
            if (this.data[index].limitCount) {
                this.$http.get('/account/' + this.data[index].id + '/talent')
                    .then((res) => {
                        this.startDate = new Date(res.data.validityStart.substring(0, 4), res.data.validityStart.substring(4, 6) - 1, res.data.validityStart.substring(6, 8))

                        this.endDate = new Date(res.data.validityEnd.substring(0, 4), res.data.validityEnd.substring(4, 6) - 1, res.data.validityEnd.substring(6, 8))

                        this.limitCount = res.data.limitCount
                    }).catch((err) => {
                        console.log(err)
                    })
            }
        },
        // 确定简历下载设置
        okDownloadSet() {
            this.$http.post('/account/accountBalance/talent', {
                recId: this.data[this.tempIndex].id,
                recName: this.data[this.tempIndex].fullName,
                limitCount: this.limitCount,
                validityStart: dateToString(this.startDate),
                validityEnd: dateToString(this.endDate)
            }).then((res) => {
                if (res.data === 'ok') {
                    getRecInfos(this, this.pageCurrent - 1)
                    // 重置设置项
                    this.limitCount = ''
                    this.startDate = ''
                    this.endDate = ''
                }
            }).catch((err) => {
                console.log(res)
            })
        },
        cancelDownloadSet() {
            this.limitCount = ''
            this.startDate = ''
            this.endDate = ''
        },
        // 改变薪资面议权限
        change(index) {
            const vm = this
            // this.$http.post('http://192.168.1.164:8093/admin/updateRecWagePermision?recId='+ this.data[index].id + '&wagePermision=' + this.data[index].wagePermision)
            this.$http.post('/admin/updateRecWagePermision?recId=' + this.data[index].id + '&wagePermision=' + this.data[index].wagePermision)
                .then(function (response) {
                    if (response.data.success) {
                        vm.$Message.success('修改成功!')
                    }
                }).catch(function (error) {
                    vm.$Message.error('修改失败!')
                })
        },
        // 编辑
        editRec(index) {
            // 根据recid获取其他数据
            const vm = this
            // this.$http.get('http://192.168.1.250:8093/admin/findRecInfByRecId/02155bb9-7938-49b5-b00b-529f9e7d98b8?recId='+this.data[index].id)
            this.$http.get('/admin/findRecInfByRecId/02155bb9-7938-49b5-b00b-529f9e7d98b8?recId=' + this.data[index].id)
                .then(function (response) {
                    vm.data[index].email = response.data.email
                    vm.data[index].mobile = response.data.mobile
                    vm.data[index].tel = response.data.tel
                    vm.data[index].realName = response.data.realName
                    // 改变sotre状态
                    vm.$store.commit('changeCompanyInfo', vm.data[index])
                    vm.$store.commit('openEdit')
                    vm.$router.push('/rec/add')
                }).catch(function (error) {
                    vm.$Message.error('请求参数失败!')
                })
        },
        resetPassword(index) {
            const vm = this
            this.$Modal.confirm({
                title: '是否确认重置密码',
                content: '<p>重置的密码会发送至该公司邮箱</p>',
                onOk: () => {
                    // this.$http.post('http://192.168.1.250:8093/admin/reSetRecPwd?recId='+ this.data[index].id
                    this.$http.post('/admin/reSetRecPwd?recId=' + this.data[index].id
                    ).then(function (response) {
                        vm.$Message.success('发送成功!')
                    }).catch(function (error) {
                        vm.$Message.success('失败!')
                    })
                },
                onCancel: () => {
                    this.$Message.info('取消');
                }
            });
        },
        changePage(index) {
            const pageNumber = index - 1
            getRecInfos(this, pageNumber)
        }
    }
}

function getRecInfos(thisVm, pageNumber) {

    thisVm.pageCurrent = pageNumber + 1
    // 存储时间
    const dateObj = {}
    dateObj.validityMin = thisVm.formValidate.validityMin
    dateObj.validityMax = thisVm.formValidate.validityMax
    dateObj.createMin = thisVm.formValidate.createMin
    dateObj.createMax = thisVm.formValidate.createMax

    thisVm.formValidate.validityMin = dateToString(thisVm.formValidate.validityMin)
    thisVm.formValidate.validityMax = dateToString(thisVm.formValidate.validityMax)
    thisVm.formValidate.createMin = dateToString(thisVm.formValidate.createMin)
    thisVm.formValidate.createMax = dateToString(thisVm.formValidate.createMax)

    thisVm.formValidate.pageNumber = pageNumber
    thisVm.formValidate.pageSize = 10
    thisVm.$http.post('/admin/getRecInfosByParam?uid=02155bb9-7938-49b5-b00b-529f9e7d98b8', thisVm.formValidate)
        // thisVm.$http.post('/admin/getRecInfosByParam?uid=02155bb9-7938-49b5-b00b-529f9e7d98b8', thisVm.formValidate)
        .then(function (response) {
            const tempArr = []
            response.data.recruiterAccountList.forEach((item, index) => {
                item.createdOn = formatDate(item.createdOn)
                item.validityEnd = formatDate(item.validityEnd)
                item.validityStart = formatDate(item.validityStart)
                item.downloadedCount = item.limitCount - item.balance
                tempArr.push(item)
            })
            thisVm.data = tempArr
            thisVm.pageTotal = response.data.total
            // 改回时间
            thisVm.formValidate.validityMin = dateObj.validityMin
            thisVm.formValidate.validityMax = dateObj.validityMax
            thisVm.formValidate.createMin = dateObj.createMin
            thisVm.formValidate.createMax = dateObj.createMax
            thisVm.$Message.success('查询成功!')
        }).catch(function (error) {
            thisVm.$Message.error('查询失败!')
        })
}
</script>
<style>

</style>