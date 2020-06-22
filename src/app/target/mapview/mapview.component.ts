import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { TargetService } from 'src/app/services/target.service';

@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.scss'],
})
export class MapviewComponent implements AfterViewInit {
  @Input() iTarget = 0;
  @Output() closeMapview: EventEmitter<any> = new EventEmitter();
  map;
  target;

  constructor(private targetService:TargetService) { }

  ngAfterViewInit(): void {
    this.target = this.targetService.arrTarget[this.iTarget];
    if (this.target.isMeasured === false) return;
    this.initMap();
  }

  private initMap(): void {
    
    this.map = L.map('map', {
      center: [this.target.latitude, this.target.longitude],
      zoom: 16
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    let circleT = L.circle([this.target.latitude, this.target.longitude], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 5
    }).addTo(this.map);

    circleT.bindPopup(this.target.title);

    this.target.arrOrigin.forEach((A, i) => {
      let circleA = L.circle([A.latitude, A.longitude], {
        color: 'blue',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 5
      }).addTo(this.map);

      circleA.bindPopup(''+i);
    });

    this.target.arrGeoT.forEach((geoT, k) => { 
      let { i, j } = this.target.arrPair[k];
      let A = this.target.arrOrigin[i];
      let B = this.target.arrOrigin[j];

      let polygonA = L.polygon([
        [geoT.latitude, geoT.longitude],
        [A.latitude, A.longitude]
      ]).addTo(this.map);
      let polygonB = L.polygon([
        [geoT.latitude, geoT.longitude],
        [B.latitude, B.longitude]
      ]).addTo(this.map);

    });

  }


  onClickClose() { 
    this.closeMapview.emit();
  }
}
