import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {

  id = 'home';
  show=false;
  @Input() hasMsg = false;

  constructor() { }

  ngOnInit() {
  }

  tab(e){
    this.id = '';
    console.log(e.target.id)
    this.id = e.target.id;
  }
  tagshow(){
    this.show=!this.show;
  }

}
