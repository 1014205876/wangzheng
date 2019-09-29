import { Component, OnInit } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit {

    // 定义变量
    nowYear;//今天的年份
    nowMonth;//今天的月份
    nowWeak;//今天的星期
    nowDay;//今天的日期
    nowTime;//今天的时间戳

    weakArr = ['日', '一', '二', '三', '四', '五', '六']
    calendaArr = [];//日历数组
    calendarYear;//日历展示的的年份
    calendarMonth;//日历展示的月份

    toYearNum: number = new Date().getFullYear();//将要跳转的年份
    toMonthNum: number = new Date().getMonth() + 1;//将要跳转的月份

    startDate;//区间开始日期
    endDate;//区间结束日期
    startTime;//区间开始时间
    endTime;//区间结束时间

    // 生命周期函数
    constructor(
        private message: NzMessageService
    ) { }

    ngOnInit() {//初始化函数，页面载入时自动调用
        this.nowYear = new Date().getFullYear();
        this.nowMonth = new Date().getMonth() + 1;
        this.nowWeak = new Date().getDay();
        this.nowDay = new Date().getDate();
        this.nowTime = new Date().getTime();

        this.calendarYear = new Date().getFullYear();
        this.calendarMonth = new Date().getMonth() + 1;
        this.getCalendarArr(this.calendarYear, this.calendarMonth);
    }

    // 自定义函数
    getMonthDays(year, month) {//获取该月天数
        //判断2月份天数
        let days: number = 30;
        if (month == 2) {
            days = (year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0) ? 29 : 28;
        } else {
            //1-7月 单数月为31日 
            if (month < 7) {
                days = month % 2 == 1 ? 31 : 30;
            } else {
                //8-12月 双月为31日
                days = month % 2 == 0 ? 31 : 30;
            }
        }
        return days;
    }

    getCalendarArr(year, month) {//获取日历数组
        let calendaArr = [];//日历数组
        let monthDays = this.getMonthDays(year, month);//获取该月天数
        let firstDayWeak = new Date(year, month - 1, 1).getDay();//获取该月第一天是礼拜几（礼拜日为0）
        let nextMonthDays = (42 - monthDays - firstDayWeak);//获取剩下的月份的日期
        for (let i = 0; i < firstDayWeak; i++) {//插入上月时间
            calendaArr.push({
                year: new Date(year, month - 1, i - firstDayWeak + 1).getFullYear(),
                month: new Date(year, month - 1, i - firstDayWeak + 1).getMonth() + 1,
                day: new Date(year, month - 1, i - firstDayWeak + 1).getDate(),
                weak: new Date(year, month - 1, i - firstDayWeak + 1).getDay(),
                time: new Date(year, month - 1, i - firstDayWeak + 1).getTime() + 28800000,//该方法计算时间戳时会少8个小时的时间
            })
        }
        for (let i = 0; i < monthDays; i++) {//插入本月时间
            calendaArr.push({
                year: new Date(year, month - 1, i + 1).getFullYear(),
                month: new Date(year, month - 1, i + 1).getMonth() + 1,
                day: new Date(year, month - 1, i + 1).getDate(),
                weak: new Date(year, month - 1, i + 1).getDay(),
                time: new Date(year, month - 1, i + 1).getTime() + 28800000,//该方法计算时间戳时会少8个小时的时间
            })
        }
        for (let i = 0; i < nextMonthDays; i++) {//插入下月时间
            calendaArr.push({
                year: new Date(year, month, i + 1).getFullYear(),
                month: new Date(year, month, i + 1).getMonth() + 1,
                day: new Date(year, month, i + 1).getDate(),
                weak: new Date(year, month, i + 1).getDay(),
                time: new Date(year, month, i + 1).getTime() + 28800000,//该方法计算时间戳时会少8个小时的时间
            })
        }
        this.calendaArr = calendaArr;
    }

    toOtherMonth(num: number) {//去其他月份
        this.calendarMonth = this.calendarMonth + num;//切换日历展示的月份
        if (this.calendarMonth > 12) {//如果月份大于12（超过12月，类似2019年13月就是2020年1月）
            this.calendarYear = this.calendarYear + Math.floor(this.calendarMonth / 12);//标准化年份
            this.calendarMonth = this.calendarMonth % 12;//标准化月份
        }
        if (this.calendarMonth == 0) {//如果月份等于0（等于0月，2019年0月就是2018年11月）
            this.calendarYear = this.calendarYear - 1;//标准化年份
            this.calendarMonth = 12;//标准化月份
        }
        if (this.calendarMonth < 0) {//如果月份小于1（小于1月，类似2019年-1月就是2018年10月）
            this.calendarYear = this.calendarYear + Math.floor(this.calendarMonth / 12);//标准化年份
            this.calendarMonth = this.calendarMonth % 12 + 12;//标准化月份
        }
        this.getCalendarArr(this.calendarYear, this.calendarMonth);
    }
    getThisDay(item) {
        this.message.success('选中的是:' + item.year + '年,' + item.month + '月,' + item.day + '日,' + '周' + this.weakArr[item.weak]);
        this.toOtherMonth((item.year - this.calendarYear) * 12 + item.month - this.calendarMonth)
    }
    useInterval() {
        this.startTime = new Date(this.startDate).getTime();
        this.endTime = new Date(this.endDate).getTime();
    }
}
