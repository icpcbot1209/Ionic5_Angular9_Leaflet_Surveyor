import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { TargetService } from "../services/target.service";

@Component({
  selector: "app-target",
  templateUrl: "./target.page.html",
  styleUrls: ["./target.page.scss"],
})
export class TargetPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    public targetService: TargetService
  ) {}

  id = 0;
  target = {
    title: "",
    latitude: 0,
    longitude: 0,
    height: 0,
    arrGeoT: [],
    arrH: [],
    isMeasured: false,
    arrOrigin: [],
  };

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("id")) {
        this.router.navigate(["/home"]);
        return;
      }
      this.id = Number(paramMap.get("id"));

      if (this.targetService.arrTarget.length === 0) {
        this.targetService.readArrTarget(() => {
          this.target = this.targetService.arrTarget[this.id];
        });
      } else {
        this.target = this.targetService.arrTarget[this.id];
      }

      console.log(this.target);
    });
  }

  goBack() {
    this.location.back();
  }

  onClickRemove(iOrigin) {
    if (window.confirm("Remove this Origin?")) {
      this.targetService.removeOrigin(this.id, iOrigin);
    }
  }

  isCam = false;
  onClickAdd() {
    this.isCam = true;
  }

  closeCamview() {
    this.isCam = false;
  }

  isShowMap = false;
  toggleShowMap(tf) {
    this.isShowMap = tf;
  }

  r7 = (n) => {
    return Math.round(n * 10000000) / 10000000;
  };
}
