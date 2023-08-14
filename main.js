import * as THREE from 'three';
import "./style.css"
import {OrbitalControls} from "three/examples/jsm/controls/OrbitalControls"

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const gemotery =new THREE.SphereGeometry(3,64,64);
const material = new THREE.MeshBasicMaterial({
   colour: "#00ff83",
})
const mesh = new THREE.Mesh(gemotery,material)
scene.add(mesh)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const light = new THREE.PointLight(0xffffff, 1,100)
light.position.set(0,10,10)
scene.add(light)

const camera = new THREE.PerspectiveCamera(45,sizes.width / sizes.height,0.1,100)
camera.position.z = 20
scene.add(camera)



const canvas = document.querySelector('webgl');
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width,sizes.height)
render.setPixelRatio(2)
renderer.render(scene, camera)


const controls = new THREE.Control(camera, canvas)
controls.enableDamaging = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoScaleSpeed = 5




window.addEventListener('resize', () => {
    
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.updateProjectionMatrix()
    camera.aspect = sizes.width / sizes.height
    renderer.setSize(sizes.width,sizes.height)
})

const loop = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}
loop()
