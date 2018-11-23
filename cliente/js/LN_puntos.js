//Archivo "LN_puntos.js"
import {Servicio_API} from './servicios/API_puntos.js'
var url = 'http://localhost:3000';
var servicio_API = new Servicio_API(url)

function obtenerPuntos(){
    servicio_API.obtenerPuntos().then(function(datos){
        var listaHTML = tmpl_lista_compilada(datos)
        document.getElementById("content-left").innerHTML = listaHTML;
    })
}

function verDetalles(id){
    servicio_API.getPunto(id).then(function(datos){
      var listaHTML2 = tmpl_detalle_compilada(datos);
      document.getElementById("content-right").innerHTML = listaHTML2;
    })
}
//window.verDetalles = verDetalles;

function verListaPuntos(){
    servicio_API.obtenerPuntos().then(function(datos){
      var listaHTML = tmpl_lista_compilada(datos)
      document.getElementById("content").innerHTML=`<div id="content-left"></div><div id="content-right"></div>`;
      document.getElementById("content-left").innerHTML = listaHTML;        
    })
}
//window.verListaPuntos = verListaPuntos;
  
function loadFormPuntos(){
    document.getElementById("content").innerHTML = formulario;
}
//window.loadFormPuntos = loadFormPuntos;
  
function borrarPunto(id){
    servicio_API.borrarPunto(id).then(function(datos){
      localStorage.reload(true);
    })
}
//window.borrarPunto = borrarPunto;
  
function crearPunto(id){
    servicio_API.crearPunto(id).then(function(datos){
      //document.getElementById("content").innerHTML = "TODO se deberia hacer el delete del id: "+id;
    })
}

//window.crearPunto = crearPunto;

export {obtenerPuntos,verDetalles,verListaPuntos,loadFormPuntos,borrarPunto,crearPunto}