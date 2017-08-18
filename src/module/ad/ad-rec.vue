<template>
    <div class="content-view" id="ad">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="view-title">
            <span>首页-名企校招</span>
            <Breadcrumb>
                <Breadcrumb-item>
                    <router-link to="/">主页</router-link>
                </Breadcrumb-item>
                <Breadcrumb-item>广告位管理</Breadcrumb-item>
                <Breadcrumb-item>首页-名企校招</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <Card class="form_card">
            <Table border :columns="columns" :data="data" :context="self"></Table>
        </Card>
        <Modal v-model="changeAdShow" title="更换广告页面" @on-ok="" @on-cancel="">
            <Form :model="form" :label-width="110">
                <Form-item label="广告内容">
                    <div class="demo-upload-list" v-for="(item,index) in uploadList">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="uploadRemove"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <i-progress v-if="item.showProgress" :percent="item.percentage" hide-info></i-progress>
                        </template>
                    </div>
                    <Upload ref="upload" name="filePic" :show-upload-list="false" :on-success="uploadSuccess" :format="['jpg','jpeg','png','gif']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" action="/activity/upload/activityImg" style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="camera" size="20"></Icon>
                        </div>
                    </Upload>
                </Form-item>
                <Form-item label="广告链接">
                    <Input v-model="form.link" placeholder="请输入广告链接"></Input>
                </Form-item>
                <Form-item label="宣传语">
                    <Input v-model="form.slogan" placeholder="请输入宣传语"></Input>
                </Form-item>
                <Form-item label="投放时间">
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
                <Form-item label="广告到期邮件提醒">
                    <Input v-model="form.email" placeholder="请输入提醒邮箱"></Input>
                </Form-item>
            </Form>
            <div slot="footer"></div>
        </Modal>
        <Modal title="查看图片" v-model="visible">
            <img :src="imgUrl" v-if="visible" style="width: 100%">
        </Modal>
    </div>
</template>
<script>
export default {
    data() {
        return {
            self: this,
            spinShow: false,
            changeAdShow: false,
            pageTotal: 0,
            pageCurrent: 1,
            tempPageSize: 10,
            uploadList: [],
            visible: false,
            form: {
                link: '',
                slogan: '',
                startTime: '',
                endTime: '',
                email: ''
            },
            data: [
                {
                    fullName: '携程计算机有限公司',
                    appCount: 1000,
                    stuCount: 1000,
                    city: '北京',
                    industry: '互谅网'
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
        },
        uploadSuccess(res, file) {
            file.url = res.link
            file.name = res.name
            this.minoruploadList.push(file)
            this.formValidate.minorImgDTOList.actUuid = null
            this.formValidate.minorImgDTOList.data = res.link
        },
        handleView(item) {
            this.imgUrl = item.url
            this.visible = true
        },
        uploadRemove() {
            this.formValidate.minorImgDTOList = {}
            this.minoruploadList = []
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 或 gif 格式的图片。'
            })
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
            })
        },
        handleBeforeUpload() {
            const check = this.uploadList.length < 1;
            if (!check) {
                this.$Notice.warning({
                    title: '最多只能上传 1 张图片。'
                })
            }
            return check
        },
        checkApplication() {

        }
    }
}
</script>
<style>
#ad .ivu-modal {
    top: 60px;
}
</style>

