import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {FacebookService} from 'ngx-facebook';
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { AppRoutingModule } from './routes/app-routing.module';
import { ArticleService } from './services/article.service';
import { NavbarService } from './services/navbar.service';

import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { ArticleByJournalComponent } from './article-by-journal/article-by-journal.component';
import { ArticleByCategorieComponent } from './article-by-categorie/article-by-categorie.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AdminComponent } from './admin/admin.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SearchComponent } from './search/search.component';
import { NotificationBarModule } from 'angular2-notification-bar'
import {Ng2PaginationModule} from 'ng2-pagination'; //importing ng2-pagination

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    NavbarComponent,
    DetailArticleComponent,
    ArticleByJournalComponent,
    ArticleByCategorieComponent,
    LoginFormComponent,
    AdminComponent,
    SearchComponent
  ],
  imports: [
    Ng2PaginationModule,
    NotificationBarModule,
    BrowserModule,
    FormsModule,
    HttpModule,
  	AppRoutingModule,
    InfiniteScrollModule,
    LazyLoadImageModule
  ],
  providers: [FacebookService,ArticleService,NavbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
