import { Component } from '@angular/core';

import { DataService } from './data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activated: boolean = false;
  loginOK:boolean = false;

  constructor(private dataService:DataService){
    //podriamos testear el token, pero expondriamos al servidor a un ataque para obtener tokens validos
    if(localStorage.getItem("token")) this.loginOK = true;
    // por lo que dejaremos la informacion abierta para la practica, pudiendo cerrar la sesion, ante 
    // una respuesta no autorizada del servidor
  }
  logout(){
    localStorage.removeItem("token");
    this.loginOK=false;
  } 
}
