import { Injectable } from '@angular/core';

@Injectable()
export class DateTransformService {

  constructor() { }
  transform( date: Date ){
    var dateTemp;
    var month:any=date.getMonth()+1;
    if(month<10){
      month="0"+month;
    }
    dateTemp=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    return dateTemp;
  }
}
