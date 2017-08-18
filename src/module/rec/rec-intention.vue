<template>
    <div class="content-view">
        <div class="view-title">
            <span>合作申请列表</span>
            <Breadcrumb>
                <Breadcrumb-item><router-link to="/">主页</router-link></Breadcrumb-item>
                <Breadcrumb-item>公司管理</Breadcrumb-item>
                <Breadcrumb-item>合作申请列表</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <!-- <p>{{formValidate}}</p> -->
        <Card class="search_card">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110">
                <Row>
                    <Col span="8">
                        <Form-item label="公司名称" prop="recName">
                            <Input v-model="formValidate.recName" placeholder="请输入公司名称" name="recName"></Input>
                        </Form-item>
                        <Form-item label="负责销售" prop="salesInfo">
                            <Input v-model="formValidate.salesInfo" placeholder="请输入负责销售人" name="salesInfo"></Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="联系邮箱" prop="email">
                            <Input v-model="formValidate.email" placeholder="请输入邮箱" name="email"></Input>
                        </Form-item>
                        <Form-item label="申请时间">
                            <Row>
                                <Col span="11">
                                    <Form-item prop="updateStart">
                                        <Date-picker type="date" placeholder="选择日期" v-model="formValidate.updateStart" name="updateStart"></Date-picker>
                                    </Form-item>
                                </Col>
                                <Col span="2" style="text-align: center">-</Col>
                                <Col span="11">
                                    <Form-item prop="updateEnd">
                                        <Date-picker type="date" placeholder="选择日期" v-model="formValidate.updateEnd" name="updateEnd"></Date-picker>
                                    </Form-item>
                                </Col>
                            </Row>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="状态" prop="status">
                            <Radio-group v-model="formValidate.status">
                                <Radio label="">全部</Radio>
                                <Radio label="待处理">待处理</Radio>
                                <Radio label="跟进中">跟进中</Radio>
                                <Radio label="已签单">已签单</Radio>
                                <Radio label="已拒单">已拒单</Radio>
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
                    <Page :total="pageTotal" :current="pageCurrent" @on-change="changePage" show-total show-elevator></Page>
                </div>
            </div>
        </Card>
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
                columns: [
                    {
                        title: '公司名称',
                        key: 'recName',
                        align: 'center'
                    },
                    {
                        title: '联系电话',
                        key: 'tel',
                        align: 'center'
                    },
                    {
                        title: '联系邮箱',
                        key: 'email',
                        align: 'center'
                    },
                    {
                        title: '申请时间',
                        key: 'createdOn',
                        align: 'center'
                    },
                    {
                        title: '状态',
                        align: 'center',
                        width: 200,
                        render (row, column, index) {
                            return `<i-select size="small" style="width:50%" :disabled="data[${index}].stateDisabled" v-model="data[${index}].status">
                                        <i-option value="待处理">待处理</i-option>
                                        <i-option value="跟进中">跟进中</i-option>
                                        <i-option value="已签单">已签单</i-option>
                                        <i-option value="已拒单">已拒单</i-option>
                                        <i-option value="重复信息">重复信息</i-option>
                                        <i-option value="无效信息">无效信息</i-option>
                                    </i-select>
                                    <Button-group>
                                        <i-button type="primary" size="small" @click="editState(${index})">编辑</i-button>
                                        <i-button type="primary" size="small" @click="saveState(${index})">保存</i-button>
                                    </Button-group>`;
                        }
                    },
                    {
                        title: '负责销售',
                        align: 'center',
                        width: 170,
                        render (row, column, index) {
                            return `<i-input v-model="data[${index}].salesInfo" size="small" style="width: 40%" :disabled="data[${index}].salesDisabled" :value="data[${index}].salesInfo"></i-input>
                                    <Button-group>
                                        <i-button type="primary" size="small" @click="editSales(${index})">分配</i-button>
                                        <i-button type="primary" size="small" @click="saveSales(${index})">保存</i-button>
                                    </Button-group>`;
                        }
                    }
                ],
                data: [
                    // {
                        // recName: '测试新城控股集团有限公司',
                        // tel: 18888888888,
                        // email: '163@163.com',
                        // createdOn: '2017-03-30',
                        // stateDisabled: true,
                        // salesInfo: 'B',
                        // salesDisabled: true
                    // }
                ],
                formValidate: {
                    recName: null,
                    tel: null,
                    salesInfo: null,
                    email: null,
                    status: '',
                    updateStart: null,
                    updateEnd: null,
                    intentionRecruiterList: [],
                    total: null,
                    pageNumber: 0,
                    pageSize: 10
                },
                ruleValidate: {
                    fullName: [
                        { required: false, message: '公司名称不能为空', trigger: 'blur' }
                    ],
                    city: [
                        { required: false, message: '城市不能为空', trigger: 'blur' }
                    ],
                    salesInfo: [
                        { required: false, message: '请填入销售负责人', trigger: 'blur' }
                    ],
                    radio: [
                        { required: false, message: '请选择状态', trigger: 'change' }
                    ]
                }
            }
        },
        created() {
            // 组件创建时查询合作公司列表
            getIntentionRecs(this, 0)
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        getIntentionRecs(this, 0)
                    } else {
                        this.$Message.error('表单验证失败!')
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields()
            },
            // 编辑状态
            editState(index) {
                this.data[index].stateDisabled = false
            },
            // 保存状态
            saveState(index) {
                update(this, index)
            },
            // 编辑销售
            editSales(index) {
                this.data[index].salesDisabled = false
            },
            // 保存负责销售
            saveSales(index) {
                update(this, index)
            },
            changePage(index) {
                const pageNumber = index - 1
                getIntentionRecs(this, pageNumber)
            }
        }
    }
    function update(thisVm, index) {
        // thisVm.$http.put('http://192.168.1.164:8093/intention/update', {
        //     id : thisVm.data[index].id,
        //     salesInfo : thisVm.data[index].salesInfo,
        //     status : thisVm.data[index].status,
        //     tel : thisVm.data[index].tel,
        //     email: thisVm.data[index].email
        thisVm.$http.put('/intention/update', {
            id : thisVm.data[index].id,
            salesInfo : thisVm.data[index].salesInfo,
            status : thisVm.data[index].status,
            tel : thisVm.data[index].tel,
            email: thisVm.data[index].email
        }).then(function (response) {
            if (response.data.success) {
                thisVm.$Message.success('修改成功!')
            }
        }).catch(function (error) {
            thisVm.$Message.error('修改失败!')
        })
        thisVm.data[index].salesDisabled = true
    }
    function getIntentionRecs(thisVm, pageNumber) {
        thisVm.pageCurrent = pageNumber + 1
        // 存储时间
        const dateObj = {}
        dateObj.updateStart = thisVm.formValidate.updateStart
        dateObj.updateEnd = thisVm.formValidate.updateEnd

        // 格式化时间
        thisVm.formValidate.updateStart = thisVm.formValidate.updateStart && dateToString(thisVm.formValidate.updateStart)
        thisVm.formValidate.updateEnd = thisVm.formValidate.updateEnd && dateToString(thisVm.formValidate.updateEnd)
        
        thisVm.formValidate.pageNumber = pageNumber
        thisVm.formValidate.pageSize = 10
        thisVm.$http.post('/intention/getIntentionRecsByParam?uid=02155bb9-7938-49b5-b00b-529f9e7d98b8', thisVm.formValidate)
        .then(function (response) {
            const tempArr = []
            response.data.intentionRecruiterList.forEach((item, index) => {
                item.createdOn = item.createdOn && formatDate(item.createdOn)
                item.stateDisabled = true
                item.salesDisabled = true
                tempArr.push(item)
            })
            thisVm.data = tempArr
            thisVm.pageTotal = response.data.total
            // 改回时间
            thisVm.formValidate.updateStart = dateObj.updateStart
            thisVm.formValidate.updateEnd = dateObj.updateEnd
            thisVm.$Message.success('查询成功!')
        }).catch(function (error) {
            thisVm.$Message.error('查询失败!')
        })
        
    }
</script>
<style>
    
</style>