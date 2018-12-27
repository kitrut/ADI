import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service'

@Component({
  selector: 'app-table-points',
  templateUrl: './table-points.component.html',
  styleUrls: ['./table-points.component.css']
})
export class TablePointsComponent implements OnInit {

  puntos = [];
  constructor(private dataService:DataService){
    this.dataService.getPoints().subscribe(data => {
      console.log(data);
      this.puntos = data;
    });
  }

  ngOnInit() {
  }

}
