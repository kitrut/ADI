//Archivo "main.js"
import {Servicio_API} from './servicios/API_puntos.js'
import {S_Usuario} from './servicios/API_usuarios.js'
import LN_puntos from './LN_puntos';
import LN_tipos from './LN_tipos';
import Mapa from './Mapa'

var Punto = new LN_puntos();
var Tipo = new LN_tipos();
var Mapa1 = new Mapa();
window.verDetalles = Punto.verDetalles;
window.obtenerPuntos = Punto.obtenerPuntos;
window.loadFormPuntos = Punto.loadFormPuntos;
window.borrarPunto = Punto.borrarPunto;
window.obtenerTipos = Tipo.obtenerTipos;
window.verDetallesTipo=Tipo.verDetallesTipo;
window.borrarTipo = Tipo.borrarTipo;
window.loadMap = Mapa1.loadMap;

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

var url = 'http://localhost:3000';
var servicio_Usuario = new S_Usuario(url)

document.addEventListener('DOMContentLoaded', function() {
    //document.getElementById('mensaje').innerHTML = saludar();
    Mapa1.loadMap();
    if(typeof(Storage) !== "undefined"){
      var token = localStorage.getItem("token");
      if(token !== null){
        Punto.obtenerPuntos(-1);
        Tipo.obtenerTipos(0);
        Punto.loadFormPuntos();
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