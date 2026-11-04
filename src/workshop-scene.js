import * as THREE from 'three';
import { cupProfile, cupShell, cupHandle, liquidBand, cupCutFaces, liquidSection, liquidShell } from './vessel-geometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// Lightweight native models: pictures explain appearance; state owns the lesson.
// No physical extraction or volume calculation is performed by this renderer.
export async function mountScene(container, initial = {}, onGesture) {
  let state = { kind: 'brewing', method: 'pour-over', step: 0, progress: 0, params: {}, ingredients: {}, foam: 0, ...initial };
  let disposed = false, paused = false, frame = 0, model, start = 0;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;touch-action:pan-y';
  container.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const room = new RoomEnvironment(), pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(room, .05);
  scene.environment = environment.texture; scene.environmentIntensity = .4;
  room.dispose(); pmrem.dispose();
  const camera = new THREE.PerspectiveCamera(35, 1, .1, 80);
  const materials = new Set();
  const mat = (color, options = {}) => {
    const m = new THREE.MeshStandardMaterial({ color, roughness: .42, metalness: 0, ...options });
    materials.add(m); return m;
  };
  const celadon = mat('#829b88', { roughness: .23, metalness: .08 });
  // Glaze mottling and iron flecks are material detail, shared by shell, handle and saucer.
  const textureSize=512, glazePixels=new Uint8Array(textureSize*textureSize*4),grainPixels=new Uint8Array(textureSize*textureSize*4);
  let seed=1709;
  const random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
  const noise=(u,v,n)=>{
    const x=u*n,y=v*n,ix=Math.floor(x),iy=Math.floor(y),smooth=t=>t*t*(3-2*t);
    const hash=(a,b)=>{const q=Math.sin((a%n)*127.1+(b%n)*311.7)*43758.5453;return q-Math.floor(q);};
    const fx=smooth(x-ix),fy=smooth(y-iy),a=hash(ix,iy)*(1-fx)+hash(ix+1,iy)*fx,b=hash(ix,iy+1)*(1-fx)+hash(ix+1,iy+1)*fx;
    return a*(1-fy)+b*fy;
  };
  for(let y=0;y<textureSize;y++)for(let x=0;x<textureSize;x++){
    const u=x/textureSize,v=y/textureSize;
    const cloud=(noise(u,v,7)-.5)*2+(noise(u,v,27)-.5)*.65;
    const fine=(random()-.5)*12, fleck=random()>.994, warm=Math.max(0,noise(u,v,15)-.6)*65;
    const c=fleck?[102,77,41]:[135+cloud*15+fine+warm,155+cloud*12+fine,137+cloud*13+fine-warm];
    const index=(y*textureSize+x)*4;
    glazePixels.set([...c.map(n=>Math.round(Math.max(0,Math.min(255,n)))),255],index);
    const grainValue=fleck?75:Math.round(125+fine);grainPixels.set([grainValue,grainValue,grainValue,255],index);
  }
  const glazeMap=new THREE.DataTexture(glazePixels,textureSize,textureSize);glazeMap.colorSpace=THREE.SRGBColorSpace;
  const grain=new THREE.DataTexture(grainPixels,textureSize,textureSize);
  for(const texture of [glazeMap,grain]){texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.magFilter=THREE.LinearFilter;texture.minFilter=THREE.LinearMipmapLinearFilter;texture.generateMipmaps=true;texture.needsUpdate=true;}
  const glaze = new THREE.MeshPhysicalMaterial({color:'#d1d7c6',map:glazeMap,roughness:.29,metalness:0,clearcoat:.8,clearcoatRoughness:.23,envMapIntensity:.9,bumpMap:grain,bumpScale:.003});
  materials.add(glaze);
  const kilnEdge=mat('#765337',{roughness:.36,metalness:0});
  const ceramicCut = mat('#e1d4b8',{roughness:.82,side:THREE.DoubleSide});
  const dark = mat('#263c34', { roughness: .3 });
  const cream = mat('#eee6cf', { roughness: .31 });
  const brass = mat('#bd9760', { metalness: .8, roughness: .3 });
  const metal = mat('#afb4ab', { metalness: .8, roughness: .24 });
  const glass = mat('#d5e4dc', { transparent: true, opacity: .36, roughness: .12, depthWrite: false, side: THREE.FrontSide });
  const glassEdge = mat('#b5c9ba', { transparent: true, opacity: .56, metalness: .12, depthWrite: false });
  const coffee = mat('#40261a', { roughness: .25 });
  const grounds = mat('#36251c', { roughness: 1 });
  const foam = mat('#ead6af', { roughness: .85 });
  const water = mat('#8ebdb5', { transparent: true, opacity: .55, roughness: .14 });
  const cherry = mat('#75383c', { roughness: .2 });
  const pulp = mat('#ce9069', { roughness: .5 });
  const mucilage = mat('#d7b566', { transparent: true, opacity: .85, roughness: .13 });
  const parchment = mat('#d5c599', { roughness: .8 });
  const greenBean = mat('#8e9c75', { roughness: .75 });
  const hemisphere = new THREE.HemisphereLight('#fff3db', '#688378', 1.85); scene.add(hemisphere);
  const key = new THREE.DirectionalLight('#fff0d0', 3.9); key.position.set(-3, 6, 4); key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024); key.shadow.camera.left = -4; key.shadow.camera.right = 4;
  key.shadow.camera.top = 4; key.shadow.camera.bottom = -4; key.shadow.normalBias = .035;
  key.shadow.bias = -.0002; scene.add(key);
  const fill = new THREE.DirectionalLight('#ceddd7', 1.4); fill.position.set(4, 3, -3); scene.add(fill);
  const table = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), mat('#c8bea5', { roughness: .9 }));
  const solidTable=table.material, shadowTable=new THREE.ShadowMaterial({color:'#3e4434',opacity:.19});materials.add(shadowTable);
  table.rotation.x = -Math.PI / 2; table.position.y = -.025; table.receiveShadow = true; scene.add(table);
  const mesh = (geo, material, parent, position = [0, 0, 0], rotation) => {
    const object = new THREE.Mesh(geo, material); object.position.set(...position);
    if (rotation) object.rotation.set(...rotation);
    object.castShadow = !material.transparent; object.receiveShadow = true; parent.add(object); return object;
  };
  const cylinder = (parent, top, bottom, height, material, x = 0, y = 0, z = 0, segments = 64, open = false) => {
    const object = mesh(new THREE.CylinderGeometry(top, bottom, height, segments, 1, open), material, parent, [x, y, z]);
    if (material === grounds) object.userData.settling = { y, height };
    return object;
  };
  const box = (parent, w, h, d, material, x = 0, y = 0, z = 0) => mesh(new THREE.BoxGeometry(w, h, d), material, parent, [x, y, z]);
  const sphere = (parent, r, material, x = 0, y = 0, z = 0, scale = [1, 1, 1]) => { const s = mesh(new THREE.SphereGeometry(r, 40, 32), material, parent, [x, y, z]); s.scale.set(...scale); return s; };
  const ring = (parent, r, tube, material, x = 0, y = 0, z = 0, vertical = false, arc = Math.PI * 2) => mesh(new THREE.TorusGeometry(r, tube, 12, 64, arc), material, parent, [x, y, z], vertical ? [0, 0, 0] : [Math.PI / 2, 0, 0]);
  function tube(parent, points, radius, material) {
    const object = mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p))), 30, radius, 8, false), material, parent);
    if (material === water || material === coffee) object.userData.flow = true;
    return object;
  }
  function bean(parent, x, y, z, size = .1, material = coffee, angle = 0) {
    const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = angle; parent.add(g);
    sphere(g, size, material, 0, 0, 0, [.72, .45, 1]);
    tube(g, [[0, size * .44, -size * .8], [-size * .12, size * .47, 0], [0, size * .44, size * .8]], size * .035, grounds);
    return g;
  }
  function scattered(parent, count, material = coffee, radius = .5, height = .1) {
    for (let i = 0; i < count; i++) {
      const a = i * 2.39996, r = radius * Math.sqrt((i + .5) / count);
      bean(parent, Math.cos(a) * r, height, Math.sin(a) * r, .065 + (i % 3) * .009, material, a);
    }
  }
  function beverageBand(group, profile, bottom, top, material) {
    const band=liquidBand(profile,bottom,top);
    let object;
    if(group.userData.cutaway){
      const section=liquidSection(band);
      object=mesh(section.shell,material,group);
      mesh(section.face,material,group,[0,0,.001]);
    }else object=mesh(liquidShell(band),material,group);
    object.userData.vesselBand=band;
    return band;
  }
  function cup(parent, { x = 0, z = 0, y = .055, height = 1.2, radius = .48, fill = .65, liquid = coffee, handle = true, froth = 0, transparent = false, cutaway = false } = {}) {
    const g = new THREE.Group(); g.position.set(x,y,z); parent.add(g);
    const profile=cupProfile(height,radius,!transparent);g.userData.profile=profile;g.userData.cutaway=cutaway;
    if(transparent)cylinder(g,radius*1.35,radius*1.27,.055,cream,0,.0275);
    else mesh(new THREE.LatheGeometry([[0,0],[radius*.75,0],[radius*1.13,.025],[radius*1.38,.09],[radius*1.4,.12],[radius*1.35,.135],[radius*1.13,.085],[radius*.94,.055],[0,.055]].map(([r,y])=>new THREE.Vector2(r,y)),80),glaze,g);
    const body=mesh(cupShell(profile,cutaway),transparent?glass:glaze,g);if(transparent)body.renderOrder=10;
    if(cutaway)for(const face of cupCutFaces(profile))mesh(face,ceramicCut,g,[0,0,.002]);
    const lipRadius=radius-profile.thickness/2;
    const lip=Array.from({length:17},(_,i)=>new THREE.Vector2(lipRadius+Math.cos(i/16*Math.PI*2)*profile.thickness*.51,profile.rim+Math.sin(i/16*Math.PI*2)*profile.thickness*.51));
    mesh(new THREE.LatheGeometry(lip,80,cutaway?Math.PI/2:0,cutaway?Math.PI:Math.PI*2),transparent?glassEdge:glaze,g);
    if(!transparent){
      const edge=Array.from({length:13},(_,i)=>new THREE.Vector2(radius-profile.thickness*.27+Math.cos(i/12*Math.PI*2)*.005,profile.rim+profile.thickness*.39+Math.sin(i/12*Math.PI*2)*.005));
      mesh(new THREE.LatheGeometry(edge,80,cutaway?Math.PI/2:0,cutaway?Math.PI:Math.PI*2),kilnEdge,g);
    }
    if(cutaway)for(const sign of [-1,1])mesh(new THREE.CircleGeometry(profile.thickness*.51,24),ceramicCut,g,[sign*lipRadius,profile.rim,.002]);
    if(handle){const h=cupHandle(profile);const handleMesh=mesh(new THREE.TubeGeometry(h.curve,48,h.tube,12,false),transparent?glassEdge:glaze,g);if(transparent)handleMesh.renderOrder=11;}
    if(fill>0){
      const available=profile.rim-profile.floor-.045;
      const totalHeight=Math.min(.92,fill)*available;
      const foamHeight=Math.min(totalHeight*.3,Math.max(0,froth)*height);
      const surface=profile.floor+totalHeight;
      beverageBand(g,profile,profile.floor,surface-foamHeight,liquid);
      if(foamHeight>0)beverageBand(g,profile,surface-foamHeight,surface,foam);
    }
    return g;
  }
  function kettle(parent, pouring = false) {
    const g = new THREE.Group(); g.position.set(1.15, pouring ? 2.1 : .033, -.12); parent.add(g);
    if (pouring) { g.rotation.z = .25; if (state.pointer) { g.position.x = .65 + state.pointer.x * .9; g.position.z = (state.pointer.y - .5) * .7; } }
    sphere(g, .43, celadon, 0, .4, 0, [1, .88, .9]); cylinder(g, .26, .28, .05, brass, 0, .75);
    sphere(g, .065, dark, 0, .82); tube(g, [[.35,.65,0],[.72,.65,0],[.74,.25,0],[.35,.18,0]], .045, dark);
    tube(g, [[-.3, .25, 0], [-.5, .25, 0], [-.65, .55, 0], [-.9, .66, 0]], .045, brass);
    return g;
  }
  function cupView(){return state.kind==='diy'&&!['beans','choose','weight','weigh','grind','grinding','brew','brewing','extract'].includes(state.phase);}
  function commonTable(parent) {
    if(cupView()){bean(parent,-1.14,.025,.6,.075,coffee,1);bean(parent,-1.29,.025,.48,.065,coffee,2);return;}
    cylinder(parent, 2.1, 2.13, .08, cream, 0, .015);
    ring(parent, 2.04, .014, brass, 0, .065);
    bean(parent, -1.1, .12, .95, .1, coffee, 1); bean(parent, -1.32, .12, .78, .09, coffee, 2);
    bean(parent, -1.36, .12, 1.1, .08, coffee, .2);
  }
  function processScene(parent) {
    const s = Number(state.step) || 0, process = typeof state.process === 'object' ? state.process.id : state.process || 'natural';
    const dry = process === 'natural' ? s >= 3 : process === 'wet-hulled' ? s >= 4 : s >= 3;
    const complete = s >= 4;
    const skin = process === 'natural' ? s < 4 : s < 1;
    const muc = process === 'natural' ? s < 4 : process === 'honey' ? s < 4 : process === 'wet-hulled' ? s < 1 : s < 2;
    const shell = process === 'wet-hulled' ? s < 3 : s < 4;
    const g = new THREE.Group(); g.position.set(0, 1.07, 0); g.rotation.y = -.25 + (Number(state.progress) || 0) / 100 * .65; parent.add(g);
    if (complete) {
      cylinder(parent, 1.17, 1.02, .1, celadon, 0, .14);
      for (let i = 0; i < 12; i++) bean(parent, Math.cos(i * 2.4) * Math.sqrt(i / 12) * .86, .24, Math.sin(i * 2.4) * Math.sqrt(i / 12) * .65, .17, greenBean, i);
      return;
    }
    const layers = [[.92, dry ? parchment : cherry, skin], [.81, pulp, skin], [.71, mucilage, muc], [.61, parchment, shell]];
    for (const [r, material, show] of layers) {
      if (!show) continue;
      const geo = state.cutaway !== false ? new THREE.SphereGeometry(r, 48, 40, Math.PI, Math.PI) : new THREE.SphereGeometry(r, 48, 40);
      const object = mesh(geo, material, g); object.scale.set(1, 1.12, 1);
      if (state.cutaway !== false) {
        const edge = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(Array.from({ length: 80 }, (_, i) => new THREE.Vector3(Math.cos(i / 80 * Math.PI * 2) * r, Math.sin(i / 80 * Math.PI * 2) * r * 1.12, 0))), new THREE.LineBasicMaterial({ color: material.color }));
        g.add(edge);
      }
    }
    const one = bean(g, -.255, 0, .08, .39, greenBean, .1); one.rotation.x = Math.PI / 2; one.scale.set(.8, 1.1, 1);
    const two = bean(g, .255, 0, .08, .39, greenBean, -.1); two.rotation.x = Math.PI / 2; two.scale.set(.8, 1.1, 1);
    if (skin) {
      tube(g, [[0, .9, 0], [.03, 1.14, -.04], [.17, 1.25, -.08]], .035, dark);
      const leaf = sphere(g, .22, celadon, .3, 1.18, -.1, [1.4, .15, .6]); leaf.rotation.z = .3;
    }
    if (process === 'wet-hulled' && s >= 1) { g.scale.setScalar(s >= 2 ? .88 : .96); }
    const tray = new THREE.Group(); tray.position.set(1.35, .16, .6); tray.scale.setScalar(.55); parent.add(tray);
    cylinder(tray, .6, .5, .1, brass, 0, 0); scattered(tray, 9, dry ? greenBean : cherry, .42, .09);
  }
  function brewer(parent) {
    const step = Number(state.step) || 0, p = Math.min(1, Math.max(0, (Number(state.progress) || 0) / 100));
    const method = state.method || 'pour-over';
    if (method === 'pour-over') {
      cup(parent, { height: 1.05, radius: .53, fill: step > 3 ? .76 : step > 2 ? .25 + p * .5 : 0, handle: true });
      if(step<5){
      mesh(new THREE.LatheGeometry([[.13,1.16],[.62,1.16],[.62,1.20],[.13,1.20]].map(([r,y])=>new THREE.Vector2(r,y)),64),celadon,parent);
      cylinder(parent, .7, .13, .78, celadon, 0, 1.58, 0, 64, true);
      ring(parent, .7, .035, cream, 0, 1.97);
      for (let i = 0; i < 18; i++) {
        const a = i * Math.PI / 9;
        tube(parent, [[Math.cos(a) * .15, 1.22, Math.sin(a) * .15], [Math.cos(a) * .68, 1.95, Math.sin(a) * .68]], .013, cream);
      }
      if (step > 0) cylinder(parent, .65, .14, .69, cream, 0, 1.605, 0, 64, true);
      if (step > 1) cylinder(parent, .39, .13, .3, grounds, 0, 1.46);
      }
      if (step >= 2 && step <= 3 && state.animating) { const k=kettle(parent,true);k.position.x+=Math.cos(p*Math.PI*2)*.08;k.position.z+=Math.sin(p*Math.PI*2)*.08;k.updateMatrix();const tip=new THREE.Vector3(-.9,.66,0).applyMatrix4(k.matrix);tube(parent, [[tip.x,tip.y,tip.z],[tip.x*.5,(tip.y+1.65)/2,tip.z*.5],[0,1.65,0]], .018, water); }
      else kettle(parent, false);
    } else if (method === 'french-press') {
      mesh(new THREE.LatheGeometry([[.57,.26],[.60,.26],[.60,1.79],[.57,1.79],[.57,.26]].map(([r,y])=>new THREE.Vector2(r,y)),64),glass,parent);
      cylinder(parent, .64, .64, .205, celadon, 0, .1575); ring(parent, .61, .04, brass, 0, 1.79);
      if (step > 0) cylinder(parent, .56, .56, .14, grounds, 0, .33);
      if (step > 0) { const liquidHeight = step >= 5 ? .35 : step === 1 ? Math.max(.05, p * 1.12) : 1.12; cylinder(parent, .56, .56, liquidHeight, coffee, 0, .4 + liquidHeight / 2); }
      const down = step >= 4 ? .7 : step === 3 ? 1.7 - p : 1.7;
      cylinder(parent, .56, .56, .035, metal, 0, down);
      cylinder(parent, .025, .025, 1.55, metal, 0, down + .74);
      mesh(new THREE.LatheGeometry([[.045,1.81],[.66,1.81],[.66,1.93],[.045,1.93]].map(([r,y])=>new THREE.Vector2(r,y)),64),celadon,parent); sphere(parent, .12, dark, 0, down + 1.55);
      tube(parent, [[.59, 1.55, 0], [.97, 1.45, 0], [.97, .65, 0], [.59, .55, 0]], .075, dark);
      if (step >= 5) cup(parent, { x: -1.02, z: .65, height: .7, radius: .34, fill: .75 });
    } else if (method === 'moka') {
      const assembling=step===2&&state.animating, t=step>=3?1:assembling?p:0;
      const lowerX=-.74*(1-t), lowerZ=-.18*(1-t);
      const lower=new THREE.Group();lower.position.set(lowerX,.12*t,lowerZ);parent.add(lower);
      const cut=state.cutaway!==false&&step<3;
      const boilerProfile=[[0,.06],[.55,.06],[.57,.12],[.40,.94],[.365,.94],[.525,.14],[0,.14]].map(([r,y])=>new THREE.Vector2(r,y));
      const boilerMat=mat('#a1b2a6',{metalness:.65,roughness:.29,side:THREE.DoubleSide});
      mesh(new THREE.LatheGeometry(boilerProfile,cut?16:8,cut?Math.PI/3:0,cut?Math.PI*4/3:Math.PI*2),boilerMat,lower);
      ring(lower,.385,.023,metal,0,.94);
      sphere(lower,.055,brass,.39,.77,.20);
      const waterTop=step===0?.15+p*.51:.66;
      if(step<3&&waterTop>.15){const h=waterTop-.145;const rt=.525-(waterTop-.14)/.8*.16-.012;cylinder(lower,rt,.51,h,water,0,.145+h/2);}
      if(cut){tube(lower,[[.33,.69,.24],[-.33,.69,.24]],.008,brass);}
      const upper=new THREE.Group();upper.position.set(.8*(1-t),.055+1.005*t+(assembling?Math.sin(p*Math.PI)*.65:0),-.35*(1-t));parent.add(upper);
      const upperProfile=[[0,0],[.39,0],[.4,.08],[.56,.86],[.525,.86],[.365,.09],[0,.09]].map(([r,y])=>new THREE.Vector2(r,y));
      mesh(new THREE.LatheGeometry(upperProfile,8),celadon,upper);
      tube(upper,[[.51,.71,0],[.82,.68,0],[.89,.30,0],[.46,.21,0]],.065,dark);
      tube(upper,[[-.5,.71,0],[-.65,.78,0],[-.72,.86,0]],.07,metal);
      const lid=new THREE.Group();lid.position.set(.49,.88,0);lid.rotation.z=step>=4?-.95:0;upper.add(lid);
      cylinder(lid,.58,.57,.045,metal,-.49,0);sphere(lid,.075,dark,-.49,.07);
      cylinder(upper,.075,.10,.58,metal,0,.38);
      if(step===4&&p>0){const h=.04+p*.43;cylinder(upper,.365+h*.17,.35,h,coffee,0,.09+h/2);if(state.animating)tube(upper,[[0,.7,0],[.12,.65,.05],[.16,.15+h,.08]],.015,coffee);}
      if(t<.92){
        const funnel=new THREE.Group();funnel.position.set(-.74*(1-t),t*.48,.88*(1-t)+lowerZ*t);parent.add(funnel);
        cylinder(funnel,.07,.07,.36,metal,0,.24);cylinder(funnel,.36,.13,.18,metal,0,.51,0,48,true);ring(funnel,.36,.014,metal,0,.60);
        if(step>=2||(step===1&&state.animating)){const h=.03+(step>=2?1:p)*.09;cylinder(funnel,.31,.17,h,grounds,0,.44+h/2);}
      }
      if(step>=3){cylinder(parent,.69,.70,.12,dark,0,.12);ring(parent,.5,.018,step===3&&state.animating?brass:metal,0,.185);}
      if(step>=5)cup(parent,{x:-1.05,z:.65,height:.64,radius:.3,fill:.72});
    } else if (method === 'aeropress') {
      cup(parent, { height: .73, radius: .5, fill: step >= 5 ? .8 : step === 4 ? p * .8 : 0 });
      cylinder(parent, .42, .42, .14, dark, 0, .91);
      cylinder(parent, .37, .37, 1.18, glass, 0, 1.57, 0, 64, true);
      if (step > 0) cylinder(parent, .34, .34, .025, cream, 0, .99);
      if (step > 1) cylinder(parent, .33, .33, .11, grounds, 0, 1.06);
      if (step > 1) { const h = step >= 5 ? .06 : step === 4 ? .8 - p * .74 : .8; cylinder(parent, .33, .33, h, coffee, 0, 1.1 + h / 2); }
      const y = step >= 5 ? 1.22 : step === 4 ? 1.95 - p * .73 : 2.18;
      cylinder(parent, .32, .32, .1, dark, 0, y); cylinder(parent, .22, .22, .85, metal, 0, y + .45);
      cylinder(parent, .43, .43, .08, dark, 0, y + .9);
      for (let i = 1; i <= 4; i++) box(parent, .15, .025, .015, brass, -.14, 1.1 + i * .2, .37);
    } else if (method === 'cold-brew') {
      mesh(new THREE.LatheGeometry([[.62,.22],[.65,.22],[.65,1.88],[.62,1.88],[.62,.22]].map(([r,y])=>new THREE.Vector2(r,y)),64),glass,parent); cylinder(parent, .67, .67, .165, celadon, 0, .1375);
      ring(parent, .64, .035, glassEdge, 0, 1.88);
      if (step>0&&step<4)cylinder(parent,.56,.56,.18,grounds,0,.32);
      if(step<4)mesh(new THREE.CylinderGeometry(.58,.58,1.48,32,1,true),mat('#768374',{wireframe:true,transparent:true,opacity:.18,depthWrite:false}),parent,[0,1.02,0]);
      if (step > 0) { const h = step >= 4 ? .55 : step === 1 ? Math.max(.05, p * 1.35) : 1.35; cylinder(parent, .6, .6, h, coffee, 0, .37 + h / 2); }
      cylinder(parent, .7, .7, .12, celadon, step > 1 ? 0 : 1.1, step > 1 ? 1.98 : .2);
      if (step >= 4) cup(parent, { x: 1.15, z: .55, height: .85, radius: .35, fill: .65 });

    } else {
      for(const x of [-.65,.65])box(parent,.17,.115,.8,dark,x,.1125,-.2);
      box(parent, 1.6, 1.7, .8, celadon, 0, 1.13, -.43); box(parent, 1.74, .1, 1.15, metal, 0, .22, -.2);
      box(parent, 1.67, .12, .88, cream, 0, 2.02, -.43); cylinder(parent, .22, .25, .25, metal, 0, 1.28, .08);
      const dial = cylinder(parent, .17, .17, .04, cream, -.44, 1.73, .005); dial.rotation.x = Math.PI / 2;
      box(parent, .016, .13, .02, dark, -.42, 1.77, .035); sphere(parent, .045, brass, .47, 1.75, .02);
      tube(parent, [[.7, 1.4, .05], [.83, 1.2, .24], [.83, .65, .24]], .026, metal);
      if (step > 1) { cylinder(parent, .23, .23, .1, dark, 0, 1.1, .15); const handle = cylinder(parent, .07, .08, .65, dark, -.42, 1.08, .15); handle.rotation.z = Math.PI / 2; }
      cup(parent, { z: .44, y:.30, height: .54, radius: .29, fill: step >= 5 ? .8 : step >= 4 ? Math.max(.02,p*.8) : 0, froth: step >= 4 ? .07 : 0 });
      if(step===4&&state.animating)for(const x of [-.07,.07])tube(parent,[[x,1.05,.21],[x,.89,.32],[x,.43+p*.32,.44]],.012,coffee);
      box(parent,.75,.03,.65,dark,0,.285,.44);
    }
  }
  function diyScene(parent) {
    const phase = state.phase || 'ingredients';
    if (phase === 'beans' || phase === 'choose' || phase === 'weight' || phase === 'weigh' || phase === 'grind' || phase === 'grinding') {
      box(parent, 1.3, .155, 1.3, dark, 0, .1325, .15);
      cylinder(parent, .65, .55, .12, celadon, 0, .27, .1);
      if(phase==='grind'||phase==='grinding'){const amount=phase==='grind'?1:Math.min(1,(state.progress||0)/100);if(amount>0)cylinder(parent,.5,.5,.02+amount*.11,grounds,0,.33+(.02+amount*.11)/2,.1);if(amount<1)scattered(parent,Math.ceil(38*(1-amount)),coffee,.52,.38);}else scattered(parent,38,coffee,.52,.38);
      const grinder = new THREE.Group(); grinder.position.set(1.15, .1, -.35); parent.add(grinder);
      cylinder(grinder,.29,.29,.08,dark,0,-.005);cylinder(grinder, .28, .28, 1.13, celadon, 0, .6); cylinder(grinder, .33, .28, .28, glass, 0, 1.3);
      const crank=new THREE.Group();crank.rotation.y=phase==='grinding'?(state.progress||0)/100*Math.PI*6:0;grinder.add(crank);tube(crank,[[0,1.5,0],[.4,1.5,0],[.4,1.4,0]],.025,brass);sphere(crank,.06,dark,.4,1.4);
      return;
    }
    if (phase === 'brew' || phase === 'brewing' || phase === 'extract') { brewer(parent); return; }
    const items = state.ingredients || {};
    const qty = key => Math.max(0, Number(items[key]?.amount ?? items[key]) || 0);
    const milkAmount = qty('milk') + qty('oat') + qty('coconut');
    const dilution = qty('water') + qty('tonic') + qty('soda');
    const output = Number(state.params?.output) || 36;
    const color = new THREE.Color('#3b251b').lerp(new THREE.Color('#dfc49b'), Math.min(.91, milkAmount / (milkAmount + output) * 1.06));
    if (qty('chocolate')) color.lerp(new THREE.Color('#543023'), .3);
    if (dilution) color.lerp(new THREE.Color('#936548'), Math.min(.45, dilution / (output + dilution) * .4));
    const liquid = mat(color, { roughness: .25 });
    const smallCup=state.method==='espresso'&&milkAmount+dilution<35&&output<=60&&!qty('icecream')&&!qty('cream');
    const height=smallCup?.64:1.02,radius=smallCup?.53:.82;
    const g = cup(parent, { height, radius, fill: 0, handle: true, y:-.025, cutaway:!!state.structure });
    g.rotation.y=-.18;
    const profile=g.userData.profile;
    const hasFoam = milkAmount > 0 ? Math.min(.27, Math.max(0, Number(state.foam) || 0) * .35) : 0;
    if (state.structure) {
      const foamFraction = Math.max(0, Math.min(1, Number(state.foam) || 0));
      const sectionMilk=mat('#ccb58d',{roughness:.5});
      const layers = [
        [output, coffee], [qty('water'), water],
        [qty('tonic'), mucilage, 'bubbles'], [qty('soda'), water, 'bubbles'],
        [qty('milk') * (1 - foamFraction), sectionMilk],
        [qty('oat') * (1 - foamFraction), parchment],
        [qty('coconut') * (1 - foamFraction), foam],
        [qty('chocolate'), coffee], [qty('vanilla'), mucilage], [qty('caramel'), pulp],
        [milkAmount * foamFraction, foam],
      ].filter(([amount]) => amount > 0);
      // A true half-vessel: all bands follow the same inner taper and cut plane.
      const total = layers.reduce((sum, [amount]) => sum + amount, 0);
      const weights=layers.map(([amount])=>Math.max(.025,amount/total));
      const weightTotal=weights.reduce((a,b)=>a+b,0);
      const available=(profile.rim-profile.floor)*(qty('icecream')?.36:.82);
      let y=profile.floor;
      layers.forEach(([amount,material,bubbles],i)=>{
        const h=weights[i]/weightTotal*available;
        const sectionMaterial=material.transparent?mat(material.color,{roughness:.5}):material;
        beverageBand(g,profile,y,y+h,sectionMaterial);
        if(bubbles)for(let j=0;j<4;j++)sphere(g,.018,cream,-.3+j*.18,y+h*.5,-.04);
        y+=h;
      });
      if(qty('ice'))for(let i=0;i<3;i++){
        const ice=box(g,.15,.16,.17,glassEdge,-.23+i*.22,y-.07,-.13);ice.rotation.y=i;
      }
      if(qty('icecream')){sphere(g,.38,cream,0,y+.22,-.10,[1,.88,1]);y+=.5;}
      if(qty('cream'))for(let i=0;i<5;i++)ring(g,.27-i*.046,.05,cream,0,y+.04+i*.065,-.14);
    } else {
      // Visual fill only: grams and millilitres are never combined as a measured volume.
      const baseFill=qty('icecream')?.36:smallCup?.76:.80;
      const fillHeight=(profile.rim-profile.floor)*Math.min(.9,baseFill+(milkAmount+dilution)/2000);
      const surface=Math.min(profile.rim-.10,profile.floor+fillHeight);
      const foamHeight=Math.min(hasFoam,surface-profile.floor-.08);
      beverageBand(g,profile,profile.floor,surface-foamHeight,liquid);
      if(foamHeight>0){
        const band=beverageBand(g,profile,surface-foamHeight,surface,foam);
        const spiral=Array.from({length:90},(_,i)=>{const a=i/90*Math.PI*6,r=band.topRadius*.68*(1-i/100);return [Math.cos(a)*r,surface+.004,Math.sin(a)*r];});
        tube(g,spiral,.009,cream);
      }
      if(qty('ice'))for(let i=0;i<4;i++){const ice=box(g,.18,.16,.19,glassEdge,Math.cos(i*2)*.22,surface-.05,Math.sin(i*2)*.22);ice.rotation.y=i;}
      let toppingY=surface;
      if(qty('icecream')){sphere(g,.38,cream,0,toppingY+.22,0,[1,.9,1]);toppingY+=.5;}
      if(qty('cream'))for(let i=0;i<5;i++)ring(g,.28-i*.052,.06,cream,0,toppingY+.04+i*.075);
      if(qty('tonic')+qty('soda')>0)for(let i=0;i<18;i++){const bubbleY=profile.floor+.06+(surface-profile.floor-.13)*(i%8)/7;const r=profile.inner(bubbleY)*.65;sphere(g,.014+i%3*.004,glassEdge,Math.cos(i*2.4)*r,bubbleY,Math.sin(i*2.4)*r);}

    }
  }
  function clearModel() {
    if (!model) return;
    scene.remove(model);
    model.traverse(o => { o.geometry?.dispose(); if (o.isLine) o.material.dispose(); });
  }
  function render() { if (!disposed && !paused && !document.hidden) renderer.render(scene, camera); }
  function animate(now) {
    frame = 0;
    if (disposed || paused || document.hidden) return;
    const t = Math.min(1, (now - start) / 420);
    const eased = 1 - (1 - t) ** 3;
    model.traverse(object => {
      if (object.userData.flow) {
        const ripple = Math.sin(t * Math.PI * 5) * (1 - t);
        object.scale.set(1 + ripple * .025, .97 + eased * .03, 1 + ripple * .035);
      }
      if (object.userData.settling) {
        const { y, height } = object.userData.settling;
        object.scale.y = .92 + eased * .08;
        object.position.y = y - height * (1 - object.scale.y) / 2;
      }
    });
    render();
    if (t < 1) frame = requestAnimationFrame(animate);
  }
  function resize() {
    const w = Math.max(1, container.clientWidth), h = Math.max(1, container.clientHeight);
    renderer.setSize(w, h, false); camera.aspect = w / h;
    const distance = camera.aspect < 1.1 ? 7.35 : 6.3;
    if(cupView()){camera.position.set(1.6,2.3,camera.aspect<1.1?4.1:3.3);camera.lookAt(0,.65,0);}else{camera.position.set(2.7,3.2,distance);camera.lookAt(0,1.12,0);}camera.updateProjectionMatrix();render();
  }
  function update(next = {}) {
    if (disposed) return;
    state = { ...state, ...next, params: { ...state.params, ...next.params } };
    clearModel();
    table.material=cupView()?shadowTable:solidTable;
    // Materials created for a dynamic beverage are owned by the instance.
    // Drop unused ones on each update rather than accumulating a material per drag.
    for (const m of [...materials]) if (m.userData.dynamic) { m.dispose(); materials.delete(m); }
    model = new THREE.Group(); scene.add(model); commonTable(model);
    const before = new Set(materials);
    if (state.kind === 'processing') processScene(model);
    else if (state.kind === 'diy') diyScene(model);
    else brewer(model);
    for (const m of materials) if (!before.has(m)) m.userData.dynamic = true;
    cancelAnimationFrame(frame); frame = 0;
    if(reduced.matches||paused||state.animating)render();
    else { start = performance.now(); frame = requestAnimationFrame(animate); }
  }
  let down = null;
  function pointerDown(event) { down = { x: event.clientX, y: event.clientY }; }
  function pointerMove(event) {
    if (!down || !onGesture) return;
    const rect = renderer.domElement.getBoundingClientRect();
    onGesture({ x: Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)), y: Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height)), dx: (event.clientX - down.x) / rect.width, dy: (event.clientY - down.y) / rect.height, type: 'drag' });
  }
  function pointerUp(event) {
    if (!down || !onGesture) return;
    const rect = renderer.domElement.getBoundingClientRect();
    onGesture({ x: Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)), y: Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height)), dx: (event.clientX - down.x) / rect.width, dy: (event.clientY - down.y) / rect.height, type: Math.hypot(event.clientX - down.x, event.clientY - down.y) > 12 ? 'drag' : 'click' });
    down = null;
  }
  renderer.domElement.addEventListener('pointerdown', pointerDown);
  renderer.domElement.addEventListener('pointerup', pointerUp);
  renderer.domElement.addEventListener('pointermove', pointerMove);
  function visibility() { if (document.hidden) cancelAnimationFrame(frame); else render(); }
  document.addEventListener('visibilitychange', visibility);
  const observer = new ResizeObserver(resize); observer.observe(container);
  update(); resize();
  return {
    update,
    pause(value = true) { paused = value; cancelAnimationFrame(frame); frame = 0; if (!paused) render(); },
    dispose() {
      if (disposed) return;
      disposed = true; cancelAnimationFrame(frame); observer.disconnect(); clearModel();
      table.geometry.dispose(); materials.forEach(m => m.dispose()); environment.dispose(); grain.dispose(); glazeMap.dispose();
      document.removeEventListener('visibilitychange', visibility);
      renderer.domElement.removeEventListener('pointerdown', pointerDown); renderer.domElement.removeEventListener('pointerup', pointerUp); renderer.domElement.removeEventListener('pointermove', pointerMove);
      renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
    },
  };
}

// Geometry-free alternative. The same state changes both illustrations and controls.
export function fallbackHTML(state = {}) {
  const n = value => Math.max(0, Number(value) || 0);
  const step = n(state.step), p = Math.min(1, n(state.progress) / 100);
  const process = typeof state.process === 'object' ? state.process.id : state.process || state.method;
  const ingredientView=state.kind==='diy'&&!['beans','choose','weight','weigh','grind','grinding','brew','brewing','extract'].includes(state.phase);
  const background = `<defs><linearGradient id="studio-ceramic"><stop stop-color="#617b6c"/><stop offset=".42" stop-color="#b0bda5"/><stop offset=".7" stop-color="#8ca58f"/><stop offset="1" stop-color="#4f6c55"/></linearGradient><linearGradient id="studio-paper" x2="0" y2="1"><stop stop-color="#eee9da"/><stop offset="1" stop-color="#d4cfb9"/></linearGradient><linearGradient id="studio-glass" x2="1" y2="0"><stop stop-color="#fbfaf3" stop-opacity=".7"/><stop offset=".55" stop-color="#b5c9bd" stop-opacity=".12"/><stop offset="1" stop-color="#91a799" stop-opacity=".5"/></linearGradient></defs>${ingredientView?'':'<rect width="600" height="380" fill="url(#studio-paper)"/>'}<ellipse cx="300" cy="325" rx="205" ry="26" fill="#6a7055" opacity=".12"/><path d="M70 321H530" stroke="#bcae8b"/>`;
  const bean = (x,y,color='#4d3022',scale=1) => `<g transform="translate(${x} ${y}) rotate(-28) scale(${scale})"><ellipse rx="13" ry="19" fill="${color}"/><path d="M2-14C-10-4 7 3-2 15" fill="none" stroke="#352b21" stroke-width="1.8"/></g>`;
  const label = (text,x,y) => `<text x="${x}" y="${y}" font-family="sans-serif" font-size="16" text-anchor="middle" fill="#36483c">${text}</text>`;
  const cup = (x=300,y=250,h=110,fill=.7,light=false,section=false) => `<g transform="translate(${x} ${y})"><ellipse cy="${h*.56}" rx="78" ry="13" fill="#81977c"/><path d="M 50 ${-h*.4} C 95 ${-h*.5} 93 ${h*.35} 48 ${h*.25}" fill="none" stroke="#6e8b70" stroke-width="12"/><path d="M -54 ${-h/2} C -57 ${h*.03} -37 ${h*.52} -20 ${h*.53} Q 0 ${h*.58} 20 ${h*.53} C 37 ${h*.52} 57 ${h*.03} 54 ${-h/2} Z" fill="url(#studio-ceramic)" stroke="#526d55" stroke-width="2"/><ellipse cy="${-h/2}" rx="54" ry="9" fill="#ded7bf" stroke="#647f65" stroke-width="3"/>${section?`<path d="M -48 ${-h/2} C -51 ${h*.02} -33 ${h*.46} -17 ${h*.47} Q 0 ${h*.51} 17 ${h*.47} C 33 ${h*.46} 51 ${h*.02} 48 ${-h/2}" fill="#e6dcc2"/>`:fill?`<ellipse cy="${-h/2+2}" rx="45" ry="6" fill="${light?'#d8ba90':'#513021'}"/>`:''}<path d="M-47 ${-h*.36}l6 ${h*.6}" stroke="#d5dfc2" opacity=".3" stroke-width="4" stroke-linecap="round"/></g>`;
  let content = '';
  if (state.kind === 'processing') {
    const layers = step >= 4 ? [[50,'#94a77b','生豆']] : [
      [115, step >= 3 ? '#9e744b' : '#8c3f42','果皮',process === 'natural' || step === 0],
      [99,'#d39571','果肉',process === 'natural' || step === 0],
      [83,'#d6b66d','果胶',process === 'natural' || process === 'honey' || step === 0 || process === 'washed' && step === 1],
      [67,'#d9cda7','羊皮层',!(process === 'wet-hulled' && step >= 3)],
      [48,'#94a77b','种子',true],
    ].filter(row=>row[3]!==false);
    if (step >= 4) content = Array.from({length:8},(_,i)=>bean(210+i%4*60,190+Math.floor(i/4)*65,'#94a77b',1.2)).join('') + label('已脱壳 · 生豆',300,110);
    else {
      content = layers.map(([r,color,text],i)=>`<ellipse cx="250" cy="197" rx="${r}" ry="${r*1.1}" fill="${color}"/><path d="M${250+r} ${197-r*.55}H${430+i*5}" stroke="${color}" stroke-width="2"/>${label(text,485,118+i*35)}`).join('');
      content += bean(234,197,'#94a77b',1.7)+bean(267,197,'#94a77b',1.7);
      content += `<path d="M250 76q-5-30 15-39" fill="none" stroke="#52664d" stroke-width="7"/>`;
      if (state.cutaway === false && step === 0) content = `<ellipse cx="270" cy="197" rx="105" ry="119" fill="#8c3f42"/><ellipse cx="236" cy="161" rx="14" ry="30" fill="#c77c73" opacity=".45"/><path d="M270 76q-5-30 15-39" fill="none" stroke="#52664d" stroke-width="7"/>${label('完整咖啡果',460,190)}`;
    }
  } else if (state.kind === 'diy' && ['choose','weight','weigh','beans','grind','grinding'].includes(state.phase)) {
    content=`<rect x="180" y="255" width="220" height="46" rx="8" fill="#364b40"/><ellipse cx="290" cy="252" rx="100" ry="27" fill="#a6b7a0"/>`;
    content+=['grind','grinding'].includes(state.phase)?`<ellipse cx="290" cy="247" rx="77" ry="20" fill="#513424"/>${label('咖啡粉',290,200)}`:Array.from({length:9},(_,i)=>bean(233+i%3*45,210+Math.floor(i/3)*13,'#543827',.6)).join('');
    content+=label(`${n(state.params?.dose)||18} g`,290,286);
  } else if (state.kind === 'diy' && !['brew','brewing','extract'].includes(state.phase)) {
    const items = state.ingredients || {}, qty = k => n(items[k]?.amount ?? items[k]);
    const milk = qty('milk') + qty('oat') + qty('coconut');
    content=cup(300,218,82,state.structure?0:.75,milk>0,!!state.structure);
    if (state.structure) {
      const fraction = Math.min(1,n(state.foam));
      const parts = [
        [n(state.params?.output)||36,'#513021','咖啡液'],
        [qty('water'),'#99b9b2','水'],[qty('tonic'),'#d1ba82','汤力水'],[qty('soda'),'#abd0c6','苏打水'],
        [qty('milk')*(1-fraction),'#e8d7b5','牛奶'],[qty('oat')*(1-fraction),'#ccb78e','燕麦奶'],[qty('coconut')*(1-fraction),'#eae2d0','椰乳'],
        [qty('chocolate'),'#5c3424','巧克力酱'],[qty('vanilla'),'#c7ad6d','香草糖浆'],[qty('caramel'),'#b9794d','焦糖糖浆'],
        [milk*fraction,'#f5ecd8','奶泡'],[qty('ice'),'#b1d0c6','冰'],[qty('icecream'),'#ead8b2','冰淇淋'],[qty('cream'),'#f2e5cd','打发奶油'],
      ].filter(([amount])=>amount>0);
      const total=parts.reduce((sum,[amount])=>sum+amount,0);
      const weights=parts.map(([amount])=>Math.max(.025,amount/total)),weightTotal=weights.reduce((a,b)=>a+b,0);
      let bottom=256;
      content+='<defs><clipPath id="cup-interior"><path d="M252 177H348C351 219 333 255 317 256Q300 260 283 256C267 255 249 219 252 177Z"/></clipPath></defs>';
      content+=parts.map(([amount,color,name],i)=>{
        const height=weights[i]/weightTotal*76,top=bottom-height,center=(top+bottom)/2;bottom=top;
        return `<rect x="250" y="${top}" width="100" height="${height}" fill="${color}" clip-path="url(#cup-interior)"/><path d="M350 ${center}h25" stroke="${color}" stroke-width="2"/><text x="383" y="${center+4}" font-family="sans-serif" font-size="11" fill="#36483c">${name}</text>`;
      }).join('');
      content+=label('陶瓷杯剖面 · 色层表示配方组成',300,45);
    } else {
      if (milk && n(state.foam)) content+=`<ellipse cx="300" cy="178" rx="45" ry="12" fill="#f1e7d4"/>`;
      if(qty('cream')||qty('icecream'))content+=`<path d="M259 179q3-21 18-21q-2-22 21-29q19 9 17 29q22 0 25 21Z" fill="#f2e5cd"/>`;
      if(qty('ice'))content+=`<path d="m276 173 17-4 6 13-19 3zm28 2 20-6 8 13-21 5" fill="#bbd2c9" opacity=".7"/>`;

    }
  } else {
    const method=state.method || 'pour-over';
    if(method==='pour-over') {
      content=cup(280,263,90,step>=4?.8:step>=3?.3+p*.5:0);
      content+=`<path d="M191 134H369L301 221H259Z" fill="#8ca38e" stroke="#506a58" stroke-width="3"/>${step>0?'<path d="M204 141H355L296 209H267Z" fill="#eee3c6"/>':''}${step>1?'<ellipse cx="280" cy="170" rx="50" ry="10" fill="#583b27"/>':''}<path d="M370 88q35-25 68 2l7 50h-69Z" fill="#809b88" stroke="#506a58" stroke-width="3"/><path d="m375 111-39-15-20 18" fill="none" stroke="#ac8c52" stroke-width="8"/>${step>=2&&step<5?`<path d="M315 113q-20 20-35 55" fill="none" stroke="#91b7ac" stroke-width="4"/>`:''}`;
    } else if(method==='moka') {
      const joined=step>=3, lowerX=joined?0:-65, upperX=joined?0:115, upperY=joined?0:110;
      const waterTop=step===0?300-p*45:255;
      content=`<g transform="translate(${lowerX} 0)"><path d="M251 203H342L363 313H231Z" fill="#a5b4a6" stroke="#607064" stroke-width="3"/><path d="M266 215H327L343 303H250Z" fill="#e5e4d4"/><circle cx="342" cy="235" r="5" fill="#a58143"/>${!joined?`<path d="M258 ${waterTop}H335L343 302H250Z" fill="#90b7af"/><path d="M249 249h92" stroke="#9f7838" stroke-dasharray="5 5"/>`:''}</g><g transform="translate(${upperX} ${upperY})"><path d="M244 112H350L338 202H255Z" fill="#779481" stroke="#506a58" stroke-width="3"/><path d="M250 109 288 94h27l33 15" fill="#bac8b8"/><path d="M349 129q58 0 21 59" fill="none" stroke="#344b3c" stroke-width="13"/></g>`;
      if(!joined)content+=`<path d="M98 263h65l-22 22h-12Z" fill="#9ba99a"/><path d="M135 284v29" stroke="#7d887a" stroke-width="9"/>${label('剖面示意 · 水位低于安全阀',300,354)}`;
      if(step>=5)content+=cup(440,279,55,.7);
    } else if(method==='espresso') {
      content=`<rect x="187" y="76" width="229" height="223" rx="9" fill="#79927e"/><rect x="179" y="73" width="245" height="16" rx="4" fill="#c2c5b0"/><rect x="208" y="171" width="185" height="126" fill="#364b3c"/><circle cx="235" cy="123" r="22" fill="#e5d9bd"/><path d="m235 123 11-13" stroke="#455a47" stroke-width="3"/><circle cx="377" cy="123" r="7" fill="#c6a268"/><path d="M270 181h59v23h-59z" fill="#b7bba7"/><path d="M270 193h-49" stroke="#292f25" stroke-width="12"/>`;
      content+=cup(300,267,60,step>=5?.8:step===4?p:0);
      if(step===4)content+=`<path d="M287 204v31m24-31v31" stroke="#8b6039" stroke-width="3"/>`;
    } else {
      const aero=method==='aeropress',cold=method==='cold-brew';
      const press = !cold && (step >= (aero?5:4) ? 1 : step===(aero?4:3)?p:0);
      content=`<path d="M227 112H355V293Q290 319 227 293Z" fill="url(#studio-glass)" stroke="#79927c" stroke-width="3"/>${step>0?`<path d="M232 ${step>1?165:280}H350V288Q290 311 232 288Z" fill="#63442e"/>`:''}<path d="M223 104H359V119H223Z" fill="#77917c"/>`;
      if(!cold)content+=`<path d="M291 ${50+press*105}V${142+press*110}" stroke="#a5aa97" stroke-width="7"/><path d="M236 ${142+press*110}H347" stroke="#526250" stroke-width="8"/><ellipse cx="291" cy="${50+press*105}" rx="24" ry="9" fill="#344b3c"/>`;
      else content+=`<rect x="220" y="93" width="142" height="18" rx="8" fill="#77917c"/>`;
      if(step>=4)content+=cup(440,279,64,.6);
      if(aero)content+=label('正置压滤',430,160);
    }
  }
  return `<svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="width:100%;height:100%;display:block">${background}${content}</svg>`;
}
