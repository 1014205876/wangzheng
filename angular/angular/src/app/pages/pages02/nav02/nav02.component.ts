import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav02',
  templateUrl: './nav02.component.html',
  styleUrls: ['./nav02.component.css']
})
export class Nav02Component implements OnInit {
  editorContent=''
  constructor() { }

  ngOnInit() {
  }
con(){
  console.log(this.editorContent)
}
}
