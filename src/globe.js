import Globe from 'globe.gl';
import { countries, regions } from './data.js';
import { icon } from './icons.js';
import { atlasTexture, globeInstrument } from './globe-art.js';

let globe, visible = [], selectedCountry, selectedRegion, countryShapes = [], alive = false;
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');

export async function mountGlobe(container,onSelect,isCurrent) {
  const response=await fetch('/data/countries.geojson');
  if(!response.ok)throw new Error('Map data could not be loaded');
  const data=await response.json();
  if(!isCurrent())return ()=>{};
  countryShapes=data.features;
  alive=true;
  const instance=new Globe(container,{animateIn:false,rendererConfig:{antialias:true,alpha:true}});
  globe=instance;
  const resize=()=>{if(container.isConnected){instance.width(container.clientWidth).height(container.clientHeight);}};
  resize();
  instance.backgroundColor('rgba(0,0,0,0)').showAtmosphere(false).globeOffset([0,-30]);
  const texture=atlasTexture(countryShapes);
  const material=instance.globeMaterial();
  material.color.set('#ffffff');material.map=texture;material.bumpMap=texture;material.bumpScale=.14;
  material.shininess=20;material.specular.set('#504f43');material.needsUpdate=true;
  instance.lights().forEach(light=>{
    if(light.isAmbientLight)light.intensity=1.9;
    if(light.isDirectionalLight){light.intensity=2.4;light.position.set(-160,180,260);}
  });
  instance.polygonsData(countryShapes)
    .polygonCapColor(feature=>countryColor(feature.properties.ADM0_A3))
    .polygonSideColor(()=>'rgba(0,0,0,0)').polygonStrokeColor(()=>'rgba(0,0,0,0)')
    .polygonAltitude(.002).polygonsTransitionDuration(150)
    .polygonLabel(feature=>{const c=countries.find(c=>c.id===feature.properties.ADM0_A3);return c?`<span class="map-tooltip">${c.name} · ${c.en}</span>`:'';})
    .onPolygonClick(feature=>{const id=feature.properties.ADM0_A3;if(visible.some(r=>r.countryId===id))onSelect(id);})
    .onPolygonHover(feature=>{container.style.cursor=feature&&visible.some(r=>r.countryId===feature.properties.ADM0_A3)?'pointer':'grab';});
  instance.pointsData([]).pointLat('lat').pointLng('lng').pointAltitude(.012)
    .pointRadius(r=>r.id===selectedRegion ? 1.2 : .65)
    .pointColor(r=>r.id===selectedRegion?'#4f6b5a':'#927754').pointResolution(16)
    .pointLabel(r=>`<span class="map-tooltip">${r.name} · ${r.en}</span>`)
    .onPointClick(r=>onSelect(r.countryId,r.id));
  instance.htmlElementsData([]).htmlLat('lat').htmlLng('lng').htmlAltitude(.028)
    .htmlElement(country=>{const label=document.createElement('button');label.className='globe-country-label';label.innerHTML=`${country.name}<small>${country.en.toUpperCase()}</small>`;label.onclick=()=>onSelect(country.id);return label;});
  instance.pointOfView({lat:15,lng:20,altitude:2.55},0);
  const instrument=globeInstrument(instance);
  const controls=instance.controls();
  controls.enablePan=false;controls.minDistance=145;controls.maxDistance=650;controls.rotateSpeed=.65;controls.zoomSpeed=.7;
  controls.autoRotate=false;controls.autoRotateSpeed=.35;
  const motionButton=document.querySelector('#globe-motion');
  const updateMotion=()=>{motionButton.innerHTML=icon(controls.autoRotate?'pause':'play');motionButton.setAttribute('aria-pressed',String(controls.autoRotate));motionButton.setAttribute('aria-label',controls.autoRotate?'暂停自动旋转地球':'开始自动旋转地球');};
  const stopMotion=()=>{controls.autoRotate=false;updateMotion();};
  const beginExploring=stopMotion;
  controls.addEventListener('start',beginExploring);
  document.querySelector('#globe-reset').onclick=()=>{stopMotion();instance.pointOfView({lat:15,lng:20,altitude:2.55},reducedMotion.matches?0:800);};
  document.querySelector('#globe-zoom-in').onclick=()=>{beginExploring();const p=instance.pointOfView();instance.pointOfView({...p,altitude:Math.max(.5,p.altitude*.75)},reducedMotion.matches?0:350);};
  document.querySelector('#globe-zoom-out').onclick=()=>{beginExploring();const p=instance.pointOfView();instance.pointOfView({...p,altitude:Math.min(5,p.altitude*1.3)},reducedMotion.matches?0:350);};
  motionButton.onclick=()=>{controls.autoRotate=!controls.autoRotate;updateMotion();};
  const observer=new ResizeObserver(resize);observer.observe(container);
  const visibility=()=>{if(document.hidden){stopMotion();instance.pauseAnimation();}else instance.resumeAnimation();};
  document.addEventListener('visibilitychange',visibility);
  const motionChange=()=>{if(reducedMotion.matches)stopMotion();};
  reducedMotion.addEventListener('change',motionChange);
  document.querySelector('.globe-loading')?.classList.add('loaded');
  document.querySelector('.globe-loading')?.setAttribute('aria-hidden','true');
  return ()=>{alive=false;observer.disconnect();controls.removeEventListener('start',beginExploring);document.removeEventListener('visibilitychange',visibility);reducedMotion.removeEventListener('change',motionChange);instrument.destroy();texture.dispose();instance._destructor();if(globe===instance)globe=null;};
}

function countryColor(id) {
  if(id===selectedCountry)return 'rgba(71,98,68,.45)';
  return countries.some(c=>c.id===id)?'rgba(71,98,68,.30)':'rgba(0,0,0,0)';
}

export function updateGlobe(matches,country,region) {
  visible=matches;selectedCountry=country;selectedRegion=region;
  if(!globe||!alive)return;
  globe.polygonCapColor(feature=>countryColor(feature.properties.ADM0_A3));
  globe.pointsData(matches).pointRadius(r=>r.id===selectedRegion ? 1.2 : .65).pointColor(r=>r.id===selectedRegion?'#4b3438':'#91724d');
  const selected=countries.find(c=>c.id===country);
  globe.htmlElementsData(selected?[selected]:[]);
}

export function focusCountry(countryId,regionId,fly=false) {
  if(!globe)return;
  const country=countries.find(c=>c.id===countryId),region=regions.find(r=>r.id===regionId);
  if(!country)return;
  globe.controls().autoRotate=false;
  const button=document.querySelector('#globe-motion');button.innerHTML=icon('play');button.setAttribute('aria-pressed','false');button.setAttribute('aria-label','开始自动旋转地球');
  globe.pointOfView({lat:region?.lat??country.lat,lng:region?.lng??country.lng,altitude:fly?1.05:2.4},reducedMotion.matches?0:950);
}

export function getView(){return globe?.pointOfView()||null;}
export function setView(view){if(globe&&view)globe.pointOfView(view,0);}
