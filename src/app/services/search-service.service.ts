import { Injectable } from '@angular/core';
import { Http }  from '@angular/http';
import 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';;
import {Article} from '../ModelBinding/article';

@Injectable()
export class SearchService {

  searchUrl:string = "http://smartjournal.herokuapp.com/api/search?q=" ; 


 constructor(private http:Http) {
    this.http = http
  }

  findByKeywords(keyword: string){
     const url = `${this.searchUrl}/${keyword}`;
    return this.http.get(url).map(res => res.json());
  }

}
