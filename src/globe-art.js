import { CanvasTexture, SRGBColorSpace, Group, Mesh, MeshPhongMaterial, MeshBasicMaterial, LatheGeometry, TorusGeometry, CylinderGeometry, PlaneGeometry, Vector2 } from 'three';

// The map is drawn from the same geographic data used for country hit targets.
export function atlasTexture(features) {
  const canvas=document.createElement('canvas');
  canvas.width=2048;canvas.height=1024;
  const ctx=canvas.getContext('2d');
  ctx.fillStyle='#e8ddc6';ctx.fillRect(0,0,canvas.width,canvas.height);
  const project=([lng,lat])=>[(lng+180)/360*canvas.width,(90-lat)/180*canvas.height];
  for(const feature of features){
    const polygons=feature.geometry.type==='Polygon'?[feature.geometry.coordinates]:feature.geometry.coordinates;
    ctx.beginPath();
    for(const polygon of polygons)for(const ring of polygon){
      ring.forEach((point,i)=>{const [x,y]=project(point);i?ctx.lineTo(x,y):ctx.moveTo(x,y);});ctx.closePath();
    }
    ctx.fillStyle='#89947c';ctx.fill('evenodd');
    ctx.strokeStyle='#e5dfcc';ctx.lineWidth=.65;ctx.stroke();
  }
  // A subtle paper grain stays attached to the sphere as the viewer turns it.
  const pixels=ctx.getImageData(0,0,canvas.width,canvas.height);
  let seed=19;
  for(let i=0;i<pixels.data.length;i+=4){
    seed=(Math.imul(seed,1664525)+1013904223)>>>0;
    const grain=(seed/4294967296-.5)*14;
    pixels.data[i]+=grain;pixels.data[i+1]+=grain;pixels.data[i+2]+=grain;
  }
  ctx.putImageData(pixels,0,0);
  ctx.strokeStyle='#a68e633b';ctx.lineWidth=.8;
  for(let lng=-180;lng<=180;lng+=15){const [x]=project([lng,0]);ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,1024);ctx.stroke();}
  for(let lat=-75;lat<=75;lat+=15){const [,y]=project([0,lat]);ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(2048,y);ctx.stroke();}
  ctx.strokeStyle='#a16e38';ctx.lineWidth=2.6;ctx.setLineDash([9,5]);
  for(const lat of [-23.44,23.44]){const [,y]=project([0,lat]);ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(2048,y);ctx.stroke();}
  const texture=new CanvasTexture(canvas);texture.colorSpace=SRGBColorSpace;
  return texture;
}

// A real three-dimensional brass meridian and turned ceramic base share the
// globe's camera and lighting, so their perspective and scale remain coherent.
export function globeInstrument(instance) {
  const group=new Group();
  group.name='coffee-instrument';
  const brass=new MeshPhongMaterial({color:'#a18750',specular:'#fff0be',shininess:80});
  const glaze=new MeshPhongMaterial({color:'#6d806c',specular:'#b7c3a4',shininess:55});
  const darkGlaze=new MeshPhongMaterial({color:'#425a48',specular:'#a7b394',shininess:45});
  const profile=points=>new LatheGeometry(points.map(p=>new Vector2(...p)),96);
  const add=(geometry,material,parent=group)=>{const mesh=new Mesh(geometry,material);parent.add(mesh);return mesh;};
  const meridian=new Group();meridian.rotation.z=-.3;meridian.rotation.y=-.12;group.add(meridian);
  const arc=add(new TorusGeometry(104,1.5,12,160,Math.PI),brass,meridian);arc.rotation.z=-Math.PI/2;
  const edge=add(new TorusGeometry(106, .4,8,160,Math.PI),brass,meridian);edge.rotation.z=-Math.PI/2;
  for(const y of [-104,104]){
    const cap=add(new CylinderGeometry(2.6,2.6,4,24),brass,meridian);cap.position.y=y;
  }
  const base=new Group();base.position.y=-133;base.rotation.x=-.15;group.add(base);
  add(profile([[0,-9],[50,-9],[56,-7],[58,-4],[58,0],[55,3],[42,4],[28,5],[16,7],[11,11],[9,17],[0,17]]),glaze,base);
  add(profile([[0,-10],[54,-10],[58,-8],[58,-6],[54,-5],[0,-5]]),brass,base);
  add(profile([[0,4],[28,4],[23,6],[15,9],[11,14],[10,19],[0,19]]),darkGlaze,base);
  const neck=add(new CylinderGeometry(3.5,5,17,32),brass);neck.position.set(0,-111,0);
  const shadowCanvas=document.createElement('canvas');shadowCanvas.width=128;shadowCanvas.height=128;
  const ctx=shadowCanvas.getContext('2d'),gradient=ctx.createRadialGradient(64,64,8,64,64,62);
  gradient.addColorStop(0,'#3b362854');gradient.addColorStop(1,'#3b362800');ctx.fillStyle=gradient;ctx.fillRect(0,0,128,128);
  const shadowTexture=new CanvasTexture(shadowCanvas);
  const shadow=add(new PlaneGeometry(155,36),new MeshBasicMaterial({map:shadowTexture,transparent:true,depthWrite:false}));shadow.position.set(6,-147,-5);
  instance.scene().add(group);
  const align=()=>group.quaternion.copy(instance.camera().quaternion);
  align();instance.controls().addEventListener('change',align);
  return {destroy(){instance.controls().removeEventListener('change',align);instance.scene().remove(group);group.traverse(obj=>obj.geometry?.dispose());brass.dispose();glaze.dispose();darkGlaze.dispose();shadow.material.dispose();shadowTexture.dispose();}};
}
