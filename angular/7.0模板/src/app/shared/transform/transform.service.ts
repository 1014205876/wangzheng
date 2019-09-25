import { Injectable } from '@angular/core';

@Injectable()
export class TransformService {

    constructor(
    ) {
    }
    /** 
      * 时间格式化函数
      * fmt为输出的时间格式（yyyy-MM-dd hh:mm:ss）或（yyyy-MM-dd 00:00:00）
      * date为输入的时间对象（new Date()）
     */
    timeFormat(fmt, value) {
        let date = new Date(value)
        var o = {
            "M+": date.getMonth() + 1,                      //月份   
            "d+": date.getDate(),                           //日   
            "h+": date.getHours(),                          //小时   
            "m+": date.getMinutes(),                        //分   
            "s+": date.getSeconds(),                        //秒   
            "q+": Math.floor((date.getMonth() + 3) / 3),    //季度   
            "S": date.getMilliseconds()                     //毫秒   
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        return fmt;
    }

    testid(id) {//身份证验证
        var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
        //号码规则校验
        if (!format.test(id)) {
            return false
        } else {
            return true
        }
    }

    codeURI(type, string) {
        if (type == 'encodeURI') {//中文转编码
            return encodeURI(string);
        }
        if (type == 'decodeURI') {//编码转中文
            return decodeURI(string);
        }
    }
}
