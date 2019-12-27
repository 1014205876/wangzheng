import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';

@Injectable()
export class HisCurveAddService {

     _selectedPoint: Subject<any> = new Subject<any>();

    public constructor() {
    }

    // public setSelectedPoint() {
    //     console.log(123)
    // }
    public setSelectedPoint(selectedPointsIfo: any): void {
        this._selectedPoint.next(selectedPointsIfo);
    }

    // public currentSelectedPoint() {
    //     console.log(123)
    // }
    public currentSelectedPoint(): Observable<any> {
        return this._selectedPoint.asObservable();
    }
}

// //发布
// this._hisCurveAddService.setSelectedPoint(arg）
// //订阅
// this._hisCurveAddService.currentSelectedPoint().subscribe((value: any)=>{console.log(value)});
