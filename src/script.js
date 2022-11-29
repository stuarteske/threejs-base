import './style.css'
import * as THREE from 'three'
//imported from 'three/examples/jsm/loaders/GLTFLoader' // Model loader
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import {loadManager} from './helpers/loadmanager'

// Debug
const gui = new dat.GUI()


// Settings
const settings = {
    debug: false
}
if (!settings.debug) dat.GUI.toggleHide();
const s1 = gui.addFolder('Settings');
s1.add(settings, 'debug')
    .onChange(() => {
        setDebug(settings.debug)
        //console.log(settings.debug);
    })

// Loader
const textureloader = new THREE.TextureLoader(loadManager);

// Normal Maps
//const alienTexture = textureloader.load('/textures/normalmaps/alientech01.filterforge.com.jpg');
//const cellsTexture = textureloader.load('/textures/normalmaps/cells01.keithlantz.net.png');
//const circlegridTexture = textureloader.load('/textures/normalmaps/circlegrid01.jpg');
//const tileTexture = textureloader.load('/textures/normalmaps/tilenormal01.filterforge.com.jpg');
const weaveTexture = textureloader.load('/textures/normalmaps/unstableweave.filterforge.com.jpg');



// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusKnotGeometry( 10, 1.7, 400, 50 );


// Materials
// Basic
// const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
// Toon
// const material = new THREE.MeshToonMaterial( {color: 0xab9cf7} );
// Physical
const material = new THREE.MeshPhysicalMaterial( {
    color: 0xab9cf7
    ,roughness: 0.2
    ,metalness: 0.7
    ,refelectivness: 0.8
    ,clearcoat: 0.5
    ,clearcoatRoughness: 0.2
    ,normalMap: weaveTexture
    //,roughnessMap: 'bricks'
} );

// Mesh
const torusKnot = new THREE.Mesh( geometry, material );
scene.add(torusKnot)

// Lights
const ambientLight = new THREE.AmbientLight( 0x404040, 0 ); // soft white light
ambientLight.active = false;
scene.add( ambientLight );
const f4 = gui.addFolder('ambientLight');
f4.add(ambientLight, 'intensity').min(0).max(10).step(0.01);
// f4.add(ambientLight, 'active');

const skyLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0 );
scene.add( skyLight );
skyLight.active = false;
const f5 = gui.addFolder('skyLight');
f5.add(skyLight, 'intensity').min(0).max(10).step(0.01);
// f5.add(skyLight, 'active');

const pointLight1Color = {color: 0xffffff}
const pointLight = new THREE.PointLight(pointLight1Color.color, 0.3)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 32
scene.add(pointLight)
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.9)
const f1 = gui.addFolder('pointLight');
f1.add(pointLight.position, 'x').min(-100).max(100).step(0.5);
f1.add(pointLight.position, 'y').min(-100).max(100).step(0.5);
f1.add(pointLight.position, 'z').min(-100).max(100).step(0.5);
f1.add(pointLight, 'intensity').min(0).max(10).step(0.1);
f1.addColor(pointLight1Color, 'color')
    .onChange(() => {
        pointLight.color.set(pointLight1Color.color)
    })

const pointLight2Color = {color: 0xff0000}
const pointLight2 = new THREE.PointLight(pointLight2Color.color, 1)
pointLight2.position.x = 6
pointLight2.position.y = 1
pointLight2.position.z = 1
scene.add(pointLight2)
const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 0.9)
const f2 = gui.addFolder('pointLight2');
f2.add(pointLight2.position, 'x').min(-100).max(100).step(0.5);
f2.add(pointLight2.position, 'y').min(-100).max(100).step(0.5);
f2.add(pointLight2.position, 'z').min(-100).max(100).step(0.5);
f2.add(pointLight2, 'intensity').min(0).max(10).step(0.1);
f2.addColor(pointLight2Color, 'color')
    .onChange(() => {
        pointLight2.color.set(pointLight2Color.color)
    })

const pointLight3Color = {color: 0x5a00ff}
const pointLight3 = new THREE.PointLight(pointLight3Color.color, 1.4)
pointLight3.position.x = -6
pointLight3.position.y = 1
pointLight3.position.z = 1
scene.add(pointLight3)
const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 0.9)
const f3 = gui.addFolder('pointLight3');
f3.add(pointLight3.position, 'x').min(-100).max(100).step(0.5);
f3.add(pointLight3.position, 'y').min(-100).max(100).step(0.5);
f3.add(pointLight3.position, 'z').min(-100).max(100).step(0.5);
f3.add(pointLight3, 'intensity').min(0).max(10).step(0.1);
f3.addColor(pointLight3Color, 'color')
    .onChange(() => {
        pointLight3.color.set(pointLight3Color.color)
    })

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Resize
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Fullscreen
window.addEventListener('dblclick', () => {

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if (!fullscreenElement) {
        // Safari alternative code
        //console.log('Go Fullscreen')
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen()
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }

    } else {
        // Safari alternative code
        //console.log('Exit Fullscreen')
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }

    }
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.x = -12
camera.position.x = 0
camera.position.y = 0
camera.position.z = 32
scene.add(camera)
const cf = gui.addFolder('camera');
cf.add(camera.position, 'x').min(-50).max(50).step(0.5);
cf.add(camera.position, 'y').min(-50).max(50).step(0.5);
cf.add(camera.position, 'z').min(-50).max(50).step(0.5);
cf.add(camera, 'fov').min(35).max(120).step(5);

// Controls
//const controls = new OrbitControls(camera, canvas)
//controls.enableDamping = false

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
    , alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

// Mouse Animation
let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0
let windowHalfX = window.innerWidth / 2
let windowHalfY = window.innerHeight / 2
const onDocumentMouseMove = (event) => {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}
document.addEventListener('mousemove', onDocumentMouseMove)

// Scroll Animation
const onDocumentScroll = (event) => {
    torusKnot.position.y = window.scrollY * 0.025
    // mouseX = (event.clientX - windowHalfX)
    // mouseY = (event.clientY - windowHalfY)
}
document.addEventListener('scroll', onDocumentScroll)

// GSAP Example
// gsap.to(torusKnot.positio,{
//     delay: 1
//     ,duration: 0.25
//     ,z: -2
// })
// gsap.to(torusKnot.position,{
//     delay: 1.25
//     ,duration: 0.25
//     ,z: 2
// })

// Tick
const clock = new THREE.Clock()
const tick = () =>
{
    targetX = mouseX * 0.001
    targetY = mouseY * 0.001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    torusKnot.rotation.y = .5 * elapsedTime
    // Mouse
    torusKnot.rotation.y += .5 * (targetX - torusKnot.rotation.y)
    torusKnot.rotation.x += .5 * (targetY - torusKnot.rotation.x)
    torusKnot.position.z += -20 * (targetY - torusKnot.rotation.x)

    // Update Orbital Controls
    //controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


const setDebug = (enabled = false) => {
    if (enabled) {
        scene.add(pointLightHelper)
        scene.add(pointLightHelper2)
        scene.add(pointLightHelper3)
    } else {
        scene.remove(pointLightHelper)
        scene.remove(pointLightHelper2)
        scene.remove(pointLightHelper3)
    }
}
setDebug(settings.debug)