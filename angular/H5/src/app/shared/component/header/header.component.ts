import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import global from '../../global';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() ownBack=new EventEmitter();

  @Input() hasMsg=false;
  @Input() bg = "#dbb272";
  @Input() holderBg = "#dbb272";
  @Input() backTxt: string;
  @Input() title: string;
  @Input() titColor: string;
  @Input() backIcon: number;
  @Input() hasBack: false;
  @Input() hasRightBtn: false;
  @Input() rightTxt: string;
  @Input() rightRoute={'route':'','paramsName':'','paramsValue': ''};

  constructor(private router: Router) { }

  ngOnInit() {
  }

  back() {
    this.ownBack.emit();
    history.back();
  }
  rightBtn(){
    console.log(this.rightRoute)
    this.router.navigate([this.rightRoute.route],{queryParams: {"index": this.rightRoute.paramsValue, "title": this.rightTxt}})
  }

}
