import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

import { GestorMinijuegos } from "./minijuegos.js";
import { MatematicaMagica } from "./matematicas.js";
import { InglesPepito } from "./ingles.js";
import { MemoriaCirco } from "./memoria.js";
import { ColoresMagicos } from "./colores.js";
import { LanzamientoAros } from "./aros.js";
import { AcrobaciaEstelar } from "./acrobacia.js";

// ---------------- VARIABLES ----------------
let scene, camera, renderer;
let player;

let keys = {};
let yaw = 0;
let pitch = 0;
let mouseEnabled = false;

let carteles = [];
let cartelActivo = null;

let mensajeUI;

// minijuegos
let gestor, juegoMate, juegoIngles, juegoMemoria, juegoColores, juegoAros, juegoAcrobacia;

// ---------------- INICIO ----------------
window.addEventListener("DOMContentLoaded", init);

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

    // RENDERER (MÓVIL SEGURO)
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance"
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    document.body.appendChild(renderer.domElement);

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
    crearUI();

    // CONTROLES
    configurarTeclado();
    configurarMouse();

    // BOTÓN START
    document.getElementById("startBtn").addEventListener("click", () => {

        document.getElementById("menu").style.display = "none";

        renderer.setAnimationLoop(render);
    });

    window.addEventListener("resize", resize);
}

// ---------------- LUCES ----------------
function crearLuces() {
    scene.add(new THREE.AmbientLight(0xffffff, 2));

    const dir = new THREE.DirectionalLight(0xffffff, 2);
    dir.position.set(10, 20, 10);
    scene.add(dir);
}

// ---------------- SUELO ----------------
function crearSuelo() {
    const suelo = new THREE.Mesh(
        new THREE.PlaneGeometry(300, 300),
        new THREE.MeshStandardMaterial({ color: 0x55aa55 })
    );

    suelo.rotation.x = -Math.PI / 2;
    scene.add(suelo);
}

// ---------------- CARPA ----------------
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

// ---------------- CARTEL ----------------
function crearCartel(emoji, titulo, x, z) {

    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 512, 512);

    ctx.fillStyle = "black";
    ctx.textAlign = "center";

    ctx.font = "bold 40px Arial";
    ctx.fillText(titulo, 256, 80);

    ctx.font = "200px Arial";
    ctx.fillText(emoji, 256, 300);

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

// ---------------- UI ----------------
function crearUI() {

    mensajeUI = document.createElement("div");
    mensajeUI.style.position = "absolute";
    mensajeUI.style.bottom = "40px";
    mensajeUI.style.left = "50%";
    mensajeUI.style.transform = "translateX(-50%)";
    mensajeUI.style.padding = "15px";
    mensajeUI.style.background = "rgba(0,0,0,0.7)";
    mensajeUI.style.color = "white";
    mensajeUI.style.fontSize = "18px";
    mensajeUI.style.borderRadius = "10px";
    mensajeUI.style.display = "none";

    document.body.appendChild(mensajeUI);
}

// ---------------- CONTROLES ----------------
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

    document.addEventListener("mousemove", e => {
        if (!mouseEnabled) return;

        yaw -= e.movementX * 0.002;
        pitch -= e.movementY * 0.002;

        pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
    });

    document.body.addEventListener("click", () => {
        document.body.requestPointerLock();
    });

    document.addEventListener("pointerlockchange", () => {
        mouseEnabled = document.pointerLockElement === document.body;
    });
}

// ---------------- MOVIMIENTO ----------------
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

// ---------------- LOGICA ----------------
function verificarCarteles() {

    cartelActivo = null;

    for (const c of carteles) {

        const d = player.position.distanceTo(c.objeto.position);

        if (d < 10) {
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

// ---------------- MINIJUEGOS ----------------
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

// ---------------- LOOP ----------------
function render() {

    leerControles();
    verificarCarteles();

    renderer.render(scene, camera);
}

// ---------------- RESIZE ----------------
function resize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}
