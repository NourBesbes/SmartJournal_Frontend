import { Component, OnInit} from '@angular/core';
import { ElementRef } from '@angular/core';
import { ArticleService } from '../services/article.service';
import {ActivatedRoute,Params,Router,NavigationEnd} from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-article-by-journal',
  templateUrl: './article-by-journal.component.html',
  styleUrls: ['./article-by-journal.component.css']
})
export class ArticleByJournalComponent implements OnInit  {
  articles:any;
  start = 10 ;
  end = 20;

  constructor(private service: ArticleService,private route: ActivatedRoute, private router: Router, private elRef: ElementRef)
  {

  }
  ngOnInit()  {
    this.getArticles();
  }
  getArticles() {
    console.log("Article from component ArticleByjournal");
    this.articles = [] ;
    this.route.params.switchMap((params:Params) => this.service.getArticleByJournal(params['_id']))
    .subscribe(data => this.articles = data);
    console.log(this.articles );
  }


  onScroll(){


    this.route.params.switchMap((params:Params) => this.service.getPartialArticleByJournal(params['_id'],this.start,this.end)).subscribe(
      data => {
        this.articles = data;
        this.start = this.start + 20 ;
        this.end = this.end  + 20 ;
      }
    )

  }

  showDetail(id:string){
    console.log("Show detail for this one "+id);
     this.router.navigate(['/detail', id]);
  }


}
