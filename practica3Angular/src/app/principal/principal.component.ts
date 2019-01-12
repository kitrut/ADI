import { Component, OnInit } from '@angular/core';
import { DataService } from '.././data.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  
  ngOnInit(): void {} 

  constructor(private dataService:DataService){}
}
