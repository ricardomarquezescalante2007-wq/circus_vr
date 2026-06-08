import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

// ---------------- ESCENA ----------------
let scene, camera, renderer;
let player;

let menu, btn;
let started = false;

// ---------------- INICIO SEGURO ----------------
window.addEventListener("DOMContentLoaded", init);

function init() {

    console.log("JS cargado correctamente");

    // VALIDAR HTML
    menu = document.getElementById("menu");
    btn = document.getElementById("startBtn");

    if (!menu || !btn) {
        alert("ERROR: No se encontró #menu o #startBtn");
        return;
    }

    // ESCENA
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);

    // CÁMARA
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    // RENDERER (BÁSICO Y SEGURO)
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    document.body.appendChild(renderer.domElement);

    // PLAYER
    player = new THREE.Group();
    player.add(camera);
    scene.add(player);

    player.position.set(0, 2, 5);

    // LUZ
    const light = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(light);

    // SUELO SIMPLE
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(50, 50),
        new THREE.MeshStandardMaterial({ color: 0x55aa55 })
    );

    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // CUBO DE PRUEBA
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        new THREE.MeshStandardMaterial({ color: 0xff0000 })
    );

    cube.position.set(0, 2, 0);
    scene.add(cube);

    // BOTÓN START
    btn.addEventListener("click", () => {

        console.log("START PRESIONADO");

        menu.style.display = "none";
        started = true;

        animate();
    });

    window.addEventListener("resize", resize);
}

// ---------------- LOOP ----------------
function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {

    if (!started) return;

    renderer.render(scene, camera);
}

// ---------------- RESIZE ----------------
function resize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}
