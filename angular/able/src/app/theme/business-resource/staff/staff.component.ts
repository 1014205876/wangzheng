import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpServe } from './../../../layout/service/http-serve.service';
import { Http } from '@angular/http/src/http';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: [
    '../../../../assets/icon/menu/iconfont.css',
    '../../../../assets/icon/operate/iconfont.css',
    './staff.component.scss'
  ]
})
export class StaffComponent implements OnInit {

  public searchItems = { "name": "", "mobile": "", "status": "" };
  modalItems;
  modal = {
    title: '',
    type: ''
  }

  public rows = [];
  public erwmItems;
  public total;
  public totalPage;
  public pageNum;

  public staffStatus: any;

  // public modalTitle: String;
  // public modalStatus;

  addForm: FormGroup;
  institutions = [];
  institutionsStatus = [];

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
    private toastyService: ToastyService
  ) {

    this.modalItems = new Items();

    this.addForm = new FormGroup({
      number: new FormControl(),
      name: new FormControl(),
      mobile: new FormControl('', Validators.pattern(/^((1[3,4,5,6,7,8,9][0-9]))\d{8}$/)),
      institutionId: new FormControl(),
      staffStatus: new FormControl()
    })
  }

  ngOnInit() {
    this.search(1,'');
    this.getInstitutions();
    this.getInstitutionsStatus();
  }

  getErwm(row){
    this.erwmItems=row;
    console.log(row)
  }

  downloadPic(){
    var a = document.createElement("a"), //创建a标签
        event = document.createEvent("MouseEvents"); //创建鼠标事件对象
        event.initEvent("click", false, false); //初始化事件对象
        // a.href = credit[0]; //设置下载地址
        a.dispatchEvent(event); //给指定的元素，执行事件click事件
  }

  search(e,type) {
    if(!type){
      this.searchItems = { "name": "", "mobile": "", "status": "" };
    }
    this.http.getCustomHeaders("v1/resource/staffs?name="
      + (this.searchItems.name ? encodeURIComponent(this.searchItems.name) : '')
      + "&mobile=" + (this.searchItems.mobile ? encodeURIComponent(this.searchItems.mobile) : '')
      + "&status=" + (this.searchItems.status ? this.searchItems.status : '')
      + "&pageNum=" + e + "&pageSize=10").subscribe(res => {
        this.rows = res.result.list;
        this.total = res.result.total;
        this.totalPage = res.result.pages;
        this.pageNum = res.result.pageNum;
      })
  }
  reset() {
    this.searchItems.name = '';
    this.searchItems.mobile = '';
    this.searchItems.status = '';
  }
  changeTitle(title, type) {
    this.modal.title = title;
    this.modal.type = type;
  }
  add() {
    this.staffStatus = 1;
    this.modalItems.institutionId = "";
  }
  modify(value) {
    console.log(value)
    this.setValue(value);
  }

  setValue(value) {
    this.modalItems.name = value.name;
    this.modalItems.shortName = value.shortName;
    this.modalItems.code = value.code;
    this.modalItems.principal = value.principal;
    this.modalItems.mobile = value.mobile;
    this.modalItems.type = value.type;
    this.modalItems.status = value.status;
    this.modalItems.remark = value.remark;
    this.modalItems.id = value.id;
    this.modalItems.number = value.number;
    this.modalItems.institutionId = value.institutionId?value.institutionId:'';
    this.staffStatus = value.status;
  }

  onSubmit() {
    this.modalItems.status = this.staffStatus;
    if (this.modal.type == 'add') {
      this.http.postCustomHeaders("v1/resource/staff", this.modalItems)
        .subscribe(res => {
          console.log(res)
          if (res.code == '200') {
            this.toast.msg = '添加成功！';
            this.toast.type = 'success';
            this.addToast(this.toast);
          }
          else {
            this.toast.msg = res.reason;
            this.toast.type = 'error';
            this.addToast(this.toast);
          }
          this.search(1,'')
          this.addForm.reset();
          this.modalItems = new Items();
        })
    }
    else if (this.modal.type == 'edit') {
      this.http.putCustomHeaders("v1/resource/staffs/" + this.modalItems.id, this.modalItems)
        .subscribe(res => {
          if (res.code == '200') {
            this.toast.msg = '编辑成功！';
            this.toast.type = 'success';
            this.addToast(this.toast)
          }
          else {
            this.toast.msg = res.reason;
            this.toast.type = 'error';
            this.addToast(this.toast);
          }
          this.search(1,'');
          this.modalItems = new Items();
        })
    }

  }

  getInstitutions() {
    this.http.getCustomHeaders("v1/resource/institutions")
      .subscribe(res => {
        this.institutions = res.result;
      })
  }
  getInstitutionsStatus() {
    this.http.getCustomHeaders("v1/resource/institutions/status")
      .subscribe(res => {
        this.institutionsStatus = res.result;
      })
  }

  switchange(row) {
    var status = { "status": 0 };
    if (row.status == 0) {
      status.status = 1;
    } else if (row.status == 1) {
      status.status = 0;
    }
    this.http.patchCustomHeaders("/v1/resource/staffs/" + row.id, status)
      .subscribe(res => {
        console.log(res)
        if (res.code == '200') {
          this.toast.msg = "状态修改成功";
          this.toast.type = "success";
          this.addToast(this.toast);
        }
        this.rows = [];
        this.search(1,'');
      })
  }

  // toast提示
  addToast(options) {
    if (options.closeOther) {
      this.toastyService.clearAll();
    }
    this.toast.position = options.position ? options.position : this.toast.position;
    const toastOptions: ToastOptions = {
      title: options.title,
      msg: options.msg,
      showClose: options.showClose,
      timeout: 3000,
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

  changePage(e) {
    this.search(e,'');
  }
}
class Items {
  constructor(
    public name?: string,
    public mobile?: string,
    public institutionId?: string,
    public institutionName?: string,
    public status?: any,
    public id?: string,
    public number?: number
  ) { }
}
