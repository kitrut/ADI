//Archivo "main.js"
import {saludar} from './saludador.js'
import {Servicio_API} from './servicios/API_puntos.js'
import { compile } from 'handlebars';

var templateItem = `    
  <td scope="col">{{id}}</td>
  <td scope="col">{{name}}</td>
  <td scope="col"><a id="enlace_{{id}}" href="javascript:verDetalles({{id}})">Detalles</a></td>
  <td scope="col"><a id="enlace_delete_{{id}}" href="javascript:borrarPunto({{id}})"><i class="fa fa-eye"></i>Borrar</a></td>    
`

var templateLista = `
 
 <table class="table table-dark">
    <thead>
      <tr>
        <td colspan=4><h2>Lista de la puntos</h2></td>
      </tr>
      <tr>
        <td scope="col">#</td>
        <td scope="col" colspan=3>Nombre</td>
      </tr>
    </thead>
    <tbody>
        {{#.}}
        <tr>
          ${templateItem}
        </tr>
        {{/.}}      
    </tbody>
   </table>
` 
var templateDetalles = `
  <div class="row bg-dark">
    <div class="col-md-12">
    <h2>Detalles del punto con id: {{id}}</h2>
    <form>
      <div class="form-group">
          <label for="PointName">Nombre del punto</label>
          <input class="form-control" id="PointName" name="PointName" type="text" value="{{name}}">
      </div>
      <div class="form-group">
          <label for="PointX">Coordenada X</label>
          <input  class="form-control" id="PointX" name="PointX" type="text" value="{{coordX}}">
      </div>
      <div class="form-group">
          <label for="PointY">Coordenada Y</label>
          <input  class="form-control" id="PointY" name="PointY" type="text" value="{{coordY}}">
      </div>
      <div class="form-group">
          <label for="PointZ">Coordenada Z</label>
          <input  class="form-control" id="PointZ" name="PointZ" type="text" value="{{coordZ}}">
      </div>
      <div class="form-group">
          <label for="Tipo">Tipo de punto</label>
          <input  class="form-control" id="Tipo" name="Tipo" type="text" value="{{type_name}}">
      </div>
      <button type="submit">Guardar</button>
      </form>
    </div>
  </div>
`

var formulario = `
<form>
<div class="form-group">
    <label for="PointName">Nombre del punto</label>
    <input class="form-control" id="PointName" name="PointName" type="text">
</div>
<div class="form-group">
    <label for="PointX">Coordenada X</label>
    <input  class="form-control" id="PointX" name="PointX" type="text">
</div>
<div class="form-group">
    <label for="PointY">Coordenada Y</label>
    <input  class="form-control" id="PointY" name="PointY" type="text">
</div>
<div class="form-group">
    <label for="PointZ">Coordenada Z</label>
    <input  class="form-control" id="PointZ" name="PointZ" type="text">
</div>
<div class="form-group">
    <label for="Tipo">Tipo de punto</label>
    <input  class="form-control" id="Tipo" name="Tipo" type="text">
</div>
</form>
`

var tmpl_lista_compilada = compile(templateLista)
var tmpl_item_compilada = compile(templateItem)
var tmpl_detalle_compilada = compile(templateDetalles)

var servicio_API = new Servicio_API('http://localhost:3000')
function verDetalles(id){
  servicio_API.getPunto(id).then(function(datos){
    var listaHTML2 = tmpl_detalle_compilada(datos);
    document.getElementById("content-right").innerHTML = listaHTML2;
  })
}
window.verDetalles = verDetalles

document.addEventListener('DOMContentLoaded', function() {
    //document.getElementById('mensaje').innerHTML = saludar();
    servicio_API.obtenerPuntos().then(function(datos){
        var listaHTML = tmpl_lista_compilada(datos)
        document.getElementById("content-left").innerHTML = listaHTML;        
    })
})

function verListaPuntos(){
  servicio_API.obtenerPuntos().then(function(datos){
    var listaHTML = tmpl_lista_compilada(datos)
    document.getElementById("content").innerHTML=`<div id="content-left"></div><div id="content-right"></div>`;
    document.getElementById("content-left").innerHTML = listaHTML;        
  })
}
window.verListaPuntos=verListaPuntos;

function loadFormPuntos(){
  document.getElementById("content").innerHTML = formulario;
}
window.loadFormPuntos = loadFormPuntos;

function borrarPunto(id){
  servicio_API.borrarPunto(id).then(function(datos){})
}
window.borrarPunto = borrarPunto;

function crearPunto(id){
  servicio_API.crearPunto(id).then(function(datos){
    //document.getElementById("content").innerHTML = "TODO se deberia hacer el delete del id: "+id;
  })
}
window.crearPunto = crearPunto;
document.getElementById("boton_add_item").addEventListener('click',function(){
  servicio_API.crearPunto("").then(function(resp){

  });
})