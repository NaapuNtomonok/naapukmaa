import { Component, OnInit } from '@angular/core';

import {
  latLng,
  Map,
  marker,
  Icon,
  icon,
  tileLayer,
  circle,
  polygon,
} from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'naapukMaa';
  showAddEvent = false;
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 10,
    center: latLng(46.879966, -121.726909),
  };
  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 18, attribution: '...' }
      ),
      'Open Cycle Map': tileLayer(
        'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
        { maxZoom: 18, attribution: '...' }
      ),
    },
    overlays: {
      'Big Circle': circle([46.95, -122], { radius: 5000 }),
      'Big Square': polygon([
        [46.8, -121.55],
        [46.9, -121.55],
        [46.9, -121.7],
        [46.8, -121.7],
      ]),
    },
  };
  ngOnInit() {}
  addEvent() {
    this.showAddEvent = !this.showAddEvent;
  }
  onMapReady(map: Map) {
    // Do stuff with map
    // Map canvas click event to get feature attributes of selected overlay from navbar
    map.on('click', <LeafletMouseEvent>(e: any) => {
      const makerss = marker([e.latlng.lat, e.latlng.lng], {
        icon: icon({
          ...Icon.Default.prototype.options,
          iconUrl: '/assets/images/marker-icon.gif',
          iconRetinaUrl: '/assets/images/marker-icon.gif',
          shadowUrl: '',
        }),
      });
      makerss.addTo(map);
    });
  }
}
