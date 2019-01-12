import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service'

@Component({
  selector: 'app-point-form',
  templateUrl: './point-form.component.html',
  styleUrls: ['./point-form.component.css']
})
export class PointFormComponent implements OnInit {
  punto={"id":"null","name":"null","coordX":"null","coordY":"null","coordZ":"null","type":"null","icon":"null"};
  constructor(private dataService:DataService) { }

  ngOnInit() {
  }

  public store(){
    alert("hola");
    this.dataService.createPoint(this.punto).subscribe(
      data => {
        alert("Componente guardado")
      },
      error => {
        alert("Error"+error.toString())
      }  
    )
    alert("hola");
    return false;
  }

}
