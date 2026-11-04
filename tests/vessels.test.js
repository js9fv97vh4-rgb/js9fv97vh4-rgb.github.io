import {test} from 'node:test';
import assert from 'node:assert/strict';
import {cupProfile,cupShell,cupHandle,liquidBand,cupCutFaces,liquidSection} from '../src/vessel-geometry.js';
import {Mesh,MeshBasicMaterial,DoubleSide,Raycaster,Vector3} from 'three';
test('liquid and foam follow rounded ceramic and tapered glass walls at every fill height',()=>{
 for(const [height,radius] of [[1.6,.61],[1,.46],[.54,.29],[.73,.5],[1.05,.53]]){
  for(const ceramic of [false,true]){
  const p=cupProfile(height,radius,ceramic);
  for(let percent=1;percent<=100;percent++){
   const top=p.floor+(p.rim-p.floor)*percent/100;
   const band=liquidBand(p,p.floor,top);
   for(let i=0;i<=20;i++){const t=i/20,y=band.bottom+t*band.height,r=band.bottomRadius+(band.topRadius-band.bottomRadius)*t;assert.ok(r<p.inner(y),`liquid at ${height}/${percent}/${i}`);}
   for(const point of band.points)assert.ok(Math.abs(point.x-(p.inner(point.y)-.008))<1e-8,'liquid contour follows the actual inner wall');
   if(ceramic&&percent>50)assert.ok(band.points[16].x>(band.bottomRadius+band.topRadius)/2,'round belly must not regress to a cone');
   assert.ok(band.bottom>=p.floor);assert.ok(band.top<p.rim);
   const foam=liquidBand(p,Math.max(p.floor,top-.12),top);assert.ok(foam.topRadius<p.inner(foam.top));
  }
  const geometry=cupShell(p);for(const n of geometry.attributes.position.array)assert.ok(Number.isFinite(n));geometry.dispose();
 }}
});
test('cup handle never passes into the beverage cavity',()=>{
 for(const [h,r] of [[1.6,.61],[1,.46],[.54,.29],[.64,.53],[1.02,.82]])for(const ceramic of [false,true]){const p=cupProfile(h,r,ceramic),handle=cupHandle(p);for(let i=0;i<=100;i++){const point=handle.curve.getPoint(i/100);assert.ok(point.x-handle.tube>p.inner(point.y),`${h}: ${i}`);}}
});
test('ceramic cutaway exposes the liquid while its cut wall and base stay solid',()=>{
 const p=cupProfile(1.2,.75,true),band=liquidBand(p,p.floor,p.rim-.14);
 const section=liquidSection(band),material=new MeshBasicMaterial({side:DoubleSide});
 const make=g=>{const m=new Mesh(g,material);m.updateMatrixWorld();return m;};
 const wall=make(cupShell(p,true)),caps=cupCutFaces(p).map(make),liquid=make(section.face);
 const cast=(x,y,objects)=>new Raycaster(new Vector3(x,y,3),new Vector3(0,0,-1)).intersectObjects(objects,false)[0];
 const y=(p.floor+p.rim)/2;
 assert.equal(cast(0,y,[wall,...caps,liquid]).object,liquid,'open front reveals drink, not a phantom cup wall');
 for(const sign of [-1,1])assert.ok(caps.includes(cast(sign*(p.outer(y)-p.thickness/2),y,[wall,...caps,liquid]).object),'cut edge is sealed');
 assert.ok(caps.includes(cast(.1,(p.bottom+p.floor)/2,[wall,...caps]).object),'base cross section is sealed');
 const closed=make(cupShell(p));assert.equal(cast(0,y,[closed,liquid]).object,closed,'closed ceramic hides the drink cross section');
 for(const g of [wall.geometry,section.shell]){const a=g.attributes.position;for(let i=0;i<a.count;i++)assert.ok(a.getZ(i)<.00001,'cutaway geometry never extends ahead of its section plane');}
 [wall,closed,...caps,liquid].forEach(m=>m.geometry.dispose());section.shell.dispose();material.dispose();
});
