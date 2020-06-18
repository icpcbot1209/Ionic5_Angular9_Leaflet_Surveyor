import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

import * as common from "../common";
import { flushMicrotasks } from '@angular/core/testing';

@Injectable({
  providedIn: "root",
})
export class TargetService {
  constructor(private storage: Storage) { }

  arrTarget = [];

  readArrTarget(callback) {
    this.storage.get("arrTarget").then((val) => {
      this.arrTarget = JSON.parse(val);
      callback();
    });
  }

  saveArrTarget() { 
    let val = JSON.stringify(this.arrTarget);
    this.storage.set("arrTarget", val);
  }

  addTarget(target) {
    this.arrTarget = [target, ...this.arrTarget];
    this.saveArrTarget();
  }

  removeTarget(i) {
    let len = this.arrTarget.length;
    this.arrTarget = [...this.arrTarget.slice(0, i), ...this.arrTarget.slice(i + 1, len)];
    this.saveArrTarget();
  }

  addOrigin(iTarget, origin) {
    this.arrTarget[iTarget].arrOrigin.push(origin);
    this.doCalc(iTarget);
    this.saveArrTarget();
  }

  removeOrigin(iTarget, iOrigin) {
    this.arrTarget[iTarget].arrOrigin.splice(iOrigin, 1);
    this.doCalc(iTarget);
    this.saveArrTarget();
  }

  doCalc(iTarget) {
    let arrGeoT = [];
    let arrH = [];

    let target = this.arrTarget[iTarget];
    let len = target.arrOrigin.length;
    if (len < 2) return;
    let flag = [];
    for (let i = 0; i < len; i++) {
      let row = [];
      for (let j = 0; j < len; j++) row.push(false);
      flag.push(row);
    }
    
    for (let i = 0; i < len; i++){
      for (let j = 0; j < len; j++){
        if (i==j || flag[i][j]) continue;
        flag[i][j] = true;
        flag[j][i] = true;
        let A = target.arrOrigin[i];
        let B = target.arrOrigin[j];

        let geo_A = {latitude: A.latitude, longitude: A.longitude };
        let geo_B = { latitude: B.latitude, longitude: B.longitude };
        let azi_AT = A.heading;
        let azi_BT = B.heading;

        // alert(i+", "+j);
        let geo_T = common.doCalc(geo_A, geo_B, azi_AT, azi_BT, false);
        arrGeoT.push(geo_T);

        let L1 = common.distance(geo_A, geo_T);
        let H1 = L1 * Math.tan(common.deg2rad(A.elevation));
        let L2 = common.distance(geo_B, geo_T);
        let H2 = L2 * Math.tan(common.deg2rad(B.elevation));

        arrH.push(H1);
        arrH.push(H2);
      }
    }
  
    let geo_T = common.getCenter(arrGeoT);
    let H = 0;
    arrH.forEach((h) => (H += h));
    if (arrH.length > 0) H /= arrH.length;


    if (geo_T !== false) {
      this.arrTarget[iTarget].latitude = geo_T.latitude;
      this.arrTarget[iTarget].longitude = geo_T.longitude;
      this.arrTarget[iTarget].height = H;
      this.arrTarget[iTarget].isMeasured = true;
      this.saveArrTarget();
    }

  }



}
