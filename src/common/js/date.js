export function dateToString(readyDate){  
    if (readyDate && readyDate instanceof Date) {
        var year = readyDate.getFullYear();  
        var month =(readyDate.getMonth() + 1).toString();  
        var day = (readyDate.getDate()).toString();  
        // var hour = (readyDate.getHours()).toString();  
        // var minute = (readyDate.getMinutes()).toString();
        // var second = (readyDate.getSeconds()).toString();
        if (month.length == 1) {  
            month = "0" + month;  
        }  
        if (day.length == 1) {  
            day = "0" + day;  
        }  
        // if (hour.length == 1) {  
        //     hour = "0" + hour;  
        // }  
        // if (minute.length == 1) {  
        //     minute = "0" + minute;  
        // }  
        // if (second.length == 1) {  
        //     second = "0" + second;  
        // }  
        var dateTime = year + month + day;  
        return dateTime;
    }
}

