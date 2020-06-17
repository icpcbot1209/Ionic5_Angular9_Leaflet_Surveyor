import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import { TargetService } from '../services/target.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  constructor(
    private router: Router,
    private screenOrientation: ScreenOrientation,
    private targetService: TargetService
  ) {}

  ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

    this.initAppData();
  }

  onClickStart() {
    this.router.navigate(["/targetlist"]);
  }

  initAppData() {
    // test only
    this.targetService.addTarget(arr_target[0]);
    this.targetService.saveArrTarget();

    // read arrTarget
    this.targetService.readArrTarget(() => {
      console.log(this.targetService.arrTarget);
    });
  }
}


const arr_target = [
  {
    title: "Statue of Liberty",
    isMeasured: true,
    latitude: 40.689371,
    longitude: -74.04449,
    height: 93,
    arrOrigin: [
      {
        title: "At the Flag Plazza",
        photoUrl: "",
        timestamp: "",
        latitude: 40.693054,
        longitude: -74.056314,
        heading: 110.6,
        alpha: 0,
        beta: 0,
        gamma: 0
      },
      {
        title: "At the Hostpital Morge",
        photoUrl: "",
        timestamp: "",
        latitude: 40.697999,
        longitude: -74.042324,
        heading: 190.3,
        alpha: 0,
        beta: 0,
        gamma: 0
      }
    ],
  },
];