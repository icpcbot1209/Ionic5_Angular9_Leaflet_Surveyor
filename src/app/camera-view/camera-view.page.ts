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

import {
  DeviceOrientation,
  DeviceOrientationCompassHeading,
} from "@ionic-native/device-orientation/ngx";

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
    private geolocation: Geolocation,
    private deviceOrientation: DeviceOrientation
  ) {}

  ngOnInit() {}

  isCameraOn: boolean = false;

  ionViewDidEnter() {
    this.startCameraBelow();

    setInterval(() => {
      this.alpha1 = r3(this.alpha);
      this.beta1 = r3(this.beta);
      this.gamma1 = r3(this.gamma);
    }, 100);

    this.startGeolocation();

    this.startDeviceOrientationLooking();
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
        width: window.innerWidth,
        height: window.innerHeight,
        camera: "front",
        tapPhoto: true,
        previewDrag: false,
        toBack: true,
      });
      this.startDoe();
      this.isCameraOn = true;
    } catch (err) {
      console.log(err);
    }
  }

  stopCamera() {
    this.cameraPreview.stopCamera();
    this.isCameraOn = false;
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
          // this.targetService.photo_url = "data:image/jpeg;base64," + imageData;
          // this.targetService.alpha = this.alpha;
          // this.targetService.beta = this.beta;
          // this.targetService.gamma = this.gamma;
          // this.targetService.latitude = this.latitude;
          // this.targetService.longitude = this.longitude;
          // this.targetService.magneticHeading = this.magneticHeading;
          // this.targetService.trueHeading = this.trueHeading;
          
          this.goBack();
        },
        (err) => {
          console.log(err);
          // this.targetService.photo_url = "assets/surveyor.png";
          this.goBack();
        }
      );
  }

  alpha1 = 0;
  beta1 = 0;
  gamma1 = 0;

  alpha = 0;
  beta = 0;
  gamma = 0;

  startDoe() {
    if (window.DeviceOrientationEvent) {
      // window.addEventListener("deviceorientation", this.handleDoe(), true);
      window.addEventListener(
        "deviceorientationabsolute",
        this.handleDoe(),
        true
      );
    }

    window.addEventListener(
      "compassneedscalibration",
      function (event) {
        alert(
          "Your compass needs calibrating! Wave your device in a figure-eight motion"
        );
        event.preventDefault();
      },
      true
    );

  }

  calibrate() { 
    window.dispatchEvent(new Event("compassneedscalibration"));
  }

  handleDoe() {
    return (event) => {
      // console.log(event);
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
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
      })
      .catch((error) => {
        console.log("Error getting location", error);
      });
      
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      this.latitude = data.coords.latitude;
      this.longitude = data.coords.longitude;
    });
  }

  magneticHeading = 0;
  trueHeading = 0;

  startDeviceOrientationLooking() {
    // Get the device current compass heading
    this.deviceOrientation
      .getCurrentHeading()
      .then((data: DeviceOrientationCompassHeading) => {
        // alert(data.magneticHeading+"|"+data.trueHeading);
        console.log('accuracy = ', data.headingAccuracy);
        this.magneticHeading = data.magneticHeading;
        this.trueHeading = data.trueHeading;
      },
        (error: any) => console.log(error)
      );

    // Watch the device compass heading change
    var subscription = this.deviceOrientation
      .watchHeading()
      .subscribe(
        (
          data: DeviceOrientationCompassHeading
        ) => {
          console.log("accuracy = ", data.headingAccuracy);
          this.magneticHeading = data.magneticHeading;
          this.trueHeading = data.trueHeading;
        }
      );

    // // Stop watching heading change
    // subscription.unsubscribe();
  }

}


const r3 = (n) => {
    return Math.round(n * 1000) / 1000;
}