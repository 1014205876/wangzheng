
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';

@Injectable()
export class FileUploadService {

  constructor(private httpClient: HttpClient) { }
  api:String="/peak-resource/";  //线上8040

  yourHeadersConfig

  postFile(fileToUpload: File,url: string): Observable<any> {
    console.log(fileToUpload)
    const endpoint = 'http://192.168.111.228:8040/peak-resource/v1/resource/fieldsImport';
    const formData: FormData = new FormData();
    let header={ 
      'Content-Type': 'multipart/form-data;',
      'AUTH_ID':'97a78cc5-2e92-42b8-9a7a-de4a6ad5a3b8',
      'AUTH_USER':'admin'
    }
    
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient
            .post(endpoint, formData, { headers: header })
            .map(() => { return true; })
  }
  

}
