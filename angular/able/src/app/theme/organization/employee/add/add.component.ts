import { Component, OnInit, ViewChild, Input } from '@angular/core'
import { DatatableComponent } from '@swimlane/ngx-datatable'
import { transition, trigger, style, animate } from '@angular/animations'
import swal from 'sweetalert2'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpServe } from './../../../../layout/service/http-serve.service'
import { Http } from '@angular/http/src/http'
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty'

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: [ './add.component.scss' ]
})
export class AddComponent implements OnInit {
	detailForm: FormGroup
	submitted: boolean

	public department
	public items
	toast = {
		position: 'center-center',
		title: '提示',
		msg: '',
		showClose: true,
		theme: 'material',
		type: 'success',
		closeOther: false
	}

	constructor(private http: HttpServe, private toastyService: ToastyService) {
		this.items = new Items()

		const account = new FormControl()
		const name = new FormControl()
		const mobile = new FormControl('', Validators.pattern(/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8]))\d{8}$/))
		const departmentId = new FormControl()
		const jobName = new FormControl()
		const occupationClass = new FormControl()
		const status = new FormControl()
		const sex = new FormControl('', Validators.nullValidator)
		const remark = new FormControl('', Validators.nullValidator)

		this.detailForm = new FormGroup({
			account: account,
			name: name,
			mobile: mobile,
			departmentId: departmentId,
			jobName: jobName,
			occupationClass: occupationClass,
			status: status,
			sex: sex,
			remark: remark
		})
	}

	ngOnInit() {
		this.items.status = 1
		this.items.sex = 1
		this.items.occupationClass = '员工'
		this.items.departmentId = ''
		this.getDepartment()
	}

	reset() {
		this.items.account = "";
		this.items.name = "";
		this.items.mobile = "";
		this.items.departmentName = "";
		this.items.departmentId = "";
		this.items.jobName = "";
		this.items.occupationClass = '员工';
		this.items.status = 1;
		this.items.sex = 1;
		this.items.remark = "";
	}

	onSubmit() {
		this.submitted = true
		for (var i = 0; i < this.department.length; i++) {
			if (this.items.departmentId == this.department[i].id) {
				this.items.departmentName = this.department[i].fullName
			}
		}
		this.http.postCustomHeaders('v1/resource/user', this.items).subscribe((res) => {
			var code = res.code
			if (code == '200') {
				this.goBack()
				this.toast.msg = '成功'
				this.toast.type = 'success'
				this.addToast(this.toast)
			} else {
				this.toast.msg = res.reason
				this.toast.type = 'error'
				this.addToast(this.toast)
			}
		})
	}

	getDepartment() {
		this.http.getCustomHeaders('v1/resource/department/status').subscribe((res) => {
			this.department = res.result
		})
	}

	goBack() {
		history.go(-1)
	}

	addToast(options) {
		if (options.closeOther) {
			this.toastyService.clearAll()
		}
		this.toast.position = options.position ? options.position : this.toast.position
		const toastOptions: ToastOptions = {
			title: options.title,
			msg: options.msg,
			showClose: options.showClose,
			timeout: 5000,
			theme: options.theme,
			onAdd: (toast: ToastData) => {
				/* added */
			},
			onRemove: (toast: ToastData) => {
				/* removed */
			}
		}

		switch (options.type) {
			case 'default':
				this.toastyService.default(toastOptions)
				break
			case 'info':
				this.toastyService.info(toastOptions)
				break
			case 'success':
				this.toastyService.success(toastOptions)
				break
			case 'wait':
				this.toastyService.wait(toastOptions)
				break
			case 'error':
				this.toastyService.error(toastOptions)
				break
			case 'warning':
				this.toastyService.warning(toastOptions)
				break
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
		public status?: any,
		public sex?: any,
		public remark?: String
	) {}
}
