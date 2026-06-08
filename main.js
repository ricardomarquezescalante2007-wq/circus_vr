import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";
import { VRButton } from "https://cdn.jsdelivr.net/npm/three@0.165/examples/jsm/webxr/VRButton.js";

import { GestorMinijuegos } from "./minijuegos.js";
import { MatematicaMagica } from "./matematicas.js";
import { InglesPepito } from "./ingles.js";
import { MemoriaCirco } from "./memoria.js";
import { ColoresMagicos } from "./colores.js";
import { LanzamientoAros } from "./aros.js";
import { AcrobaciaEstelar } from "./acrobacia.js";

// -------------------- ESCENA --------------------
let scene, camera, renderer;
let player;

let carteles = [];
let estrellas = [];
let rueda;

let mensajeUI;
let cartelActivo = null;

let keys = {};
let yaw = 0;
let pitch = 0;

let mouseEnabled = false;

// minijuegos
let gestor;
let juegoMate, juegoIngles, juegoMemoria, juegoColores, juegoAros, juegoAcrobacia;

// -------------------- INIT --------------------
init();
animate();

function init() {

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

    // RENDER
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;

    document.body.appendChild(renderer.domElement);
    document.body.appendChild(VRButton.createButton(renderer));

    // PLAYER
    player = new THREE.Group();
    player.add(camera);
    scene.add(player);

    player.position.set(0, 2, 40);

    // MINIJUEGOS
    gestor = new GestorMinijuegos();
    juegoMate = new MatematicaMagica();
    juegoIngles = new InglesPepito();
    juegoMemoria = new MemoriaCirco();
    juegoColores = new ColoresMagicos();
    juegoAros = new LanzamientoAros();
    juegoAcrobacia = new AcrobaciaEstelar();

    // MUNDO
    crearLuces();
    crearSuelo();
    crearCarpa();
    crearCarteles();
    crearEstrellas();
    crearRueda();
    crearUI();

    // CONTROLES
    configurarTeclado();
    configurarMouse();

    // BOTONES
    document.getElementById("startBtn").addEventListener("click", () => {
        document.getElementById("menu").style.display = "none";
        renderer.setAnimationLoop(render);
    });

    document.getElementById("mobileVR").addEventListener("click", () => {
        alert("Modo VR móvil activado");
    });

    window.addEventListener("resize", resize);
}

// -------------------- LUCES --------------------
function crearLuces() {
    scene.add(new THREE.AmbientLight(0xffffff, 2));

    const dir = new THREE.DirectionalLight(0xffffff, 2);
    dir.position.set(10, 20, 10);
    scene.add(dir);
}

// -------------------- SUELO --------------------
function crearSuelo() {
    const suelo = new THREE.Mesh(
        new THREE.PlaneGeometry(300, 300),
        new THREE.MeshStandardMaterial({ color: 0x55aa55 })
    );

    suelo.rotation.x = -Math.PI / 2;
    scene.add(suelo);
}

// -------------------- CARPA --------------------
function crearCarpa() {
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(20, 20, 10, 64),
        new THREE.MeshStandardMaterial({ color: 0xff3333 })
    );
    base.position.y = 5;

    const techo = new THREE.Mesh(
        new THREE.ConeGeometry(24, 18, 64),
        new THREE.MeshStandardMaterial({ color: 0xffff00 })
    );
    techo.position.y = 19;

    const grupo = new THREE.Group();
    grupo.add(base);
    grupo.add(techo);

    scene.add(grupo);
}

// -------------------- CARTEL --------------------
function crearCartel(emoji, titulo, x, z) {

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 1024, 1024);

    ctx.fillStyle = "black";
    ctx.textAlign = "center";

    ctx.font = "bold 70px Arial";
    ctx.fillText(titulo, 512, 150);

    ctx.font = "300px Arial";
    ctx.fillText(emoji, 512, 650);

    const texture = new THREE.CanvasTexture(canvas);

    const panel = new THREE.Mesh(
        new THREE.PlaneGeometry(8, 8),
        new THREE.MeshBasicMaterial({ map: texture })
    );

    panel.position.set(x, 6, z);
    scene.add(panel);

    carteles.push({ objeto: panel, titulo });
}

function crearCarteles() {
    crearCartel("🎩", "Matemática Mágica", -25, 0);
    crearCartel("🤡", "Inglés con Pepito", 25, 0);
    crearCartel("🤸", "Acrobacia Estelar", 0, 25);
    crearCartel("🃏", "Memoria del Circo", 0, -25);
    crearCartel("🎯", "Lanzamiento de Aros", 35, 25);
    crearCartel("🎨", "Colores Mágicos", -35, 25);
}

// -------------------- ESTRELLAS --------------------
function crearEstrellas() {
    for (let i = 0; i < 200; i++) {
        const estrella = new THREE.Mesh(
            new THREE.SphereGeometry(0.15, 8, 8),
            new THREE.MeshBasicMaterial({ color: 0xffffff })
        );

        estrella.position.set(
            (Math.random() - 0.5) * 200,
            Math.random() * 80 + 20,
            (Math.random() - 0.5) * 200
        );

        estrellas.push(estrella);
        scene.add(estrella);
    }
}

// -------------------- RUEDA --------------------
function crearRueda() {
    rueda = new THREE.Mesh(
        new THREE.TorusGeometry(8, 0.5, 16, 100),
        new THREE.MeshStandardMaterial({ color: 0x00ffff })
    );

    rueda.position.set(40, 12, 0);
    scene.add(rueda);
}

// -------------------- UI --------------------
function crearUI() {
    mensajeUI = document.createElement("div");
    mensajeUI.style.position = "absolute";
    mensajeUI.style.bottom = "40px";
    mensajeUI.style.left = "50%";
    mensajeUI.style.transform = "translateX(-50%)";
    mensajeUI.style.padding = "15px 25px";
    mensajeUI.style.background = "rgba(0,0,0,0.8)";
    mensajeUI.style.color = "white";
    mensajeUI.style.fontSize = "20px";
    mensajeUI.style.borderRadius = "10px";
    mensajeUI.style.display = "none";

    document.body.appendChild(mensajeUI);
}

// -------------------- CONTROLES --------------------
function configurarTeclado() {

    window.addEventListener("keydown", e => {
        keys[e.key.toLowerCase()] = true;

        if (e.key.toLowerCase() === "e" && cartelActivo) {
            abrirMinijuego(cartelActivo.titulo);
        }
    });

    window.addEventListener("keyup", e => {
        keys[e.key.toLowerCase()] = false;
    });
}

function configurarMouse() {

    document.body.addEventListener("click", () => {
        document.body.requestPointerLock();
    });

    document.addEventListener("pointerlockchange", () => {
        mouseEnabled = document.pointerLockElement === document.body;
    });

    document.addEventListener("mousemove", e => {
        if (!mouseEnabled) return;

        yaw -= e.movementX * 0.002;
        pitch -= e.movementY * 0.002;

        pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
    });
}

// -------------------- MOVIMIENTO --------------------
function leerControles() {

    const speed = 0.3;

    if (keys["w"]) player.position.z -= speed;
    if (keys["s"]) player.position.z += speed;
    if (keys["a"]) player.position.x -= speed;
    if (keys["d"]) player.position.x += speed;

    camera.rotation.order = "YXZ";
    camera.rotation.y = yaw;
    camera.rotation.x = pitch;
}

// -------------------- LOGICA --------------------
function verificarCarteles() {

    cartelActivo = null;

    for (const c of carteles) {

        const dist = player.position.distanceTo(c.objeto.position);

        if (dist < 10) {
            cartelActivo = c;
            break;
        }
    }

    if (cartelActivo) {
        mensajeUI.style.display = "block";
        mensajeUI.innerHTML = cartelActivo.titulo + "<br>Presiona E";
    } else {
        mensajeUI.style.display = "none";
    }
}

function abrirMinijuego(nombre) {

    switch (nombre) {

        case "Matemática Mágica": juegoMate.iniciar(); break;
        case "Inglés con Pepito": juegoIngles.iniciar(); break;
        case "Acrobacia Estelar": juegoAcrobacia.iniciar(); break;
        case "Memoria del Circo": juegoMemoria.iniciar(); break;
        case "Lanzamiento de Aros": juegoAros.iniciar(); break;
        case "Colores Mágicos": juegoColores.iniciar(); break;
    }
}

// -------------------- LOOP --------------------
function animate() {
    renderer.setAnimationLoop(render);
}

function render() {

    leerControles();
    verificarCarteles();

    if (rueda) rueda.rotation.z += 0.01;

    renderer.render(scene, camera);
}

// -------------------- RESIZE --------------------
function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
