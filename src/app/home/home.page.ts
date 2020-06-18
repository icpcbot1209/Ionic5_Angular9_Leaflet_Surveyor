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

    // read arrTarget
    this.targetService.readArrTarget(() => {
      console.log(this.targetService.arrTarget);
    });
  }
}

