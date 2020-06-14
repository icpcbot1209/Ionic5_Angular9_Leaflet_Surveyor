import { Component, OnInit } from '@angular/core';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";

@Component({
  selector: "app-targetlist",
  templateUrl: "./targetlist.page.html",
  styleUrls: ["./targetlist.page.scss"],
})
export class TargetlistPage implements OnInit {
  constructor(private location: Location) {}

  ngOnInit() {}
  goBack() {
    this.location.back();
  }
}
