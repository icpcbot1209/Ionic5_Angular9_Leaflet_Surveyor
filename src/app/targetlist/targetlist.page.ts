import { Component, OnInit } from '@angular/core';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { TargetService } from '../services/target.service';
import { Platform } from "@ionic/angular";
import { EmailComposer } from "@ionic-native/email-composer/ngx";

import * as common from '../common';

@Component({
  selector: "app-targetlist",
  templateUrl: "./targetlist.page.html",
  styleUrls: ["./targetlist.page.scss"],
})
export class TargetlistPage implements OnInit {
  constructor(
    private location: Location,
    private router: Router,
    public targetService: TargetService,
    private platform: Platform,
    public composer: EmailComposer
  ) {}

  ngOnInit() {
    this.targetService.readArrTarget(() => {});
  }

  goBack() {
    this.location.back();
  }
  navigateTo(id) {
    this.router.navigate(["/target", id]);
  }

  onClickAdd() {
    let title = window.prompt("Please enter the title:", "");
    if (title === null || title === "") {
    } else {
      this.targetService.addTarget({
        title: title,
        isMeasured: false,
        latitude: 0,
        longitude: 0,
        arrOrigin: [],
      });
    }
  }

  onClickRemove(id) {
    if (window.confirm("Remove this target?")) {
      this.targetService.removeTarget(id);
    }
  }

  sendResultEmail() {
    let arrTarget = JSON.parse(JSON.stringify(this.targetService.arrTarget));
    arrTarget.forEach((target) => {
      target.arrOrigin.forEach((origin) => {
        origin.photoUrl = "";
      });
    });
    let strContent = JSON.stringify(arrTarget);

    let mailerName = "Nick";
    let subject = "Surveyor Data";
    let to = [common.adminEmail];
    let date = new Date().toUTCString();
    let body = strContent;

    let blob = new Blob([body], { type: "text/plain" });
    let reader = new FileReader();
    reader.onloadend = () => {
      let base64data = reader.result;
      let sss: string = base64data.toString().split("base64,")[1];
      sss = `base64:surveyor.txt//` + sss;

      let attachments = [sss];

      if (this.platform.is("hybrid")) {
        // console.log(attachments);
        // alert("ok");
        this.composer.open({
          to,
          subject,
          body,
          attachments,
          isHtml: false,
        });
      } else {
        let url = `mailto:${to}?subject=${subject}&body=${body}`;
        url = url.replace(new RegExp("\n", "g"), "%0A");

        let newWindow = window.open(url);
      }
    };
    reader.readAsDataURL(blob);
  }
  
  r7 = (n) => {
    return Math.round(n * 10000000) / 10000000;
  };
}
