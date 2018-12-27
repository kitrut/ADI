import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './1_Interfaces/Post';
import { Point} from './1_Interfaces/Point';
import { Type} from './1_Interfaces/Type';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  http:HttpClient;
  url = "http://localhost:3000";
  constructor(http:HttpClient) { 
    this.http = http;
    console.log('Service works!');
  }

  getData(){
    return this.http.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
  }
  getPoints(){
    return this.http.get<Point[]>(this.url+"/api/points");
  }
  getTypes(){
    return this.http.get<Type[]>(this.url+"/api/types");
  }
}
