import { Component, OnInit, Input } from '@angular/core';

import { TransformService } from '../../../../transform/transform.service';

@Component({
    selector: 'app-form-time',
    templateUrl: './form-time.component.html',
    styleUrls: ['./form-time.component.less']
})
export class FormTimeComponent implements OnInit {

    @Input() public form;//表单对象

    time;

    constructor(
        private transformServe: TransformService,
    ) { }

    ngOnInit() {
    }

    timeChange() {
        this.form.value = this.transformServe.timeFormat("hh:mm:ss", this.time)
    }
}
