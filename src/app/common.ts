import * as geolib from "geolib";

export const ALPHA_EPS = 0.1;

// Tested on Google Map
export const doCalc = (
  geo_A = { latitude: 0, longitude: 0 },
  geo_B = { latitude: 0, longitude: 0 },
  azi_AT = 0,
  azi_BT = 0,
  isTesting = true
) => {
  //input
  if (isTesting) {
    geo_A = { latitude: 40.692715, longitude: -74.056446 };
    geo_B = { latitude: 40.697667, longitude: -74.042479 };

    azi_AT = 110.6;
    azi_BT = 190.3;
  }

  // pre compute
  let azi_AB = geolib.getRhumbLineBearing(geo_A, geo_B);
  let azi_BA = Math.abs(180 + azi_AB);
  let alpha_A = Alpha_Triangle(azi_AB - azi_AT);
  let alpha_B = Alpha_Triangle(azi_BA - azi_BT);
  let alpha_T = Alpha_Triangle(180 - alpha_A - alpha_B);

  console.log("alpha_A = ", alpha_A);
  console.log("alpha_B = ", alpha_B);
  console.log("alpha_T = ", alpha_T);

  // validation
  if (
    alpha_A < ALPHA_EPS ||
    alpha_B < ALPHA_EPS ||
    alpha_T < ALPHA_EPS
  ) {
    return null;
  }

  // geo_A, geo_B => len_AB
  let len_AB = geolib.getDistance(geo_A, geo_B, 1);
  console.log("len_AB = ", len_AB);

  // len_AB, alpha_T, alpha_B => len_AT
  let len_AT =
    (len_AB * Math.sin((alpha_B * Math.PI) / 180)) /
    Math.sin((alpha_T * Math.PI) / 180);
  console.log("len_AT = ", len_AT);

  // geo_A, azi_AT, len_AT => geo_T
  let geo_T = geolib.computeDestinationPoint(geo_A, len_AT, azi_AT);

  // return geo_T;
  return geo_T;
};


const Alpha_Triangle = (alpha) => {
  while (alpha < 0) alpha += 360;
  while (alpha >= 180) alpha = 360 - alpha;
  return alpha;
}

export const getCenter = (arr) => { 
  return geolib.getCenter(arr);
}



