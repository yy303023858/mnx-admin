<template>
    <Modal
        v-model="openModal"
        title="选择毕业学校"
        width="800"
        @on-ok="chooseSchool"
        @on-cancel="cancelChooseSchool">
        <div class="container-university-selection">
            <div class="university-selection-header">
                <span class="university-selection-title">最多选择{{max}}个</span>
                <div class="university-selected-body">
                    <template v-for="(university,index) in selectedSchool">
                        <Tag type="border" closable color="blue" @on-close="delSchool(index)">{{ university }}</Tag>
                    </template>
                </div>
            </div>
            <div class="university-search">
                <Form ref="formValidate" :model="formValidate" :label-width="36">
                    <Form-item label="学校">
                        <Input placeholder="请输入学校" v-model="formValidate.school" style="width: 300px" @on-change="searchSchool" icon="search"></Input>
                        <div class="search_result" v-show="schoolShow">
                            <ul>
                                <li class="result_item" v-for="item in schoolResult" @click="selSchool(item.value)">{{item.value}}</li>
                            </ul>
                        </div>
                    </Form-item>
                </Form>
            </div>
            <div class="university-selection-body">
                <div class="university-wrap">
                    <h5 class="title-university-type">重点大学</h5>
                    <span @click="selSchoolType('211学院')" class="citySpan" :class="selectObj('211学院')">211学院</span>
                    <span @click="selSchoolType('985学院')" class="citySpan" :class="selectObj('985学院')">985学院</span>
                    <div class="schoolBox" v-for="item in schoolData.hot" v-show="schoolType === item.name">
                        <span class="schoolSpan" :class="selectSchoolObj(school)" v-for="school in item.universitys" @click="addSchool(school)">{{school}}</span>
                    </div>
                    <h5 class="title-university-type">全国各省</h5>
                    <!-- 全国各省标签 -->
                    <span v-for="item in schoolData.provinces" @click="selSchoolType(item.name)" class="citySpan" :class="selectObj(item.name)">{{item.name}}</span>
                    <div class="schoolBox" v-for="item in schoolData.provinces" v-show="schoolType === item.name">
                        <span class="schoolSpan" :class="selectSchoolObj(school)" v-for="school in item.universitys" @click="addSchool(school)">{{school}}</span>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
</template>

<script>
    import {schoolData} from '@/common/js/schoolData.js'
    export default {
        props: {
            universityModal: {
                type: Boolean,
                default: false
            },
            max: {
                type: Number,
                default: 1
            },
            url: {
                type: String
            }
        },
        computed: {
            openModal() {
                return this.universityModal
            }
        },
        data() {
            return {
                schoolType: null,
                schoolData: null,
                schoolShow: false,
                searchUrl: this.url,
                selectedSchool: [],
                schoolResult: [],
                formValidate: {
                    school: null
                }
            };
        },
        created() {
            this.schoolData = schoolData
        },
        methods: {
            selectObj(val) {
                return {
                    selectedSpan: this.schoolType === val
                }
            },
            selectSchoolObj(val) {
                return {
                    selectedSpan: this.selectedSchool.includes(val)
                }
            },
            selSchoolType(val) {
                this.schoolType = val
            },
            addSchool(val) {
                if (this.selectedSchool.length < 6) {
                    let isAdd = true
                    this.selectedSchool.forEach((item) => {
                        item === val ? isAdd = false : ''
                    })
                    isAdd && this.selectedSchool.push(val)
                }
            },
            delSchool(index) {
                this.selectedSchool.splice(index, 1);
            },
            // 搜索学校
            searchSchool() {
                if (this.formValidate.school.length > 0) {
                    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g")
                　　if(reg.test(this.formValidate.school)){    
                        this.$http.get(this.searchUrl + this.formValidate.school)
                        .then((res) => {
                            if (res.data.length > 0) {
                                this.schoolShow = true
                                this.schoolResult = res.data
                            }
                        }).catch((err) => {
                            console.log(err)
                        })
                　　}
                }else{
                    this.schoolShow = false
                }
            },
            // 选择学校
            selSchool(val) {
                this.addSchool(val)
                this.formValidate.school = null
                this.schoolShow = false
            },
            chooseSchool() {
                this.$emit('chooseSchool', this.selectedSchool)
            },
            cancelChooseSchool() {
                this.$emit('chooseSchool', 'cancel')
            }
        }
    }
</script>

<style scoped>
.ivu-form-item{margin-bottom: 0px;}
.citySpan{display: inline-block;width: 60px;font-size: 14px;cursor: pointer;text-align: center;transition: 0.3s;}
.citySpan:hover{background-color: #d7dde4;color: #657180;}
.schoolSpan{display: inline-block;margin: 2px 2px;padding: 2px 8px;font-size: 13px;cursor: pointer;transition: 0.3s;}
.schoolSpan:hover{background-color: #d7dde4;}
.selectedSpan{background-color: #39f;color: #fff;}
.schoolBox{height: 160px;overflow: auto;box-sizing: border-box;border: 1px solid #d7dde4;}
.university-selection-body{border: 1px solid #d7dde4;box-sizing: border-box;}
.title-university-type{padding: 6px 0;font-size: 14px;font-weight: normal;}
.university-search{padding: 10px 0;}
.university-wrap{padding: 8px;}
.schoolBox{padding: 5px;margin: 14px;}
.search_result{position: absolute;left: 0;top: 32px;z-index: 30;width: 300px;max-height: 180px;overflow: auto;border: 1px solid #d7dde4;border-radius: 4px;background-color: #fff;text-indent: 7px;}
.result_item:hover{background-color: #ebf7ff;cursor: pointer;}
</style>