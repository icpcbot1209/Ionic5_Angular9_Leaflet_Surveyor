import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from "@angular/core";
import * as L from "leaflet";
import "leaflet-rotatedmarker";
import { TargetService } from "src/app/services/target.service";
    
@Component({
  selector: "app-editmap",
  templateUrl: "./editmap.component.html",
  styleUrls: ["./editmap.component.scss"],
})
export class EditmapComponent implements AfterViewInit {
  @Input() iTarget = 0;
  @Input() iOrigin = 0;
  @Output() doClose: EventEmitter<any> = new EventEmitter();
  map;
  target;
  origin;

  constructor(private targetService: TargetService) {}

  ngAfterViewInit(): void {
    this.target = this.targetService.arrTarget[this.iTarget];
    this.origin = this.target.arrOrigin[this.iOrigin];
    this.initMap();
  }

  onClickClose() {
    this.doClose.emit();
  }

  initMap() {
    this.map = L.map("map", {
      center: [this.origin.latitude, this.origin.longitude],
      zoom: 17,
    });

    const tiles = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);

    let blueIcon = L.icon({
      iconUrl: "assets/marker.png",
      iconSize: [60, 60], // size of the icon
      iconAnchor: [30, 50], // point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });

    let myMarker = L.marker([this.origin.latitude, this.origin.longitude], {
      title: "Origin",
      icon: blueIcon,
      alt: "+",
      draggable: true,
      rotationAngle: this.origin.heading,
    })
      .addTo(this.map)
      .on("dragend", () => {
        let { lat, lng } = myMarker.getLatLng();
        lat = this.r6(lat);
        lng = this.r6(lng);

        myMarker.bindTooltip(`[${lat}, ${lng}]`).openTooltip();
        this.moveOrigin(lat, lng);
      });

    let { lat, lng } = myMarker.getLatLng();
    lat = this.r6(lat);
    lng = this.r6(lng);
    myMarker
      .bindTooltip("Drag to change location.<br/>" + `[${lat}, ${lng}]`, {
        opacity: 0.8,
        direction: "bottom",
        offset: L.point(0, 50),
        sticky: false,
      })
      .openTooltip();
    // myMarker.setRotationAngle(newAngle);
  }

  r6 = (n) => {
    return Math.round(n * 1000000) / 1000000;
  };

  moveOrigin(lat, lng) {
    this.targetService.moveOrigin(this.iTarget, this.iOrigin, lat, lng);
  }
}
