import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service'

@Component({
  selector: 'app-table-tipos',
  templateUrl: './table-tipos.component.html',
  styleUrls: ['./table-tipos.component.css']
})
export class TableTiposComponent implements OnInit {
  tipos = [];
  constructor(private dataService:DataService){
    this.dataService.getTypes().subscribe(data => {
      console.log(data);
      this.tipos = data;
    });
  }

  ngOnInit() {
  }

}
