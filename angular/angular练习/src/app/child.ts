import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'child',
    templateUrl: './child.html'
})
export class Child implements OnInit {
    @Input() private messagechild: string;
    @Output() private outer = new EventEmitter<string>();
    constructor() { }
    ngOnInit() {
        console.log(this)
    }
    fasong() {
        this.outer.emit('来自子组件')
    }
}
