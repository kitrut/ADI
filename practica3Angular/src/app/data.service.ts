import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Post } from './1_Interfaces/Post';
import { Point} from './1_Interfaces/Point';
import { Type} from './1_Interfaces/Type';

var httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

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
  login(user,pass){
    return this.http.post(this.url+"/login",{"usuario":user,"password":pass});
  }
  registro(user,pass){
    return this.http.post(this.url+"/registro",{"usuario":user,"password":pass});
  }
  updatePoint(punto){
    return this.http.put(this.url+"/api/points/"+punto.id,{"name":punto.name,"coordX":punto.coordX,"coordY":punto.coordY,"coordZ":punto.coordZ,"type":punto.type,"icon":punto.icon,"token":localStorage.getItem("token")});
  }
  deletePoint(id){
    return this.http.delete(this.url+"/api/points/"+id,{params:{"token":localStorage.getItem("token")}});
  }
  deleteType(id){
    return this.http.delete(this.url+"/api/types/"+id,{params:{"token":localStorage.getItem("token")}});
  }
  createPoint(punto){
    return this.http.post(this.url+"/api/points",{"name":punto.name,"coordX":punto.coordX,"coordY":punto.coordY,"coordZ":punto.coordZ,"type":punto.type,"icon":punto.icon,"token":localStorage.getItem("token")});
  }
}
