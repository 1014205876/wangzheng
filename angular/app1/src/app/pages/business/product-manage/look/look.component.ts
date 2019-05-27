import { Component, OnInit } from '@angular/core';
import { HttpServe } from '../../../../shared/service/http-serve.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-look',
  templateUrl: './look.component.html',
  styleUrls: ['./look.component.less']
})
export class LookComponent implements OnInit {

  breadcrumbs = ['业务管理', '产品发布管理', '查看产品'];

  data = {
    id: 12345,//产品对应的id
    state: 'look',//页面状态（查看还是审批）
    examine: {//发布审核数据
      id: '',
      status: '2',//审核结果
      comments: ""
    },
    product: {// 产品信息数据
      name: "",
      number: "",
      minTerm: 1,
      maxTerm: 1,
      minAmount: 11,
      maxAmount: 11,
      minRate: 11,
      maxRate: 11,
      status: 0,
      comments: null
    },
    group: [// 表单配置数据
      {
        groupSeq: 1,
        groupName: "公司信息",//分组名称
        groupShow: 1,//是否分页显示此分组
        formControlList: [
          {
            id: "54cade3f-14b3-48f8-95eb-c3fdb7ff2e60",
            createDate: "2018-11-29 11:12:40",
            updateDate: "2018-11-29 11:12:40",
            formId: "0f2ef272-e95a-4dba-a868-f57639d4dd61",
            groupName: "公司信息",
            groupSeq: 1,
            groupShow: 1,
            controlName: "银行贷款信用担保",//字段名称
            controlKey: "bankGuarante",//业务主键
            controlSeq: 1,
            type: "number",//字段类型
            dataSource: "productType",//数据源
            placeInfo: "请填非关联方提供担保企业名，无则填“0”",//提示信息
            require: 1,//是否必填
            dataSourceName: "产品类型",
            typeName: "数字"
          }
        ]
      },
    ],
    applyCondition: [// 申请条件数据
      {
        name: "是否仅白名单用户可申请",
        checked: 1
      },
      {
        name: "允许有未结清贷款时继续申请",
        checked: 0
      },
      {
        name: "校验企业平台贷款金额是否超过100万",
        checked: 1
      }
    ]
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private message: NzMessageService,
    private http: HttpServe
  ) {
    this.activeRoute.queryParams.subscribe((e) => {
      this.data.id = e.productId
      this.data.examine.id = e.productId
      this.data.state = e.type
      if (e.state == 'check') {
        this.breadcrumbs = ['内容管理', '产品发布', '发布审核'];
      } else if (e.state == 'look') {
        this.breadcrumbs = ['内容管理', '产品发布', '查看产品'];
      }
      this.getinfor()
    })
  }


  //生命周期函数
  ngOnInit() { }

  getinfor() {//查看产品信息
    this.http.get(
      'guest-manage/v1/app/back/products/' + this.data.id
    ).then(res => {
      this.data.product = res.product
      this.data.applyCondition = res.applyCondition
      this.data.group = res.group
    })
  }
  back() {
    history.back();
  }
  submit() {
    if (this.data.examine.status) {
      this.http.patch(
        '/guest-manage/v1/app/back/products/' + this.data.id,//点击审批通过
        this.data.examine
      ).then(res => {
        this.back();
      })
    } else {
      this.message.create('error', '请选择审核结果');
    }
  }

}
