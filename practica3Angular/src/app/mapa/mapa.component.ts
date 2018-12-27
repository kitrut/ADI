import { Component, OnInit } from '@angular/core';

import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import {defaults as defaultControls, FullScreen, OverviewMap} from 'ol/control.js';

import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;

  constructor() { }

  ngOnInit() {
    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.layer = new OlTileLayer({
      source: this.source
    });

    this.view = new OlView({
      center: fromLonLat([-0.5133,38.38504]),
      zoom:16 ,
      minZoom: 2,
      maxZoom: 20
    });

    this.map = new OlMap({
      controls: defaultControls().extend([
        new FullScreen(),
        new OverviewMap()
      ]),
      target: 'map',
      layers: [this.layer],
      view: this.view
    });

    //this.map.addControl(new ol.control.FullScreen());
    //this.map.addControl(new ol.control.OverviewMap());
  }

}
