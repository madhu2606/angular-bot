import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {TranslationService} from "./translation.service"


@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
data;
	constructor(private http: HttpClient,private trans:TranslationService){}
  transform(value: any, src :any,dst :any ) {
  // 	if(src == 'en'){
		// return value;
  // 	}else{
  		let body = {
  			"text" :value,
  			"src" :src,
  			"dst":dst
  		}

  		return this.trans.getTrans(body).toPromise().then(res =>{
  			console.log(res)
  			if(res['status'] == 200){

  			return res['result'];
  			}
  			else{
  				return value;
  			}
  		})

  }

// }
}
