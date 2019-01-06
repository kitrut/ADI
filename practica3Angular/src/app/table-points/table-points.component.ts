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
  /**
   * Elimina un punto sobre la base de datos, lanza un alert si no se borra en el servidor
   * @param punto punto a eliminar
   */
  delete(punto){
    this.dataService.deletePoint(punto.id).subscribe(
      data => {
        this.puntos = this.puntos.filter((i) => i !== punto);
      },
      error => {
        alert("Error"+error.toString())
      }  
    )  
  }
  /**
   * Carga el modal con la información del punto que deseemos ver y editar; solo actualiza los datos si pulsamos el boton
   * @param content enlace al modal
   * @param punto punto del que queremos obtener los detalles
   */
  open(content,punto) {
    this.copyPoint(punto,this.puntoModal);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.dataService.updatePoint(this.puntoModal).subscribe(
        data => {
          this.copyPoint(this.puntoModal,punto);
        },
        error => {
          alert("Error"+error.toString())
        }  
      )
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /**
   * Copia cada uno de los atributos del objeto para evitar que hagan referencia al mismo objeto
   * @param punto1 Origen
   * @param punto2 Destino
   */
  private copyPoint(punto1,punto2){
    punto2.id = punto1.id;
    punto2.name = punto1.name;
    punto2.coordX = punto1.coordX;
    punto2.coordY = punto1.coordY;
    punto2.coordZ = punto1.coordZ;
    punto2.type = punto1.type;
    punto2.icon = punto1.icon;
  }

  /**
   * metodo auxiliar para el modal que comprueba si se cierra de otra forma que no sea con el boton
   * @param reason razon del cierre
   */
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
