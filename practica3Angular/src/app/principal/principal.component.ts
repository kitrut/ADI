import { Component, OnInit } from '@angular/core';
import { DataService } from '.././data.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  title: string = 'practica3Angular';
  loginOK:boolean;
  token:string;
  posts = [];
  usuarioConectado = false;
  
  ngOnInit(): void {
    var token = localStorage.getItem("token");
    if(token !== null){
      this.loginOK = true;
    }else{
      this.loginOK = false;
    }
  } 

  constructor(private dataService:DataService){
    this.dataService.getPoints().subscribe(
      data => {
        this.posts = data;
      }    
    );
  }
  logout(){
    localStorage.removeItem("token");
    this.loginOK=false;
  }
}
