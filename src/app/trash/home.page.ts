// home.page.ts
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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
import { Geolocation } from "@ionic-native/geolocation/ngx";
import {
  DeviceOrientation,
  DeviceOrientationCompassHeading,
} from "@ionic-native/device-orientation/ngx";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  smallPreview: boolean;
  IMAGE_PATH: any;
  colorEffect = "none";
  setZoom = 1;
  flashMode = "off";
  isToBack = false;
  constructor(
    private cameraPreview: CameraPreview,
    private gyroscope: Gyroscope,
    private geolocation: Geolocation,
    private deviceOrientation: DeviceOrientation
  ) {}

  ngOnInit(): void {}

  cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.screen.width,
    height: window.screen.height,
    camera: "rear",
    tapPhoto: true,
    previewDrag: true,
    toBack: true,
    alpha: 1,
  };

  startCameraAbove() {
    // this.cameraPreview.stopCamera().then(() => {
    this.isToBack = false;
    this.cameraPreview.startCamera({
      x: 80,
      y: 450,
      width: 250,
      height: 300,
      toBack: false,
      previewDrag: true,
      tapPhoto: true,
    });
    // this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );

    // });
  }

  startCameraBelow() {
    this.cameraPreview.stopCamera().then(() => {
      this.isToBack = true;
      this.cameraPreview.startCamera({
        x: 0,
        y: 50,
        width: window.screen.width,
        height: window.screen.height,
        camera: "front",
        tapPhoto: true,
        previewDrag: false,
        toBack: true,
      });
    });
  }

  stopCamera() {
    this.cameraPreview.stopCamera();
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
          this.IMAGE_PATH = "data:image/jpeg;base64," + imageData;
        },
        (err) => {
          console.log(err);
          this.IMAGE_PATH = "assets/img/test.jpg";
        }
      );
  }

  switchCamera() {
    this.cameraPreview.switchCamera();
  }

  show() {
    this.cameraPreview.show();
  }

  hide() {
    this.cameraPreview.hide();
  }

  changeColorEffect() {
    this.cameraPreview.setColorEffect(this.colorEffect);
  }

  changeFlashMode() {
    this.cameraPreview.setFlashMode(this.flashMode);
  }

  changeZoom() {
    this.cameraPreview.setZoom(this.setZoom);
  }

  showSupportedPictureSizes() {
    this.cameraPreview.getSupportedPictureSizes().then(
      (sizes) => {
        console.log(sizes);
      },
      (err) => {
        console.log(err);
      }
    );
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

  latitude: Number;
  longitude: Number;

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

  magneticHeading: Number;
  trueHeading: Number;

  startDeviceOrientation() {
    // Get the device current compass heading
    this.deviceOrientation.getCurrentHeading().then(
      (data: DeviceOrientationCompassHeading) => {
        console.log(data);
        this.magneticHeading = data.magneticHeading;
        this.trueHeading = data.trueHeading;
      },
      (error: any) => console.log(error)
    );

    // Watch the device compass heading change
    var subscription = this.deviceOrientation
      .watchHeading({ frequency: 500 })
      .subscribe((data: DeviceOrientationCompassHeading) => {
        console.log(data);
        this.magneticHeading = data.magneticHeading;
        this.trueHeading = data.trueHeading;
      });

    // // Stop watching heading change
    // subscription.unsubscribe();
  }

  frontToBack: Number;
  leftToRight: Number;
  rotateDegrees: Number;

  startDoe() {
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", this.handleDoe.bind(this), true);
    }
  }

  handleDoe(event) {
    // alpha: rotation around z-axis
    var rotateDegrees = event.alpha;
    // gamma: left to right
    var leftToRight = event.gamma;
    // beta: front back motion
    var frontToBack = event.beta;

    window.alert(rotateDegrees + "\n" + leftToRight + "\n" + frontToBack);


    this.frontToBack = frontToBack;
    this.leftToRight = leftToRight;
    this.rotateDegrees = rotateDegrees;

  }


}
