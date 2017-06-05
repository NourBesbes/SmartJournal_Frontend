import { Injectable } from '@angular/core';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/Rx'
import 'rxjs/add/operator/toPromise';;
import {Article} from '../ModelBinding/article';
import {Journal} from '../ModelBinding/journal';
import {Categorie} from '../ModelBinding/categorie';

@Injectable()
export class NavbarService {
  endpoint_url:string="http://smartjournal.herokuapp.com/api/categorie";
journal_url:string="http://smartjournal.herokuapp.com/api/journal";
  constructor(private http:Http) {
    this.http = http
   }


private header = new Headers({'Content-Type': 'application/json'});


 deleteJournal(id: string): Promise<void> {
  const url = `${this.journal_url}/${id}/delete`;
  console.log(url);
  return this.http.delete(url, {headers: this.header})
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
  }

  deleteCategorie(id: string): Promise<void> {
  const url = `${this.endpoint_url}/${id}`;
  console.log(url);
  return this.http.delete(url, {headers: this.header})
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
  }

      addJournal (body: Object): Promise<Journal> {
        return  this.http
              .post(this.journal_url, JSON.stringify(body), {headers:this.header})
              .toPromise()
              .then(res => res.json().data)
              .catch(this.handleError);
            }
addCategorie(body: Object): Promise<Categorie>{
  return  this.http
              .post(this.endpoint_url, JSON.stringify(body), {headers:this.header})
              .toPromise()
              .then(res => res.json().data)
              .catch(this.handleError);
}

    private handleError(error: any): Promise<any>
{
  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
}
  getjournaux()
  {
    console.log("Message from categorie service");
    return this.http.get(this.journal_url).map(res => res.json());
  }

  getCategories()
  {
    console.log("Message from categorie service");
    return this.http.get(this.endpoint_url).map(res => res.json());
  }
}
