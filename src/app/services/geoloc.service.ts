import { Injectable } from '@angular/core';
import { Geolocation } from "@ionic-native/geolocation/ngx";

@Injectable({
  providedIn: "root",
})
export class GeolocService {
  constructor(private geolocation: Geolocation) {}

  isGeoLoaded = false;
  latitude = 0;
  longitude = 0;
  processGeo = null;
  startGeolocation() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.isGeoLoaded = true;
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
      })
      .catch((error) => {
        console.log("Error getting location", error);
      });

    this.processGeo = this.geolocation.watchPosition();
    this.processGeo.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      this.latitude = data.coords.latitude;
      this.longitude = data.coords.longitude;
    });
  }

  async stopGeolocation() {
    await this.processGeo.unsubscribe();
  }
}
