<template>
    <Modal
        v-model="afterOpenPreview"
        title="简历预览"
        width="1050"
        @on-cancel="colse">
            <div class="resume_preview">
                <div class="resume_item">
                    <h3 class="resume_item_title">基本信息</h3>
                    <div class="resume_wrapper">
                        <Row>
                            <Col span="7">
                                <p class="resume_subTitle"><span>姓名</span>{{resumeData.basic.realname}}</p>
                                <p class="resume_subTitle"><span>性别</span>{{resumeData.basic.gender}}</p>
                                <p class="resume_subTitle"><span>家庭所在地</span>{{resumeData.basic.province}}</p>
                            </Col>
                            <Col span="7">
                                <p class="resume_subTitle"><span>出生日期</span>{{resumeData.basic.birthday}}</p>
                                <p class="resume_subTitle"><span>手机号码</span>{{resumeData.basic.mobile}}</p>
                                <p class="resume_subTitle"><span>常用邮箱</span>{{resumeData.basic.email}}</p>
                            </Col>
                            <Col span="10">
                                <div class="avatar" style="float: right">
                                    <img :src="resumeData.basic.headImg" width="138" height="138">
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div class="resume_item" v-if="resumeData.educationInfos">
                    <h3 class="resume_item_title">教育经历</h3>
                    <div class="resume_wrapper">
                        <div v-for="item in resumeData.educationInfos" key="1">
                            <Row>
                                <Col span="6">
                                    <p>{{item.startDate}}至{{item.endDate}}</p>
                                </Col>
                                <Col span="6">
                                    <p>{{item.school}}</p>
                                </Col>
                                <Col span="6">
                                    <p>{{item.major}}</p>
                                </Col>
                                <Col span="6">
                                    <p>{{item.degree}}({{item.rank}})</p>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                <div class="resume_item" v-if="resumeData.work">
                    <h3 class="resume_item_title">实习经历</h3>
                    <div class="resume_wrapper">
                        <pre>{{resumeData.work}}</pre>
                    </div>
                </div>
                <div class="resume_item" v-if="resumeData.practices">
                    <h3 class="resume_item_title">项目经验</h3>
                    <div class="resume_wrapper">
                        <pre>{{resumeData.practices}}</pre>
                    </div>
                </div>
                <div class="resume_item" v-if="resumeData.club">
                    <h3 class="resume_item_title">社团经历</h3>
                    <div class="resume_wrapper">
                        <pre>{{resumeData.club}}</pre>
                    </div>
                </div>
                <div class="resume_item">
                    <h3 class="resume_item_title">技能/证书</h3>
                    <div class="resume_wrapper">
                        <div class="resume_content">
                            <h4 class="skill_title">语言能力</h4>
                            <div v-for="item in resumeData.language">
                                <Row>
                                    <Col span="5">
                                        <p>{{item.type}}</p>
                                    </Col>
                                    <Col span="5">
                                        <p>{{item.level}}</p>
                                    </Col>
                                    <Col span="5">
                                        <p>{{item.score}}</p>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div class="resume_content">
                            <h4 class="skill_title">证书</h4>
                            <div v-for="item in resumeData.certificate">
                                <p>{{item.name}}</p>
                            </div>
                        </div>
                        <div class="resume_content">
                            <h4 class="skill_title">技能</h4>
                            <div v-for="item in resumeData.skills">
                                <Row>
                                    <Col span="5">
                                        <pre>{{item.type}}</pre>
                                    </Col>
                                    <Col span="5">
                                        <pre>{{item.level}}</pre>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="resume_item" v-if="resumeData.reward">
                    <h3 class="resume_item_title">奖励荣誉</h3>
                    <div class="resume_wrapper">
                        <pre>{{resumeData.reward}}</pre>
                    </div>
                </div>
                <div class="resume_item" v-if="resumeData.attach">
                    <h3 class="resume_item_title">附件简历</h3>
                    <div class="resume_wrapper">
                        <Row>
                            <Col span="16">
                                <span>{{resumeData.attach.name}}</span>
                            </Col>
                            <Col span="8">
                                <!-- <a :href="resumeData.attach.url">点击查看</a> -->
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        <div slot="footer"></div>
    </Modal>
</template>
<script>
    export default {
        props: {
            openPreview: {
                type: Boolean,
                default: false
            },
            resumeData: {}
        },
        data() {
            return {
            }
        },
        computed: {
            afterOpenPreview() {
                return this.openPreview
            }
        },
        methods: {
            colse() {
                this.$emit('closeResume')
            }
        }
    }
</script>
<style scoped>
.resume_item{margin-bottom: 12px;}
.resume_item_title{margin-bottom: 12px;border-bottom: 2px solid #657180;font-size: 14px;}
.resume_wrapper{padding: 0 10px;}
.resume_wrapper pre{white-space: pre-wrap;word-wrap: break-word;}
.resume_content{margin-bottom: 10px;}
.resume_content pre{margin: 0;}
.resume_subTitle{margin-bottom: 34px;font-size: 12px;}
.resume_subTitle span{display: inline-block;width: 80px;color: #505964;}
.resume_subTitle:last-child{margin-bottom: 0;}
.skill_title{margin-bottom: 8px;line-height: 14px;font-size: 14px;border-left: 2px solid #657180;text-indent: 6px;}
</style>