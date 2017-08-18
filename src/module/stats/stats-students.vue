<template>
    <div class="content-view">
        <Spin size="large" fix v-if="spinShow"></Spin>
        <div class="view-title">
            <span>学生数据统计</span>
            <Breadcrumb>
                <Breadcrumb-item><router-link to="/">主页</router-link></Breadcrumb-item>
                <Breadcrumb-item>数据统计</Breadcrumb-item>
                <Breadcrumb-item>学生数据统计</Breadcrumb-item>
            </Breadcrumb>
        </div>
        <Card class="search_card">
            <Form ref="formValidate" :model="formValidate" :label-width="50" inline>
                <Form-item label="日期">
                    <Row>
                        <Col span="11">
                            <Form-item prop="from">
                                <Date-picker type="date" placeholder="选择日期" v-model="formValidate.from"></Date-picker>
                            </Form-item>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <Form-item prop="to">
                                <Date-picker type="date" placeholder="选择日期" v-model="formValidate.to"></Date-picker>
                            </Form-item>
                        </Col>
                    </Row>
                </Form-item>
            <Button type="primary" @click="handleSubmit">查询</Button>
            </Form>
        </Card>
        <Card class="form_card">
        	<Table border :columns="columns" :data="data" :context="self" ></Table>
        	<div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="pageTotal" :current="pageCurrent" :page-size="30" @on-change="changePage" @on-page-size-change="changePageSize" show-elevator show-total show-sizer></Page>
                </div>
            </div>
        </Card>
    </div>
</template>
<script>
    // import { getCountData } from '@/common/js/getCountData.js'
    import { dateToString } from '@/common/js/date.js'
    import { formatDate } from '@/common/js/formatDate.js'
	export default {
		data() {
			return {
				self: this,
                spinShow: false,
				pageTotal: 0,
                pageCurrent: 1,
				columns: [
                    {
                        title: '日期',
                        key: 'date',
                        width: 100,
                        align: 'center'
                    },
                    {
                        title: '总注册用户量',
                        key: 'usr_total',
                        align: 'center'
                    },
                    {
                        title: '总注册用户日增量',
                        key: 'usr_total_increase',
                        align: 'center'
                    },
                    {
                        title: 'pc端累计注册量',
                        key: 'usr_total_pc',
                        align: 'center'
                    },
                    {
                        title: 'pc端注册用户日增量',
                        key: 'usr_total_pc_increase',
                        align: 'center'
                    },
                    {
                        title: '移动端累计注册量',
                        key: 'usr_total_mobi',
                        align: 'center'
                    },
                    {
                        title: '移动端注册用户日增量',
                        key: 'usr_total_mobi_increase',
                        align: 'center'
                    },
                    {
                        title: '总简历量',
                        key: 'cv_total',
                        align: 'center'
                    },
                    {
                        title: '总简历日增量',
                        key: 'cv_total_increase',
                        align: 'center'
                    },
                    {
                        title: 'pc端累计创建简历量',
                        key: 'cv_total_pc',
                        align: 'center'
                    },
                    {
                        title: 'pc端创建简历日增量',
                        key: 'cv_total_pc_increase',
                        align: 'center'
                    },
                    {
                        title: '移动端累计创建简历量',
                        key: 'cv_total_mobi',
                        align: 'center'
                    },
                    {
                        title: '移动端创建简历日增量',
                        key: 'cv_total_mobi_increase',
                        align: 'center'
                    },
                    {
                        title: '有效简历量',
                        key: 'cv_total_valid',
                        align: 'center'
                    },
                    {
                        title: '有效简历日增量',
                        key: 'cv_total_valid_increase',
                        align: 'center'
                    }
                ],
                data: [
                    /*{
                        date: '2017-03-30',
                        usr_total: '202',
                        usr_total_increase: '23',
                        usr_total_pc: '2340',
                        usr_total_pc_increase: '123',
                        usr_total_mobi: '250',
                        usr_total_mobi_increase: '12',
                        cv_total: '250',
                        cv_total_increase: '250',
                        cv_total_pc: '270',
                        cv_total_pc_increase: '270',
                        cv_total_mobi: '620',
                        cv_total_mobi_increase: '620',
                        cv_total_valid: '280',
                        cv_total_valid_increase: '280'
                    }*/
                ],
                formValidate: {
                    from: null,
                    to: null,
                    type : "",
                    total: 0,
                    pageNumber: 0,
                    pageSize: 30
                }
			}
		},
        created() {
            getCountData(this, 0, 'STAT_STUDENTS ', '/stats/stu/day/02155bb9-7938-49b5-b00b-529f9e7d98b8')
        },
		methods: {
			handleSubmit() {
                getCountData(this, 0, 'STAT_STUDENTS ', '/stats/stu/day/02155bb9-7938-49b5-b00b-529f9e7d98b8')
			},
			changePage(index) {
                const pageNumber = index - 1
                getCountData(this, pageNumber, 'STAT_STUDENTS ', '/stats/stu/day/02155bb9-7938-49b5-b00b-529f9e7d98b8')
			},
            changePageSize(val) {
                this.formValidate.pageSize = val
                getCountData(this, 0, 'STAT_STUDENTS ', '/stats/stu/day/02155bb9-7938-49b5-b00b-529f9e7d98b8')
            }
		}
	}
    function getCountData(thisVm, pageNumber, type, url){
        // 存储上一页最后的数据
       /* var prePageData = {}
        if (pageNumber) {
            prePageData = thisVm.data[thisVm.data.length - 1]
        }*/
        thisVm.spinShow = true
        thisVm.pageCurrent = pageNumber + 1
        // 如果没有时间查询默认前30天
        if (!thisVm.formValidate.from && !thisVm.formValidate.to) {
            const today = new Date()
            const lastMonth = new Date(today.getFullYear(), today.getMonth()-1, today.getDate())
            thisVm.formValidate.from = lastMonth
            thisVm.formValidate.to = today
        }
        // 初始化第几页
        thisVm.formValidate.pageNumber = pageNumber
        
        // 改变请求类型type
        thisVm.formValidate.type = type
        
        // 存储时间
        const dateObj = {}
        Object.assign(dateObj, thisVm.formValidate)

        // 时间对象转字符串
        dateObj.to = dateToString(dateObj.to)
        dateObj.from = dateToString(dateObj.from)

        thisVm.$http.post(url , dateObj)
        .then(function (response) {
            thisVm.data = []
            thisVm.pageTotal = response.data.total
            const arr = Object.keys(response.data.map)
            const tempArr = []
            arr.forEach( function(element, index) {
                tempArr[index] = response.data.map[element]
                tempArr[index].date = formatDate(element)
            })
            // 计算增量
            tempArr.forEach( function(element, index) {
                // 不是第一页计算增量时需要减去前一页最后的数据
                /*if (index == 0 && pageNumber) {
                    tempArr[index].usr_total_increase = tempArr[index].usr_total - prePageData.usr_total
                    tempArr[index].usr_total_pc_increase = tempArr[index].usr_total_pc - prePageData.usr_total_pc
                    tempArr[index].usr_total_mobi_increase = tempArr[index].usr_total_mobi - prePageData.usr_total_mobi
                    tempArr[index].cv_total_increase = tempArr[index].cv_total - prePageData.cv_total
                    tempArr[index].cv_total_pc_increase = tempArr[index].cv_total_pc - prePageData.cv_total_pc
                    tempArr[index].cv_total_mobi_increase = tempArr[index].cv_total_mobi - prePageData.cv_total_mobi
                    tempArr[index].cv_total_valid_increase = tempArr[index].cv_total_valid - prePageData.cv_total_valid
                }else */
                if (index == 0) {
                    tempArr[index].usr_total_increase = 0
                    tempArr[index].usr_total_pc_increase = 0
                    tempArr[index].usr_total_mobi_increase = 0
                    tempArr[index].cv_total_increase = 0
                    tempArr[index].cv_total_pc_increase = 0
                    tempArr[index].cv_total_mobi_increase = 0
                    tempArr[index].cv_total_valid_increase = 0
                }else{
                    tempArr[index].usr_total_increase = tempArr[index].usr_total - tempArr[index - 1].usr_total
                    tempArr[index].usr_total_pc_increase = tempArr[index].usr_total_pc - tempArr[index - 1].usr_total_pc
                    tempArr[index].usr_total_mobi_increase = tempArr[index].usr_total_mobi - tempArr[index - 1].usr_total_mobi
                    tempArr[index].cv_total_increase = tempArr[index].cv_total - tempArr[index - 1].cv_total
                    tempArr[index].cv_total_pc_increase = tempArr[index].cv_total_pc - tempArr[index - 1].cv_total_pc
                    tempArr[index].cv_total_mobi_increase = tempArr[index].cv_total_mobi - tempArr[index - 1].cv_total_mobi
                    tempArr[index].cv_total_valid_increase = tempArr[index].cv_total_valid - tempArr[index - 1].cv_total_valid
                }
            });
            // 格式化好的数据赋值给this.data
            thisVm.data = tempArr
            thisVm.spinShow = false
        }).catch(function (err) {
            console.log(err)
            thisVm.$Message.error('查询失败!')
        })
    }
</script>
<style></style>