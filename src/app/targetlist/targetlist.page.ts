import { Component, OnInit } from '@angular/core';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { TargetService } from '../services/target.service';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: "app-targetlist",
  templateUrl: "./targetlist.page.html",
  styleUrls: ["./targetlist.page.scss"],
})
export class TargetlistPage implements OnInit {
  constructor(private location: Location, private router:Router, public targetService: TargetService) {}

  ngOnInit() {
    if (this.targetService.arrTarget.length === 0) {
      this.targetService.readArrTarget(() => {
      });
    }
  }

  goBack() {
    this.location.back();
  }
  navigateTo(id) { 
    this.router.navigate(["/target", id]);
  }

  onClickAdd() { 
    let title = window.prompt("Please enter the title:", "");
    if (title === null || title === "") {
    } else {
      this.targetService.addTarget({
        title: title,
        isMeasured: false,
        latitude: 0,
        longitude: 0,
        arrOrigin: []
      });
    }
  }

  onClickRemove(id) {
    if (window.confirm("Remove this target?")) {
      this.targetService.removeTarget(id);
    }
  }

}
