import { Component } from '@angular/core';

import { DataService } from './data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'practica3Angular';
  users: string[] = ['juan','manu','alvaro','javi'];
  activated: boolean = false;
  loginOK:boolean = false;
  posts = [];

  constructor(private dataService:DataService){
    this.dataService.getPoints().subscribe(data => {
      this.posts = data;
    });
  } 
}
