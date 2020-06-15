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
import { Geolocation } from "@ionic-native/geolocation/ngx";

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
    private targetService: TargetService,
    private geolocation: Geolocation
  ) {}

  ngOnInit() {}

  isCamera: boolean = false;

  ionViewDidEnter() {
    this.startCameraBelow();

    setInterval(() => {
      this.rotateDegrees = r3(this.alpha);
      this.frontToBack = r3(this.beta);
      this.leftToRight = r3(this.gamma);
    }, 100);

    this.startGeolocation();
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
      this.startDoe();
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
          this.targetService.alpha = this.alpha;
          this.targetService.beta = this.beta;
          this.targetService.gamma = this.gamma;
          this.targetService.latitude = this.latitude;
          this.targetService.longitude = this.longitude;
          this.goBack();
        },
        (err) => {
          console.log(err);
          this.targetService.photo_url = "assets/surveyor.png";
          this.goBack();
        }
      );
  }

  frontToBack = 0;
  leftToRight = 0;
  rotateDegrees = 0;
  alpha = 0;
  beta = 0;
  gamma = 0;

  startDoe() {
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", this.handleDoe(), true);
    }
  }

  handleDoe() {
    return (event) => {
      // alpha: rotation around z-axis
      this.alpha = event.alpha;
      // beta: front back motion
      this.beta = event.beta;
      // gamma: left to right
      this.gamma = event.gamma;
      // window.alert(rotateDegrees + "\n" + leftToRight + "\n" + frontToBack);
    };
  }


  latitude = 0;
  longitude = 0;

  startGeolocation() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.latitude = r3(resp.coords.latitude);
        this.longitude = r3(resp.coords.longitude);
      })
      .catch((error) => {
        console.log("Error getting location", error);
      });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      this.latitude = r3(data.coords.latitude);
      this.longitude = r3(data.coords.longitude);
    });
  }


}


const r3 = (n) => {

    return Math.round(n * 1000) / 1000;

}