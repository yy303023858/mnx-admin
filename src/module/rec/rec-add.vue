<template>
    <div class="content-view">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="view-title">
            <span>创建公司账号</span>
            <Breadcrumb>
                <Breadcrumb-item><router-link to="/">主页</router-link></Breadcrumb-item>
                <Breadcrumb-item>客户管理</Breadcrumb-item>
                <Breadcrumb-item>创建公司账号</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <!-- <p>{{formValidate}}</p> -->
        <Card class="form_card">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110">
                <Row>
                    <Col span="12">
                        <Form-item label="公司全称" prop="fullName">
                            <Input v-model="formValidate.fullName" placeholder="请输入公司全称" name="fullName" :disabled="formValidate.isdisabled"  @on-blur="checkName(formValidate.fullName)"></Input>
                        </Form-item>
                        <Form-item label="公司性质" prop="nature">
                            <Select v-model="formValidate.nature" placeholder="请选择公司性质" name="nature">
                                <Option value="私营/民营企业">私营/民营企业</Option>
                                <Option value="中外合资企业">中外合资企业</Option>
                                <Option value="外商独资企业">外商独资企业</Option>
                                <Option value="上市公司">上市公司</Option>
                                <Option value="国有企业">国有企业</Option>
                                <Option value="政府/事业单位">政府/事业单位</Option>
                                <Option value="非营利性组织">非营利性组织</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="联系人姓名" prop="realName">
                            <Input v-model="formValidate.realName" placeholder="请输入联系人姓名" name="realName"></Input>
                        </Form-item>
                        <Form-item label="联系人固定电话" prop="tel">
                            <Input v-model="formValidate.tel" placeholder="请输入联系人电话,格式000-0000000" name="tel"></Input>
                        </Form-item>
                        <Form-item label="联系人手机号" prop="mobile">
                            <Input v-model="formValidate.mobile" placeholder="请输入联系人手机号" name="mobile"></Input>
                        </Form-item>
                        <Form-item label="联系人邮箱" prop="email">
                            <Input v-model="formValidate.email" placeholder="请输入邮箱" name="email" @on-blur="checkEmail(formValidate.email)"></Input>
                        </Form-item>
                        <Form-item label="企业级别" prop="scale">
                            <Select v-model="formValidate.scale" placeholder="请选择公司级别" name="scale">
                                <Option value="Y1">Y1</Option>
                                <Option value="Y2">Y2</Option>
                                <Option value="Y3">Y3</Option>
                                <Option value="M">M</Option>
                                <Option value="VIP">VIP</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="公司简称" prop="shortName">
                            <Input v-model="formValidate.shortName" placeholder="请输入公司公司简称" name="shortName"></Input>
                        </Form-item>
                        <Form-item label="公司规模" prop="size">
                            <Select v-model="formValidate.size" placeholder="请选择公司规模" name="size">
                                <Option value="1-49人">1-49人</Option>
                                <Option value="50-99人">50-99人</Option>
                                <Option value="100-499人">100-499人</Option>
                                <Option value="500-999人">500-999人</Option>
                                <Option value="1000-2000人">1000-2000人</Option>
                                <Option value="2000-5000人">2000-5000人</Option>
                                <Option value="5000-10000人">5000-10000人</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="行业类别" prop="primaryIndustry">
                            <Cascader :data="primaryIndustryData" v-model="formValidate.primaryIndustry" placeholder="请选择行业类别" :render-format="format"></Cascader>
                        </Form-item>
                        <Form-item label="城市" prop="city">
                            <Input v-model="formValidate.city" placeholder="请输入所在城市" name="city"></Input>
                        </Form-item>
                        <Form-item label="详细地址" prop="detailAddress">
                            <Input v-model="formValidate.detailAddress" placeholder="请输入公司详细地址" name="detailAddress"></Input>
                        </Form-item>
                        <Form-item label="销售负责人" prop="salesInfo">
                            <Input v-model="formValidate.salesInfo" placeholder="请输入负责人姓名" name="salesInfo"></Input>
                        </Form-item>
                        <Form-item label="使用有效期" class="choose_date">
                            <Row>
                                <Col span="11">
                                    <Form-item prop="validityStart">
                                        <Date-picker type="date" placeholder="选择起始日期" v-model="formValidate.validityStart" name="validityStart"></Date-picker>
                                    </Form-item>
                                </Col>
                                <Col span="2" style="text-align: center">-</Col>
                                <Col span="11">
                                    <Form-item prop="validityEnd">
                                        <Date-picker type="date" placeholder="选择结束日期" v-model="formValidate.validityEnd" name="validityEnd"></Date-picker>
                                    </Form-item>
                                </Col>
                            </Row>
                        </Form-item>
                    </Col>
                </Row>
                <div class="company-form-btn">
                    <Button type="primary" @click="handleSubmit('formValidate')" :disabled="permit">提交</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </div>
            </Form>
        </Card>
    </div>
</template>
<script>
    import { dateToString } from '@/common/js/date.js'
    export default {
        name: 'companyAdd',
        data () {
            return {
                spinShow: false,
                permit: false,
                formValidate: {
                    fullName: "",
                    shortName: "",
                    nature: "",
                    size: "",
                    realName: "",
                    primaryIndustry: [],
                    tel: "",
                    city: "",
                    mobile: "",
                    scale: "",
                    detailAddress: "",
                    email: "",
                    salesInfo: "",
                    validityStart: "",
                    validityEnd: ""
                },
                primaryIndustryData: [{
                    value: '互联网·游戏·软件',
                    label: '互联网·游戏·软件',
                    children: [
                        {value: '移动互联网',label: '移动互联网'},
                        {value: 'O2O',label: 'O2O'},
                        {value: '数据服务',label: '数据服务'},
                        {value: '计算机软件',label: '计算机软件'},
                        {value: '分类信息',label: '分类信息'},
                        {value: '电子商务',label: '电子商务'},
                        {value: '游戏',label: '游戏'},
                        {value: '社交网络',label: '社交网络'},
                        {value: '门户/搜索',label: '门户/搜索'},
                        {value: 'IT服务',label: 'IT服务'} 
                    ]
                },
                {
                    value: '电子·通信·硬件',
                    label: '电子·通信·硬件',
                    children: [
                        {value: '计算机硬件',label: '计算机硬件'},
                        {value: '运营商/增值服务',label: '运营商/增值服务'},
                        {value: '通信设备',label: '通信设备'},
                        {value: '电子/半导体',label: '电子/半导体'}
                    ]
                },
                {
                    value: '金融',
                    label: '金融',
                    children: [
                        {value: '互联网金融',label: '互联网金融'},
                        {value: '银行',label: '银行'},
                        {value: '保险',label: '保险'},
                        {value: '基金',label: '基金'},
                        {value: '会计/审计',label: '会计/审计'},
                        {value: '证券',label: '证券'},
                        {value: '投资',label: '投资'},
                        {value: '担保/典当/拍卖',label: '担保/典当/拍卖'}
                    ]
                },
                {
                    value: '生产·机械·制造',
                    label: '生产·机械·制造',
                    children: [
                        {value: '汽车/摩托车',label: '汽车/摩托车'},
                        {value: '印刷/包装/造纸',label: '印刷/包装/造纸'},
                        {value: '加工/模具',label: '加工/模具'},
                        {value: '服装/纺织/皮革',label: '服装/纺织/皮革'},
                        {value: '机械/设备/重工',label: '机械/设备/重工'},
                        {value: '办公用品',label: '办公用品'},
                        {value: '家具/家电/玩具/礼品',label: '家具/家电/玩具/礼品'}
                    ]
                },
                {
                    value: '房地产·建筑·物业',
                    label: '房地产·建筑·物业',
                    children: [
                        {value: '房产经济/中介',label: '房产经济/中介'},
                        {value: '规划设计',label: '规划设计'},
                        {value: '物业管理/商业中心',label: '物业管理/商业中心'},
                        {value: '建筑工程',label: '建筑工程'},
                        {value: '房地产开发',label: '房地产开发'}
                    ]
                },
                {
                    value: '服务·咨询·外包',
                    label: '服务·咨询·外包',
                    children: [
                        {value: '酒店/旅游',label: '酒店/旅游'},
                        {value: '餐饮',label: '餐饮'},
                        {value: '娱乐/休闲/体育',label: '娱乐/休闲/体育'},
                        {value: '生活服务',label: '生活服务'},
                        {value: '企业咨询',label: '企业咨询'},
                        {value: '外包服务',label: '外包服务'},
                        {value: '中介服务',label: '中介服务'},
                        {value: '租赁服务',label: '租赁服务'},
                        {value: '人力资源/财会',label: '人力资源/财会'},
                        {value: '检测/认证',label: '检测/认证'},
                        {value: '美容/保健',label: '美容/保健'}
                    ]
                },
                {
                    value: '制药·医疗',
                    label: '制药·医疗',
                    children: [
                        {value: '制药/生物工程',label: '制药/生物工程'},
                        {value: '医疗/护理/卫生',label: '医疗/护理/卫生'},
                        {value: '医疗设备/器械',label: '医疗设备/器械'}
                    ]
                },
                {
                    value: '广告·媒体',
                    label: '广告·媒体',
                    children: [
                        {value: '广告/公关',label: '广告/公关'},
                        {value: '市场推广/会展',label: '市场推广/会展'},
                        {value: '影视/媒体/艺术/文化传播',label: '影视/媒体/艺术/文化传播'},
                        {value: '文字媒体/出版',label: '文字媒体/出版'},
                        {value: '印刷/包装/造纸',label: '印刷/包装/造纸'}
                    ]
                },
                {
                    value: '教育·培训',
                    label: '教育·培训',
                    children: [
                        {value: '法律',label: '法律'},
                        {value: '教育/培训/院校',label: '教育/培训/院校'},
                        {value: '学术/科研',label: '学术/科研'}
                    ]
                },
                {
                    value: '物流·运输',
                    label: '物流·运输',
                    children: [
                        {value: '交通/运输/物流',label: '交通/运输/物流'},
                        {value: '航天/航空',label: '航天/航空'}
                    ]
                },
                {
                    value: '贸易·消费',
                    label: '贸易·消费',
                    children: [
                        {value: '贸易/进出口',label: '贸易/进出口'},
                        {value: '批发/零售',label: '批发/零售'},
                        {value: '快速消费品',label: '快速消费品'},
                        {value: '奢侈品/收藏品/工艺品/珠宝',label: '奢侈品/收藏品/工艺品/珠宝'}
                    ]
                },
                {
                    value: '能源·原材料',
                    label: '能源·原材料',
                    children: [
                        {value: '石油/化工',label: '石油/化工'},
                        {value: '矿产/地质,采掘业/冶炼',label: '矿产/地质,采掘业/冶炼'},
                        {value: '电气/电力/水利/新能源',label: '电气/电力/水利/新能源'},
                        {value: '原材料和加工',label: '原材料和加工'}
                    ]
                },
                {
                    value: '政府·非赢利机构·其他',
                    label: '政府·非赢利机构·其他',
                    children: [
                        {value: '政府/公共事业',label: '政府/公共事业'},
                        {value: '非盈利机构',label: '非盈利机构'},
                        {value: '农/林/牧/渔',label: '农/林/牧/渔'},
                        {value: '多元化业务集团公司',label: '多元化业务集团公司'}
                    ]
                }],
                ruleValidate: {
                    fullName: [
                        { required: true, message: '公司全称不能为空', trigger: 'blur' }
                    ],
                    shortName: [
                        { required: true, message: '公司简称不能为空', trigger: 'blur' },
                        { type:'string', max: 15, message: '不能超过15个字', trigger: 'blur'}
                    ],
                    nature: [
                        { required: true, message: '请选择公司性质', trigger: 'change' }
                    ],
                    scale: [
                        { required: true, message: '请选择企业级别', trigger: 'change' }
                    ],
                    size: [
                        { required: true, message: '请选择公司规模', trigger: 'change' }
                    ],
                    realName: [
                        { required: true, message: '联系人姓名不能为空', trigger: 'blur' }
                    ],
                    primaryIndustry: [
                        { required: true, type: 'array', message: '请选择行业类别', trigger: 'change' }
                    ],
                    tel: [
                        { required: true, message: '电话不能为空', trigger: 'blur' },
                        { pattern: /^((0\d{2,3}-\d{7,8}-\d{0,9})|(0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '固定电话格式不正确', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '城市不能为空', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '电话不能为空', trigger: 'blur' },
                        { pattern: /^1(3|4|5|7|8)\d{9}$/, message: '电话格式不正确', trigger: 'blur' }
                    ],
                    detailAddress: [
                        { required: true, message: '地址不能为空', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { pattern: /^([\w\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    salesInfo: [
                        { required: true, message: '请填入销售负责人', trigger: 'blur' }
                    ],
                    validityStart: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ],
                    validityEnd: [
                        { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                    ]
                }
            }
        },
        created() {
            if (this.$store.state.isEdit) {
                this.formValidate = this.$store.state.companyInfo
                // 编辑时，传过来的日期不是对象，需要转换一下
                this.formValidate.validityStart = this.formValidate.validityStart && new Date(this.formValidate.validityStart.split('-')[0], this.formValidate.validityStart.split('-')[1]-1, this.formValidate.validityStart.split('-')[2])
                this.formValidate.validityEnd = this.formValidate.validityEnd && new Date(this.formValidate.validityEnd.split('-')[0], this.formValidate.validityEnd.split('-')[1]-1, this.formValidate.validityEnd.split('-')[2])
                this.formValidate.primaryIndustry = this.formValidate.primaryIndustry.split('-')
                this.formValidate.isdisabled = true
            }
            this.$store.commit('resetEdit')
        },
        methods: {
            format (labels, selectedData) {
                return labels.join('-')
            },
            checkName(val) {
                if (val) {
                    const vm = this
                    this.$http.get('/admin/findRecInfByFullName/02155bb9-7938-49b5-b00b-529f9e7d98b8?fullName=' + this.formValidate.fullName)
                    .then(function(response) {
                        if (response.data.success) {
                            vm.$Message.success('可以注册!')
                        }else{
                            vm.$Message.warning( response.data.failReason + '!')
                        }
                    }).catch(function(error) {
                        vm.$Message.error('提交失败!');
                    })
                }
            },
            checkEmail(val) {
                // 新建公司-----邮箱验证
                if (!this.formValidate.isdisabled && val) {
                    const vm = this
                    // this.$http.get('http://192.168.1.164:8093/admin/findRecUserByEmail/02155bb9-7938-49b5-b00b-529f9e7d98b8?email=' + this.formValidate.email)
                    this.$http.get('/admin/findRecUserByEmail/02155bb9-7938-49b5-b00b-529f9e7d98b8?email=' + this.formValidate.email)
                    .then(function(response) {
                        if (response.data.success) {
                            vm.$Message.success('该邮箱可以注册!')
                        }else{
                            vm.$Message.warning( response.data.failReason + '!')
                        }
                    }).catch(function(error) {
                        vm.$Message.error('邮箱已存在!');
                    })
                }
                // 修改公司-----邮箱验证
                if (this.formValidate.isdisabled && val) {
                    const vm = this
                    // this.$http.get('http://192.168.1.164:8094/admin/findRecUserByEmailAndRecId/02155bb9-7938-49b5-b00b-529f9e7d98b8?email='+ this.formValidate.email +'&recId=' + this.formValidate.id)
                    this.$http.get('/admin/findRecUserByEmailAndRecId/02155bb9-7938-49b5-b00b-529f9e7d98b8?email='+ this.formValidate.email +'&recId=' + this.formValidate.id)
                    .then(function(response) {
                        if (response.data.success) {
                            vm.$Message.success('该邮箱可以注册!')
                        }else{
                            vm.$Message.warning( response.data.failReason + '!')
                        }
                    }).catch(function(error) {
                        vm.$Message.error('邮箱已存在!');
                    })
                }
            },
            // 添加公司信息
            handleSubmit (name) {
                const vm = this
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.spinShow = true
                        // 存储时间
                        const dateObj = {}
                        dateObj.validityStart = this.formValidate.validityStart
                        dateObj.validityEnd = this.formValidate.validityEnd
                        this.formValidate.validityStart = dateToString(this.formValidate.validityStart)
                        this.formValidate.validityEnd = dateToString(this.formValidate.validityEnd)
                        this.formValidate.recId = this.formValidate.id
                        this.formValidate.primaryIndustry = this.formValidate.primaryIndustry.join('-')
                        if (this.formValidate.isdisabled) {
                            /*修改信息*/
                            // this.$http.put('http://192.168.1.164:8093/admin/updateRecruiterInfo', this.formValidate)
                            this.$http.get('/admin/findRecUserByEmailAndRecId/02155bb9-7938-49b5-b00b-529f9e7d98b8?email='+ this.formValidate.email +'&recId=' + this.formValidate.id)
                            .then(function(response) {
                                if (response.data.success) {
                                    vm.$http.put('/admin/updateRecruiterInfo', vm.formValidate)
                                    .then(function (response) {
                                        vm.spinShow = false
                                        if (response.data.success) {
                                            vm.$Message.success('修改成功!')
                                            vm.$refs[name].resetFields()
                                        }else{
                                            vm.$Message.warning('修改失败!')
                                            vm.formValidate.validityStart = dateObj.validityStart
                                            vm.formValidate.validityEnd = dateObj.validityEnd
                                        }
                                    }).catch(function (error) {
                                        vm.$Message.error('提交失败!');
                                    });
                                }else{
                                    vm.$Message.warning( response.data.failReason + '!')
                                }
                            })
                        }else{
                            /*新建信息*/
                            // this.$http.post('http://192.168.1.164:8093/admin/saveRecruiterInfo', this.formValidate)
                            this.$http.post('/admin/findRecUserByEmail/02155bb9-7938-49b5-b00b-529f9e7d98b8?email=' + this.formValidate.email).then(function(response) {
                                if (response.data.success) {
                                    vm.$http.post('/admin/findRecInfByFullName/02155bb9-7938-49b5-b00b-529f9e7d98b8?fullName=' + vm.formValidate.fullName)
                                    .then(function(response) {
                                        if (response.data.success) {
                                            vm.$http.post('/admin/saveRecruiterInfo', vm.formValidate)
                                            .then(function (response) {
                                                vm.spinShow = false
                                                if (response.data.success) {
                                                    vm.$Message.success('添加成功!')
                                                    vm.$refs[name].resetFields()
                                                }else{
                                                    vm.$Message.warning('添加失败!')
                                                    vm.formValidate.validityStart = dateObj.validityStart
                                                    vm.formValidate.validityEnd = dateObj.validityEnd
                                                }
                                            })
                                        }else{
                                            vm.spinShow = false
                                            vm.$Message.warning('公司已存在!')
                                        }
                                    })
                                }else{
                                    vm.spinShow = false
                                    vm.$Message.warning( response.data.failReason + '!')
                                }
                            })
                        }
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            // 重置信息
            handleReset (name) {
                this.$refs[name].resetFields()
            }
        }
    }
</script>
<style>
    
</style>