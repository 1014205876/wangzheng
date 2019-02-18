import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

@Input() width='300px';

  constructor() { }

  full(){
    this.width='100%'
  }

  ngOnInit() {
  }

}
