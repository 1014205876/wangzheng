import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/service/http-serve.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private http: HttpService) { }
html;
  ngOnInit() {
    
    this.http.getw('/peak-resource/v1/resource/settings?key=aboutUs')
      .subscribe(res => {
        console.log(res)
        this.html=res.result.value
      })
  }

}
