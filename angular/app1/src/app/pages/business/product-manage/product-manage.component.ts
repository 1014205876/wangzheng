import { Component, OnInit } from '@angular/core';
import { HttpServe } from '../../../shared/service/http-serve.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.less']
})
export class ProductManageComponent implements OnInit {

  breadcrumbs = ['业务管理','产品发布管理'];

  loading=false;
  page = {
    "total": 0,         //总条数
    "totalPage": 1,     //总页数
    "pageNum": 1,        //当前页码
    "pageSize": 10      //每页展示多少条数据
  }

  data = {
    id:'',//下架时的id
    mengbanshow: false,//控制弹窗蒙版的显示隐藏
    saleshow: false,//控制form弹窗的显示隐藏
    modalTitle: '',
    find: {
      number: '',//产品编号
      status: ''//状态
    },
    table: [//表格的数据
      {
        productId: '产品id',
        productName: '产品名称',
        number: '产品编号',
        productType: '类型',
        status: '状态,0禁用，1启用',
        updateDate: '更新时间',
      }
    ],
  }

  
  constructor(
    private http: HttpServe,
    private message: NzMessageService
  ) {
    this.reset();
    this.gettable(this.page.pageNum, this.data.find)
  }
  //生命周期函数
  ngOnInit() {}

  reset() {//重置按钮
    this.data.find.number = '';
    this.data.find.status = '';
  }
  changePage(e) {//切换页码
    this.gettable(e, this.data.find);
  }
  gettable(pageNum, find) {//查询配置项
    this.loading=true;
    this.http.get(
      'guest-manage/v1/app/back/productsDataGrid?number=' + find.number +
      '&status=' + find.status +
      '&pageNum=' + pageNum +
      '&pageSize=' + 10
    ).then(res => {
      this.data.table = res.list
      this.page.total = res.total;
      this.page.pageNum = res.pageNum;
      this.page.totalPage = res.pages;
      this.loading=false;
    },(error) => {
      error?this.message.create('error', error):'';
      this.loading=false;
    })
  }
  saleshow(list){
    this.data.mengbanshow = true;
    this.data.saleshow = true;
    this.data.id = list.productId;
    this.data.modalTitle = list.productName;
  }
  fromsale() {//下架
    let that=this;
    this.hidden()
    this.http.patch(
      'guest-manage/v1/app/back/products/' + that.data.id,//调试7300接口
      {
        id: that.data.id,
        status: 3,
        comments: '',
      }
    ).then(() => {
      this.message.create('success', '下架成功');
      this.gettable(this.page.pageNum, this.data.find)
    },(error) => {
      let messageInfo=error?'下架失败，'+error:'下架失败!'
      this.message.create('error', messageInfo)
    })
  }
  hidden() {//点击取消按钮，关闭所有弹窗
    this.data.mengbanshow = false;
    this.data.saleshow = false;
  }

}
