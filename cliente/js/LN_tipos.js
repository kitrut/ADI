import {Servicio_API} from './servicios/API_puntos'
import { compile } from 'handlebars';
var url = 'http://localhost:3000';
var servicio_API = new Servicio_API(url);

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
var tmpl_listatipos_compilada = compile(templateListaTipos)
var ActualPageTipos = 0;
export default class LN_tipos{
    constructor(){
        this.tmpl_listatipos_compilada = tmpl_listatipos_compilada;
    }
    obtenerTipos(page){
        ActualPageTipos += page;
        if(ActualPageTipos<0) ActualPageTipos=0;
        servicio_API.obtenerTipos(ActualPageTipos).then(function(datos){
          var listaHTML = tmpl_listatipos_compilada(datos)
          document.getElementById("content-center").innerHTML = listaHTML; 
        })
    }
    verDetallesTipo(id){
        servicio_API.getTipo(id).then(function(datos){
          alert(datos.desc)
        })
    }
    borrarTipo(id){
        servicio_API.borrarTipo(id).then(function(datos){
            obtenerTipos(0);
            obtenerPuntos(0);
            loadMap();
        })
    }
}