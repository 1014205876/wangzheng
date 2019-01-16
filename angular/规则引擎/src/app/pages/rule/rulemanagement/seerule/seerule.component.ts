import { Component, OnInit } from '@angular/core';
import { HttpServe } from '../../../../layout/service/http-serve.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-seerule',
  templateUrl: './seerule.component.html',
  styleUrls: ['./seerule.component.css']
})
export class SeeruleComponent implements OnInit {

  constructor(
    private http: HttpServe,
    public route: ActivatedRoute,
  ) {
    this.name = this.route.snapshot.queryParams["name"];
    this.getVersion();//防止请求时间过长报错把事件提前
  }
  
  tabindex: number = 0;
  tabs = [];//选项卡
  name = ''//页面传过来的规则名称
  loading = false;//控制表格的loading状态
  data = {
    // "id": "5de0bdef-7858-4d0d-8620-27b93951e2e4",
    // "name": "规则1",
    // "version": 3,
    // "groupId": "111",
    // "rule": "package com.xu.drools\r\n\r\nimport com.masspick.peak.decision.model.Person;\r\nimport com.masspick.peak.decision.model.Human;\r\n\r\n\r\n",
    // "remark": "规则1",
    // "createTime": "2019-01-14T07:05:31.000+0000",
    // "updateTime": "2019-01-14T07:05:31.000+0000",
    // "groupName": "分组1",
    // "showVersion": "v3",
    // "models": [
    //   {
    //     "version": "v1",
    //     "name": "法人"
    //   },
    //   {
    //     "version": "v1",
    //     "name": "模型"
    //   }
    // ]
  }

  consol(arr) {//打印函数
    arr.forEach(item => {
      console.log(item)
    })
  }

  getVersion() {
    let that = this;
    that.http.getCustomHeaders(
      `peak-decision/v1/decision/versions/rules/${that.name}`
    ).subscribe(res => {
      console.log(res);
      that.tabs=res.result
      that.getTable()
    })
  }
  getTable() {
    let that = this;
    that.loading = true
    let name = that.name;
    let version = that.tabs[that.tabindex];
    that.http.getCustomHeaders(
      `peak-decision/v1/decision/versionRule/${name}?version=${version}`
    ).subscribe(res => {
      console.log(res);
      that.data=res.result
      that.loading = false
    })
  }
  tabsChange(e) {//选项卡切换触发
    this.tabindex = e.index
    this.getTable()
  }
  // 生命周期函数
  ngOnInit() {
  }
}
