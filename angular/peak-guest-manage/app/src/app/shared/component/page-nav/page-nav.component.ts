import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-page-nav',
  templateUrl: './page-nav.component.html',
  styleUrls: ['./page-nav.component.css']
})
export class PageNavComponent implements OnInit {

  //搜索框翻页
  @Input() totalPage: number;
  public currentPage: number = 1;
  @Output() getCurrentPage = new EventEmitter();
  public inputText;

  constructor() { }

  ngOnInit() {
  }

  //搜索翻页
  changePage(pageNum) {
    this.currentPage = pageNum;
    this.getCurrentPage.emit(this.currentPage);
  }
  goPrevious(pageNum) {
    if (pageNum > 1) {
      this.changePage(pageNum - 1);
    }
  }
  goNext(pageNum) {
    if (pageNum <= this.totalPage - 1) {
      this.changePage(pageNum + 1);
    }
  }

  HMpage(){
    if(this.inputText==0){
      this.inputText=1
    }
    if(parseInt(this.inputText)<=this.totalPage&&parseInt(this.inputText)!=this.currentPage){
      this.changePage(parseInt(this.inputText));
    }
  }

}
