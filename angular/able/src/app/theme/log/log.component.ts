import { Component, OnInit } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { HttpServe } from './../../layout/service/http-serve.service';
import { Http } from '@angular/http/src/http';
import { NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  public rows=[];
  public total;
  public totalPage;
  public pageNum;

  public searchItems;
  public items;
  public flag=true;

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
    public parserFormatter: NgbDateParserFormatter, 
    public calendar: NgbCalendar
  ) {
    this.searchItems = new Items;
    this.items = new Items;
  }

  ngOnInit() {
    this.search(1,'')
  }

  dataJud(){
    if(this.searchItems.startDate&&this.searchItems.endDate){
      if((this.searchItems.startDate.year>this.searchItems.endDate.year)||(this.searchItems.startDate.month>this.searchItems.endDate.month)||(this.searchItems.startDate.day>this.searchItems.endDate.day)){
        this.toast.msg='开始时间不能大于结束时间！';
        this.toast.type='error';
        this.addToast(this.toast);
        this.flag=false;
      }else{
        this.flag=true;
      }
    }
  }
  search(e,type) {
    if(!type){
      this.searchItems = new Items;
    }
    this.dataJud();
    if(this.flag){
      this.items.startDate=this.parserFormatter.format(this.searchItems.startDate);
      this.items.endDate=this.parserFormatter.format(this.searchItems.endDate);
      this.items.title=this.searchItems.title;
      this.http.getCustomHeaders(
          "v1/resource/logs?pageNum="+e+"&pageSize=10"
          +"&startDate="+(this.items.startDate?this.items.startDate:'')
          +"&endDate="+(this.items.endDate?this.items.endDate:'')
          +"&title="+(this.items.title?encodeURIComponent(this.items.title):'')
        ).subscribe(res => {
          this.rows=res.result.list;
          this.total = res.result.total;
          this.totalPage = res.result.pages;
          this.pageNum = res.result.pageNum;
        })
    }
    
    
  }
  reset(){
    this.searchItems=new Items;
  }

  changePage(e) {
    this.search(e,'');
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

}
class Items {
  constructor(
    public startDate?: NgbDateStruct,
    public endDate?: NgbDateStruct,
    public title?: String
  ){}
}
