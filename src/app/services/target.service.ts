import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root",
})
export class TargetService {
  constructor() {}
  photo_url = "";
  alpha = 0;
  beta = 0;
  gamma = 0;
  latitude = 0;
  longitude = 0;
}
