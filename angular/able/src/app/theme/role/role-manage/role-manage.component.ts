import { Component, OnInit, ViewChild } from '@angular/core'
import { DatatableComponent } from '@swimlane/ngx-datatable'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpServe } from './../../../layout/service/http-serve.service'
import { Http } from '@angular/http/src/http'
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty'
import { animate, style, transition, trigger } from '@angular/animations'
import swal from 'sweetalert2'
declare var $: any

@Component({
	selector: 'app-role-manage',
	templateUrl: './role-manage.component.html',
	styleUrls: [
		'../../../../assets/icon/menu/iconfont.css',
		'../../../../assets/icon/operate/iconfont.css',
		'./role-manage.component.scss'
	],
	animations: [
		trigger('fadeInOutTranslate', [
			transition(':enter', [ style({ opacity: 0 }), animate('400ms ease-in-out', style({ opacity: 1 })) ]),
			transition(':leave', [
				style({ transform: 'translate(0)' }),
				animate('400ms ease-in-out', style({ opacity: 0 }))
			])
		])
	]
})
export class RoleManageComponent implements OnInit {
	@ViewChild('modalDefault') modalDefault
	rows = []
	appLists = []
	addForm: FormGroup

	public items
	public searchItems
	public modalTitle: String
	public modalStatus: String

	public total
	public totalPage
	public pageNum

	public roleId
	public authLists = []
	public selectedNodes = []

	public appId: String
	public roleStatus: boolean

	public roleManageStatus: Number

	toast = {
		position: 'center-center',
		title: '提示',
		msg: '',
		showClose: true,
		theme: 'material',
		type: 'success',
		closeOther: false
	}

	setting = {
		view: {
			showLine: false,
			showIcon: false,
			showTitle: false,
			nameIsHTML: true
		},
		check: {
			enable: true,
			chkDisabled: true,
			chkDisabledInherit: true,
			chkboxType: { Y: 'ps', N: 'ps' }
		},
		data: {
			simpleData: {
				enable: true
			}
		}
	}

	constructor(private http: HttpServe, private toastyService: ToastyService) {
		this.items = new Items()
		this.searchItems = new Items()
		this.roleManageStatus = 1
		this.roleStatus = false
		this.addForm = new FormGroup({
			name: new FormControl(),
			remark: new FormControl(),
			status: new FormControl(),
			roleKey: new FormControl()
		})
	}

	ngOnInit() {
		this.search(1, '')
		this.getApp()
		this.statusInit()
	}
	statusInit() {
		this.items.status = 1
		this.searchItems.status = ''
	}
	changeTitle(title, status) {
		this.items.status = 1
		this.modalTitle = title
		this.modalStatus = status
	}
	search(e, type) {
		if (!type) {
			this.searchItems = new Items()
			this.statusInit()
		}
		this.http
			.getCustomHeaders(
				'v1/resource/rolesGrid?name=' +
					(this.searchItems.name ? encodeURIComponent(this.searchItems.name) : '') +
					'&roleKey=' +
					(this.searchItems.roleKey ? this.searchItems.roleKey : '') +
					'&status=' +
					(this.searchItems.status ? this.searchItems.status : '') +
					'&pageNum=' +
					e +
					'&pageSize=' +
					10
			)
			.subscribe((res) => {
				this.rows = res.result.list
				this.total = res.result.total
				this.totalPage = res.result.pages
				this.pageNum = res.result.pageNum
			})
	}
	reset() {
		this.searchItems.name = ''
		this.searchItems.status = ''
	}
	add(value) {}
	modify(value) {
		this.items.id = value.id
		this.items.name = value.name
		this.items.remark = value.remark
		this.items.status = value.status
		this.items.roleKey = value.roleKey
	}
	onSubmit() {
		if (this.modalStatus == 'add') {
			this.http.postCustomHeaders('v1/resource/role', this.addForm.value).subscribe((res) => {
				let code = res.code
				if (code == '200') {
					this.toast.msg = '成功'
					this.toast.type = 'success'
					this.addToast(this.toast)

					this.modalDefault.hide()

					this.search(1, '')
					this.rows = []
					this.addForm.reset()
				} else {
					this.toast.msg = res.reason
					this.toast.type = 'error'
					this.addToast(this.toast)
				}
			})
		} else if (this.modalStatus == 'edit') {
			this.http.putCustomHeaders('v1/resource/role/' + this.items.id, this.items).subscribe((res) => {
				let code = res.code
				if (code == '200') {
					this.toast.msg = '成功'
					this.toast.type = 'success'
					this.addToast(this.toast)

					this.modalDefault.hide()

					this.search(1, '')
					this.rows = []
					this.addForm.reset()
				} else {
					this.toast.msg = res.reason
					this.toast.type = 'error'
					this.addToast(this.toast)
				}
			})
		}
	}
	getApp() {
		this.http.getCustomHeaders('v1/resource/app').subscribe((res) => {
			this.appLists = res.result
		})
	}
	getAuth(appId, id) {
		this.http.getCustomHeaders('v1/resource/role/' + id + '/' + appId + '/permission').subscribe((res) => {
			this.authLists = []
			this.authLists = res.result
			// this.authLists =[
			//   {
			//     name: "父节点1",  children: [
			//       {name: "子节点1"},
			//       {name: "子节点2"}
			//     ]
			//   }
			// ]
			$.fn.zTree.init($('#ztree'), this.setting, this.authLists)
		})
	}
	selectNode() {
		let treeObj = $.fn.zTree.getZTreeObj('ztree')
		this.selectedNodes = treeObj.getNodesByParam('checked', true, null)
		var selectedNodesId = { permissionId: [] }
		var count = 0
		for (var i = 0; i < this.selectedNodes.length; i++) {
			selectedNodesId.permissionId[count] = this.selectedNodes[i].id
			count++
		}
		// console.log(selectedNodesId)
		this.http
			.postCustomHeaders('v1/resource/role/' + this.roleId + '/' + this.appId + '/permission', selectedNodesId)
			.subscribe((res) => {
				let code = res.code
				if (code == '200') {
					this.toast.msg = '成功'
					this.toast.type = 'success'
					this.addToast(this.toast)
				} else {
					this.toast.msg = res.reason
					this.toast.type = 'error'
					this.addToast(this.toast)
				}
			})
		this.rows = []
		this.search(1, '')
	}
	auth(value) {
		if (value.status == 0) {
			this.roleStatus = false
		} else {
			this.roleStatus = true
		}
		this.roleManageStatus = this.items.status
		$.fn.zTree.init($('#ztree'))
		this.roleId = value.id
		this.changeApp(this.appLists[0])
		this.appLists[0].active = true
	}

	changeApp(value) {
		this.appId = value.appId
		this.getAuth(this.appId, this.roleId)
		this.authHide()
	}

	authHide() {
		for (var i = 0; i < this.appLists.length; i++) {
			this.appLists[i].active = false
		}
	}

	changePage(e) {
		this.search(e, '')
	}

	switchange(row) {
		// console.log(row.id)
		var status = { status: null }
		if (row.status == 0) {
			status.status = 1
		} else if (row.status == 1) {
			status.status = 0
		}
		this.http.patchCustomHeaders('/v1/resource/role/' + row.id, status).subscribe((res) => {
			// console.log(res)
			if (res.code == '200') {
				this.toast.msg = '状态修改成功'
				this.toast.type = 'success'
				this.addToast(this.toast)
			} else {
				this.toast.msg = res.reason
				this.toast.type = 'error'
				this.addToast(this.toast)
			}
			this.search(1, '')
		})
	}

	// toast提示
	addToast(options) {
		console.log(options)
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
		public name?: String,
		public status?: any,
		public remark?: String,
		public roleKey?: String,
		public id?: String,
		public createDate?: String,
		public updateDate?: String
	) {}
}
