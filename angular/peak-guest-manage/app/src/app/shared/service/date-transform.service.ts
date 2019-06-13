import { Injectable } from '@angular/core';

@Injectable()
export class DateTransformService {

  constructor() { }
  transform( date ){
    var dateTemp;
    let month=(date.getMonth()+1<10)?('0'+(date.getMonth()+1)):(date.getMonth()+1);
    let day=(date.getDate()<10)?('0'+date.getDate()):(date.getDate());
    dateTemp=date.getFullYear()+'-'+month+'-'+day;
    return dateTemp;
  }
}
