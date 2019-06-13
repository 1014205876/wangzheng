import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { HttpService } from '../../../../shared/service/http-serve.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit {
  userid
  pageNum = 1
  total = 0
  selectedBasic = true
  selectedCheck = false
  selectedLogin = false
  showBasicInm = true
  showCheckInm = false
  showLoginInm = false
  identificationInfo
  showidentificationInfo
  // 基本信息
  public telNum
  public avatar
  public inviter
  public registrationSource
  public status
  public statusText
  public group
  public education
  public workTime
  public job
  public position
  public city

  // 认证信息
  public realName
  public sex
  public nation
  public birthday
  public idNum
  public address
  public expireDate
  public cerOrg
  public frontUrl
  public oppositeUrl

  list=[]
  data=[]

  constructor(
    private route: ActivatedRoute,
    private http: HttpService
  ) { }

  ngOnInit() {
    this.userid = this.route.snapshot.queryParams.userid
    this.getDetailData()
    this.getLoginData()
    console.log(this.userid)
  }
  getDetailData() {
    let id = this.userid
    // this.http.getCustomHeaders('kalanchoe-manager/v1/kalanchoe/backstage/user/' + id)
    //   .subscribe(e => {
    //     console.log(e.data)
    //     this.identificationInfo = e.data.identificationInfo
    //     this.telNum = e.data.baseInfo.mobile
    //     if (e.data.baseInfo.status == 1) {
    //       this.statusText = '启用'
    //     } else {
    //       this.statusText = '禁用'
    //     }
    //     this.avatar = e.data.baseInfo.headUrl
    //     this.status = e.data.baseInfo.status
    //     if (e.data.baseInfo.inviterMobile == null) {
    //       this.inviter = '无'
    //     } else {
    //       this.inviter = e.data.baseInfo.inviterMobile //邀请人
    //     }

    //     //基本信息
    //     this.registrationSource = e.data.baseInfo.registerSource
    //     this.group = e.data.baseInfo.groupName //分组
    //     this.education = e.data.baseInfo.education //最高学历
    //     this.workTime = e.data.baseInfo.workAge ? (e.data.baseInfo.workAge + "年") : ''
    //     this.job = e.data.baseInfo.industry//当前所在行业
    //     this.city = e.data.baseInfo.live
    //     this.position = e.data.baseInfo.post//当前所在岗位

    //     //认证信息
    //     this.realName = e.data.identificationInfo.realName
    //     this.sex = e.data.identificationInfo.sex
    //     this.nation = e.data.identificationInfo.nation
    //     this.birthday = e.data.identificationInfo.birthday
    //     this.idNum = e.data.identificationInfo.idNum
    //     this.address = e.data.identificationInfo.address
    //     this.expireDate = e.data.identificationInfo.expireDate
    //     this.cerOrg = e.data.identificationInfo.cerOrg
    //     this.frontUrl = e.data.identificationInfo.frontUrl
    //     this.oppositeUrl = e.data.identificationInfo.oppositeUrl
    //   })

  }
  getLoginData() {
    // this.http.getCustomHeaders('kalanchoe-manager/v1/kalanchoe/backstage/user/' + this.userid + '/logDataGrid?' + 'pageNum=' + this.pageNum + '&pageSize=' + 10
    // ).subscribe(e => {
    //   this.total=e.data.total
    //   this.list=e.data.list
    //   this.addIndexList()
    // })
  }
  addIndexList(){
    var list = this.list
    var List=list.map((item,index)=>{
      item['index']=(this.pageNum-1)*10+index+1
      return item
    })
    this.data=List
  }
  pageSearch($event){
    this.pageNum=$event
    this.getLoginData()
  }

  showBasic() {
    this.showBasicInm = true;
    this.showCheckInm = false;
    this.showLoginInm = false;
    this.selectedBasic = true;
    this.selectedCheck = false;
    this.selectedLogin = false;
    this.showidentificationInfo = false;
  }
  showCheck() {
    if (this.identificationInfo == null) {
      this.showBasicInm = false
      this.showCheckInm = false;
      this.showLoginInm = false;
      this.selectedBasic = false;
      this.selectedCheck = true;
      this.selectedLogin = false;
      this.showidentificationInfo = true
    }else{
      this.showBasicInm = false;
      this.showCheckInm = true;
      this.showLoginInm = false;
      this.selectedBasic = false;
      this.selectedCheck = true;
      this.selectedLogin = false;
      this.showidentificationInfo = false;
    }
  }
  showLogin() {
    this.showBasicInm = false;
    this.showCheckInm = false;
    this.showLoginInm = true;
    this.selectedBasic = false;
    this.selectedCheck = false;
    this.selectedLogin = true;
    this.showidentificationInfo = false;
  }

}
