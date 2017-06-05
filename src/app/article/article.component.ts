import { Component, OnInit , ViewChild , } from '@angular/core';
import { ArticleService } from '.././services/article.service';
import {Router} from '@angular/router';
import {Article} from '../ModelBinding/article';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService]

})

export class ArticleComponent implements OnInit {

    defaultImage = '../assets/loadinglogo.png';
    offset = 300;

  articlesbydate:any;
  articles: any;
  selectedArticleId: string = null;
  start = 10 ;
  end = 20;
  isRecentArticles: boolean;
  numberOfScrolls = 0;

  onSelect(artcle) {
    this.selectedArticleId = artcle.ArticleId;
  }
  constructor(private service: ArticleService,private route: Router) {
    this.service = service;
    this.route = route;
    this.isRecentArticles = false ;
  }

  sleep(seconds)
  {
    var e = new Date().getTime() + (seconds * 1000);
    while (new Date().getTime() <= e) {}
  }

  ngOnInit() {

    this.getArticles();

  }


  onScroll(){
    console.log("number of scrolls"+this.numberOfScrolls);
    if (this.numberOfScrolls % 50 == 0) {
      if ( this.isRecentArticles == false) {
        this.service.getTopArticleBlock(this.start,this.end).subscribe(
          data => {
            this.articles = data
            this.start = this.start + 20 ;
            this.end = this.end  + 20 ;
          }
        )
      } else {
        this.service.getRecentArticleBlock(this.start,this.end).subscribe(
          data => {
            this.articlesbydate = data
            this.start = this.start + 20 ;
            this.end = this.end  + 20 ;
          }
        )
      }
    }
    this.numberOfScrolls = this.numberOfScrolls + 10 ;
  }


  getArticles() {
    console.log("Article from component Article");
    this.articles = [] ;
    this.service.getArticles().subscribe(
      data => this.articles = data
    );

  }

  getArticlesByDate() {
    console.log("Article from component Article");
    this.articles = [] ;
    this.service.getArticlesByDate().subscribe(
      data => this.articlesbydate = data
    );
  }

  // this will switch between recent and top and reciproquement
  switch(){
    this.service.getArticlesByDate().subscribe(
      data => this.articlesbydate = data
    );
    this.isRecentArticles = true ;
    this.start = 10 ;
    this.end = 20;
    this.numberOfScrolls = 0 ; 
  }
  clear(){
    this.numberOfScrolls = 0
    this.isRecentArticles = false ;
    this.articlesbydate= [];
    this.start = 10 ;
    this.end = 20;
  }


}
