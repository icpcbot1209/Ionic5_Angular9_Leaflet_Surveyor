import { Component, OnInit } from '@angular/core';
import {
  CameraPreview,
  CameraPreviewPictureOptions,
  CameraPreviewOptions,
  CameraPreviewDimensions,
} from "@ionic-native/camera-preview/ngx";

import {
  Gyroscope,
  GyroscopeOrientation,
  GyroscopeOptions,
} from "@ionic-native/gyroscope/ngx";

@Component({
  selector: "app-camview",
  templateUrl: "./camview.page.html",
  styleUrls: ["./camview.page.scss"],
})
export class CamviewPage implements OnInit {
  constructor(
    private cameraPreview: CameraPreview,
    private gyroscope: Gyroscope
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.startCameraAbove();
    this.startGyroscope();
  }

  cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 100,
    width: window.screen.width,
    height: window.screen.height,
    camera: "front",
    // tapPhoto: true,
    previewDrag: true,
    toBack: true,
    alpha: 1,
  };
  
  
  startCameraAbove() {
    this.cameraPreview.startCamera(this.cameraPreviewOpts);
  }


  x: Number;
  y: Number;
  z: Number;

  startGyroscope() {
    let options: GyroscopeOptions = {
      frequency: 1000,
    };

    this.gyroscope
      .getCurrent(options)
      .then((orientation: GyroscopeOrientation) => {
        console.log(
          orientation.x,
          orientation.y,
          orientation.z,
          orientation.timestamp
        );
        this.x = orientation.x;
        this.y = orientation.y;
        this.z = orientation.z;
      })
      .catch();

    this.gyroscope.watch().subscribe((orientation: GyroscopeOrientation) => {
      console.log(
        orientation.x,
        orientation.y,
        orientation.z,
        orientation.timestamp
      );
      
      this.x = orientation.x;
      this.y = orientation.y;
      this.z = orientation.z;
    });
  }
}
