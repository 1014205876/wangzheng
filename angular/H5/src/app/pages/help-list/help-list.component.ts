import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/service/http-serve.service';

@Component({
  selector: 'app-help-list',
  templateUrl: './help-list.component.html',
  styleUrls: ['./help-list.component.css']
})
export class HelpListComponent implements OnInit {

  lists = [
    // {
    //   'title': '怎样进行贷款，有哪些流程呢？',
    //   'text': "当您进入到平台后可以先进行一次额度预估（非强制性要求），根据平台的预授信额度，申请企业贷款，过程中您需要进行企业的资质认证和企业信息采集授权，我们会查询的征信、税务等信息，经过系统审核反馈您可以贷款额度和期限，在您确认合同后，我公司工作人员会和你面签贷款协议，辅助你开立银行账户，最后完成打款。"
    // },
    // {
    //   'title': '为什么小程序要获取我的手机号码和个人信息？',
    //   'text': "为了更好的给你提供后续服务，让您的贷款流程更加顺畅平台需要获取您微信捆绑的手机号码及个人信息，我们承诺保护您的个人隐私，不会将您的个人信息暴露给第三方。"
    // },
    // {
    //   'title': '我的手机收不到验证码怎么办？',
    //   'text': "首先确认您的号码是否输入或读取错误，如果不正确请修正后再次发送，然后确认您的手机信号是否正常，若正常请耐心等候，因运营商通道问题短信可能会有延迟。每个手机号码每天最多可以发送10次验证码。"
    // },
    // {
    //   'title': '怎样知道我的公司能贷多少钱？',
    //   'text': "首先您必须是企业法人代表，然后准备一张您的名片使用手机摄像头拍照识别，我们将会告知您可以借款的大致额度，平台最高预授信额度为100万人民币。"
    // },
    // {
    //   'title': '为什么预估额度和实际贷款的金额不一样呢？',
    //   'text': "您的预估额度，仅作为您的贷款的参考额度，实际可以贷款的金额需要根据您的征信税务信息以及企业自身经营状况来进行综合评定。"
    // },
    // {
    //   'title': '我的名片识别不出来怎么办？',
    //   'text': "如出现名片无法识别，经多次尝试无效的情况，请手动输入公司信息。"
    // }
  ]
  tel = 1234567;
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.get('/v2/app/pre/helps')
      .subscribe(res => {
        console.log(res)
        this.lists = res.result;
      })
    this.http.getw('/peak-resource/v1/resource/settings?key=serviceTel')
      .subscribe(res => {
        console.log(res)
        this.tel = res.result.value;
      })
  }

}
