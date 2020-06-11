import { Component, OnInit } from '@angular/core';
import {
  CameraPreview,
  CameraPreviewPictureOptions,
  CameraPreviewOptions,
  CameraPreviewDimensions,
} from "@ionic-native/camera-preview/ngx";

@Component({
  selector: "app-camview",
  templateUrl: "./camview.page.html",
  styleUrls: ["./camview.page.scss"],
})
export class CamviewPage implements OnInit {
  constructor(private cameraPreview: CameraPreview) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.startCameraAbove();
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
}
