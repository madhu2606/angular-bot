import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private http: HttpClient) { }

  getTrans(body){

  	return this.http.post('http://localhost:3000/translate', (body), {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'json'
    }).pipe(map(result =>{
    	return result
    }))

  }
}
