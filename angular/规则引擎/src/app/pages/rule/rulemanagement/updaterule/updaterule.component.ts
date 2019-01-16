import { Component, OnInit } from '@angular/core';
import { HttpServe } from '../../../../layout/service/http-serve.service';
import { NzMessageService, NzFormatEmitEvent, NzTreeNode, UploadFile } from 'ng-zorro-antd';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-updaterule',
  templateUrl: './updaterule.component.html',
  styleUrls: ['./updaterule.component.less']
})
export class UpdateruleComponent implements OnInit {

  constructor(
    private http: HttpServe,
    public route: ActivatedRoute,
    private message: NzMessageService
  ) {
    this.name = this.route.snapshot.queryParams["name"];
    this.getVersion();//防止请求时间过长报错把事件提前
  }

  name = '';
  selectTreeShow = false;
  canSubmit = false;
  loading = false;
  fileShow = true;
  versions=[];//保存所有版本号
  data = {//表单对象
    "id": "5de0bdef-7858-4d0d-8620-27b93951e2e4",
    "name": "规则1",
    "version": 3,
    "groupId": "111",
    "rule": "package com.xu.drools\r\n\r\nimport com.masspick.peak.decision.model.Person;\r\nimport com.masspick.peak.decision.model.Human;\r\n\r\n\r\n",
    "remark": "规则1",
    "createTime": "2019-01-14T07:05:31.000+0000",
    "updateTime": "2019-01-14T07:05:31.000+0000",
    "groupName": "分组1",
    "showVersion": "v3",
  }

  consol(arr) {//打印函数
    arr.forEach(item => {
      console.log(item)
    })
  }
  back() {//返回上一页
    history.back();
  }
  getVersion() {
    let that = this;
    that.http.getCustomHeaders(
      `peak-decision/v1/decision/versions/rules/${that.name}`
    ).subscribe(res => {
      console.log(res);
      that.versions = res.result
      that.getTable()
    })
  }
  getTable() {
    let that = this;
    let name = that.name;
    let version = that.versions[0];
    that.http.getCustomHeaders(
      `peak-decision/v1/decision/versionRule/${name}?version=${version}`
    ).subscribe(res => {
      console.log(res);
      that.data = res.result
    })
  }
  uploader: FileUploader = new FileUploader({
    url: "/api/peak-decision/v1/decision/upload",
    method: "post",
    itemAlias: "file",
    autoUpload: false,
  });
  selectedFileOnChanged(e, data) {//file框点击文件上传触发
    let that = this;
    data.fileShow = false;
    that.uploader.queue[0].upload();
    that.uploader.queue[0].onSuccess = (response, status, headers) => {
      that.uploader.clearQueue();//清除文件
      if (status == 200) {
        console.log(JSON.parse(response))
        data.rule = JSON.parse(response).result
      } else {
        console.log('上传失败')
      }
      that.fileShow = true;
    }
  };
  submit() {//点击更新规则
    let that = this;
    that.http.postCustomHeaders(
      `peak-decision/v1/decision/updateRule/${that.data.id}`,
      {
        rule: that.data.rule,
      }
    ).subscribe(res => {
      console.log(res);
      if (res.code == '200') {
        that.back()
        that.message.create('success', `更新成功`, { nzDuration: 2000 });
      } else {
        that.message.create('error', `更新失败，${res.reason}`, {});
      }
    })
  }
  // 生命周期函数
  ngOnInit() {
    let that = this;
  }
  ngDoCheck() {//页面监听（鼠标移动，键盘输入，触发）
    if (this.data.rule) {//如果规则文件已经上传
      this.canSubmit = true
    } else {
      this.canSubmit = false
    }
  }
}
