import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import { TargetService } from '../services/target.service';
import { GeolocService } from '../services/geoloc.service';

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
    private geolocService: GeolocService
  ) {}

  timer;

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.initAppData();
  }

  ionViewWillLeave() { 
    try {
      clearTimeout(this.timer);
    } catch (err) {
      console.log(err);
    }
  }

  onClickStart() {
    try { clearTimeout(this.timer); } catch (err) { console.log(err);}
    this.router.navigate(["/targetlist"]);
  }

  initAppData() {
    // read arrTarget
    this.targetService.readArrTarget(() => {
      this.timer = setTimeout(() => {
        this.router.navigate(["/targetlist"]);
      }, 3000);
    });
    this.geolocService.startGeolocation();
  }
}

