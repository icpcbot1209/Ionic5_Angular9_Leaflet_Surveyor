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

    this.map = L.map('map');
    let arrMarker = [];
    arrMarker.push(L.marker([this.target.latitude, this.target.longitude]));

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    let targetIcon = L.icon({
      iconUrl: "assets/target.png",
      iconSize: [30, 30], // size of the icon
      iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
      popupAnchor: [-3, -15], // point from which the popup should open relative to the iconAnchor
    });
    L.marker([this.target.latitude, this.target.longitude], {
      title: "Target",
      icon:targetIcon,
      alt: "+",
      draggable: false
    }).addTo(this.map).bindPopup(this.target.title);

    let blueIcon = L.icon({
      iconUrl: "assets/marker.png",
      iconSize: [30, 30], // size of the icon
      iconAnchor: [15, 25], // point of the icon which will correspond to marker's location
      popupAnchor: [-3, -15], // point from which the popup should open relative to the iconAnchor
    });

    this.target.arrOrigin.forEach((A, i) => {
      L.marker([A.latitude, A.longitude], {
        title: "Origin",
        icon: blueIcon,
        alt: "+",
        draggable: false,
        rotationAngle: A.heading,
      }).addTo(this.map).bindPopup(''+i);
    });

    this.target.arrGeoT.forEach((geoT, k) => { 
      let { i, j } = this.target.arrPair[k];
      let A = this.target.arrOrigin[i];
      let B = this.target.arrOrigin[j];

      let polygonA = L.polygon([
        [geoT.latitude, geoT.longitude],
        [A.latitude, A.longitude],
      ]).addTo(this.map);
      let polygonB = L.polygon([
        [geoT.latitude, geoT.longitude],
        [B.latitude, B.longitude],
      ]).addTo(this.map);

      arrMarker.push(L.marker([geoT.latitude, geoT.longitude]));
      arrMarker.push(L.marker([A.latitude, A.longitude]));
      arrMarker.push(L.marker([B.latitude, B.longitude]));

    });
    
    let group = L.featureGroup(arrMarker);
    this.map.fitBounds(group.getBounds());
  }


  onClickClose() { 
    this.closeMapview.emit();
  }
}
