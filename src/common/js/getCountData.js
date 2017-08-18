import { dateToString } from '@/common/js/date.js'
import { formatDate } from '@/common/js/formatDate.js'

export function getCountData(thisVm, pageNumber, type, url){
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
        // 格式化好的数据赋值给this.data
        thisVm.data = tempArr
        thisVm.spinShow = false
    }).catch(function () {
        thisVm.$Message.error('查询失败!')
    })
}
