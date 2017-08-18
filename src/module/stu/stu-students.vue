<template>
    <div class="content-view" id="stu">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="view-title">
            <span>学生管理</span>
            <Breadcrumb>
                <Breadcrumb-item>
                    <router-link to="/">主页</router-link>
                </Breadcrumb-item>
                <Breadcrumb-item>学生管理</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <Card class="search_card">
            <Form ref="formValidate" :model="formValidate" :label-width="74">
                <Row>
                    <Col span="4">
                    <Form-item label="学生姓名" prop="name" :label-width="60">
                        <Input v-model="formValidate.name" placeholder="请输入学生姓名"></Input>
                    </Form-item>
                    <Form-item label="学校" prop="school" :label-width="60">
                        <Input v-model="formValidate.school" placeholder="请输入学校" @on-focus="openSchoolModal"></Input>
                        <div class="search_result" v-show="schoolShow">
                            <ul>
                                <li class="result_item" v-for="item in schoolResult" @click="selSchool(item.value)">{{item.value}}</li>
                            </ul>
                        </div>
                    </Form-item>
                    </Col>
                    <Col span="4">
                    <Form-item label="专业" prop="major" :label-width="50">
                        <Input v-model="formValidate.major" placeholder="请输入专业" @on-change="searchMajor" @on-blur="closeSearchMajor"></Input>
                        <div class="search_result" v-show="majorShow">
                            <ul>
                                <li class="result_item" v-for="item in majorResult" @click="selMajor(item.value)">{{item.value}}</li>
                            </ul>
                        </div>
                    </Form-item>
                    <Form-item label="学历" prop="degree" :label-width="50">
                        <Select v-model="formValidate.degree" placeholder="请选择学历">
                            <Option value="全部">全部</Option>
                            <Option value="2">大专</Option>
                            <Option value="3">本科</Option>
                            <Option value="4">硕士</Option>
                            <Option value="6">博士</Option>
                        </Select>
                    </Form-item>
                    </Col>
                    <Col span="7">
                    <Form-item label="毕业时间">
                        <Row>
                            <Col span="11">
                            <Form-item prop="fromEndDate">
                                <Date-picker type="month" placeholder="选择日期" v-model="formValidate.fromEndDate"></Date-picker>
                            </Form-item>
                            </Col>
                            <Col span="2" style="text-align: center">-</Col>
                            <Col span="11">
                            <Form-item prop="toEndDate">
                                <Date-picker type="month" placeholder="选择日期" v-model="formValidate.toEndDate"></Date-picker>
                            </Form-item>
                            </Col>
                        </Row>
                    </Form-item>
                    <Form-item label="注册时间">
                        <Row>
                            <Col span="11">
                            <Form-item prop="fromRegisterDate">
                                <Date-picker type="date" placeholder="选择日期" v-model="formValidate.fromRegisterDate"></Date-picker>
                            </Form-item>
                            </Col>
                            <Col span="2" style="text-align: center">-</Col>
                            <Col span="11">
                            <Form-item prop="toRegisterDate">
                                <Date-picker type="date" placeholder="选择日期" v-model="formValidate.toRegisterDate"></Date-picker>
                            </Form-item>
                            </Col>
                        </Row>
                    </Form-item>
                    </Col>
                    <Col span="4">
                    <Form-item label="注册来源" prop="source">
                        <Select v-model="formValidate.source" placeholder="请选择注册来源">
                            <Option value="全部">全部</Option>
                            <Option value="pc">pc</Option>
                            <Option value="MB">移动</Option>
                        </Select>
                    </Form-item>
                    <!-- 标签名称未全 -->
                    <Form-item label="标签名称" prop="tag">
                        <Select v-model="formValidate.tag" placeholder="请选择标签名称">
                            <Option value="全部">全部</Option>
                            <template v-for="item in tagGroup">
                                <Option :value="item">{{item}}</Option>
                            </template>
                        </Select>
                    </Form-item>
                    </Col>
                    <Col span="5">
                    <Form-item label="简历完善度" prop="completeness" :label-width="96">
                        <Select v-model="formValidate.completeness" placeholder="请选择简历完善度">
                            <Option value="全部">全部</Option>
                            <Option value="50%以下">50%以下</Option>
                            <Option value="50%-60%">50%-60%</Option>
                            <Option value="60%-70%">60%-70%</Option>
                            <Option value="70%-80%">70%-80%</Option>
                            <Option value="80%-90%">80%-90%</Option>
                            <Option value="90%以上">90%以上</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="家庭所在地" prop="province" :label-width="96">
                        <Input v-model="formValidate.province" placeholder="请选择家庭所在地" @on-focus="openProvince"></Input>
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
            <div class="btn_group">
                <Button type="primary" @click.native="addTag">打标签</Button>
                <Button type="primary" @click.native="deleteTags">删除标签</Button>
            </div>
            <Table border :columns="columns" :data="data" :context="self" @on-selection-change="selectChange"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="pageTotal" :current="pageCurrent" @on-change="changePage" @on-page-size-change="changePageSize" show-elevator show-total show-sizer></Page>
                </div>
            </div>
        </Card>
        <Modal v-model="provinceModal" title="选择家庭所在地" width="400" :mask-closable="closable" @on-ok="okProvince" @on-cancel="cancelProvince">
            <div>
                <div class="cityTagBox">
                    <template v-for="(province,index) in selProvinceArr">
                        <Tag type="border" closable color="blue" @on-close="delProvince(index)">{{ province }}</Tag>
                    </template>
                </div>
                <Cascader :data="cityData" trigger="hover" :render-format="format" @on-change="addProvince" placeholder="请选择家庭所在地"></Cascader>
            </div>
        </Modal>
        <SelectUniversityModal v-on:chooseSchool="receiveSchool" :universityModal="openSchool" :max="6" :url="'/student/findSchool?name='"></SelectUniversityModal>
        <ResumePreview :openPreview="openPreview" :resumeData="resumeData" v-on:closeResume="closeResumeFun"></ResumePreview>
        <Modal v-model="openTag" title="添加标签" width="500" @on-ok="ok" @on-cancel="cancel">
            <Input v-model="tagInput" placeholder="请输入标签"></Input>
        </Modal>
        <Modal v-model="openDelTag" title="删除标签" width="500" @on-ok="delOk" @on-cancel="delCancel">
            <Checkbox-group v-model="selectTags">
                <Checkbox v-for="item in readyDelTags" :label="item"></Checkbox>
            </Checkbox-group>
        </Modal>
    </div>
</template>
<script>
import { dateToString } from '@/common/js/date.js'
import { formatDate } from '@/common/js/formatDate.js'
import { cityData } from '@/common/js/cityData.js'
import SelectUniversityModal from '@/components/SelectUniversityModal/SelectUniversityModal'
import ResumePreview from './components/ResumePreview/ResumePreview.vue'
export default {
    data() {
        return {
            spinShow: false,
            self: this,
            openPreview: false,
            openTag: false,
            openDelTag: false,
            schoolShow: false,
            majorShow: false,
            pageTotal: 0,
            pageCurrent: 1,
            tempPageSize: 10,
            tagInput: null,
            openSchool: false,
            closable: false,
            provinceModal: false,
            cityData: null,
            checkbox: [],
            selProvinceArr: [],
            selectTags: [],
            readyDelTags: [],
            selectStudents: [],
            tagGroup: [],
            schoolResult: [],
            majorResult: [],
            data: [],
            resumeData: {
                basic: { name: null, mobile: null, email: null, gender: null, birthday: null, city: null, currentCity: null },
                educationInfos: null,
                work: null,
                practices: null,
                club: null,
                reward: null,
                skills: null,
                certificate: null,
                language: null
            },
            formValidate: {
                name: null,
                major: null,
                degree: '',
                fromEndDate: null,
                toEndDate: null,
                source: '',
                completeness: '',
                school: null,
                fromRegisterDate: null,
                toRegisterDate: null,
                tag: '',
                province: null,
                pageNumber: 0,
                pageSize: 10
            },
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    type: 'index',
                    width: 40,
                    align: 'center'
                },
                {
                    title: '学生姓名',
                    align: 'center',
                    render(row, column, index) {
                        return `<i-button type="text" @click="preview(${index})">{{data[${index}].name}}</i-button>`
                    }
                },
                {
                    title: '学校',
                    key: 'school',
                    align: 'center'
                },
                {
                    title: '专业',
                    key: 'major',
                    align: 'center'
                },
                {
                    title: '学历',
                    key: 'degree',
                    align: 'center'
                },
                {
                    title: '毕业时间',
                    key: 'endDate',
                    align: 'center',
                    width: 100
                },
                {
                    title: '家庭所在地',
                    key: 'province',
                    align: 'center'
                },
                {
                    title: '求职意向城市',
                    align: 'center',
                    render(row, column, index) {
                        return `<p v-for="item in data[${index}].intentionCity" key="1">{{item}}</p>`
                    }
                },
                {
                    title: '注册时间',
                    key: 'registerTime',
                    align: 'center',
                    width: 90
                },
                {
                    title: '注册来源',
                    key: 'source',
                    align: 'center'
                },
                {
                    title: '简历完善度',
                    key: 'completeness',
                    align: 'center'
                },
                {
                    title: '简历投递数',
                    key: 'deliveryCount',
                    align: 'center'
                },
                {
                    title: '标签名称',
                    align: 'center',
                    render(row, column, index) {
                        return `<i-button v-for="(item, index) in data[${index}].tag" key="1" type="primary" class="tag" shape="circle" size="small">{{item}}<Icon type="close-circled" class="tag_del" @click.native="delTag(${index}, item)"></Icon>`
                    }
                },
                {
                    title: '操作',
                    key: 'age',
                    align: 'center',
                    width: 150,
                    render(row, column, index) {
                        return `<i-button type="text" @click="openRecord(${index})">查看职位投递记录</i-button>`
                    }
                }
            ]
        }
    },
    created() {
        // 赋值citydata
        this.cityData = cityData

        // 获取所有标签
        this.$http.get('/tag')
            .then((res) => {
                this.tagGroup = res.data
            }).catch((err) => {
                console.log(err)
            })
        // 获取学生列表
        // getStuData(this, 0, this.tempPageSize)
    },
    methods: {
        // 点开选择学校模态框
        openSchoolModal() {
            this.openSchool = true
        },
        receiveSchool(val) {
            if (val !== 'cancel') {
                this.formValidate.school = val.join(',')
            }
            this.openSchool = false
        },

        // 家庭所在地模态框操作
        openProvince() {
            this.provinceModal = true
        },
        delProvince(index) {
            this.selProvinceArr.splice(index, 1)
        },
        addProvince(value, selectedData) {
            let val = value[1]
            this.selProvinceArr.includes(val) ? '' : this.selProvinceArr.push(val)
        },
        okProvince() {
            this.formValidate.province = this.selProvinceArr.join(',')
        },
        cancelProvince() {

        },

        // 搜索专业
        searchMajor() {
            if (this.formValidate.major.length > 0) {
                this.$http.get('/student/findMajor?name=' + this.formValidate.major)
                    .then((res) => {
                        if (res.data.length > 0) {
                            this.majorShow = true
                            this.majorResult = res.data
                        } else {
                            this.majorShow = false
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
            } else {
                this.majorShow = false
            }
        },

        // 选择专业
        selMajor(val) {
            this.formValidate.major = val
            this.majorShow = false
        },

        closeSearchMajor() {
            setTimeout(() => {
                this.majorShow = false
            }, 100)
        },

        // 点击查询
        handleSubmit() {
            getStuData(this, 0, this.tempPageSize)
        },
        // 重置
        handleReset(name) {
            this.$refs[name].resetFields()
        },

        // 选择表格列表项
        selectChange(selection) {
            this.selectStudents = selection
        },

        // 添加标签
        addTag() {
            if (this.selectStudents.length <= 0) {
                this.$Message.warning('未选择学生')
            } else {
                this.openTag = true
            }
        },
        // 添加标签-确定
        ok() {
            if (this.tagInput) {
                const tempArr = []
                this.selectStudents.forEach((item) => {
                    const tempObj = {}
                    tempObj.stuId = item.stuId
                    tempObj.tagValue = this.tagInput
                    tempArr.push(tempObj)
                })
                this.$http.post('/tag', tempArr)
                    .then((res) => {
                        if (res.data === 200) {
                            this.$Message.success('添加成功')
                            getStuData(this, this.pageCurrent - 1, this.tempPageSize)
                            this.tagInput = null
                            this.selectStudents = []
                        }
                    }).catch((err) => {
                        console.log(err)
                        this.$Message.error('添加失败')
                    })
            }
        },
        cancel() { },

        // 删除标签
        deleteTags() {
            // 求多个选择学生的标签交集
            if (this.selectStudents.length > 0) {
                let tempArr = []
                for (var i = 0; i < this.selectStudents.length; i++) {
                    if (i === 0) {
                        tempArr = this.selectStudents[i].tag
                    }
                    if (i < this.selectStudents.length + 1) {
                        tempArr = arrayIntersection(tempArr, this.selectStudents[i].tag)
                    }
                }
                if (tempArr.length > 0) {
                    this.selectTags = tempArr
                    this.readyDelTags = tempArr
                    this.openDelTag = true
                } else {
                    this.$Message.warning('当前选择学生没有相同标签')
                }

            } else {
                this.$Message.warning('未选择学生')
            }
        },
        // 删除标签-确定
        delOk() {
            let dataArr = []
            if (this.selectTags.length > 0) {
                this.selectStudents.forEach((item) => {
                    this.selectTags.forEach((tag) => {
                        dataArr.push({
                            stuId: item.stuId,
                            tagValue: tag
                        })
                    })
                })
                this.$http.post('/tag/delete/select', dataArr)
                    .then((res) => {
                        if (res.data === 200) {
                            this.$Message.success('删除标签成功')
                            this.selectTags = []
                            this.selectStudents = []
                            getStuData(this, this.pageCurrent - 1, this.tempPageSize)
                        }
                    }).catch((err) => {
                        console.log(err)
                        this.selectTags = []
                    })
            }
        },
        delCancel() {
            this.selectTags = []
        },
        // 删除单个标签
        delTag(index, tag) {
            this.$http.post('/tag/delete?value=' + tag, [this.data[index].stuId])
                .then((res) => {
                    if (res.data === 200) {
                        this.$Message.success('删除标签成功')
                        getStuData(this, this.pageCurrent - 1, this.tempPageSize)
                    }
                }).catch((err) => {
                    console.log(err)
                })
        },
        // 预览简历
        preview(index) {
            this.openPreview = true
            this.$http.get('/student/studentInfos/' + this.data[index].stuId)
                .then((res) => {
                    if (res.data) {
                        if (res.data.educationInfos.length > 0) {
                            res.data.educationInfos.forEach((item) => {
                                switch (item.degree) {
                                    case 2:
                                        item.degree = '大专'
                                        break;
                                    case 3:
                                        item.degree = '本科'
                                        break;
                                    case 4:
                                        item.degree = '硕士'
                                        break;
                                    case 6:
                                        item.degree = '博士'
                                        break;
                                    default:
                                        item.degree = '其他'
                                        break;
                                }
                                switch (item.rank) {
                                    case 0:
                                        item.rank = "前5%"
                                        break;
                                    case 1:
                                        item.rank = "前10%"
                                        break;
                                    case 2:
                                        item.rank = "前20%"
                                        break;
                                    case 3:
                                        item.rank = "前50%"
                                        break;
                                    default:
                                        item.rank = "其它"
                                        break;
                                }
                            })
                        }
                        this.resumeData = res.data
                    }
                }).catch((err) => {
                    console.log(err)
                })
        },
        closeResumeFun() {
            this.openPreview = false
        },
        // 查看职位投递记录
        openRecord(index) {
            // 路由切换到查看职位投递记录
            this.$router.push('/stu/applicationRecord/' + this.data[index].stuId)
        },
        changePage(index) {
            const pageNumber = index - 1
            getStuData(this, pageNumber, this.tempPageSize)
        },
        changePageSize(val) {
            this.tempPageSize = val
            getStuData(this, 0, this.tempPageSize)
        },
        format(labels, selectedData) {
            return labels.join('-')
        }
    },
    components: {
        SelectUniversityModal,
        ResumePreview
    }
}
function getStuData(thisVm, pageNumber, pageSize) {
    thisVm.spinShow = true
    const dataObj = {}
    thisVm.pageCurrent = pageNumber + 1
    Object.assign(dataObj, thisVm.formValidate)
    // 格式化时间
    dataObj.fromEndDate = dataObj.fromEndDate ? formatDate(dateToString(dataObj.fromEndDate)).substring(0, 7) : null
    dataObj.toEndDate = dataObj.toEndDate ? formatDate(dateToString(dataObj.toEndDate)).substring(0, 7) : null
    dataObj.fromRegisterDate = dataObj.fromRegisterDate ? formatDate(dateToString(dataObj.fromRegisterDate)) : null
    dataObj.toRegisterDate = dataObj.toRegisterDate ? formatDate(dateToString(dataObj.toRegisterDate)) : null
    // 判断选择项内容
    if (!dataObj.degree || dataObj.degree === '全部') {
        dataObj.degree = null
    }
    if (!dataObj.source || dataObj.source === '全部') {
        dataObj.source = null
    }
    if (!dataObj.tag || dataObj.tag === '全部') {
        dataObj.tag = null
    }
    if (!dataObj.province) {
        dataObj.province = null
    }
    switch (dataObj.completeness) {
        case '50%以下':
            dataObj.fromCompleteness = 0
            dataObj.toCompleteness = 50
            break;
        case '50%-60%':
            dataObj.fromCompleteness = 50
            dataObj.toCompleteness = 60
            break;
        case '60%-70%':
            dataObj.fromCompleteness = 60
            dataObj.toCompleteness = 70
            break;
        case '70%-80%':
            dataObj.fromCompleteness = 70
            dataObj.toCompleteness = 80
            break;
        case '80%-90%':
            dataObj.fromCompleteness = 80
            dataObj.toCompleteness = 90
            break;
        case '90%以上':
            dataObj.fromCompleteness = 90
            dataObj.toCompleteness = 100
            break;
        default:
            dataObj.fromCompleteness = null
            dataObj.toCompleteness = null
            break;
    }

    thisVm.$http.get('/student/list/f681b6a9-83a8-466d-a0b4-191f2e30d051?page=' + pageNumber + '&size=' + pageSize + '&name=' + dataObj.name + '&degree=' + dataObj.degree + '&major=' + dataObj.major + '&fromEndDate=' + dataObj.fromEndDate + '&toEndDate=' + dataObj.toEndDate + '&source=' + dataObj.source + '&fromCompleteness=' + dataObj.fromCompleteness + '&school=' + dataObj.school + '&fromRegisterDate=' + dataObj.fromRegisterDate + '&toRegisterDate=' + dataObj.toRegisterDate + '&tag=' + dataObj.tag + '&toCompleteness=' + dataObj.toCompleteness + '&province=' + dataObj.province)
        .then((res) => {
            if (res.data) {
                thisVm.pageTotal = res.data.totalCount
                res.data.data.forEach((item) => {
                    switch (item.source) {
                        case "MB_WX":
                            item.source = "移动"
                            break;
                        case "PC_MNXWEB":
                            item.source = "PC"
                            break;
                        default:
                            item.source = "系统创建"
                            break;
                    }
                    item.registerTime = item.registerTime && item.registerTime.substring(0, 16)
                })
                thisVm.data = res.data.data
                thisVm.spinShow = false
            }
        }).catch((err) => {
            console.log(err)
        })
}

function arrayIntersection(a, b) {
    var result = new Array();
    result = a.filter(v => b.includes(v))
    return result;
}
</script>
<style scoped>
.btn_group {
    margin-bottom: 20px;
}

#stu .tag {
    margin-bottom: 20px;
}

.cityTagBox {
    margin-bottom: 14px;
}

.search_result {
    position: absolute;
    left: 0;
    top: 32px;
    z-index: 30;
    width: 100%;
    max-height: 180px;
    overflow: auto;
    border: 1px solid #d7dde4;
    border-radius: 4px;
    background-color: #fff;
    text-indent: 7px;
}

.result_item:hover {
    background-color: #ebf7ff;
    cursor: pointer;
}
</style>