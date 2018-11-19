//Archivo "main.js"
import {saludar} from './saludador.js'
import {Servicio_API} from './servicios/API_puntos.js'
import { compile } from 'handlebars';

var templateItem = `
   <div>
      <span id="{{id}}">
         <strong>{{name}}</strong> - <em>{{cantidad}}</em>
      </span>   
      <a id="enlace_{{id}}" href="javascript:verDetalles({{id}})">Detalles</a>
   </div>
`

var templateLista = `
 <h2>Lista de la puntos</h2>
 {{#.}}
   ${templateItem}
 {{/.}}
` 
var templateDetalles = `
  <span id="detalles_{{id}}">
    <h2>Detalles del punto con id: {{id}}</h2>
    {{name}}
    {{type}}
    {{type_name}}
  </span>
`

var tmpl_lista_compilada = compile(templateLista)
var tmpl_item_compilada = compile(templateItem)
var tmpl_detalle_compilada = compile(templateDetalles)

var servicio_API = new Servicio_API('http://localhost:3000')

document.addEventListener('DOMContentLoaded', function() {
    //document.getElementById('mensaje').innerHTML = saludar();
    servicio_API.obtenerPuntos().then(function(datos){
        var listaHTML = tmpl_lista_compilada(datos)
        document.getElementById("content-left").innerHTML = listaHTML;        
    })
    servicio_API.getPunto(1).then(function(datos){
      var listaHTML2 = tmpl_detalle_compilada(datos);
      document.getElementById("content-right").innerHTML = listaHTML2;
    })
})
