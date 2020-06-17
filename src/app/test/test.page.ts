import { Component, OnInit } from '@angular/core';
import * as common from "../common";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-test",
  templateUrl: "./test.page.html",
  styleUrls: ["./test.page.scss"],
})
export class TestPage implements OnInit {
  constructor(private storage: Storage) {}

  ngOnInit() {
    this.testMath();
    this.testStorage();
  }

  testMath() { 
    let { latitude, longitude } = common.doCalc();
    console.log(latitude + ", " + longitude);
  }

  testStorage() { 
    this.storage.set("name", "Max");
    this.storage.set("age", "28");

    // Or to get a key/value pair
    this.storage.get("age").then((val) => {
      console.log("Your age is", val);
    });
  }

}
