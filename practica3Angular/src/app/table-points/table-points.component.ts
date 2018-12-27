import { Component, OnInit } from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../data.service'

@Component({
  selector: 'app-table-points',
  templateUrl: './table-points.component.html',
  styleUrls: ['./table-points.component.css']
})
export class TablePointsComponent implements OnInit {

  puntos = [];
  closeResult: string;
  puntoModal={"id":"null","name":"null","coordX":"null","coordY":"null","coordZ":"null","type":"null","icon":"null"};
  constructor(private dataService:DataService,private modalService: NgbModal){
    this.dataService.getPoints().subscribe(data => {
      console.log(data);
      this.puntos = data;
    });
  }

  ngOnInit() {
  }
  open(content,punto) {
    this.copyPoint(punto,this.puntoModal);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      //TODO mandar a base de datos y di da OK, actualizamos los datos
      this.copyPoint(this.puntoModal,punto);
      console.log("Guardado!");
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private copyPoint(punto1,punto2){
    //copiamos objeto y hacen referencia al mismo//no quiero actualizar el otro si no guarda
    //this.puntoModal = punto;
    //los primarios se copian por valor
    punto2.id = punto1.id;
    punto2.name = punto1.name;
    punto2.coordX = punto1.coordX;
    punto2.coordY = punto1.coordY;
    punto2.coordZ = punto1.coordZ;
    punto2.type = punto1.type;
    punto2.icon = punto1.icon;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
