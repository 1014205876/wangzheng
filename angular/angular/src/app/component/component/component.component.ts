import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.less']
})
export class ComponentComponent implements OnInit {
  @Input() private form: any;
  @Input() private index: any;
  @Input() private mouse: any;
  @Input() private data: any;
  @Input() private placeindex: any;
  @Output() private fathermouseup = new EventEmitter<any>();
  @Output() private setup01 = new EventEmitter<any>();
  @Output() private typechange = new EventEmitter<any>();
  @Output() private removeindex = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  setup(obj) {
    $(obj.e.path[obj.e.path.length - 8])
      .find(".component")
      .removeClass("active");
    $(obj.e.path[0])
      .closest(".component")
      .addClass("active");
    this.setup01.emit({ list: obj.list, e: obj.e })
  }
  move(obj) {
    this.typechange.emit({type:obj.type,e:obj.e,list:obj.list})
    // this.$emit("typechange", type, e, list);
  }
  chakan() {
    // this.$emit("look", this.index);
  }
  fatherremove() {
    // this.$emit("index", this.index);
    this.removeindex.emit(this.index)
  }
  remove(index) {
    this.form.list.splice(index, 1);
  }
  look(index) {
    console.log(this.form);
    console.log(index);
  }
  stop(e) {
    e.stopPropagation()
  }
  mouseover() {
    this.form.show = true;
    console.log()
  }
  mouseout() {
    this.form.show = false;
  }
  add(e) {
    if (this.mouse) {
      if (this.form.list) {
        this.form.list.splice(this.placeindex, 0, this.data);
        $(e.path[e.path.length - 8])
          .find(".component")
          .removeClass("active");
        // $(e.path[0])
        //   .closest(".component")
        //   .addClass("active");
      }
      this.mouseup()
    }
  }
  mouseup() {
    this.fathermouseup.emit()
  }
}
