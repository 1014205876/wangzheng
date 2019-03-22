import { Component, OnInit } from '@angular/core';
import { selfHttp } from '../../shared/service/http-service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-popularize-register',
  templateUrl: './popularize-register.page.html',
  styleUrls: ['./popularize-register.page.scss'],
})
export class PopularizeRegisterPage implements OnInit {

	public yzm = false
	public sendCd = 60
	public insStaffNum

	items = {
		mobile: '',
		yzm: ''
	}
	inviteMobile
	productId

  constructor(
    private http: selfHttp,
    public router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.queryParams.subscribe((e) => {
        this.insStaffNum = e
    }) }

  ngOnInit() {
  }

}
