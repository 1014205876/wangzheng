import { Component, OnInit } from '@angular/core';
import { HttpServe } from '../../../../shared/service/http-serve.service';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.less']
})
export class PublishComponent implements OnInit {

  breadcrumbs = ['业务管理', '产品发布管理', '发布产品'];

  type = [];//类型数组
  dataSource = [];//数据源数组
  controlItem = new Item();
  groupItem = new GroupItem();

  data = {
    account: '',//操作员
    id: "",//编辑使用，保存产品ID。
    type: "new",
    index: 0,//新建使用，产品名称对应的下标。
    infor: [//新建使用，公司信息数组。
      {
        id: "new",
        name: "",//产品名称
        number: "",//产品编号
        minTerm: '',//贷款期限
        maxTerm: '',
        minAmount: '',//贷款金额
        maxAmount: '',
        minRate: '',//贷款利率
        maxRate: '',
        status: '',
        createDate: "",
        updateDate: "",
        remark: "'",
        productIntroduction: "",
        servicePaymentMethod: "",
        interestStartTime: "",
        productType: '',
        repayMethod: ""
      },
    ],
    product: {//编辑使用，公司信息数据
      name: "",
      number: "",
      minTerm: '',
      maxTerm: '',
      minAmount: '',
      maxAmount: '',
      minRate: '',
      maxRate: '',
      status: '',
      comments: ''
    },
    group: [this.groupItem]//表单配置
  }

  constructor(
    private http: HttpServe,
    private activatedRoute: ActivatedRoute,
    private message: NzMessageService
  ) {
    this.initData();
    this.data.group = [this.groupItem];
    this.data.account = localStorage.getItem("accountw");//获取操作员账号
    this.activatedRoute.queryParams.subscribe((res) => {
      this.data.id = res.productId;
      this.data.type = res.type;
      if (res.type == 'new') {
        this.breadcrumbs = ['业务管理', '产品发布管理', '发布产品'];
        this.getinfor()
      } else {
        this.breadcrumbs = ['业务管理', '产品发布管理', '编辑产品'];
        this.http.get(
          'guest-manage/v1/app/back/products/' + this.data.id
        ).then(res => {
          this.data.product = res.product;
          this.data.group = res.group;
          this.data.group.forEach(item => {
            item.groupShow=item.groupShow?true:false;
            item.formControlList.forEach(control => {
              control.require = control.require ? true : false;
            })
          })
        })
      }
    })
    this.http.get('peak-resource/v1/resource/dictionaryItem/guestApplyControlType').then(res => {
      this.type = res
    })
    this.http.get(
      'peak-resource/v1/resource/dictionaries'
    ).then(res => {
      this.dataSource = res
    })
  }

  //生命周期函数
  ngOnInit() {}
  initData() {
    this.controlItem = {
      id: "",
      createDate: "",
      updateDate: "",
      formId: "",
      groupName: "",
      groupSeq: 1,
      groupShow: this.groupItem.groupShow,
      controlName: "",//字段名称
      controlKey: "",//业务主键
      controlSeq: 1,
      type: "",//字段类型
      dataSource: "",//数据源
      placeInfo: "",//提示信息
      require: true,//是否必填
      dataSourceName: "",
      typeName: ""
    }
    this.groupItem = {
      groupSeq: 1,
      groupName: "",//分组名称
      groupShow: false,//是否分页显示此分组
      formControlList: [this.controlItem]
    }
  }

  checkchange(list, key, e) {//复选框输出修改
    console.log(e)
    // if (e.target.checked) {
    //   list[key] = 1
    // } else {
    //   list[key] = 0
    // }
  }
  getinfor() {//查询公司信息
    this.http.get(
      'guest-manage/v1/app/back/products'
    ).then(data => {
      this.data.infor = data;
    })
  }
  addRow(list, keyName) {//添加一项
    this.initData();
    list.push(this[keyName]);
  }
  remove(index, list) {//删除一项
    list.splice(index, 1);
  }
  moveup(index, list) {//上移
    if (index <= 0) {
      this.message.create("info", "已经是第一项，无法上移");
    } else {
      list.splice(index - 1, 0, list[index]);
      this.remove(index + 1, list);//删除掉原来那项
    }
  }
  movedown(index, list) {//下移
    if (index >= list.length) {
      this.message.create("info", "已经是最后一项，无法下移");
    } else {
      list.splice(index + 2, 0, list[index]);
      this.remove(index, list);//删除掉原来那项
    }
  }
  back() {
    history.back();
  }
  checkrequired() {//必填校验
    let notfill = false;
    for (let i = 0; i < this.data.group.length; i++) {
      if (this.data.infor.length <= 0) {
        this.message.create("error", "请绑定产品");
        notfill = true;
      }
      if (this.data.group[i].groupName) {
        // console.log('分组名称已填写')
      } else {
        this.message.create("error", `第${i + 1}组未填写分组名称`);
        notfill = true;
      }
      for (let j = 0; j < this.data.group[i].formControlList.length; j++) {
        if (this.data.group[i].formControlList[j].controlName) {
          // console.log('字段名称已填写')
        } else {
          this.message.create("error", `第${i + 1}组第${j + 1}项未填写字段名称`);
          notfill = true;
        }
        if (this.data.group[i].formControlList[j].controlKey) {
          // console.log('业务主键已填写')
        } else {
          this.message.create("error", `第${i + 1}组第${j + 1}项未填写业务主键`);
          notfill = true;
        }
        if (this.data.group[i].formControlList[j].type) {
          // console.log('字段类型已选择')
        } else {
          this.message.create("error", `第${i + 1}组第${j + 1}项未选择字段类型`);
          notfill = true;
        }
        if (this.data.group[i].formControlList[j].type == 'select' || this.data.group[i].formControlList[j].type == 'multipleSelect') {
          if (this.data.group[i].formControlList[j].dataSource) {
            // console.log('数据源已选择')
          } else {
            this.message.create("error", `第${i + 1}组第${j + 1}项未选择数据源`);
            notfill = true;
          }
        }
      }
    }
    return notfill
  }
  submit() {//将数组格式转化
    let form = {
      productId: '',//产品id
      number: '',
      operator: this.data.account,//操作人
      formControlList: [],
    }
    if (this.data.type == 'new') {//新建使用，页面选择的产品数据
      form.productId = this.data.infor[this.data.index].id;
      form.number = this.data.infor[this.data.index].number;
    } else {//编辑使用，后台传入的产品数据
      form.productId = this.data.id;
      form.number = this.data.product.number;
    }
    for (let i = 0; i < this.data.group.length; i++) {//formControlList的数据修改
      for (let j = 0; j < this.data.group[i].formControlList.length; j++) {
        let data = {
          groupName: this.data.group[i]['groupName'],
          groupSeq: i,
          groupShow: this.data.group[i]['groupShow']?1:0,
          controlKey: this.data.group[i].formControlList[j]['controlKey'],
          controlName: this.data.group[i].formControlList[j]['controlName'],
          controlSeq: j,
          require: (this.data.group[i].formControlList[j]['require'] ? 1 : 0),
          type: this.data.group[i].formControlList[j]['type'],
          dataSource: this.data.group[i].formControlList[j]['dataSource'],
          placeInfo: this.data.group[i].formControlList[j]['placeInfo'],
        }
        form.formControlList.push(data);
      }
    }
    return form
  }
  submitnew() {//点击发布产品的提交按钮
    // console.log('新建')
    let notfill = this.checkrequired()
    if (notfill) {//输出为真则无法提交
      this.message.create("error", '部分必填项未填写无法提交');
    } else {//所有必填项已填写。向后台提交请求
      let data = this.submit();
      this.http.post(
        'guest-manage/v1/app/back/product',
        data
      ).then(() => {
        this.message.create("success", '发布成功');
        this.back();
      }, (error) => {
        let messageInfo = '发布失败，' + error;
        this.message.create("error", messageInfo);
      })
    }

  }
  submitid() {//点击编辑产品的提交按钮
    // console.log('编辑')
    let notfill = this.checkrequired()
    if (notfill) {//输出为真则无法提交
      this.message.create("error", '部分必填项未填写无法提交');
    } else {//所有必填项已填写。向后台提交请求
      let data = this.submit();
      this.http.put(
        'guest-manage/v1/app/back/products/' + this.data.id,
        data
      ).then(res => {
        this.message.create("success", '编辑成功');
        this.back();
      }, (error) => {
        let messageInfo = '编辑失败，' + error;
        this.message.create("error", messageInfo);
      })
    }
  }

}
class Item {
  constructor(
    public id?: String,
    public createDate?: String,
    public updateDate?: String,
    public formId?: String,
    public groupName?: String,
    public groupSeq?: 1,
    public groupShow?: boolean,
    public controlName?: String,//字段名称
    public controlKey?: String,//业务主键
    public controlSeq?: 1,
    public type?: String,//字段类型
    public dataSource?: String,//数据源
    public placeInfo?: String,//提示信息
    public require?: boolean,//是否必填
    public dataSourceName?: String,
    public typeName?: String
  ) { }
}
class GroupItem {
  constructor(
    public groupSeq?: 1,
    public groupName?: String,//分组名称
    public groupShow?: boolean,//是否分页显示此分组
    public formControlList?: Item[]
  ) { }
}
