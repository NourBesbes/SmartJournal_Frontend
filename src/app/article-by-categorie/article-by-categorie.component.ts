import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';

import {ActivatedRoute,Params,Router} from '@angular/router';
@Component({
  selector: 'app-article-by-categorie',
  templateUrl: './article-by-categorie.component.html',
  styleUrls: ['./article-by-categorie.component.css']
})
export class ArticleByCategorieComponent implements OnInit {
articles:any;
start = 10 ;
end = 20;

  constructor(private service: ArticleService,private route: ActivatedRoute, private router: Router)
  { }

  ngOnInit() {
  this.getArticles();

  }

   getArticles() {
    console.log("Article from component ArticleByCategori");
    this.articles = [] ;


    this.route.params.switchMap((params:Params) => this.service.getArticleByCategorie(params['_id']))
      .subscribe(data => this.articles = data);

  }

  onScroll(){

    this.route.params.switchMap((params:Params) => this.service.getPartialArticleByCategorie(params['_id'],this.start,this.end)).subscribe(
      data => {
        this.articles = data;
        this.start = this.start + 20 ;
        this.end = this.end  + 20 ;
      }
    )

  }



}
