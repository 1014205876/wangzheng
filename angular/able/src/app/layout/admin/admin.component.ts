import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, AUTO_STYLE, state, style, transition, trigger} from '@angular/animations';
import {MenuItems} from '../../shared/menu-items/menu-items';
import { Http } from '@angular/http';
import { HttpServe } from './../../layout/service/http-serve.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: [
    './../../../assets/icon/menu/iconfont.css',
    './../../../assets/icon/operate/iconfont.css',
    './admin.component.scss'
  ],
  animations: [
    trigger('notificationBottom', [
      state('an-off, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('an-animate',
        style({
          overflow: 'visible',
          height: AUTO_STYLE,
        })
      ),
      transition('an-off <=> an-animate', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('slideInOut', [
      state('in', style({
        width: '280px',
        // transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        width: '0',
        // transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('mobileHeaderNavRight', [
      state('nav-off, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('nav-on',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('nav-off <=> nav-on', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ]),
    trigger('mobileMenuTop', [
      state('no-block, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('yes-block',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('no-block <=> yes-block', [
        animate('400ms ease-in-out')
      ])
    ])
  ]
})
export class AdminComponent implements OnInit, OnDestroy {

  public userName;
  public account;

  public animateSidebar: string;
  public navType: string;
  public themeLayout: string;
  public verticalPlacement: string;
  public verticalLayout: string;
  public pcodedDeviceType: string;
  public verticalNavType: string;
  public verticalEffect: string;
  public vnavigationView: string;
  public freamType: string;
  public sidebarImg: string;
  public sidebarImgType: string;
  public layoutType: string;

  public headerTheme: string;
  public pcodedHeaderPosition: string;

  public liveNotification: string;
  public liveNotificationClass: string;

  public profileNotification: string;
  public profileNotificationClass: string;

  public chatSlideInOut: string;
  public innerChatSlideInOut: string;

  public searchWidth: number;
  public searchWidthString: string;

  public navRight: string;
  public windowWidth: number;
  public chatTopPosition: string;

  public toggleOn: boolean;
  public toggleIcon: string;
  public navBarTheme: string;
  public activeItemTheme: string;
  public pcodedSidebarPosition: string;

  public headerFixedTop: string;

  public menuTitleTheme: string;
  public dropDownIcon: string;
  public subItemIcon: string;

  public configOpenRightBar: string;
  public displayBoxLayout: string;
  public isVerticalLayoutChecked: boolean;
  public isSidebarChecked: boolean;
  public isHeaderChecked: boolean;
  public headerFixedMargin: string;
  public sidebarFixedHeight: string;
  public sidebarFixedNavHeight: string;
  public itemBorderStyle: string;
  public subItemBorder: boolean;
  public itemBorder: boolean;

  // public isCollapsedSideBar: string;
  public psDisabled: string;
  public perfectDisable: string;

  public config: any;
  public searchInterval: any;

  public resourceItems;

  public AppList;

  public pwd={
    origPwd: '',
    newPwd: '',
    confPwd: ''
  };
  toast = {
    "position": 'center-center',
    "title": '提示',
    "msg": '',
    "showClose": true,
    "theme": 'material',
    "type": 'success',
    "closeOther": false
  };
  pwdForm: FormGroup;

  scroll = (): void => {
    const scrollPosition = window.pageYOffset;
    if (scrollPosition > 50) {
      if (this.isSidebarChecked === true) {
        this.pcodedSidebarPosition = 'fixed';
      }
      if (this.pcodedDeviceType === 'desktop') {
        this.headerFixedTop = '0';
      }
      this.sidebarFixedNavHeight = '100%';
    } else {
      if (this.pcodedDeviceType === 'desktop') {
        this.headerFixedTop = 'auto';
      }
      this.pcodedSidebarPosition = 'absolute';
      this.sidebarFixedNavHeight = '';
    }
  }

  constructor(public menuItems: MenuItems, private http: HttpServe,private toastyService: ToastyService) {
    this.animateSidebar = '';
    this.navType = 'st2';
    this.themeLayout = 'vertical';
    this.verticalPlacement = 'left';
    this.verticalLayout = 'wide';
    this.pcodedDeviceType = 'desktop';
    this.verticalNavType = 'expanded';
    this.verticalEffect = 'shrink';
    this.vnavigationView = 'view1';
    this.freamType = 'theme3';
    this.sidebarImg = 'false';
    this.sidebarImgType = 'img1';
    this.layoutType = 'light'; // light(default) dark(dark)

    this.headerTheme = 'theme1'; // theme1(default)
    this.pcodedHeaderPosition = 'fixed';

    this.headerFixedTop = 'auto';

    this.liveNotification = 'an-off';
    this.profileNotification = 'an-off';

    this.chatSlideInOut = 'out';
    this.innerChatSlideInOut = 'out';

    this.searchWidth = 0;

    this.navRight = 'nav-on';

    this.toggleOn = true;
    this.toggleIcon = 'icon-toggle-right';
    this.navBarTheme = 'theme1'; // themelight1(default) theme1(dark)
    this.activeItemTheme = 'theme1';
    this.pcodedSidebarPosition = 'fixed';
    this.menuTitleTheme = 'theme9'; // theme1(default) theme10(dark)
    this.dropDownIcon = 'style1';
    this.subItemIcon = 'style1';

    this.displayBoxLayout = 'd-none';
    this.isVerticalLayoutChecked = false;
    this.isSidebarChecked = true;
    this.isHeaderChecked = true;
    this.headerFixedMargin = '70px'; // 70px
    this.sidebarFixedHeight = 'calc(100vh - 190px)'; // calc(100vh - 190px)
    this.itemBorderStyle = 'none';
    this.subItemBorder = true;
    this.itemBorder = true;

    // this.isCollapsedSideBar = 'no-block';

    this.perfectDisable = '';

    this.windowWidth = window.innerWidth;

    this.setMenuAttributes(this.windowWidth);
    this.setHeaderAttributes(this.windowWidth);

    // 数字，字母，特殊字符三选二，正则
    // ^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,16}$

    // 正则表达式验证密码（字母+数字）
    // ^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$

    // 正则表达式验证密码（大小写字母、数字、特殊符号 四选三）
    // ^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{8,}$
    this.pwdForm=new FormGroup({
      origPwd: new FormControl(),
      newPwd: new FormControl('',Validators.pattern('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$')),
      confPwd: new FormControl('',Validators.pattern('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$'))
    })
    
  }

  ngOnInit() {
    this.getOtherAPP()
    this.setBackgroundPattern('theme1');
    this.http.getCustomHeaders("v1/resource/user/info").subscribe(res => {
      this.userName = res.result.name;
      this.account = res.result.account;
    })
  }
  logout(){
    window.location.href=window.location.protocol+'//'+window.location.host+'/logout';
  }

  resetPwd(){
    this.http.patchCustomHeaders('v1/resource/user/pass/'+this.account,{"oldPassword":this.pwd.origPwd,"newPassword":this.pwd.newPwd})
    .subscribe(res => {
      if(res.code=='200'){
        this.logout()
      }else{
        this.toast.msg = res.reason;
        this.toast.type = "error";
        this.addToast(this.toast);
        this.reset();
        this.pwdForm.reset();
      }
    })
  }
  reset(){
    this.pwd={
      origPwd: '',
      newPwd: '',
      confPwd: ''
    }
  }

  addToast(options) {
    if(options.closeOther) {
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

  getOtherAPP(){
    this.http.getCustomHeaders("/v1/resource/apps/permission").subscribe(res => {
      this.AppList=res.result;
    })
  }

  getResource(){
    
  }

  onResize(event) {
    this.windowWidth = event.target.innerWidth;
    this.setHeaderAttributes(this.windowWidth);

    let reSizeFlag = true;
    if (this.pcodedDeviceType === 'tablet' && this.windowWidth >= 768 && this.windowWidth <= 992) {
      reSizeFlag = false;
    } else if (this.pcodedDeviceType === 'phone' && this.windowWidth < 768) {
      reSizeFlag = false;
    }
    /* for check device */
    if (reSizeFlag) {
      this.setMenuAttributes(this.windowWidth);
    }
  }

  setHeaderAttributes(windowWidth) {
    if (windowWidth <= 992) {
      this.navRight = 'nav-off';
    } else {
      this.navRight = 'nav-on';
    }
  }

  setMenuAttributes(windowWidth) {
    if (windowWidth >= 768 && windowWidth <= 992) {
      this.pcodedDeviceType = 'tablet';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'overlay';
      this.toggleIcon = 'icon-toggle-left';
      this.headerFixedTop = '50px';
    } else if (windowWidth < 768) {
      this.pcodedDeviceType = 'phone';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'overlay';
      this.toggleIcon = 'icon-toggle-left';
      this.headerFixedTop = '50px';
    } else {
      this.pcodedDeviceType = 'desktop';
      this.verticalNavType = 'expanded';
      this.verticalEffect = 'shrink';
      this.toggleIcon = 'icon-toggle-right';
    }
  }

  toggleHeaderNavRight() {
    this.navRight = this.navRight === 'nav-on' ? 'nav-off' : 'nav-on';
    this.chatTopPosition = this.chatTopPosition === 'nav-on' ? '112px' : '';
    if (this.navRight === 'nav-off' && this.innerChatSlideInOut === 'in') {
      this.toggleInnerChat();
    }
    if (this.navRight === 'nav-off' && this.chatSlideInOut === 'in') {
      this.toggleChat();
    }
  }

  toggleLiveNotification() {
    if (this.profileNotification === 'an-animate') {
      this.toggleProfileNotification();
    }

    this.liveNotification = this.liveNotification === 'an-off' ? 'an-animate' : 'an-off';
    this.liveNotificationClass = this.liveNotification === 'an-animate' ? 'show' : '';

    if (this.liveNotification === 'an-animate' && this.innerChatSlideInOut === 'in') {
      this.toggleInnerChat();
    }
    if (this.liveNotification === 'an-animate' && this.chatSlideInOut === 'in') {
      this.toggleChat();
    }
  }

  toggleProfileNotification() {
    if (this.liveNotification === 'an-animate') {
      this.toggleLiveNotification();
    }

    this.profileNotification = this.profileNotification === 'an-off' ? 'an-animate' : 'an-off';
    this.profileNotificationClass = this.profileNotification === 'an-animate' ? 'show' : '';

    if (this.profileNotification === 'an-animate' && this.innerChatSlideInOut === 'in') {
      this.toggleInnerChat();
    }
    if (this.profileNotification === 'an-animate' && this.chatSlideInOut === 'in') {
      this.toggleChat();
    }
  }

  notificationOutsideClick(ele: string) {
    if (ele === 'live' && this.liveNotification === 'an-animate') {
      this.toggleLiveNotification();
    } else if (ele === 'profile' && this.profileNotification === 'an-animate') {
      this.toggleProfileNotification();
    }
  }

  toggleChat() {
    if (this.innerChatSlideInOut === 'in') {
      this.innerChatSlideInOut = 'out';
    } else {
      this.chatSlideInOut = this.chatSlideInOut === 'out' ? 'in' : 'out';
    }
  }

  toggleInnerChat() {
    this.innerChatSlideInOut = this.innerChatSlideInOut === 'out' ? 'in' : 'out';
  }

  ngOnDestroy() {
    if (this.searchInterval) {
      clearInterval(this.searchInterval);
    }
  }

  onClickedOutsideSidebar(e: Event) {
    if ((this.windowWidth <= 992 && this.toggleOn && this.verticalNavType !== 'offcanvas') || this.verticalEffect === 'overlay') {
      this.toggleOn = true;
      this.verticalNavType = 'offcanvas';
      this.toggleIcon = 'icon-toggle-left';
    }
  }

  setBackgroundPattern(pattern: string) {
    document.querySelector('body').setAttribute('themebg-pattern', pattern);
    // this.menuTitleTheme = this.freamType = this.activeItemTheme = this.headerTheme = pattern;
  }

  hoverOutsideSidebar() {
    if (this.verticalNavType === 'collapsed') {
      const mainEle = document.querySelectorAll('.pcoded-trigger');
      for (let i = 0; i < mainEle.length; i++) {
        mainEle[i].classList.remove('pcoded-trigger');
      }
    }
  }

  fireClick(e) {
    if (this.verticalNavType === 'collapsed') {
      const parentEle = e.target.parentNode.parentNode;
      if (parentEle.classList.contains('pcoded-trigger')) {
        const subEle = parentEle.querySelectorAll('.pcoded-hasmenu');
        for (let i = 0; i < subEle.length; i++) {
          if (subEle[i].classList.contains('pcoded-trigger')) {
            subEle[i].classList.remove('pcoded-trigger');
          }
        }
      } else {
        e.target.click();
      }
    }
  }

  fireClickLeave(e) {
    if (this.verticalNavType === 'collapsed') {
      const parentEle = <HTMLElement>e.target.parentNode.parentNode;
      const subEle = parentEle.querySelectorAll('.pcoded-hasmenu');
      for (let i = 0; i < subEle.length; i++) {
        if (subEle[i].classList.contains('pcoded-trigger')) {
          subEle[i].classList.remove('pcoded-trigger');
        }
      }
    }
  }

}
