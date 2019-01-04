import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[apptr]',
  template: `<tr>
</tr>
`,
// <tr *ngFor='let list of list.children' [apptr]='list'></tr>
  styleUrls: ['./tr.component.css']
})
export class TrComponent implements OnInit {

  constructor() { }

  // @Input() private list: any;
  ngOnInit() {
  }

}
