import { Component, Pipe,OnInit,Input  } from '@angular/core';
import {ActivatedRoute,Params,Router} from '@angular/router';
import {  Observable } from 'rxjs/Observable';
import { ArticleService } from '../services/article.service';
import { NavbarService } from '../services/navbar.service';
import { Journal } from '../ModelBinding/journal';
import { Categorie } from '../ModelBinding/categorie';
import { NotificationBarService,NotificationType } from 'angular2-notification-bar'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  whatTime: any;
  articles:any;
   journals:any;
   categories:any;
  logged() {
    console.log("logged");
   // document.cookie = "sessionID" + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = "sessionID= ; path=/login; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=localhost" ;
    this.router.navigate(['/login']); 
  }

    constructor(private router:Router, private articleservice:ArticleService,private navbarservice:NavbarService,private notificationBarService:NotificationBarService)
 {this.loggin();  }

loggin()
{
  var x =document.cookie.split(';');
      var i =0;
      var cookieValue;
      for( ; i<x.length;i++)
      {
        if(x[i].split('=')[0].trim() =='sessionID')
        {
          cookieValue=x[i].split('=')[1];
          break;
        }
      }
      console.log(cookieValue);
      if (cookieValue ===undefined) {this.router.navigate(['/login']); }
      else
      {var res = atob(cookieValue).split('??');
      if(atob(res[0] )=='test'&& atob(res[1])=='test' )
      { }
      else 
      this.router.navigate(['/login']); 
    }
    this.whatTime = Observable.interval(1000).map(x => new Date()).share();
}
  ob:any[] = ['lienfb','categorie'];
 model = new Journal( this.ob );
  ob1:any[] = ['categorie','categorie'];
categorieModel= new Categorie(this.ob1)

  ngOnInit() {
    console.log("hi admin");
    this.getArticles();
    this.getCategories();
    this.getJournaux();
  }

   getArticles() {
    console.log("Article from component Admin");
    this.articles = [] ; 
    this.articleservice.getAllArticles().subscribe(
      data => this.articles = data
    );
  }

  sleep(seconds)
  {
    var e = new Date().getTime() + (seconds * 1000);
    while (new Date().getTime() <= e) {}
  }


  getJournaux() {
    console.log("journals from component admin");
    this.journals = [] ; 
    this.navbarservice.getjournaux().subscribe(
      data => this.journals = data
    ); 
  }
  getCategories() {
    console.log("categorie from component admin");
    this.categories = [] ; 
    this.navbarservice.getCategories().subscribe(
      data => this.categories = data
    ); 
  }

  onSubmit() {        
    this.notificationBarService.create({ message: 'Journal Added !', type: NotificationType.Success});

                  this.navbarservice.addJournal(this.model).then(model =>{  
                   setTimeout(() => {this.router.navigate(['/login/admin']); }, 3000) ;   
                      }); 
          
  }

  onSubmitCategorie(){
    this.notificationBarService.create({ message: 'Categorie Added !', type: NotificationType.Success});
     this.navbarservice.addCategorie(this.categorieModel).then(model =>{  
                   setTimeout(() => {this.router.navigate(['/login/admin']); }, 3000) ;   
                      }); 
  }
  @Input()
 journal : Journal;
DeleteJournal(journall:Journal)

{ console.log("deleteeeeee");
this.journal=journall;
  this.navbarservice.deleteJournal(this.journal._id).then(()=> {
  this.notificationBarService.create({ message: 'Journal Deleted !', type: NotificationType.Info});
   }) ;
}

  @Input()
 categ : Categorie;
DeleteCategorie(categorie:Categorie)

{ console.log("deleteeeeee");
this.categ=categorie;
  this.navbarservice.deleteCategorie(categorie._id).then(()=> {
  this.notificationBarService.create({ message: 'Journal Deleted !', type: NotificationType.Info});
   }) ;
}



}
