import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";

import {
  CameraPreview,
  CameraPreviewPictureOptions,
  CameraPreviewOptions,
  CameraPreviewDimensions,
} from "@ionic-native/camera-preview/ngx";

import { TargetService } from '../services/target.service';

@Component({
  selector: "app-camera-view",
  templateUrl: "./camera-view.page.html",
  styleUrls: ["./camera-view.page.scss"],
})
export class CameraViewPage implements OnInit {
  constructor(
    private cameraPreview: CameraPreview,
    private location: Location,
    private targetService: TargetService
  ) {}

  ngOnInit() {}

  isCamera: boolean = false;

  ionViewDidEnter() {
    this.startCameraBelow();
  }

  ionViewWillLeave() {
    try {
      this.stopCamera();
    } catch (err) {
      console.log(err);
    }
  }

  onClickCancel() {
    this.goBack();
  }

  goBack() {
    this.location.back();
  }

  async startCameraBelow() {
    try {
      await this.stopCamera();
      await this.cameraPreview.startCamera({
        x: 0,
        y: 0,
        width: window.screen.width,
        height: window.screen.height,
        camera: "front",
        tapPhoto: true,
        previewDrag: false,
        toBack: true,
      });

      this.isCamera = true;
    } catch (err) {
      console.log(err);
    }
  }

  stopCamera() {
    this.cameraPreview.stopCamera();
    this.isCamera = false;
  }

  setZoom = 1;
  changeZoom() {
    this.cameraPreview.setZoom(this.setZoom);
  }

  takePicture() {
    this.cameraPreview
      .takePicture({
        width: 1280,
        height: 1280,
        quality: 85,
      })
      .then(
        (imageData) => {
          this.targetService.photo_url = "data:image/jpeg;base64," + imageData;
          this.goBack();
        },
        (err) => {
          console.log(err);
          this.targetService.photo_url = "assets/surveyor.png";
          this.goBack();
        }
      );
  }
}
