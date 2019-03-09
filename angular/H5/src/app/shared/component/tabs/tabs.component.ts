import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  id='home';

  @Input() hasMsg=false;

  constructor() { }

  ngOnInit() {
  }

  tab(e){
    this.id='';
    console.log(e.target.id)
    this.id=e.target.id;
  }
}
