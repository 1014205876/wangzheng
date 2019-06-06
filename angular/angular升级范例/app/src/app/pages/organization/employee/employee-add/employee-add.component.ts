import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { RegularService } from '../../../../shared/service/regular/regular.service';
import { ApiService } from '../../../../shared/service/http-serve/api.service'

@Component({
    selector: 'app-employee-add',
    templateUrl: './employee-add.component.html',
    styleUrls: ['./employee-add.component.less']
})
export class EmployeeAddComponent implements OnInit {

    public department;
    public occupationOptions = [];

    // 表单字段
    public items;
    addForm: FormGroup;

    constructor(
        private regular: RegularService,
        private fb: FormBuilder,
        private message: NzMessageService,
        private api: ApiService
    ) {
        this.items = new Items();
        
        this.getDepartment();
        this.getOccupation();
    }
    ngOnInit() {
        this.addForm = this.fb.group({
            account: [this.items.account, [Validators.required]],
            name: [this.items.name, [Validators.required]],
            mobile: [this.items.mobile, [Validators.required], [this.mobileValidator]],
            departmentId: [this.items.departmentId, [Validators.required]],
            jobName: [this.items.jobName, [Validators.required]],
            occupationClass: [this.items.occupationClass, [Validators.required]],
            status: [this.items.status, [Validators.required]],
            sex: [this.items.sex, [Validators.required]],
            remark: [this.items.remark]
        });
        this.reset();
    }
    /** 手机号校验 */
    mobileValidator = (control: FormControl) => Observable.create((observer: Observer<any>) => {
        setTimeout(() => {
            if (control.value && !(this.regular.mobileRegular(control.value))) {
                observer.next({ error: true, duplicated: true });
            } else {
                observer.next(null);
            }
            observer.complete();
        }, 1000);
    })

    reset() {
        // this.items.name = "";
        // this.items.mobile = "";
        // this.items.departmentName = "";
        // this.items.departmentId = "";
        // this.items.jobName = "";
        // this.items.occupationClass = '员工';
        // this.items.status = '1';
        // this.items.sex = '1';
        // this.items.remark = "";
        this.addForm.reset()
        this.addForm.get('status').setValue(1)
        this.addForm.get('sex').setValue(1)
    }
    getOccupation() {
        this.occupationOptions = [
            {
                "occupationClass": "总经理",
                "label": "总经理"
            },
            {
                "occupationClass": "中心总经理",
                "label": "中心总经理"
            },
            {
                "occupationClass": "中心副总经理",
                "label": "中心副总经理"
            },
            {
                "occupationClass": "部长",
                "label": "部长"
            },
            {
                "occupationClass": "副部长",
                "label": "副部长"
            },
            {
                "occupationClass": "组长",
                "label": "组长"
            },
            {
                "occupationClass": "员工",
                "label": "员工"
            }
        ]
    }
    async getDepartment() {
        let res = await this.api.getDepartment()
        this.department = res
    }

    goBack() {
        history.go(-1)
    }

    async onSubmit() {
        let form = this.addForm.value
        for (var i = 0; i < this.department.length; i++) {
            if (this.addForm.value.departmentId == this.department[i].id) {
                form = { ...form, departmentName: this.department[i].fullName }
            }
        }
        for (const key in this.addForm.controls) {
            this.addForm.controls[key].markAsDirty();
            this.addForm.controls[key].updateValueAndValidity();
        }
        let res = await this.api.addUser(form)
        if (res) {
            this.goBack()
            this.message.create("success", "成功", { nzDuration: 3000 })
        }
    }

}
class Items {
    constructor(
        public account?: String,
        public name?: String,
        public mobile?: String,
        public departmentId?: String,
        public departmentName?: String,
        public jobName?: String,
        public occupationClass?: String,
        public status=1,
        public sex=1,
        public remark?: String
    ) { }
}