import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from './../../../../../shared/service/http-serve/api.service';
import { RegularService } from '../../../../../shared/service/regular/regular.service';

@Component({
  selector: 'app-product',
  templateUrl: './edit-rate-disposed.component.html',
  styleUrls: ['./edit-rate-disposed.component.less']
})
export class EditRateDisposed implements OnInit {
  /** 列表title */
  productName = '';
  productId = '';
  type = 'add';

  breadcrumbs = ['业务资源管理', '产品管理', '费率配置', '新增配置']

  // 表单字段
  public modalItems;
  // 修改字段id
  rowId;

  /** 表格数据 */
  rows = [{
    rate: "0",
    seq: 0,
    spel: "",
    type: "0"
  }];
  loadingDelay = 500;
  loading = false;

  formatterPercent = value => `${value} %`;
  parserPercent = value => value.replace(' %', '');

  constructor(
    private route: ActivatedRoute,
    private regular: RegularService,
    private api: ApiService,
    private message: NzMessageService
  ) {
    this.modalItems = new Group();
    this.rowId = this.route.snapshot.queryParams.id;
    this.productName = this.route.snapshot.queryParams.productName;
    this.productId = this.route.snapshot.queryParams.productId;
    this.type = this.route.snapshot.queryParams.type;
    if (this.type == 'edit') {
      this.breadcrumbs = ['业务资源管理', '产品管理', '费率配置', '编辑配置']
      this.search();
    }
  }

  ngOnInit() {
  }
  checkInput (event,index) {
    var reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/;// /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/
    if(!reg.test(event.target.value)){
        event.target.value = event.target.value.substring(0, event.target.value.length - 1);
        this.rows[index].rate = event.target.value
    }
    }

  /** 查询 */
  async search() {
    let res = await this.api.getSysProductRateSettingMes(this.rowId, {})
    this.modalItems.key = res.key;
    this.modalItems.name = res.name;
    this.rows = res.sysProductRates;
    for (let i = 0; i < this.rows.length; i++) {
      this.rows[i].type = String(this.rows[i].type);
    }
  }

  addRow() {
    this.rows = [...this.rows, {
      rate: "0",
      seq: 0,
      spel: "",
      type: "0"
    }];
  }
  deleteRow(index) {
    this.rows = this.rows.filter(e => e != index)
  }
  // 添加扩展配置
  async add(data) {
    let res = await this.api.addSysProductRateSetting(data)

    this.loading = false;
    if (res) {
      this.message.create("success", "添加成功", { nzDuration: 3000 });
      this.goBack();
    }
  }

  //修改配置项
  async edit(data) {
    let res = await this.api.editSysProductRateSetting(this.rowId, data)
    this.loading = false;
    if (res) {
      this.message.create("success", "修改成功", { nzDuration: 3000 });
      this.goBack();
    }
  }

  /** 返回 */
  goBack() {
    history.go(-1);
  }

  addProduct() {
    if (!this.modalItems.name || this.modalItems.name == "") {
      this.message.create('warning', '配置名称为必填，不能有空值！', { nzDuration: 3000 });
      return false;
    }
    if (!this.modalItems.key || this.modalItems.key == "") {
      this.message.create('warning', '配置key为必填，不能有空值！', { nzDuration: 3000 });
      return false;
    }
    if (!this.regular.keyRegular(this.modalItems.key)) {
        this.message.create('warning', '配置项key只能由英文或数字组成!', { nzDuration: 3000 });
        return false;
      }
    for (var i = 0; i < this.rows.length; i++) {
        if ((!this.rows[i].spel) || (!this.rows[i].rate)) {
            this.message.create('warning', '费率配置为必填，不能有空值！', { nzDuration: 3000 });
            return false;
        }else {
            this.rows[i].seq = i
        }
    }
    let data = {
      key: this.modalItems.key ? this.modalItems.key : "",
      name: this.modalItems.name ? this.modalItems.name : "",
      productId: this.productId,
      sysProductRates: this.rows
    }
    if (this.type == 'add') {
      this.add(data);
    } else if (this.type == 'edit') {
      this.edit(data);
    }
  }
}
class Group {
  constructor(
    public name?: String,
    public key?: String
  ) { }
}