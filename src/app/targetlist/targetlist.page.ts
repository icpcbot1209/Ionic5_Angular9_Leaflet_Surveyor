import { Component, OnInit } from '@angular/core';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-targetlist",
  templateUrl: "./targetlist.page.html",
  styleUrls: ["./targetlist.page.scss"],
})
export class TargetlistPage implements OnInit {
  constructor(private location: Location, private router:Router) {}

  ngOnInit() {}
  goBack() {
    this.location.back();
  }
  navigateTo(id) { 
    this.router.navigate(["/target", id]);
  }
}
