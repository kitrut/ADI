import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '.././data.service';
import { AppComponent} from '../app.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() refPrincipal:AppComponent;

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
  registro(userReg,passReg){
    this.dataService.registro(userReg.value,passReg.value).subscribe(
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
