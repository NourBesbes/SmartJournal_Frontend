import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params,Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { SearchService } from '../services/search-service.service' ; 

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SearchService ]
})
export class SearchComponent implements OnInit {

  keyword:string ; 
  numberOfSearchResult: number = 10;
  articles:any;

  constructor(private service: SearchService,private route: ActivatedRoute, private router: Router) { 


   }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.keyword = params['_id'];
       this.service.findByKeywords(this.keyword).subscribe(
      data => this.articles = data
    );
        // here call service to get search result      
    });    
  }

getArticles(keyword)
{this.service.findByKeywords(keyword).subscribe(
      data => this.articles = data
    );}

}
