import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from "@angular/router";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { TargetService } from "../services/target.service";
import * as common from '../common';

@Component({
  selector: "app-target",
  templateUrl: "./target.page.html",
  styleUrls: ["./target.page.scss"],
})
export class TargetPage implements OnInit {
  r6 = common.r6;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private platform: Platform,
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
    });

    this.platform.backButton.subscribeWithPriority(20, (processNextHandler) => { 
      if (this.isCam || this.isShowMap || this.isEditMap) {
        
      } else {
        processNextHandler();
      }
    });
  }

  editTitle() {
    let title = window.prompt("Please enter the title:", "");
    if (title === null || title === "") {
    } else {
      this.targetService.editTitle(this.id, title);
    }
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

  isEditMap = false;
  iOrigin = 0;
  onClickEditOrigin(iOrigin) {
    this.iOrigin = iOrigin;
    this.toggleEditmap(true);
  }
  toggleEditmap(tf) {
    this.isEditMap = tf;
  }
}
