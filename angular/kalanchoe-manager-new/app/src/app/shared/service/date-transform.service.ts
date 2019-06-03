import { Injectable } from '@angular/core';

@Injectable()
export class DateTransformService {

    constructor() { }
    transform(date: Date) {//由于此函数用于其他页面，修改会导致报错故放在这里不管
        var dateTemp;
        dateTemp = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        return dateTemp;
    }

    /** 
     * 时间格式化函数
     * fmt为输出的时间格式（yyyy-MM-dd hh:mm:ss）或（yyyy-MM-dd 00:00:00）
     * date为输入的时间对象（new Date()）
    */
    timeFormat(fmt, date) {
        var o = {
            "M+": date.getMonth() + 1,                      //月份   
            "d+": date.getDate(),                           //日   
            "h+": date.getHours(),                          //小时   
            "m+": date.getMinutes(),                        //分   
            "s+": date.getSeconds(),                        //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3),    //季度   
            "S": date.getMilliseconds()                     //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
}
