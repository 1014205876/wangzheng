import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/service/http-serve.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  gist = {
    'todayAddLoan': '',
    'todayAddUser': '',
    'totalAmount': '',
    'totalLoan': '',
    'totalUser': ''
  };

  constructor(private http: HttpService) {
  }

  ngOnInit() {
    this.http.getCustomHeaders('/v1/app/back/homepage')
      .subscribe(e => {
        this.gist = e.result;
      })
  }

}
