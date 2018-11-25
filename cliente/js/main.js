//Archivo "main.js"
//import {saludar} from './saludador.js'
//import {obtenerPuntos,verDetalles,verListaPuntos,loadFormPuntos,borrarPunto,crearPunto} from './LN_puntos.js'
import {Servicio_API} from './servicios/API_puntos.js'
import {S_Usuario} from './servicios/API_usuarios.js'
import { compile } from 'handlebars';


var ActualPage = 0;
var ActualPageTipos = 0;

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
var templateListaTipos = ` 
 <table class="table table-dark table-bordered table-hover">
    <thead>
      <tr>
        <td colspan=4><h3>Lista de tipos de punto</h3></td>
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
          <td scope="col">{{type_name}}</td>
          <td scope="col"><a id="enlace_tipo_{{id}}" href="javascript:verDetallesTipo({{id}})"><i class="fa fa-eye fa-2x" style="color:green"></i></a></td>
          <td scope="col"><a id="enlace_tipo_delete_{{id}}" href="javascript:borrarTipo({{id}})"><i class="fa fa-trash fa-2x" style="color:red"></i></a></td>
        </tr>
        {{/.}}      
    </tbody>
    <tfooter>
      <tr>
        <td scope="col" colspan=2></td>
        <td scope="col"><a href="javascript:obtenerTipos(-1)"><i class="fas fa-step-backward fa-2x" style="color:white"></i></a></td>
        <td scope="col"><a href="javascript:obtenerTipos(1)"><i class="fas fa-step-forward fa-2x" style="color:white"></i></a></td>
      </tr>
    </tfooter>
   </table>
` 

var templatePlacemark =`
<Placemark>
  <name>{{name}}</name>
  <Point>
    <coordinates>{{coordX}},{{coordY}},{{coordZ}}</coordinates>
  </Point>
</Placemark>`

var templateKML =`
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document><name>Mapa</name>
  {{#.}}
    ${templatePlacemark}
  {{/.}}
  </Document></kml>
`;

var formulario = `
  <form>
  <div class="row bg-info"  style="height:97%">
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
var login = `
<form>
    <div class="form-group">
        <label for="username">Usuario</label>
        <input class="form-control" id="username" name="username" type="text">
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input class="form-control" id="password" name="password" type="text">
    </div>
    <button type="button" id="loginButton">Log in</button>
    <button type="button" id="registrarButton">Registro</button>
</form>
`


var tmpl_lista_compilada = compile(templateLista)
var tmpl_listatipos_compilada = compile(templateListaTipos)
var tmpl_kml_compilada = compile(templateKML);

var url = 'http://localhost:3000';
var servicio_API = new Servicio_API(url)
var servicio_Usuario = new S_Usuario(url)

document.addEventListener('DOMContentLoaded', function() {
    //document.getElementById('mensaje').innerHTML = saludar();
    loadMap();
    if(typeof(Storage) !== "undefined"){
      var token = localStorage.getItem("token");
      if(token !== null){
        obtenerPuntos(-1);        
        obtenerTipos(0);
        loadFormPuntos();
        var nombre = localStorage.getItem("nombre");
        document.getElementById("loginForm").innerHTML = `Usuario<button type="button" id="logoutButton" class="bg-danger"><i class="fas fa-sign-out-alt"></i>Exit</button>`; 
        document.getElementById("logoutButton").addEventListener('click',function(){
          localStorage.removeItem("token");
          location.reload(true);
        })       
      }else{
        document.getElementById("loginForm").innerHTML = login;
        document.getElementById("content").innerHTML="Lo siento, debes logearte";
        document.getElementById("loginButton").addEventListener('click',function(){
          var us = document.getElementById("username").value;
          var pass = document.getElementById("password").value;
          servicio_Usuario.login(us,pass).then(function(datos){
            if(datos!==undefined){
              localStorage.setItem("token",datos.code)
              location.reload(true);
            }else{
              alert("Usuario o contraseña incorrecto, por favor introduce de nuevo o registrate si eres nuevo usuario")
            }
          })
        })
        document.getElementById("registrarButton").addEventListener('click',function(){
          var us = document.getElementById("username").value;
          var pass = document.getElementById("password").value;
          servicio_Usuario.registro(us,pass).then(function(datos){
            if(datos!==undefined){       
              location.reload(true);
            }else{
              alert("Ha ocurrido un error en el registro, introduce otros credenciales");
            } 
          })
        })
      }
      
    }else{
      document.getElementById("content-left").innerHTML = "Lo siento, el navegador no soporta localstorage, por lo que algunas funciones no estaran disponibles";
    }
})

function obtenerPuntos(page){
  ActualPage+= page;
  if(ActualPage<0) ActualPage=0;
  servicio_API.obtenerPuntos(ActualPage).then(function(datos){
    var listaHTML = tmpl_lista_compilada(datos)
    document.getElementById("content-left").innerHTML = listaHTML; 
  })
}
window.obtenerPuntos = obtenerPuntos;

function obtenerTipos(page){
  ActualPageTipos += page;
  if(ActualPageTipos<0) ActualPageTipos=0;
  servicio_API.obtenerTipos(ActualPageTipos).then(function(datos){
    var listaHTML = tmpl_listatipos_compilada(datos)
    document.getElementById("content-center").innerHTML = listaHTML; 
  })
}
window.obtenerTipos = obtenerTipos;

function verDetalles(id){
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
window.verDetalles = verDetalles

function loadFormPuntos(){
  document.getElementById("content-right").innerHTML = formulario;
  document.getElementById("boton_add_item").addEventListener('click',function(){
    var name = document.getElementById("PointName").value;
    var coordx= document.getElementById("PointX").value;
    var coordy= document.getElementById("PointY").value;
    var coordz= document.getElementById("PointZ").value;
    var type= document.getElementById("Tipo").value;
    var token= localStorage.getItem("token");
    servicio_API.crearPunto(name,coordx,coordy,coordz,type,token).then(function(resp){
      obtenerPuntos(0)
    });
  })
  document.getElementById("boton_update_item").addEventListener('click',function(){
    var id = document.getElementById("PointID").value;
    var name = document.getElementById("PointName").value;
    var coordx= document.getElementById("PointX").value;
    var coordy= document.getElementById("PointY").value;
    var coordz= document.getElementById("PointZ").value;
    var type= document.getElementById("Tipo").value;
    var token= localStorage.getItem("token");
    servicio_API.actualizaPunto(id,name,coordx,coordy,coordz,type,token).then(function(resp){
      obtenerPuntos(0)
    });
    
  })
}
window.loadFormPuntos = loadFormPuntos;

function loadMap(){
  servicio_API.obtenerKML().then(function(datos){
    //console.log(datos)
    var listaHTML = tmpl_kml_compilada(datos)
    document.getElementById('map').innerHTML ="";
    //console.log(listaHTML);
    var map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([-0.5133,38.38504]),
        zoom:16 ,
        minZoom: 2,
        maxZoom: 20
      })
    });
    map.addControl(new ol.control.FullScreen());
    map.addControl(new ol.control.OverviewMap());

    var features = new ol.format.KML().readFeatures(listaHTML,{
      dataProjection:'EPSG:4326',
      featureProjection:'EPSG:3857'
    });
    
    var kmlvectorSource = new ol.source.Vector({features:features});
    var kmlvector = new ol.layer.Vector({source:kmlvectorSource});
    map.addLayer(kmlvector);
  })
  
}
window.loadMap = loadMap;
function borrarPunto(id){
  servicio_API.borrarPunto(id).then(function(datos){
    obtenerPuntos(0)
  })  
}
window.borrarPunto = borrarPunto;

function verDetallesTipo(id){
  servicio_API.getTipo(id).then(function(datos){
    alert(datos.desc)
  })
}
window.verDetallesTipo = verDetallesTipo;

function borrarTipo(id){
  servicio_API.borrarTipo(id).then(function(datos){
    obtenerTipos(0);
    obtenerPuntos(0);
    loadMap();
  })
}
window.borrarTipo = borrarTipo;