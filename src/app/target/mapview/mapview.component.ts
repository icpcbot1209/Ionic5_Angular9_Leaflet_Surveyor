import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { TargetService } from 'src/app/services/target.service';

@Component({
  selector: "app-mapview",
  templateUrl: "./mapview.component.html",
  styleUrls: ["./mapview.component.scss"],
})
export class MapviewComponent implements AfterViewInit {
  @Input() iTarget = 0;
  @Output() closeMapview: EventEmitter<any> = new EventEmitter();

  target;

  constructor(private targetService: TargetService) {}

  ngAfterViewInit(): void {
    this.target = this.targetService.arrTarget[this.iTarget];
    this.initMap();
  }

  private refreshMap() {
    this.target = this.targetService.arrTarget[this.iTarget];
    if (this.target.isMeasured) {
      this.setMarkerTarget(
        this.target.latitude,
        this.target.longitude,
        this.target.title
      );
    } else {
      this.setMarkerTarget(0, 0, "");
    }
  }

  setMarkerTarget(lat, lng, title) {
    if (this.markerTarget) {
      this.markerTarget.setLatLng(new L.LatLng(lat, lng));
    } else {
      let targetIcon = L.icon({
        iconUrl: "assets/target.png",
        iconSize: [30, 30], // size of the icon
        iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -15], // point from which the popup should open relative to the iconAnchor
      });
      this.markerTarget = L.marker([lat, lng], {
        title: "Target",
        icon: targetIcon,
        alt: "+",
        draggable: false,
      });
      this.markerTarget.addTo(this.map).bindTooltip(`${title}<br/>[${lat}, ${lng}]`).openTooltip();
    }
  }

  map;
  markerTarget = null;

  private initMap(): void {
    this.map = L.map("map", { attributionControl: false });
    let arrMarker = [];

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);


    let blueIcon = L.icon({
      iconUrl: "assets/marker_direction.png",
      iconSize: [30, 1080], // size of the icon
      iconAnchor: [15, 1065], // point of the icon which will correspond to marker's location
      popupAnchor: [-3, -15], // point from which the popup should open relative to the iconAnchor
    });

    this.target.arrOrigin.forEach((A, i) => {
      arrMarker.push(L.marker([A.latitude, A.longitude]));

      let mm = L.marker([A.latitude, A.longitude], {
        title: "Origin",
        icon: blueIcon,
        alt: "+",
        draggable: true,
        rotationAngle: A.heading,
      })
        .addTo(this.map)
        .on("dragend", (resp) => {
          let { lat, lng } = resp.target._latlng;
          lat = this.r6(lat);
          lng = this.r6(lng);

          mm.bindTooltip(`Origin ${i}<br/>[${lat}, ${lng}]`).openTooltip();
          this.targetService.moveOrigin(this.iTarget, i, lat, lng);
          this.refreshMap();
        });
    });
    
    if (this.target.isMeasured) {
      arrMarker.push(L.marker([this.target.latitude, this.target.longitude]));
      
      this.setMarkerTarget(
        this.target.latitude,
        this.target.longitude,
        this.target.title
      );

      this.target.arrGeoT.forEach((geoT, k) => {
        let { i, j } = this.target.arrPair[k];
        let A = this.target.arrOrigin[i];
        let B = this.target.arrOrigin[j];

        // let polygonA = L.polygon([
        //   [geoT.latitude, geoT.longitude],
        //   [A.latitude, A.longitude],
        // ]).addTo(this.map);
        // let polygonB = L.polygon([
        //   [geoT.latitude, geoT.longitude],
        //   [B.latitude, B.longitude],
        // ]).addTo(this.map);

        arrMarker.push(L.marker([geoT.latitude, geoT.longitude]));
      });

    }

    if (arrMarker.length > 1) {
      let group = L.featureGroup(arrMarker);
      this.map.fitBounds(group.getBounds());
    } else {
      if (this.target.arrOrigin.length === 0) return;
      let origin = this.target.arrOrigin[0];
      // this.map.panTo(new L.LatLng(origin.latitude, origin.longitude));
      this.map.setView([origin.latitude, origin.longitude], 17);
    }
  }

  onClickClose() {
    this.closeMapview.emit();
  }

  r6 = (n) => {
    return Math.round(n * 1000000) / 1000000;
  };
}
