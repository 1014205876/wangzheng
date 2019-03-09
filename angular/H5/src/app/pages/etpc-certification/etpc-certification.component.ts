import { Component, OnInit, ViewChild, Input, OnDestroy, HostListener } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { HttpService } from '../../shared/service/http-serve.service'
import global from '../../shared/global'

@Component({
	selector: 'app-etpc-certification',
	templateUrl: './etpc-certification.component.html',
	styleUrls: [ './etpc-certification.component.css' ]
})
export class EtpcCertificationComponent implements OnInit {
	@HostListener('window:popstate', [ '$event' ])
	onpopstate(e) {
		global.etpc = {
			productId: '',
			busCer: {
				legalName: '',
				etpName: '',
				busUrl: ''
			},
			idMobileCer: {
				mobile: '',
				name: '',
				idCode: '',
				status: '',
				idUrl: '',
				idBackUrl: '',
				issuingAgency: '',
				validityPeriod: '',
				idBack: {
					issuingAgency: '',
					idBackUrl: '',
					validityPeriod: '',
					status: ''
				}
			},
			controllerCer: {
				mobile: '',
				name: '',
				idCode: '',
				status: '',
				idUrl: '',
				idBackUrl: '',
				issuingAgency: '',
				validityPeriod: '',
				idBack: {
					issuingAgency: '',
					idBackUrl: '',
					validityPeriod: '',
					status: ''
				}
			},
			cerId: ''
		}
	}
	reader = new FileReader()
	loading = false
	busCer = {
		legalName: '',
		etpName: '',
		busUrl: ''
	}
	idMobileCer = {
		mobile: '',
		name: '',
		idCode: '',
		status: '',
		idUrl: '',
		idBackUrl: '',
		issuingAgency: '',
		validityPeriod: '',
		idBack: {
			issuingAgency: '',
			idBackUrl: '',
			validityPeriod: '',
			status: ''
		}
	}
	controllerCer = {
		mobile: '',
		name: '',
		idCode: '',
		status: '',
		idUrl: '',
		idBackUrl: '',
		issuingAgency: '',
		validityPeriod: '',
		idBack: {
			issuingAgency: '',
			idBackUrl: '',
			validityPeriod: '',
			status: ''
		}
	}
	cerId = ''
	title = '企业绑定'
	constructor(private router: Router, public activeRoute: ActivatedRoute, private http: HttpService) {}
	//人证一致
	@ViewChild('videoInput') videoInput
	alert
	code
	ngOnInit() {
		this.activeRoute.queryParams.subscribe((params) => {
			if (params['id']) {
				this.title = '查看企业详情'
				this.http.get('/v2/app/pre/etpCers/' + params['id']).subscribe((e) => {
					let data = e.result
					global.etpc.busCer = data.busCer
					global.etpc.idMobileCer = data.idMobileCer
					global.etpc.idMobileCer.idBack = {
						issuingAgency: data.idMobileCer.issuingAgency,
						validityPeriod: data.idMobileCer.validityPeriod,
						idBackUrl: data.idMobileCer.idBackUrl,
						status: '1'
					}
					global.etpc.idMobileCer.issuingAgency = ''
					global.etpc.idMobileCer.validityPeriod = ''
					global.etpc.idMobileCer.idBackUrl = ''
					global.etpc.cerId = data.busCer.cerId
					global.etpc.controllerCer = data.controllerCer
					global.etpc.controllerCer.idBack = {
						issuingAgency: data.controllerCer.issuingAgency,
						validityPeriod: data.controllerCer.validityPeriod,
						idBackUrl: data.controllerCer.idBackUrl,
						status: '1'
					}
					global.etpc.controllerCer.issuingAgency = ''
					global.etpc.controllerCer.validityPeriod = ''
					global.etpc.controllerCer.idBackUrl = ''
					this.reload()
				})
			}
			this.reload()
		})
	}
	etpCer() {
		if (!global.etpc.busCer.etpName && !global.etpc.busCer.legalName) {
			alert('请验证营业执照信息')
			return
		}
		if (!global.etpc.busCer.etpName) {
			alert('企业名称不得为空！')
			return
		}
		if (!global.etpc.busCer.legalName) {
			alert('法人代表不得为空！')
			return
		}
		if (!global.etpc.idMobileCer.name) {
			alert('请验证法人身份证正面信息！')
			return
		}
		if (!global.etpc.idMobileCer.idBack.issuingAgency) {
			alert('请验证法人身份证反面信息！')
			return
		}
		if (!global.etpc.idMobileCer.mobile) {
			alert('请验证法人手机号码！')
			return
		}
		if (!global.etpc.cerId) {
			alert('请进行人证一致校验！')
			return
		}
		if (
			!global.etpc.controllerCer.name ||
			!global.etpc.controllerCer.mobile ||
			!global.etpc.controllerCer.idBack.issuingAgency
		) {
			alert('请进行大股东/实际控制人校验！')
			return
		}
		for (let key in global.etpc.idMobileCer.idBack) {
			global.etpc.idMobileCer[key] = global.etpc.idMobileCer.idBack[key]
		}
		for (let key in global.etpc.controllerCer.idBack) {
			global.etpc.controllerCer[key] = global.etpc.controllerCer.idBack[key]
		}
		let data = global.etpc
		// data.productId = "";
		this.http.post('/v2/app/pre/etpCer', data).subscribe((e) => {
			if (e.code != '200') {
				alert(e.reason)
				return
			} else if (e.code === '200') {
				alert('绑定成功')
			}
			history.back()
		})
	}
	busCerChange(e) {
		if (e.legalName != global.etpc.busCer.legalName || e.etpName != global.etpc.busCer.etpName) {
			global.etpc.idMobileCer = {
				mobile: '',
				name: '',
				idCode: '',
				status: '',
				idUrl: '',
				idBackUrl: '',
				issuingAgency: '',
				validityPeriod: '',
				idBack: {
					issuingAgency: '',
					idBackUrl: '',
					validityPeriod: '',
					status: ''
				}
			}
			global.etpc.controllerCer = {
				mobile: '',
				name: '',
				idCode: '',
				status: '',
				idUrl: '',
				idBackUrl: '',
				issuingAgency: '',
				validityPeriod: '',
				idBack: {
					issuingAgency: '',
					idBackUrl: '',
					validityPeriod: '',
					status: ''
				}
			}
			global.etpc.cerId = ''
		}
		global.etpc.busCer = e
		this.reload()
	}
	idMobileCerChange(e) {
		if (e.name != global.etpc.idMobileCer.name || e.idCode != global.etpc.idMobileCer.idCode) {
			global.etpc.idMobileCer.idBack = {
				issuingAgency: '',
				idBackUrl: '',
				validityPeriod: '',
				status: ''
			}
			global.etpc.idMobileCer.mobile = ''
			global.etpc.controllerCer = {
				mobile: '',
				name: '',
				idCode: '',
				status: '',
				idUrl: '',
				idBackUrl: '',
				issuingAgency: '',
				validityPeriod: '',
				idBack: {
					issuingAgency: '',
					idBackUrl: '',
					validityPeriod: '',
					status: ''
				}
			}
			global.etpc.cerId = ''
		}
		for (let key in e) {
			this.idMobileCer[key] = e[key]
			global.etpc.idMobileCer[key] = e[key]
		}
		this.reload()
	}
	idBackChange(e) {
		global.etpc.idMobileCer.idBack = e
		this.reload()
	}
	cerIdChange(e) {
		global.etpc.cerId = e
		this.reload()
	}

	reload() {
		this.cerId = global.etpc.cerId
		this.busCer = global.etpc.busCer
		this.idMobileCer = global.etpc.idMobileCer
		this.controllerCer = global.etpc.controllerCer
	}

	getMobile() {
		if (!global.etpc.idMobileCer.name) {
			alert('请验证法人身份证信息！')
			return
		}
		if (!this.idMobileCer.status || this.idMobileCer.status != '1') {
			this.router.navigate([ '/step-tel' ])
		}
	}

	getRealCtrl() {
		if (!global.etpc.idMobileCer.name) {
			alert('请验证法人身份证正面信息！')
			return
		}
		if (!global.etpc.idMobileCer.idBack.issuingAgency) {
			alert('请验证法人身份证反面信息！')
			return
		}
		if (!global.etpc.idMobileCer.mobile) {
			alert('请验证法人手机号码！')
			return
		}
		this.router.navigate([ '/real-controller' ])
	}

	getVideo() {
		this.alert = false
		let self = this
		document.getElementById('videoInput').addEventListener(
			'change',
			function() {
				self.loading = true
				let file = self.videoInput.nativeElement.files[0]
				if (!/video\/\w+/.test(file.type)) {
					/*可以把autio改成其他文件类型 比如 image*/
					return false
				}
				self.reader.readAsDataURL(file)
				self.reader.onload = function() {
					self.http.post('/v2/app/pre/upload', { file: this.result }).subscribe((res) => {
						self.http
							.post('/v2/app/pre/liveDetect', {
								idCardName: self.idMobileCer.name,
								idCardNumber: self.idMobileCer.idCode,
								videoUrl: res.result,
								validate: self.code
							})
							.subscribe((res) => {
								self.loading = false
								if (res.code != '200') {
									alert(res.reason)
									return
								}
								self.cerIdChange(res.result)
								self.code = ''
							})
					})
				}
			},
			false
		)
		this.videoInput.nativeElement.click()
	}
	previewVideo(input) {
		if (!global.etpc.idMobileCer.name) {
			alert('请验证法人身份证信息！')
			return
		}
		this.alert = true
		this.http.get('/v2/app/pre/lipCode').subscribe((e) => {
			this.code = e.result
		})
	}
	back() {
		global.etpc = {
			productId: '',
			busCer: {
				legalName: '',
				etpName: '',
				busUrl: ''
			},
			idMobileCer: {
				mobile: '',
				name: '',
				idCode: '',
				status: '',
				idUrl: '',
				idBackUrl: '',
				issuingAgency: '',
				validityPeriod: '',
				idBack: {
					issuingAgency: '',
					idBackUrl: '',
					validityPeriod: '',
					status: ''
				}
			},
			controllerCer: {
				mobile: '',
				name: '',
				idCode: '',
				status: '',
				idUrl: '',
				idBackUrl: '',
				issuingAgency: '',
				validityPeriod: '',
				idBack: {
					issuingAgency: '',
					idBackUrl: '',
					validityPeriod: '',
					status: ''
				}
			},
			cerId: ''
		}
	}
}
