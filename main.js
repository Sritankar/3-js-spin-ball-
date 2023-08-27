import * as THREE from "three"
import "./style.css"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import gsap from "gsap"
const scene=new THREE.Scene();


const  geometry=new THREE.SphereGeometry(3,64,64)
const material=new THREE.MeshStandardMaterial({
    color:"#ffffff",
    roughness:0.25,
})
const mesh=new THREE.Mesh(geometry,material)
scene.add(mesh)

const sizes={
    width:window.innerWidth,
    height:window.innerHeight,
}


const light=new THREE.PointLight(0xffffff,1,100)
light.position.set(10,10,10)
light.intensity=1.25
scene.add(light)

const camera=new THREE.PerspectiveCamera(45,sizes.width/sizes.height,0.1,100)
camera.position.z=20
scene.add(camera)

const canvas=document.querySelector(".webgl")
const Renderer=new THREE.WebGLRenderer({canvas})

Renderer.setSize(sizes.width,sizes.height)
Renderer.setPixelRatio=2
Renderer.render(scene,camera)

window.addEventListener("resize",()=>{
    sizes.width=window.innerWidth;
    sizes.height=window.innerHeight;
    camera.aspect=sizes.width/sizes.height;
    camera.updateProjectionMatrix();
    Renderer.setSize(sizes.width,sizes.height);
    
})

const control=new OrbitControls(camera,canvas)
control.enableDamping=true;
control.enablePan=false;
// control.enableZoom=false;
control.autoRotate=true;
control.autoRotateSpeed=10

const loop=()=>{

    // light.position.z-=0.1
control.update()
    Renderer.render(scene,camera)
    window.requestAnimationFrame(loop)

}

loop()


const t1=gsap.timeline({defaults:{duration:2}})
// t1.fromto("nav",{y:"-100%"},{y:"0%"})
t1.fromTo(mesh.scale,{z:0,y:0,x:0},{z:1,y:1,x:1})
t1.fromTo(".title",{opacity:0},{opacity:1})


let mousedown=false;
let rgb=[]
window.addEventListener("mousedown",()=>(mousedown=true))
window.addEventListener("mouseup",()=>(mousedown=false))

window.addEventListener("mousemove",(e)=>{
    if(mousedown){
        rgb=[
            Math.round((e.pageX/sizes.width)*255),
            Math.round((e.pageY/sizes.height)*255),
            150,
        ]
        // console.log(rbg)
        let newcolor=new THREE.Color(`rgb(${rgb.join(",")})`)
        gsap.to(mesh.material.color,{
            r:newcolor.r,
            b:newcolor.g,
            g:newcolor.b,
        })
    }
})
