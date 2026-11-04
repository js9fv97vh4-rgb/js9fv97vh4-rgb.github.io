import { Vector2, Vector3, LatheGeometry, CubicBezierCurve3, Shape, ShapeGeometry } from 'three';

// All beverage bands share the cup's inner wall, including at low fill levels.
export function cupProfile(height = 1.2, radius = .48, ceramic = false) {
  const bottom = .055, wallStart = .085, floor = ceramic ? bottom + height * .105 : .125, rim = height + bottom;
  const thickness = radius * (ceramic ? .075 : .045);
  const outer = y => {
    const t = Math.max(0, Math.min(1, (y - wallStart) / (rim - wallStart)));
    // A rounded belly rises from a small foot into a wide, nearly vertical mouth.
    return radius * (ceramic ? .43 + .57 * Math.sqrt(1 - (1 - t) ** 2) : .78 + .22 * t);
  };
  const inner = y => outer(y) - thickness;
  const sides = Array.from({length:49},(_,i)=>{const y=wallStart+(rim-wallStart)*i/48;return [outer(y),y];});
  const lining = Array.from({length:49},(_,i)=>{const y=rim-(rim-floor)*i/48;return [inner(y),y];});
  return { height, radius, ceramic, bottom, floor, rim, thickness, outer, inner,
    points: [[0,bottom],[radius*(ceramic?.40:.76),bottom],...sides,...lining,[0,floor]].map(([r,y])=>new Vector2(r,y)) };
}
export function cupShell(profile, cutaway = false) { return new LatheGeometry(profile.points, 80, cutaway ? Math.PI/2 : 0, cutaway ? Math.PI : Math.PI*2); }
// The cut plane is z=0. Close both exposed ceramic walls, including the base.
export function cupCutFaces(profile) {
  return [-1,1].map(sign => new ShapeGeometry(new Shape(profile.points.map(p=>new Vector2(sign*p.x,p.y)))));
}
export function liquidShell(band, cutaway = false) {
  return new LatheGeometry([new Vector2(0,band.bottom),...band.points,new Vector2(0,band.top)],80,cutaway?Math.PI/2:0,cutaway?Math.PI:Math.PI*2);
}
export function liquidSection(band) {
  const shell=liquidShell(band,true);
  const outline=[...band.points.map(p=>new Vector2(p.x,p.y)),...band.points.slice().reverse().map(p=>new Vector2(-p.x,p.y))];
  const face=new ShapeGeometry(new Shape(outline));
  return {shell,face};
}
export function cupHandle(profile) {
  const {height,radius,outer}=profile, tube=radius*.068;
  const low=.055+height*.28, high=.055+height*.78;
  const curve = new CubicBezierCurve3(
    new Vector3(outer(high)+tube*.6, high, 0),
    new Vector3(radius+height*.52, high+height*.08, 0),
    new Vector3(radius+height*.52, low-height*.08, 0),
    new Vector3(outer(low)+tube*.6, low, 0));
  return {curve,tube};
}
export function liquidBand(profile, bottom, top) {
  bottom=Math.max(profile.floor,Math.min(profile.rim-.03,bottom));
  top=Math.max(bottom+.001,Math.min(profile.rim-.025,top));
  const points=Array.from({length:33},(_,i)=>{const y=bottom+(top-bottom)*i/32;return new Vector2(profile.inner(y)-.008,y);});
  return {bottom,top,height:top-bottom,y:(bottom+top)/2,bottomRadius:points[0].x,topRadius:points.at(-1).x,points};
}
