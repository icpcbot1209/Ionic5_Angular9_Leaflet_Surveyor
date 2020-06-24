import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import { TargetService } from '../services/target.service';
import { GeolocService } from '../services/geoloc.service';
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { LocationAccuracy } from "@ionic-native/location-accuracy/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  constructor(
    private router: Router,
    private screenOrientation: ScreenOrientation,
    private targetService: TargetService,
    private geolocService: GeolocService,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private geolocation: Geolocation,
    private platform: Platform
  ) {}

  ngOnInit() {
    if (this.platform.is("hybrid")) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.checkGPSPermission();
    } else {
      this.initAppData();
    }

  }

  //Check if application having GPS access permission
  checkGPSPermission() {
    this.androidPermissions
      .checkPermission(
        this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
      )
      .then(
        (result) => {
          if (result.hasPermission) {
            //If having permission show 'Turn On GPS' dialogue
            this.askToTurnOnGPS();
          } else {
            //If not having permission ask for permission
            this.requestGPSPermission();
          }
        },
        (err) => {
          alert(err);
        }
      );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions
          .requestPermission(
            this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
          )
          .then(
            () => {
              console.log("ACCESS_COARSE_LOCATION");
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            (error) => {
              //Show alert if user click on 'No Thanks'
              alert(
                "requestPermission Error requesting location permissions " +
                  error
              );
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy
      .request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
      .then(
        () => {
          console.log("REQUEST_PRIORITY_HIGH_ACCURACY");
          // When GPS Turned ON call method to get Accurate location coordinates
          this.initAppData();
        },
        (error) =>
          alert(
            "Error requesting location permissions " + JSON.stringify(error)
          )
      );
  }

  loadText = "Loading";

  initAppData() {
    // read arrTarget
    this.loadText = "Loading app data";

    this.targetService.readArrTarget(() => {
      this.loadText = "Getting location data";

      this.geolocService.startGeolocation(() => {
        this.loadText = "";
        this.router.navigate(["/targetlist"]);
      });
    });
  }

  onClickPage() { 
    if(this.geolocService.isGeoLoaded)this.router.navigate(["/targetlist"]);
  }
}

