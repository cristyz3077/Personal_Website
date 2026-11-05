import * as THREE from './vendor/three/three.module.js';
import { RoomEnvironment } from './vendor/three/RoomEnvironment.js';

const gallery=document.querySelector('#instrument-gallery');
const names={piano:'Piano',flute:'Flute',guitar:'Guitar',saxophone:'Saxophone'};
gallery.innerHTML=Object.entries(names).map(([key,name],i)=>`<figure class="glass-instrument"><div class="specimen-meta"><span>0${i+1}</span><span>${name.toUpperCase()}</span></div><div class="instrument-stage" data-model="${key}" tabindex="0" role="group" aria-label="${name}, interactive 3D crystal. Drag or use arrow keys to rotate. Home resets the view."></div><figcaption>${name}</figcaption></figure>`).join('');
const canvas=document.createElement('canvas');canvas.className='crystal-canvas';canvas.setAttribute('aria-hidden','true');gallery.append(canvas);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let renderer;
try { renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'low-power'}); }
catch { gallery.innerHTML='<p class="crystal-unavailable">The crystal collection needs a browser with 3D graphics enabled.</p>';throw new Error('WebGL unavailable'); }
renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor(0x000000,0);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.95;
const pmrem=new THREE.PMREMGenerator(renderer);const room=new RoomEnvironment();const environment=pmrem.fromScene(room,.04);room.dispose();pmrem.dispose();
const glass=new THREE.MeshPhysicalMaterial({color:0xe9edff,metalness:0,roughness:.055,transmission:1,thickness:.48,ior:1.52,dispersion:.065,clearcoat:1,clearcoatRoughness:.035,envMapIntensity:1.1,specularIntensity:.65,attenuationColor:0xb9d8ff,attenuationDistance:3,iridescence:.18,iridescenceIOR:1.3});
const lilac=glass.clone();lilac.color.set(0xd6c4ff);lilac.thickness=.65;
const detail=new THREE.MeshPhysicalMaterial({color:0xcbd9f8,metalness:.3,roughness:.18,clearcoat:1});
const darkGlass=glass.clone();darkGlass.color.set(0x6d648e);darkGlass.transmission=.65;
function mesh(parent,geometry,material=glass,x=0,y=0,z=0){const m=new THREE.Mesh(geometry,material);m.position.set(x,y,z);parent.add(m);return m;}
function box(g,w,h,d,x,y,z,mat=glass){return mesh(g,new THREE.BoxGeometry(w,h,d),mat,x,y,z);}
function rod(g,a,b,r=.025,mat=glass){const av=new THREE.Vector3(...a),bv=new THREE.Vector3(...b),m=mesh(g,new THREE.CylinderGeometry(r,r,av.distanceTo(bv),12),mat);m.position.copy(av).add(bv).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),bv.sub(av).normalize());return m;}
function extrude(g,shape,depth,mat=glass){const geo=new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelThickness:.045,bevelSize:.045,bevelSegments:3,steps:1,curveSegments:28});geo.translate(0,0,-depth/2);return mesh(g,geo,mat);}
function piano(g){
 const s=new THREE.Shape();s.moveTo(-.85,-.55);s.lineTo(.85,-.55);s.lineTo(.85,.1);s.bezierCurveTo(.85,.95,.4,1.13,-.25,.9);s.bezierCurveTo(-.6,.8,-.85,.55,-.85,.1);s.closePath();
 const body=extrude(g,s,.22,lilac);body.rotation.x=-Math.PI/2;body.position.y=.05;
 const lid=extrude(g,s,.055);lid.rotation.x=-Math.PI/2-.38;lid.position.set(0,.72,.03);
 for(const x of [-.72,.72]) rod(g,[x,-.03,.58],[x,-.95,.58],.055);
 rod(g,[.25,.03,-.8],[.25,-.95,-.8],.055);
 box(g,1.7,.12,.43,0,.07,.75);
 for(let i=0;i<21;i++){box(g,.072,.045,.37,-.79+i*.079,.16,.77,glass);if(![2,6].includes(i%7)&&i<20)box(g,.042,.06,.2,-.75+i*.079,.2,.69,darkGlass);}
 rod(g,[.63,.18,-.25],[.63,.94,-.25],.018,detail);
 for(let i=0;i<15;i++)rod(g,[-.57+i*.08,.185,-.47],[-.57+i*.08,.185,.3],.004,detail);
 box(g,.5,.04,.26,0,-.75,.45,detail);
 g.rotation.y=-.45;
}
function guitar(g){
 const s=new THREE.Shape();s.moveTo(0,.35);s.bezierCurveTo(.24,.75,.65,.55,.48,.13);s.bezierCurveTo(.42,-.08,.82,-.27,.62,-.72);s.bezierCurveTo(.41,-1.08,-.41,-1.08,-.62,-.72);s.bezierCurveTo(-.82,-.27,-.42,-.08,-.48,.13);s.bezierCurveTo(-.65,.55,-.24,.75,0,.35);
 const hole=new THREE.Path();hole.absarc(0,-.18,.17,0,Math.PI*2,true);s.holes.push(hole);extrude(g,s,.26,lilac);
 box(g,.17,1.2,.13,0,.94,.03);box(g,.25,.4,.14,0,1.65,.025);box(g,.48,.08,.055,0,-.66,.2,detail);
 const ring=mesh(g,new THREE.TorusGeometry(.19,.015,8,64),detail,0,-.18,.185);
 for(let i=0;i<6;i++){const x=(i-2.5)*.023;rod(g,[x,-.66,.24],[x,1.8,.15],.0035,detail);}
 for(let i=0;i<12;i++)box(g,.18,.009,.015,0,.37+i*.088,.107,detail);
 for(let i=0;i<3;i++)for(const x of [-.18,.18]){rod(g,[0,1.52+i*.12,.03],[x,1.52+i*.12,.03],.015,detail);mesh(g,new THREE.SphereGeometry(.045,12,8),glass,x,1.52+i*.12,.03);}
 g.rotation.z=-.22;
}
function flute(g){
 const tube=mesh(g,new THREE.CylinderGeometry(.105,.105,3,48,1,true),glass);tube.rotation.z=-Math.PI/2;
 for(let i=0;i<10;i++){const x=-1.03+i*.22;const key=mesh(g,new THREE.CylinderGeometry(.09,.09,.035,24),glass,x,.14,.04);rod(g,[x,.12,.04],[x,.12,-.13],.013,detail);}
 rod(g,[-1.05,.02,-.13],[1.15,.02,-.13],.018,detail);
 for(const x of [-1.4,-1.18,1.22,1.4]){const band=mesh(g,new THREE.TorusGeometry(.108,.014,8,48),detail,x,0,0);band.rotation.y=Math.PI/2;}
 const lip=mesh(g,new THREE.SphereGeometry(.16,24,12),glass,-1.21,.08,.03);lip.scale.set(1,.3,.7);
 g.rotation.z=.65;g.rotation.x=.2;
}
function saxophone(g){
 const pts=[[.05,1.15,0],[.32,1.12,0],[.4,.85,0],[.37,.2,0],[.3,-.55,0],[.12,-.88,0],[-.25,-.83,0],[-.44,-.48,0],[-.45,-.17,0]].map(p=>new THREE.Vector3(...p));
 const curve=new THREE.CatmullRomCurve3(pts);mesh(g,new THREE.TubeGeometry(curve,100,.115,20,false),lilac);
 const profile=[new THREE.Vector2(.115,0),new THREE.Vector2(.13,.16),new THREE.Vector2(.19,.3),new THREE.Vector2(.29,.46),new THREE.Vector2(.31,.48)];const bell=mesh(g,new THREE.LatheGeometry(profile,64),glass,-.45,-.22,0);bell.rotation.z=.12;
 const rim=mesh(g,new THREE.TorusGeometry(.31,.018,10,64),detail,-.51,.255,0);rim.rotation.x=Math.PI/2;rim.rotation.y=.12;
 rod(g,[.05,1.15,0],[-.22,1.28,0],.055,darkGlass);
 for(let i=0;i<7;i++){const y=.8-i*.18;const k=mesh(g,new THREE.CylinderGeometry(.075,.075,.045,24),glass,.38,y,.15);k.rotation.x=Math.PI/2;rod(g,[.38,y,.1],[.52,y,.05],.012,detail);}
 rod(g,[.52,.85,.05],[.52,-.52,.05],.015,detail);g.rotation.z=-.15;
}
// Muted color lives within the transparent glass, strongest along thick edges.
const crystalTints={piano:0xd6c2ec,flute:0xc6e4ed,guitar:0xebc6d3,saxophone:0xffefb8};
function tintInstrument(model,key){
 const tint=new THREE.Color(crystalTints[key]);
 const materials=new Map();
 model.traverse(object=>{
  if(!object.isMesh)return;
  const original=object.material;
  if(!materials.has(original)){
   const material=original.clone();
   if(material.transmission>.9){
    material.color.copy(tint);
    material.attenuationColor.copy(tint);
    material.attenuationDistance=key==='saxophone'?1.6:.85;
    material.thickness=Math.max(material.thickness,.55);
    material.iridescence=.1;
   }else if(material.transmission<.1){
    material.color.lerp(tint,.4);
   }
   materials.set(original,material);
  }
  object.material=materials.get(original);
 });
}
const makers={piano,flute,guitar,saxophone};const views=[];
for(const stage of gallery.querySelectorAll('.instrument-stage')){
 const scene=new THREE.Scene();scene.environment=environment.texture;
 const camera=new THREE.PerspectiveCamera(34,1,.1,30);camera.position.set(0,1,6.4);camera.lookAt(0,.05,0);
 scene.add(new THREE.HemisphereLight(0xe2eaff,0x644e83,1.15));
 for(const [color,power,pos] of [[0xfff4f0,4,[3,4,2]],[0xc2a4ff,5,[-3,1,-2]],[0x98ebff,4.5,[2,1,-3]]]){const l=new THREE.PointLight(color,power,20);l.position.set(...pos);scene.add(l);}
 const pivot=new THREE.Group();scene.add(pivot);const model=new THREE.Group();pivot.add(model);makers[stage.dataset.model](model);tintInstrument(model,stage.dataset.model);
 // Normalize the different instrument silhouettes to a common display scale.
 const bounds=new THREE.Box3().setFromObject(model),size=bounds.getSize(new THREE.Vector3()),center=bounds.getCenter(new THREE.Vector3());const scale=2.65/Math.max(size.x,size.y,size.z);model.scale.setScalar(scale);model.position.copy(center).multiplyScalar(-scale);model.position.y+=.12;
 const plinth=mesh(scene,new THREE.CylinderGeometry(1.22,1.3,.13,96),new THREE.MeshPhysicalMaterial({color:0xcbbde6,metalness:.7,roughness:.19,clearcoat:1}),0,-1.48,0);
 mesh(scene,new THREE.CylinderGeometry(1.1,1.22,.09,96),glass,0,-1.38,0);
 const halo=mesh(scene,new THREE.TorusGeometry(1.19,.008,8,128),new THREE.MeshBasicMaterial({color:0xd9c7ff}),0,-1.4,0);halo.rotation.x=Math.PI/2;
 const view={stage,scene,camera,pivot,yaw:.25,pitch:0,velocity:0,dragging:false,visible:true,lastX:0,lastY:0};views.push(view);
 stage.addEventListener('pointerdown',e=>{if(e.button!==0)return;view.dragging=true;view.lastX=e.clientX;view.lastY=e.clientY;view.velocity=0;stage.setPointerCapture(e.pointerId);stage.classList.add('is-dragging');stage.focus({preventScroll:true});});
 stage.addEventListener('pointermove',e=>{if(!view.dragging)return;const dx=e.clientX-view.lastX;view.yaw+=dx*.012;view.pitch=THREE.MathUtils.clamp(view.pitch+(e.clientY-view.lastY)*.008,-.7,.7);view.velocity=dx*.006;view.lastX=e.clientX;view.lastY=e.clientY;});
 const release=()=>{view.dragging=false;stage.classList.remove('is-dragging');if(reduced.matches)view.velocity=0;};for(const event of ['pointerup','pointercancel','lostpointercapture'])stage.addEventListener(event,release);
 stage.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(e.key))return;e.preventDefault();view.velocity=0;if(e.key==='Home'){view.yaw=.25;view.pitch=0;}else{view.yaw+=e.key==='ArrowLeft'?-.18:e.key==='ArrowRight'?.18:0;view.pitch=THREE.MathUtils.clamp(view.pitch+(e.key==='ArrowUp'?-.12:e.key==='ArrowDown'?.12:0),-.7,.7);}});
 new IntersectionObserver(entries=>{view.visible=entries[0].isIntersecting;}).observe(stage);
}
let width=0,height=0,last=0;
function render(time){requestAnimationFrame(render);if(document.hidden||time-last<32)return;const dt=Math.min((time-last)/16.67,3);last=time;const bounds=gallery.getBoundingClientRect();if(bounds.width!==width||bounds.height!==height){width=bounds.width;height=bounds.height;renderer.setSize(width,height,false);}
 renderer.setScissorTest(false);renderer.clear();renderer.setScissorTest(true);
 for(const v of views){if(!v.visible)continue;const r=v.stage.getBoundingClientRect();if(!r.width||!r.height)continue;if(!v.dragging){if(!reduced.matches){v.yaw+=(.0017+v.velocity)*dt;v.velocity*=Math.pow(.94,dt);}else v.velocity=0;}v.pivot.rotation.set(v.pitch,v.yaw,0);v.camera.aspect=r.width/r.height;v.camera.updateProjectionMatrix();const x=r.left-bounds.left,y=height-(r.bottom-bounds.top);renderer.setViewport(x,y,r.width,r.height);renderer.setScissor(x,y,r.width,r.height);renderer.render(v.scene,v.camera);}
}
requestAnimationFrame(render);
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();gallery.classList.add('context-lost');});
canvas.addEventListener('webglcontextrestored',()=>location.reload());
