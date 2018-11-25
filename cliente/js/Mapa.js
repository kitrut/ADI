import {Servicio_API} from './servicios/API_puntos'
import { compile } from 'handlebars';
var url = 'http://localhost:3000';
var servicio_API = new Servicio_API(url);
var templatePlacemark =`
<Placemark>
  <name>{{name}}</name>
  <description>El tipo de punto es:{{type}} y su nombre {{name}}</description>
  <styleUrl>#{{icon}}</styleUrl>
  <Point>
    <coordinates>{{coordX}},{{coordY}},{{coordZ}}</coordinates>
  </Point>
</Placemark>`

var templateKML =`
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document><name>Mapa</name>
  <Style id="ic_accessible_elevator"><IconStyle><Icon><href>http://localhost:3000/files/ic_accessible_elevator.png</href><scale>0.2</scale></Icon></IconStyle></Style>';
  <Style id="ic_accessible_park"><IconStyle><Icon><href>http://localhost:3000/files/ic_accessible_park.png</href><scale>0.2</scale></Icon></IconStyle></Style>';
  <Style id="ic_accessible_wc"><IconStyle><Icon><href>http://localhost:3000/files/ic_accessible_wc.png</href><scale>0.2</scale></Icon></IconStyle></Style>';
  {{#.}}
    ${templatePlacemark}
  {{/.}}
  </Document></kml>
`
var tmpl_kml_compilada = compile(templateKML);

export default class Mapa{
    constructor(){

    }
    loadMap(){
        servicio_API.obtenerKML().then(function(datos){
          var listaHTML = tmpl_kml_compilada(datos)
          document.getElementById('map').innerHTML ="";
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
      
          var features = new ol.format.KML({
            showPointNames: false,
            extractAttributes: true
        }).readFeatures(listaHTML,{
            dataProjection:'EPSG:4326',
            featureProjection:'EPSG:3857'
          });
          
          var kmlvectorSource = new ol.source.Vector({features:features});
          var kmlvector = new ol.layer.Vector({source:kmlvectorSource});
          map.addLayer(kmlvector);
          map.on('click', function(evt) {
            var pixel = evt.pixel;
            var features = [];
            map.forEachFeatureAtPixel(pixel, function(feature) {
                features.push(feature);
            });
            if (features.length > 0) {
                var coordinate = features[0].getGeometry().getFirstCoordinate();
                if (features[0].get("features") && features[0].get("features").length > 1) {
                    map.getView().setZoom(map.getView().getZoom()+1);
                } else { 
                  alert(features[0].get("description"));
                }
            }
        });
        })
        
      }
}