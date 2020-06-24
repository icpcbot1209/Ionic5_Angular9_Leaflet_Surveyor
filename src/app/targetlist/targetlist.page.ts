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

  navigateTo(id) {
    this.router.navigate(["/target", id]);
  }

  onClickEdit(evennt, id) {
    event.stopPropagation();
    this.navigateTo(id);
  }

  onClickAdd() {
    this.targetService.addTarget({
      title: "New Target",
      isMeasured: false,
      latitude: 0,
      longitude: 0,
      arrOrigin: [],
    });

    this.navigateTo(this.targetService.arrTarget.length - 1);
  }

  onClickRemove() {
    if (window.confirm("Confirm Remove?")) {

      // this.targetService.removeTarget(id);
      this.targetService.removeTargets(this.arrIdHold);
      this.arrIdHold = [];
    }
  }

  sendResultEmail() {
    let arrTarget = [];
    this.targetService.arrTarget.forEach((target, i) => {
      if (this.arrIdHold.includes(i)) {
        let tt = JSON.parse(JSON.stringify(target));
        tt.arrOrigin.forEach((origin) => {
          origin.photoUrl = "";
        });
        arrTarget.push(tt);
      }
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

    this.arrIdHold = [];
  }

  arrIdHold=[];
  toggleHold(id) {
    let k = this.arrIdHold.findIndex((x)=>x===id);
    if (k < 0) {
      this.arrIdHold.push(id);
    } else {
      this.arrIdHold.splice(k, 1);
    }
  }

  isHold(id: number) {
    return this.arrIdHold.includes(id);
  }

  r7 = (n) => {
    return Math.round(n * 10000000) / 10000000;
  };
}
