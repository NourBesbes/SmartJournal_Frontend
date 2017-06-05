import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';


import { FacebookService, InitParams } from 'ngx-facebook';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements AfterViewInit {
  title = 'app works!';
  // constructor(location: PlatformLocation) {
  //     location.onPopState(() => {
  //
  //     });
  // }


constructor(private fb: FacebookService) {
 
    let initParams: InitParams = {
      appId: '251566128622296',
      xfbml: true,
      version: 'v2.8'
    };
 
    fb.init(initParams);
 
  }
  ngAfterViewInit() {
//Your jQuery code goes here
   $(document).ready(function() {

        $('#blog-landing').pinterest_grid({
          no_columns: 5,
          padding_x: 10,
          padding_y: 10,
          margin_bottom: 50,
          single_column_breakpoint: 700
        });

      });

  }


}
