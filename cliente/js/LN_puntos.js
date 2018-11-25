//Archivo "LN_puntos.js"
import {Servicio_API} from './servicios/API_puntos'
import { compile } from 'handlebars';
var url = 'http://localhost:3000';
var servicio_API = new Servicio_API(url)
var formulario = `
  <form>
  <div class="row bg-success"  style="height:97%">
    <div class="form-group col-md-2">
      <label for="PointID">ID:</label>
      <input class="form-control" id="PointID" name="PointID" type="text">
    </div>
    <div class="form-group col-md-10">
        <label for="PointName">Nombre del punto</label>
        <input class="form-control" id="PointName" name="PointName" type="text">
    </div>
    <div class="form-group col-md-4">
        <label for="PointX">CoordenadaX</label>
        <input  class="form-control" id="PointX" name="PointX" type="text">
    </div>
    <div class="form-group col-md-4">
        <label for="PointY">CoordenadaY</label>
        <input  class="form-control" id="PointY" name="PointY" type="text">
    </div>
    <div class="form-group col-md-4">
        <label for="PointZ">CoordenadaZ</label>
        <input  class="form-control" id="PointZ" name="PointZ" type="text">
    </div>
    <div class="form-group col-md-4">
        <label for="Tipo">Tipo de punto</label>
        <input  class="form-control" id="Tipo" name="Tipo" type="text">
    </div>
    <div class="form-group col-md-8">
        <label for="TipoName">Nombre del tipo:</label>
        <input  class="form-control" id="TipoName" name="TipoName" type="text">
    </div>
    <!--<div class="form-group col-md-12">
        <label for="aux">Nombre del tipo:</label>
        <select id="selectTipos"></select>
        <input  class="form-control" id="aux" name="aux" type="text">
    </div>-->
    <input class="col-md-6 btn-success" type="button" value="Crear" id="boton_add_item">
    <input class="col-md-6 btn-warning" type="button" value="Actualizar" id="boton_update_item">
    </div>
  </form>

`
var templateLista = ` 
 <table class="table table-dark table-bordered table-hover">
    <thead>
      <tr>
        <td colspan=4><h3>Lista de la puntos</h3></td>
      </tr>
      <tr>
        <td scope="col">#</td>
        <td scope="col" colspan=3>Nombre</td>
      </tr>
    </thead>
    <tbody>
        {{#.}}
        <tr>
        <td scope="col">{{id}}</td>
        <td scope="col">{{name}}</td>
        <td scope="col"><a id="enlace_{{id}}" href="javascript:verDetalles({{id}})"><i class="fa fa-eye fa-2x" style="color:green"></i></a></td>
        <td scope="col"><a id="enlace_delete_{{id}}" href="javascript:borrarPunto({{id}})"><i class="fa fa-trash fa-2x" style="color:red"></i></a></td>
        </tr>
        {{/.}}      
    </tbody>
    <tfooter>
      <tr>
        <td scope="col" colspan=2></td>
        <td scope="col"><a href="javascript:obtenerPuntos(-1)"><i class="fas fa-step-backward fa-2x" style="color:white"></i></a></td>
        <td scope="col"><a href="javascript:obtenerPuntos(1)"><i class="fas fa-step-forward fa-2x" style="color:white"></i></a></td>
      </tr>
    </tfooter>
   </table>
` 
var tmpl_lista_compilada = compile(templateLista)
var ActualPage = 0;
"use strict";
export default class LN_puntos {
    constructor(){
        this.formulario = formulario;
        this.tmpl_lista_compilada = tmpl_lista_compilada;
    }
    obtenerPuntos(page){
        ActualPage+= page;
        if(ActualPage<0) ActualPage=0;
        servicio_API.obtenerPuntos(ActualPage).then((datos) => document.getElementById("content-left").innerHTML = tmpl_lista_compilada(datos))
    } 
    verDetalles(id){
        servicio_API.getPunto(id).then(function(datos){
          document.getElementById("PointID").value = datos.id;
          document.getElementById("PointName").value = datos.name;
          document.getElementById("PointX").value = datos.coordX;
          document.getElementById("PointY").value = datos.coordY;
          document.getElementById("PointZ").value = datos.coordZ;
          document.getElementById("Tipo").value = datos.type;
          document.getElementById("TipoName").value = datos.type_name;
        })
    }
    loadFormPuntos(){
        document.getElementById("content-right").innerHTML = formulario;
        document.getElementById("boton_add_item").addEventListener('click',function(){
          var name = document.getElementById("PointName").value;
          var coordx= document.getElementById("PointX").value;
          var coordy= document.getElementById("PointY").value;
          var coordz= document.getElementById("PointZ").value;
          var type= document.getElementById("Tipo").value;
          var token= localStorage.getItem("token");
          servicio_API.crearPunto(name,coordx,coordy,coordz,type,token).then(() => obtenerPuntos(0));
        })
        document.getElementById("boton_update_item").addEventListener('click',function(){
          var id = document.getElementById("PointID").value;
          var name = document.getElementById("PointName").value;
          var coordx= document.getElementById("PointX").value;
          var coordy= document.getElementById("PointY").value;
          var coordz= document.getElementById("PointZ").value;
          var type= document.getElementById("Tipo").value;
          var token= localStorage.getItem("token");
          servicio_API.actualizaPunto(id,name,coordx,coordy,coordz,type,token).then(() => obtenerPuntos(0));
          
        })
    }
    borrarPunto(id){
        servicio_API.borrarPunto(id).then(() => obtenerPuntos(0))  
    }
};
