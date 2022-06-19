import './style.css'
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')


gsap.registerPlugin(ScrollTrigger)

const box = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color: `#ff0000`})
const mesh = new THREE.Mesh(box, material)


function allowScroll() {
    gsap.timeline({
        scrollTrigger: {
            trigger: ".threejs__intro",
            start: "top top",
            pin: true,
            end: `+=${window.innerHeight * 3}`,
            scrub: .5,
            markers: true
        }
    })
        .to(".threejs__intro__content__text1", {x: -100, opacity: 0})
        .to(".threejs__intro__content__text2", {x: 100, opacity: 0}, "<")
        .to(".threejs__intro__content__text3__Wrapper", { opacity: 1}, "<")
        .from(".threejs__intro__context__text3", {opacity: 0, x: 0, stagger: 1}, "<")
        .to(".threejs__intro__context__text3", {x: 200, opacity: 0, stagger: 1}, "<+1")
}

const setupScrollAnimation = () => {
    gsap.timeline({onComplete: allowScroll})
        .set(".threejs__intro__content", {opacity: 1}, "<+=.5")
        .from('.threejs__intro__content__text1', {xPercent: -100, opacity: 0, duration: 1}, "<")
        .from('.threejs__intro__content__text2', {xPercent: 100, opacity: 0, duration: 1}, "<+0.25")
        .duration(2)

}



// Scene
const scene = new THREE.Scene()
scene.add(mesh)

setupScrollAnimation();
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = false

/**
 * Cube
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(cube)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let lastElapsedTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - lastElapsedTime
    lastElapsedTime = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

