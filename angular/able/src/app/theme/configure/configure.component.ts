import { Component, OnInit, Input, ViewChild } from '@angular/core';
// import { ConsoleReporter } from 'jasmine';
// import { UMeditorComponent } from 'ngx-umeditor';
import { HttpServe } from './../../layout/service/http-serve.service';
import { Http } from '@angular/http/src/http';
import { FileUploader } from 'ng2-file-upload';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: [
    './../../../assets/icon/menu/iconfont.css',
    './../../../assets/icon/operate/iconfont.css',
    './configure.component.scss',
  ]
})
export class ConfigureComponent implements OnInit {
  data = {
    add: true,//为真时添加，为假时修改
    addtext: '新增',//弹窗标题
    find: {//查询框数据
      name: '',
      key: '',
      pageNum: 1,//当前页码数
      pages: 1,//页码总数
      total: 1,
    },
    table: [//表格的数据
      {
        createTime: "2018-11-26 14:32:37",
        id: "54fc5d44-0b02-4f91-9ae1-3e0183c39e4c",
        key: "getCustomer",
        name: "进件端",
        status: -1,
        type: "text",
        updateTime: "2018-11-26 14:51:44",
        value: "aaaa",
      }
    ],
    form: {//表单数据，用于生成和修改
      name: '',
      key: '',
      type: 'text',
      value: '',
      id: '',
      cansubmit: true,//控制提交按钮是否禁用
    },
  }

  toast = {
    "position": 'center-center',
    "title": '提示',
    "msg": '',
    "showClose": true,
    "theme": 'material',
    "type": 'success',
    "closeOther": false
  };
  constructor(
    private http: HttpServe,
    private toastyService: ToastyService,
  ) { }

  reset() {//重置查询框
    this.data.find.name = '';
    this.data.find.key = '';
  }
  typechange() {//切换配置项类型时把配置项值清除
    this.data.form.value = ''
  }
  keyupHandler(e) {//富文本输入内容导入
    this.data.form.value = e
  }
  addtable(form) {//添加配置项
    console.log(form)
    this.http.postCustomHeaders(
      'v1/resource/setting',
      {
        name: form.name,
        key: form.key,
        type: form.type,
        value: form.value,
      }
    ).subscribe(res => {
      console.log(res);
      if (res.code == '200') {
        this.toast.msg = "添加成功";
        this.toast.type = "success";
        this.addToast(this.toast);
      } else {
        this.toast.msg = '添加失败，' + res.reason;
        this.toast.type = "error";
        this.addToast(this.toast);
      }
      this.gettable(this.data.find.pageNum, this.data.find);//重新调取后台表格数据
    })
  }
  removetable(form) {//删除配置项
    console.log(form)
    this.http.deleteCustomHeaders(
      'v1/resource/settings/' + form.id
    ).subscribe(res => {
      console.log(res);
      if (res.code == '200') {
        this.toast.msg = "删除成功";
        this.toast.type = "success";
        this.addToast(this.toast);
      } else {
        this.toast.msg = '删除失败，' + res.reason;
        this.toast.type = "error";
        this.addToast(this.toast);
      }
      this.gettable(this.data.find.pageNum, this.data.find);//重新调取后台表格数据
    })
  }
  changetable(form) {//修改配置项
    console.log(form)
    this.http.putCustomHeaders(
      'v1/resource/settings/' + form.id,
      {
        name: form.name,
        key: form.key,
        type: form.type,
        value: form.value,
      }
    ).subscribe(res => {
      console.log(res);
      if (res.code == '200') {
        this.toast.msg = "修改成功";
        this.toast.type = "success";
        this.addToast(this.toast);
      } else {
        this.toast.msg = '修改失败，' + res.reason;
        this.toast.type = "error";
        this.addToast(this.toast);
      }
      this.gettable(this.data.find.pageNum, this.data.find);//重新调取后台表格数据
    })
  }
  gettable(pageNum, find) {//查询配置项
    this.http.getCustomHeaders(
      'v1/resource/settingsDataGrid?name=' + find.name +
      '&key=' + find.key +
      '&pageNum=' + pageNum +
      '&pageSize=' + 10
    ).subscribe(res => {
      this.data.table = res.result.list
      this.data.find.pageNum = res.result.pageNum
      this.data.find.pages = res.result.pages
      this.data.find.total = res.result.total
      console.log(res);
    })
  }
  uploader: FileUploader = new FileUploader({//file框文件的上传配置
    url: "/upload",
    method: "post",
    itemAlias: "file",
    autoUpload: false
  });
  selectedFileOnChanged(e, list) {//file框选择文件时触发
    this.uploader.queue[0].upload();//传送文件
    this.uploader.queue[0].onSuccess = (response, status, headers) => {
      // console.log(response)
      // console.log(status)
      // console.log(headers)
      this.uploader.clearQueue();//清除文件
      if (status == 200) {
        list.value = JSON.parse(response).location
      } else {
        console.log('上传失败')
      }
    }
  }
  formshow(list) {//点击添加或修改按钮，打开添加弹窗
    console.log(list)
    if (list) {
      this.data.form.name = list.name
      this.data.form.key = list.key
      this.data.form.type = list.type
      this.data.form.value = list.value
      this.data.form.id = list.id
      this.data.add = false;
      this.data.addtext = '修改';
    } else {
      this.data.form = {
        name: '',
        key: '',
        type: 'text',
        value: '',
        id: '',
        cansubmit: true,//控制提交按钮是否禁用
      }
      this.data.add = true;
      this.data.addtext = '新增';
    }
  }
  submit() {//点击提交按钮，发起新增或修改请求
    if (this.data.addtext == '新增') {
      this.addtable(this.data.form)
    }
    if (this.data.addtext == '修改') {
      this.changetable(this.data.form)
    }
    this.hidden()
  }
  removeshow(list) {//点击删除按钮，打开删除弹窗
    this.data.form.id = list.id
  }
  remove() {//点击删除弹窗的确认按钮，发起删除请求
    console.log(this.data.form)
    this.removetable(this.data.form)
    this.hidden()
  }
  hidden() {//点击取消按钮，关闭所有弹窗
    this.data.form = {//关闭弹窗时把弹窗内容清除
      name: '',
      key: '',
      type: 'text',
      value: '',
      id: '',
      cansubmit: true,
    }
  }
  changePage(e) {//切换页码
    this.gettable(e, this.data.find);
  }

  addToast(options) {//弹出提示语
    if (options.closeOther) {
      this.toastyService.clearAll();
    }
    this.toast.position = options.position ? options.position : this.toast.position;
    const toastOptions: ToastOptions = {
      title: options.title,
      msg: options.msg,
      showClose: options.showClose,
      timeout: 5000,
      theme: options.theme,
      onAdd: (toast: ToastData) => {
        /* added */
      },
      onRemove: (toast: ToastData) => {
        /* removed */
      }
    };

    switch (options.type) {
      case 'default': this.toastyService.default(toastOptions); break;
      case 'info': this.toastyService.info(toastOptions); break;
      case 'success': this.toastyService.success(toastOptions); break;
      case 'wait': this.toastyService.wait(toastOptions); break;
      case 'error': this.toastyService.error(toastOptions); break;
      case 'warning': this.toastyService.warning(toastOptions); break;
    }
  }
  //生命周期函数
  ngOnInit() {//页面初次载入触发
    this.gettable(this.data.find.pageNum, this.data.find);//调取后台表格数据
  }
  ngDoCheck() {//页面监听（鼠标移动，键盘输入，触发）
    if (this.data.form.name) {
      if (this.data.form.key) {
        if (this.data.form.value) {
          this.data.form.cansubmit = false
        } else {
          this.data.form.cansubmit = true
        }
      } else {
        this.data.form.cansubmit = true
      }
    } else {
      this.data.form.cansubmit = true
    }
  }
}
