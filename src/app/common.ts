import * as geolib from "geolib";

export const myGoogleApiKey = "AIzaSyDqJYTKHdC11avQQ4EPlt8m4OoSZ_N6JUw";

export const adminEmail = "icpcbot1209@gmail.com";
export const r6 = (n) => {
  return Math.round(n * 1000000) / 1000000;
};

export const arr_target = [
  {
    title: "Statue of Liberty",
    isMeasured: true,
    latitude: 40.689371,
    longitude: -74.04449,
    height: 93,
    arrOrigin: [
      {
        photoUrl: "",
        timestamp: "",
        latitude: 40.693054,
        longitude: -74.056314,
        heading: 110.6,
        alpha: 0,
        beta: 0,
        gamma: 0,
      },
      {
        photoUrl: "",
        timestamp: "",
        latitude: 40.697999,
        longitude: -74.042324,
        heading: 190.3,
        alpha: 0,
        beta: 0,
        gamma: 0,
      },
    ],
    arrPair: [{ i: 0, j: 1 }],
    arrGeoT: [{ latitude: 40.689371, longitude: -74.04449 }],
  },
];

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
  let azi_BA = geolib.getRhumbLineBearing(geo_B, geo_A);
  let alpha_A = azi_AT - azi_AB;
  let alpha_B = azi_BA - azi_BT;

  while (alpha_A < 0) alpha_A += 360;
  while (alpha_B < 0) alpha_B += 360;
  let alpha_T;
  // determin whether  line_from_A  and  line_from_B  will intersect at one point T
  console.log('qq', alpha_A, alpha_B);
  if (!isValidTriangle(alpha_A, alpha_B)) {
    
    alpha_A *= -1;
    alpha_B *= -1;
    console.log('ww', alpha_A, alpha_B);
    if (!isValidTriangle(alpha_A, alpha_B)) return null;
  }

  alpha_T = 180 - alpha_A - alpha_B;  
  console.log('rr', alpha_T);

  // geo_A, geo_B => len_AB
  let len_AB = geolib.getDistance(geo_A, geo_B, 0.1);

  // len_AB, alpha_T, alpha_B => len_AT
  let len_AT =
    (len_AB * Math.sin((alpha_B * Math.PI) / 180)) /
    Math.sin((alpha_T * Math.PI) / 180);

  // geo_A, azi_AT, len_AT => geo_T
  let geo_T = geolib.computeDestinationPoint(geo_A, len_AT, azi_AT);

  // return geo_T;
  return geo_T;
};

const isValidTriangle = (a, b) => {
  let c = 180 - a - b 
  return (
    a > ALPHA_EPS &&
    b > ALPHA_EPS &&
    c > ALPHA_EPS &&
    180 - a > ALPHA_EPS &&
    180 - b > ALPHA_EPS &&
    180 - c > ALPHA_EPS
  );
}

export const getCenter = (arr) => { 
  return geolib.getCenter(arr);
}


export const distance = (geo_A, geo_B) => {
  return geolib.getDistance(geo_A, geo_B, 0.1);
};


const rotate = (pitch, roll, yaw, p) => {
  let cosa = Math.cos(yaw);
  let sina = Math.sin(yaw);

  let cosb = Math.cos(pitch);
  let sinb = Math.sin(pitch);

  let cosc = Math.cos(roll);
  let sinc = Math.sin(roll);

  let Axx = cosa * cosb;
  let Axy = cosa * sinb * sinc - sina * cosc;
  let Axz = cosa * sinb * cosc + sina * sinc;

  let Ayx = sina * cosb;
  let Ayy = sina * sinb * sinc + cosa * cosc;
  let Ayz = sina * sinb * cosc - cosa * sinc;

  let Azx = -sinb;
  let Azy = cosb * sinc;
  let Azz = cosb * cosc;

  // for (let i = 0; i < points.length; i++) {
  let px = p.x;
  let py = p.y;
  let pz = p.z;

  let x = Axx * px + Axy * py + Axz * pz;
  let y = Ayx * px + Ayy * py + Ayz * pz;
  let z = Azx * px + Azy * py + Azz * pz;
  // }

  return { x, y, z };
}


export const elevation = (pitch, roll, yaw) => { 
  let { x, y, z } = rotate(pitch, roll, yaw, { x: 0, y: 0, z: 1 });
  let L = Math.sqrt(x * x + y * y + z * z);
  let l = Math.sqrt(x * x + y * y);
  if (L < 0.01) return;
  let ret = Math.acos(l / L);
  if (z > 0) ret = -1 * ret;
  return ret;
}

export const deg2rad = (deg) => (deg * Math.PI / 180);
export const rad2deg = (rad) => (rad * 180 / Math.PI);


