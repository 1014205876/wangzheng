import { Component, OnInit } from '@angular/core';
import { HttpServe } from '../../../shared/service/http-serve.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FileUploader } from 'ng2-file-upload';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.less']
})
export class BannerComponent implements OnInit {

  breadcrumbs = ['内容管理', 'banner管理'];

  searchItems = {
    title: '',//标题
    status: null//状态
  }
  page = {
    "total": 1,         //总条数
    "totalPage": 1,     //总页数
    "pageNum": 1,        //当前页码
    "pageSize": 10      //每页展示多少条数据
  }
  rows=[];
  loading=false;
  modalForm: FormGroup;
  modalConfig={
    "modalTitle":'',
    "modalStatus": '',
    "show": false
  };
  bannerId
  data = {
    mengbanshow: false,//控制弹窗蒙版的显示隐藏
    formshow: false,//控制form弹窗的显示隐藏
    removeshow: false,//控制删除弹窗的显示隐藏
    imgshow: false,//查看放大的banner图
    imgurl: '',//查看放大的banner图的url
    add: true,//为真时添加，为假时修改
    addtext: '添加',//弹窗标题
    form: {//表单数据，用于生成和修改
      "id": "",
      "title": "",
      "mediaUrl": "",
      'detail': '',
      "status": 1,
      sort: '',//排序
      cansubmit: true,//控制提交按钮是否禁用
    },
  }

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private http: HttpServe
  ) { 
    this.search(1);
    this.modalForm = this.fb.group({
      title: [null, [Validators.required]],
      mediaUrl: [null, [Validators.required]],
      detail: [null, [Validators.required]],
      status: [null, [Validators.required]],
      sort: [null, [Validators.required]]
    })
  }
  
  //生命周期函数
  ngOnInit() {}
  
  search(pageNum) {//查询配置项
    this.loading=true;
    this.http.get("guest-manage/v1/app/back/bannersDataGrid?title="
    + (this.searchItems.title?this.searchItems.title:'')
    + '&status=' + (this.searchItems.status?this.searchItems.status:'')
      + '&pageNum=' + pageNum + '&pageSize=' + 10
    ).then(res => {
      this.loading=false;
      this.rows = res.list;
      this.page.total = res.total;
      this.page.totalPage = res.pages;
      this.page.pageNum = res.pageNum;
    },(error)=>{
      error?this.message.create('error',error):''
    })
  }

  reset() {
    this.searchItems = {
      title: '',//标题
      status: null//状态
    };
  }
  
  changePage(e) {//切换页码
    this.search(e);
  }

  cancel() { }

  modalShow() {
    this.modalConfig.show=true;
  }
  modalCancel() {
    this.modalConfig.show = false;
    this.loading = false;
    this.reset();
    this.modalForm.reset();
    this.search(1);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.modalForm.reset();
    for (const key in this.modalForm.controls) {
      this.modalForm.controls[key].markAsPristine();
      this.modalForm.controls[key].updateValueAndValidity();
    }
  }
  // 提交
  submitted(e) {
    if (this.modalConfig.modalStatus == 'add') {
      this.add(e);
    }
    else if (this.modalConfig.modalStatus == 'edit') {
      this.edit(e);
    }
  }
  add(e) {}
  edit(e) {}

  keyupHandler(e) {//富文本内容导出
    // this.data.form.detail = e
    this.modalForm.get('detail').setValue(e)
  }

  addtable(form) {//添加配置项
    this.http.post(
      'guest-manage/v1/app/back/banner',
      {
        title: form.title,
        mediaUrl: form.mediaUrl,
        detail: form.detail,
        status: form.status,
        sort: form.sort
      }
    ).then(res => {
      this.message.create('success', '添加成功')
      this.search(this.page.pageNum);//重新调取后台表格数据
    }, (error) => {
      let messageInfo = '添加失败, ' + error;
      this.message.create('error', messageInfo)
    })
  }
  removetable(id) {//删除配置项
    this.http.delete(
      'guest-manage/v1/app/back/banners/' + id
    ).then(res => {
      this.message.create('success', '删除成功');
      this.search(this.page.pageNum);//重新调取后台表格数据
    }, (error) => {
      let messageInfo = '删除失败，' + error;
      this.message.create('error', messageInfo)
    })
  }
  changetable(form) {//修改banner图
    this.http.put(
      'guest-manage/v1/app/back/banners/' + this.bannerId,
      {
        title: form.title,
        mediaUrl: form.mediaUrl,
        detail: form.detail,
        status: form.status,
        sort: form.sort
      }
    ).then(res => {
      console.log(res);
      this.message.create('success', '修改成功');
      this.search(this.page.pageNum);//重新调取后台表格数据
    }, (error) => {
      let messageInfo = '修改失败，' + error;
      this.message.create('error', messageInfo)
    })
  }

  uploader: FileUploader = new FileUploader({
    url: "/upload",
    method: "post",
    itemAlias: "file",
    autoUpload: false
  });
  selectedFileOnChanged(e, list) {//file框文件上传
    this.uploader.queue[0].upload();
    this.uploader.queue[0].onSuccess = (response, status, headers) => {
      this.uploader.clearQueue();//清除文件
      if (status == 200) {
        list.mediaUrl = JSON.parse(response).location
        // this.modalForm.get('mediaUrl').setValue(JSON.parse(response).location)
      } else {
        this.message.create('error', '上传失败');
      }
    }
  };

  formshow(list) {//点击添加或修改按钮，打开添加弹窗
    if (list) {
      // let keyList=['title','mediaUrl','detail','status','sort']
      // this.setFormValue(this.modalForm, keyList, list);
      this.data.form.title = list.title
      this.data.form.mediaUrl = list.mediaUrl
      this.data.form.detail = list.detail
      this.data.form.status = list.status
      this.data.form.id = list.id
      this.data.form.sort = list.sort
      this.data.add = false;
      this.data.addtext = '修改';
      this.bannerId = list.id
      this.data.add = false;
    } else {
      this.data.addtext = '添加';
      this.bannerId='';
      this.modalForm = this.fb.group({
        title: [null, [Validators.required]],
        mediaUrl: [null, [Validators.required]],
        detail: [null, [Validators.required]],
        status: [null, [Validators.required]],
        sort: [null, [Validators.required]]
      })
      this.data.form = {
        "id": "",
        "title": "",
        "mediaUrl": "",
        'detail': '',
        "status": 1,
        sort: '',//排序
        cansubmit: true,//控制提交按钮是否禁用
      }
      this.data.add = true;
      this.data.addtext = '添加';
    }
    this.data.mengbanshow = true;
    this.data.formshow = true;
  }
  // 表单元素赋值
  setFormValue(form, key: any[], value: any[]) {
    key.forEach(item => {
      if (value.hasOwnProperty(item)) {
        form.get(item).setValue(value[item]);
      }
    })
  }
  submit() {//点击提交按钮，发起添加或修改请求
    if (this.data.form.title) {
      // if (this.data.form.mediaUrl) {
      if (this.data.form.detail) {
        if (this.data.form.sort) {
          if (this.data.addtext == '添加') {
            this.addtable(this.data.form)
          }
          if (this.data.addtext == '修改') {
            this.changetable(this.data.form)
          }
          this.hidden()
        } else {
          this.message.create('warning', '请填写排序');
        }
      } else {
        this.message.create('warning', '请填写详情');
      }
      // } else {
      //   alert('请选择文件')
      // }
    } else {
      this.message.create('warning', '请填写标题');
    }
  }
  switchange(data) {//点击状态滑块，切换禁用启用状态
    var value = { "status": null };
    data.status?(value.status=1):(value.status=0);
    this.http.patch("guest-manage/v1/app/back/banners/" + data.id, value)
      .then(res => {
        this.message.create('success', '修改成功');
        this.search(this.page.pageNum);//重新调取后台表格数据
      }, (error) => {
        let messageInfo = '修改失败，' + error;
        this.message.create('error', messageInfo)
      })
  }
  imgshow(url) {
    this.data.imgurl = url
    this.data.mengbanshow = true;
    this.data.imgshow = true
  }
  hidden() {//点击取消按钮，关闭所有弹窗
    this.data.mengbanshow = false;
    this.data.formshow = false;
    this.data.removeshow = false;
    this.data.imgshow = false;
    this.modalForm = this.fb.group({
      title: [null, [Validators.required]],
      mediaUrl: [null, [Validators.required]],
      detail: [null, [Validators.required]],
      status: [null, [Validators.required]],
      sort: [null, [Validators.required]]
    })
    this.data.form = {//关闭弹窗时把弹窗清除
      "id": "",
      "title": "",
      "mediaUrl": "",
      'detail': '',
      "status": 1,
      sort: '',//排序
      cansubmit: true,//控制提交按钮是否禁用
    }
  }
  ngDoCheck() {
    if (this.data.form.title) {//检测标题是否填写
      if (this.data.form.mediaUrl) {//检测图片路径是否填写
        if (this.data.form.detail) {//检测描述是否填写
          if (this.data.form.sort) {//检测排序是否填写
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
    } else {
      this.data.form.cansubmit = true
    }
  }

}
