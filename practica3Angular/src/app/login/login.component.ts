import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '.././data.service';
import { PrincipalComponent } from '../principal/principal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() refPrincipal:PrincipalComponent;

  constructor(private dataService:DataService) { }

  ngOnInit() {
  }

  testLogin(user,pass){
    this.dataService.login(user.value,pass.value).subscribe(
      data => {
        localStorage.setItem("token",data["code"]);
        this.refPrincipal.loginOK=true;
      },
      error => {
        console.log(error)
      }  
    )    
    return false;
  }
  registro(user,pass){
    this.dataService.registro(user.value,pass.value).subscribe(
      data => {
        alert("Registro correcto, por favor logueate para acceder a la informacion")
      },
      error => {
        alert("Registro incorrecto")
      }  
    )    
    return false;
  }
}
