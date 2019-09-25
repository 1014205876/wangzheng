import { Component, OnInit, Input } from '@angular/core';

import { TransformService } from '../../../../transform/transform.service';

@Component({
    selector: 'app-form-date',
    templateUrl: './form-date.component.html',
    styleUrls: ['./form-date.component.less']
})
export class FormDateComponent implements OnInit {

    @Input() public form;//表单对象

    date;

    constructor(
        private transformServe: TransformService,
    ) { }

    ngOnInit() {
    }

    dateChange() {
        this.form.value = this.transformServe.timeFormat("yyyy-MM-dd", this.date)
    }
}
