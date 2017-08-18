<template>
    <div class="content-view" id="act">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="view-title">
            <span>创建活动</span>
        </div>
        <Card class="form_card">
            <Steps :current="currentStep">
                <Step title="基本信息" content=""></Step>
                <Step title="活动介绍" content=""></Step>
                <Step title="活动图片" content=""></Step>
                <Step title="活动视频" content=""></Step>
            </Steps>
            <div class="step1 step_view" v-if="currentStep === 0">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                    <Form-item label="活动名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入活动名称"></Input>
                    </Form-item>
                    <Form-item label="活动标签" prop="label">
                        <Input v-model="formValidate.label" placeholder="请输入活动标签"></Input>
                    </Form-item>
                    <Form-item label="主办方" prop="organizer">
                        <Input v-model="formValidate.organizer" placeholder="请输入主办方"></Input>
                    </Form-item>
                    <Form-item label="限额人数" prop="limitNum">
                        <Input v-model="formValidate.limitNum" placeholder="请输入限额人数"></Input>
                    </Form-item>
                    <Form-item label="报名门槛" prop="threshold">
                        <Select v-model="formValidate.threshold" placeholder="请选择报名门槛">
                            <Option value="1">不设限制</Option>
                            <Option value="2">需完善简历中所有必填字段（70%）</Option>
                            <Option value="3">全完善</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="活动时间" class="choose_date">
                        <Row>
                            <Col span="11">
                                <Form-item prop="startTime">
                                    <Date-picker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择开始日期和时间" v-model="formValidate.startTime"></Date-picker>
                                </Form-item>
                            </Col>
                            <Col span="2" style="text-align: center">——</Col>
                            <Col span="11">
                                <Form-item prop="endTime">
	                                <Date-picker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择结束日期和时间" v-model="formValidate.endTime"></Date-picker>
                                </Form-item>
                            </Col>
                        </Row>
                    </Form-item>
                    <Form-item label="活动地点" prop="address">
                        <Input v-model="formValidate.address" placeholder="请输入活动地点"></Input>
                    </Form-item>
                    <Form-item label="活动摘要">
                        <Input v-model="formValidate.summary" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入活动摘要"></Input>
                    </Form-item>
                    <Form-item label="主图(可上传多张)" prop="majorImg" class="ivu-form-item-required">
                        <div class="demo-upload-list" v-for="(item,index) in formValidate.majorImgDTOList">
                            <template v-if="item.status === 'finished'">
                                <img :src="item.url">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                                    <Icon type="ios-trash-outline" @click.native="majorRemove(index)"></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <i-progress v-if="item.showProgress" :percent="item.percentage" hide-info></i-progress>
                            </template>
                        </div>
                        <Upload
                                ref="upload"
                                name="filePic"
                                :show-upload-list="false"
                                :on-success="majorSuccess"
                                :format="['jpg','jpeg','png','gif']"
                                :max-size="2048"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                multiple
                                type="drag"
                                action="/activity/upload/activityImg"
                                style="display: inline-block;width:58px;">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="camera" size="20"></Icon>
                            </div>
                        </Upload>
                        <Modal title="查看图片" v-model="visible">
                            <img :src="imgUrl" v-if="visible" style="width: 100%">
                        </Modal>
                    </Form-item>
                   	<!-- 副图 -->
                    <Form-item label="副图(一张)" prop="minorImg" class="ivu-form-item-required">
                        <div class="demo-upload-list" v-for="(item,index) in minoruploadList">
                            <template v-if="item.status === 'finished'">
                                <img :src="item.url">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                                    <Icon type="ios-trash-outline" @click.native="minorRemove"></Icon>
                                </div>
                            </template>
                            <template v-else>
                                <i-progress v-if="item.showProgress" :percent="item.percentage" hide-info></i-progress>
                            </template>
                        </div>
                        <Upload
                                ref="upload"
                                name="filePic"
                                :show-upload-list="false"
                                :on-success="minorSuccess"
                                :format="['jpg','jpeg','png','gif']"
                                :max-size="2048"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :before-upload="handleBeforeUpload"
                                multiple
                                type="drag"
                                action="/activity/upload/activityImg"
                                style="display: inline-block;width:58px;">
                            <div style="width: 58px;height:58px;line-height: 58px;">
                                <Icon type="camera" size="20"></Icon>
                            </div>
                        </Upload>
                    </Form-item>
                    <div class="next_btn">
                    	<Button type="primary" @click.native="clickStep1('formValidate')">下一步</Button>
                    </div>
                </Form>
            </div>
            <div class="step2" v-if="currentStep === 1">
                <froala :tag="'div'" :config="config" v-model="actText"></froala>
            	<div class="next_btn">
	            	<Button type="primary" @click.native="preBtn">上一步</Button>
                	<Button type="primary" @click.native="clickStep2">下一步</Button>
                </div>
            </div>
            <!-- 第三部，活动图片 -->
            <div class="step3 step_view" v-if="currentStep === 2">
                <Form :label-width="120">
                	<Form-item label="活动照片">
                	    <div class="demo-upload-list" v-for="(item,index) in activeImgList">
                	        <template v-if="item.status === 'finished'">
                	            <img :src="item.url">
                	            <div class="demo-upload-list-cover">
                	                <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                	                <Icon type="ios-trash-outline" @click.native="activeImgRemove(index)"></Icon>
                	            </div>
                	        </template>
                	        <template v-else>
                	            <i-progress v-if="item.showProgress" :percent="item.percentage" hide-info></i-progress>
                	        </template>
                	    </div>
                	    <Upload
                	            ref="upload"
                	            name="filePic"
                	            :show-upload-list="false"
                	            :on-success="activeImgSuccess"
                	            :format="['jpg','jpeg','png','gif']"
                	            :max-size="2048"
                	            :on-format-error="handleFormatError"
                	            multiple
                	            type="drag"
                	            action="/activity/upload/activityImg"
                	            style="display: inline-block;width:58px;">
                	        <div style="width: 58px;height:58px;line-height: 58px;">
                	            <Icon type="camera" size="20"></Icon>
                	        </div>
                	    </Upload>
                	    <Modal title="查看图片" v-model="visible">
                	        <img :src="imgUrl" v-if="visible" style="width: 100%">
                	    </Modal>
                	</Form-item>
                </Form>
            	<div class="next_btn">
	            	<Button type="primary" @click.native="preBtn">上一步</Button>
                	<Button type="primary" @click.native="clickStep3">下一步</Button>
                </div>
            </div>
            <div class="step4 step_view" v-if="currentStep === 3">
	            <Form :label-width="120">
	            	<Form-item label="活动视频">
	            		<Input v-model="activeVideo" placeholder="活动视频地址,多个视频请用英文逗号隔开"></Input>
	            	</Form-item>
	            </Form>
	        	<div class="next_btn">
	            	<Button type="primary" @click.native="preBtn">上一步</Button>
	            	<Button type="primary" v-if="isEdit" @click.native="clickStep4">修改完成</Button>
	            	<Button type="primary" v-else @click.native="clickStep4">创建完成</Button>
	            </div>
            </div>
        </Card>
    </div>
</template>
<script>
    import VueFroala from 'vue-froala-wysiwyg';

    export default {
        data() {
        	const majorValidateImg = (rule, value, callback) => {
                if (this.formValidate.majorImgDTOList.length === 0) {
                    return callback(new Error('最少上传一张图片'));
                }
            }
            const minorValidateImg = (rule, value, callback) => {
            	if (!this.formValidate.minorImgDTOList.hasOwnProperty('actUuid')) {
                    return callback(new Error('最少上传一张图片'));
                }
            }
            return {
            	isEdit: false,
                currentStep: 0,
                spinShow: false,
                formValidate: {
                    name: null,
                    summary: null,
                    limitNum: null,
                    threshold: '',
                    startTime: null,
                    endTime: null,
                    address: null,
                    organizer: null,
                    label: null,
                    majorImgDTOList: [],
                    minorImgDTOList: {}
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '活动名称不能为空', trigger: 'blur' }
                    ],
                    limitNum: [
                        { required: true, message: '限制人数不能为空', trigger: 'blur'},
                        { pattern: /^[0-9]*$/, message: '请输入数字', trigger: 'blur' }
                    ],
                    threshold: [
                        { required: true, message: '请选择报名门槛', trigger: 'change'}
                    ],
                    address: [
                        { required: true, message: '活动地点不能为空', trigger: 'blur' }
                    ],
                    summary: [
                        { required: true, message: '活动摘不能为空', trigger: 'blur' }
                    ],
                    startTime: [
                        { required: true, type: 'date', message: '请选择开始时间', trigger: 'change' }
                    ],
                    endTime: [
                        { required: true, type: 'date', message: '请选择结束时间', trigger: 'change' }
                    ]
                },
                imgUrl: '',
                visible: false,
                uploadList: [],
                minoruploadList: [],
                activeImgList: [],
                activeVideo: '',
                actId: null,

                actText: '',
                config: {
                    toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'],
                    imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL'],
                    videoInsertButtons: ['videoBack', '|', 'videoByURL', 'videoEmbed'],
                    imageUploadURL: '/activity/upload/activityImg',
                    imageUploadParam: 'filePic'
                }
            }
        },
        created() {
        	if (this.$route.params.actId.trim().length) {
        		this.isEdit = true
        		this.actId = this.$route.params.actId
        		this.$http.get('/activity/' + this.$route.params.actId)
                .then((res) => {
                    if (res.data) {
                        let data = res.data
                        this.formValidate.name = data.name
                        this.formValidate.label = data.label
                        this.formValidate.organizer = data.organizer
                        this.formValidate.limitNum = data.limitNum + ''
                        this.formValidate.threshold = data.threshold + ''
                        this.formValidate.address = data.address
                        this.formValidate.summary = data.summary
                        // 处理时间
                        let start = data.startTime.split(' ')
                        let startDate = start[0].split('-')
                        let startTime = start[1].split(':')
                        this.formValidate.startTime = new Date(startDate[0], startDate[1] - 1, startDate[2], startTime[0], startTime[1])
                        let end = data.endTime.split(' ')
                        let endDate = end[0].split('-')
                        let endTime = end[1].split(':')
                        this.formValidate.endTime = new Date(endDate[0], endDate[1] - 1, endDate[2], endTime[0], endTime[1])
                        // 处理图片格式
                        if (data.majorImgDTOList.length) {
                        	data.majorImgDTOList.forEach((item) => {
                        	 	item.status = 'finished'
                        	 	item.url = item.data
                        	})
                    		this.uploadList = data.majorImgDTOList
                    		this.formValidate.majorImgDTOList = data.majorImgDTOList
                        }
                        if (data.minorImgDTOList) {
                        	data.minorImgDTOList.status = 'finished'
                        	data.minorImgDTOList.url = data.minorImgDTOList.data
                        	this.minoruploadList.push(data.minorImgDTOList)
                        	this.formValidate.minorImgDTOList = data.minorImgDTOList
                        }
                        // step2  活动介绍
                        this.actText = data.introDTO.data
                        // step3  活动图片
                        if (data.imgDTOList) {
                        	data.imgDTOList.forEach((item) => {
                        		let dataObj = {}
                        		dataObj.status = 'finished'
                        		dataObj.name = item.imgDataDTO.name
                        		dataObj.url = item.imgDataDTO.url
                        		this.activeImgList.push(dataObj)
                        	})
                        }
                        // step4 活动视频
                        if (data.videoDTOList) {
                        	let tempVideoList = []
                        	data.videoDTOList.forEach((item) => {
                        		tempVideoList.push(item.videoDataDTO.url)
                        	})
                        	this.activeVideo = tempVideoList.join(',')
                        }
                    }
                })
        	}
        },
        methods: {
        	// 预览图片
            handleView (item) {
                this.imgUrl = item.url;
                this.visible = true;
            },
            // 主图删除
            majorRemove (index) {
                this.uploadList.splice(index, 1)
                this.formValidate.majorImgDTOList.splice(index, 1)
            },
            // 主图上传成功
            majorSuccess (res, file) {
                file.url = res.link
                file.name = res.name
                file.actUuid = this.actId
                file.data = res.link
                this.formValidate.majorImgDTOList.push(file)
            },
            // 副图上传
            minorSuccess(res, file) {
            	file.url = res.link
                file.name = res.name
                this.minoruploadList.push(file)
                this.formValidate.minorImgDTOList.actUuid = null
                this.formValidate.minorImgDTOList.data = res.link
            },
            // 副图删除
            minorRemove() {
            	this.formValidate.minorImgDTOList = {}
            	this.minoruploadList = []
            },
            // 活动图片上传
            activeImgSuccess(res, file) {
            	file.url = res.link
                file.name = res.name
                this.activeImgList.push(file)
            },
            // 活动图片删除
            activeImgRemove(index) {
            	this.activeImgList.splice(index, 1)
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 或 gif 格式的图片。'
                })
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                })
            },
            handleBeforeUpload () {
                const check = this.minoruploadList.length < 1;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 1 张图片。'
                    })
                }
                return check;
            },
            preBtn() {
            	this.currentStep--
            },
            clickStep1(name) {
            	this.spinShow = true
            	this.$refs[name].validate((valid) => {
            		if (valid) {
            			if (this.formValidate.majorImgDTOList.length === 0) {
            				this.$Notice.warning({title: '请至少上传一张主图。'})
            				this.spinShow = false
            				return
            			}
            			if (!this.formValidate.minorImgDTOList.hasOwnProperty('actUuid')) {
            				this.$Notice.warning({title: '请至少上传一张副图。'})
            				this.spinShow = false
            				return
            			}
            			const dataObj = {}
            			Object.assign(dataObj, this.formValidate)
            			dataObj.startTime = dateToString(dataObj.startTime)
            			dataObj.endTime = dateToString(dataObj.endTime)
            			dataObj.id = this.actId
            			if (this.isEdit) {
            				// 修改基本信息
            				this.$http.put('/activity', dataObj)
            				.then((res) => {
            					if (res.data) {
            						this.currentStep = 1
            						this.actId = res.data
            						this.spinShow = false
            					}
            				})
            			}else{
            				// 创建基本信息
            				this.$http.post('/activity', dataObj)
            				.then((res) => {
            					if (res.data) {
            						this.currentStep = 1
            						this.actId = res.data
            						this.spinShow = false
            					}
            				})
            			}
            			
            		}else{
            			this.spinShow = false
            		}
            	})
            },
            clickStep2() {
            	if (this.actText) {
	            	this.spinShow = true
	            	let dataObj = {}
	            	dataObj.actUuid = this.actId
	            	dataObj.data = this.actText
	            	if (this.isEdit) {
		            	this.$http.put('/activity/intro/' + this.actId, dataObj)
		            	.then((res) => {
		            		if (res.data) {
				            	this.currentStep = 2
				            	this.spinShow = false
		            		}
		            	})
	            	}else{
		            	this.$http.post('/activity/intro/' + this.actId, dataObj)
		            	.then((res) => {
		            		if (res.data) {
				            	this.currentStep = 2
				            	this.spinShow = false
		            		}
		            	})
	            	}
            	}else{
            		this.$Message.error('请填写活动介绍')
            	}
            	
            },
            clickStep3() {
            	// 保存活动图片
            	if (this.activeImgList.length) {
            		this.spinShow = true
            		let dataArr = []
            		this.activeImgList.forEach((item) => {
            			let dataObj = {}
            			dataObj.actUuid = this.actId
            			dataObj.imgDataDTO = {}
            			dataObj.imgDataDTO.name = item.name
            			dataObj.imgDataDTO.title = item.name
            			dataObj.imgDataDTO.url = item.url
            			dataObj.imgDataDTO.desc = ''
            			dataArr.push(dataObj)
            		})
            		if (this.isEdit) {
            			this.$http.put('/activity/img/' + this.actId, dataArr)
            			.then((res) => {
            				if (res.data) {
            					this.spinShow = false
            					this.currentStep = 3
            				}
            			})
            		}else{
            			this.$http.post('/activity/img/' + this.actId, dataArr)
            			.then((res) => {
            				if (res.data) {
            					this.spinShow = false
            					this.currentStep = 3
            				}
            			})
            		}
            		
            	}else{
            		this.currentStep = 3
            	}
            },
            clickStep4() {
            	// 保存活动视频
            	if (this.activeVideo) {
            		this.spinShow = true
            		let videoList = this.activeVideo.split(',')
            		let dataVideoArr = []
            		videoList.forEach((item) => {
            			let dataVideoObj = {}
            			dataVideoObj.actUuid = this.actId
            			dataVideoObj.videoDataDTO = {}
            			dataVideoObj.videoDataDTO.title = ''
            			dataVideoObj.videoDataDTO.url = item
            			dataVideoObj.videoDataDTO.desc = ''
            			dataVideoArr.push(dataVideoObj)
            		})
            		if (this.isEdit) {
            			this.$http.put('/activity/video/' + this.actId, dataVideoArr)
            			.then((res) => {
            				if (res.data) {
            					this.spinShow = false
            					this.$Message.success('活动修改成功')
            					this.$router.push('/act/activities')
            				}
            			})
            		}else{
            			this.$http.post('/activity/video/' + this.actId, dataVideoArr)
            			.then((res) => {
            				if (res.data) {
            					this.spinShow = false
            					this.$Message.success('活动创建成功')
            					this.$router.push('/act/activities')
            				}
            			})
            		}
            	}else{
            		if (this.isEdit) {
            			this.$Message.success('活动修改成功')
    					this.$router.push('/act/activities')
            		}else{
            			this.$Message.success('活动创建成功')
	    				this.$router.push('/act/activities')
            		}
            	}
            }
        }
    }
    // 格式化时间函数
    function dateToString(readyDate){  
        if (readyDate && readyDate instanceof Date) {
            var year = readyDate.getFullYear();  
            var month =(readyDate.getMonth() + 1).toString();  
            var day = (readyDate.getDate()).toString();  
            var hour = (readyDate.getHours()).toString();  
            var minute = (readyDate.getMinutes()).toString();
            if (month.length == 1) {
                month = "0" + month;  
            }  
            if (day.length == 1) {  
                day = "0" + day;  
            }  
            if (hour.length == 1) {  
                hour = "0" + hour;  
            }  
            if (minute.length == 1) {  
                minute = "0" + minute;  
            }
            var dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;  
            return dateTime;
        }
    }
</script>
<style scoped>
.form_card{overflow: hidden;}
.ivu-steps-horizontal{margin-bottom: 30px;}
.step_view{padding: 0 140px 0 70px;}
.demo-upload-list{display: inline-block;width: 60px;height: 60px;text-align: center;line-height: 60px;border: 1px solid transparent;border-radius: 4px;overflow: hidden;background: #fff;position: relative;box-shadow: 0 1px 1px rgba(0,0,0,.2);margin-right: 4px;}
.demo-upload-list img{width: 100%;height: 100%;}
.demo-upload-list-cover{position: absolute;display: none;top: 0;bottom: 0;left: 0;right: 0;background: rgba(0,0,0,.6);}
.demo-upload-list:hover .demo-upload-list-cover{display: block;}
.demo-upload-list-cover i{color: #fff;font-size: 20px;cursor: pointer;margin: 0 2px;}

.next_btn{text-align: center;margin-top: 24px;}
.step2{padding: 0 30px;}
</style>
<style>
.ivu-steps-item{left: 8%;}
.fr-view{height: 330px;}
</style>