import { Component, OnInit } from '@angular/core';
import { Platform } from "@ionic/angular";
import {
  GoogleMaps,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  Marker,
  Environment,
} from "@ionic-native/google-maps";
import { Geolocation } from "@ionic-native/geolocation/ngx";

import * as common from '../common';

@Component({
  selector: "app-test",
  templateUrl: "./test.page.html",
  styleUrls: ["./test.page.scss"],
})
export class TestPage implements OnInit {
  map;
  geoCoords = { latitude: 0, longitude: 0 };
  mapCoords = { lat: 0, lng: 0 };
  bearing = 0;
  iMeasure = 0;

  constructor(public platform: Platform, private geolocation: Geolocation) {}

  ngOnInit() {
    this.doMeasureGeo();
  }

  /* Only instantiate the map AFTER the view is initialized and the DOM is accessible */
  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  doMeasure() {
    this.map.getMyLocation().then((location) => {
      this.mapCoords = location.latLng;
      this.map.setCameraTarget(location.latLng);
      this.iMeasure++;
    });
    this.bearing = this.map.getCameraBearing();


  }

  loadMap() {
    Environment.setEnv({
      // api key for server
      API_KEY_FOR_BROWSER_RELEASE: common.myGoogleApiKey,

      // api key for local development
      API_KEY_FOR_BROWSER_DEBUG: common.myGoogleApiKey,
    });

    /* The create() function will take the ID of your map element */
    this.map = GoogleMaps.create("map");

    this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
      this.map.setCameraZoom(8);
      this.map.setMyLocationButtonEnabled(true);
      this.map.setMyLocationEnabled(true);

      // setInterval(() => { 
        this.doMeasure();
      // }, 500);
    });
  }


  doMeasureGeo() { 
    this.geolocation
      .getCurrentPosition({
        // enableHighAccuracy: false,
        // timeout: 5000,
        maximumAge: 10000,
      })
      .then((resp) => {
        this.iMeasure++;
        console.log("geo=", resp.coords);
        this.geoCoords = resp.coords;
      })
      .catch((error) => {
        console.log("Error getting location", error);
      });
  }
}
