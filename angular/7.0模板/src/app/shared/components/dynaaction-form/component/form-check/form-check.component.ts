import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-form-check',
    templateUrl: './form-check.component.html',
    styleUrls: ['./form-check.component.less']
})
export class FormCheckComponent implements OnInit {

    @Input() public form;//表单对象
    option = [];

    constructor(
    ) { }

    ngOnInit() {
    }

    log() {
        let value = '';
        this.option.forEach((item) => {
            if (item.checked) {
                if (value) {
                    value += ',' + item.value
                } else {
                    value = item.value
                }
            }
        })
        this.form.value = value
    }
}
