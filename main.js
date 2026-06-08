import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";
import { VRButton } from "https://cdn.jsdelivr.net/npm/three@0.165/examples/jsm/webxr/VRButton.js";
import { GestorMinijuegos } from "./minijuegos.js";
console.log("MAIN.JS CARGADO");
import { MatematicaMagica }
from "./matematicas.js";
import { InglesPepito }
from "./ingles.js";
import { MemoriaCirco }
from "./memoria.js";
import { ColoresMagicos }
from "./colores.js";
import { LanzamientoAros }
from "./aros.js";
import { AcrobaciaEstelar }
from "./acrobacia.js";

let estrellas = [];
let carteles = [];
let mensajeUI;
let juegoIngles;
let juegoMemoria;
let juegoColores;
let juegoAros;
let juegoAcrobacia;
let cartelActivo = null;

let scene;
let camera;
let renderer;

let player;
let gestor;
let juegoMate;
let rueda;

let keys = {};

let yaw = 0;
let pitch = 0;

let mouseEnabled = false;

let modoVRMovil = false;
let tiempoMirada = 0;

init();
animate();

function init(){

    scene = new THREE.Scene();

    scene.background =
    new THREE.Color(0x87CEEB);

    camera =
    new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    renderer =
    new THREE.WebGLRenderer({
        antialias:true
    });

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    renderer.xr.enabled = true;

    document.body.appendChild(
        renderer.domElement
    );

    document.body.appendChild(
        VRButton.createButton(renderer)
    );

    player =
    new THREE.Group();

    player.add(camera);

    scene.add(player);

    crearLuces();
    crearSuelo();
    crearCarpa();
    crearCarteles();

    player.position.set(
    0,
    2,
    40
);

camera.lookAt(
    0,
    5,
    0
);



    gestor = new GestorMinijuegos();
    juegoMate =
new MatematicaMagica();

    configurarTeclado();
    configurarMouse();

    window.addEventListener(
        "resize",
        resize
    );

    juegoMemoria =
new MemoriaCirco();

juegoColores =
new ColoresMagicos();

juegoAros =
new LanzamientoAros();

juegoAcrobacia =
new AcrobaciaEstelar();



crearGlobo(10,10,0xff0000);
crearGlobo(-10,10,0x0000ff);
crearGlobo(15,-10,0xffff00);
crearGlobo(-15,-10,0xff00ff);

crearRueda();

crearEstrellas();


juegoIngles =
new InglesPepito();



}
function crearLuces(){


const ambient =
new THREE.AmbientLight(
    0xffffff,
    2
);

scene.add(ambient);

const dir =
new THREE.DirectionalLight(
    0xffffff,
    2
);

dir.position.set(
    10,
    20,
    10
);

scene.add(dir);

crearInterfaz();

const btnVR =
document.getElementById("mobileVR");

if(btnVR){

    btnVR.addEventListener(
        "click",
        activarVRMovil
    );

}
}

function crearSuelo(){


const suelo =
new THREE.Mesh(

    new THREE.PlaneGeometry(
        300,
        300
    ),

    new THREE.MeshStandardMaterial({
        color:0x55aa55
    })

);

suelo.rotation.x =
-Math.PI / 2;

scene.add(suelo);


}

function crearCarpa(){


const grupo =
new THREE.Group();

const base =
new THREE.Mesh(

    new THREE.CylinderGeometry(
        20,
        20,
        10,
        64
    ),

    new THREE.MeshStandardMaterial({
        color:0xff3333
    })

);

base.position.y = 5;

grupo.add(base);

const techo =
new THREE.Mesh(

    new THREE.ConeGeometry(
        24,
        18,
        64
    ),

    new THREE.MeshStandardMaterial({
        color:0xffff00
    })

);

techo.position.y = 19;

grupo.add(techo);

scene.add(grupo);


}

function crearCartel(
emoji,
titulo,
x,
z
){


const canvas =
document.createElement("canvas");

canvas.width = 1024;
canvas.height = 1024;

const ctx =
canvas.getContext("2d");

ctx.fillStyle = "white";

ctx.fillRect(
    0,
    0,
    1024,
    1024
);

ctx.fillStyle = "black";

ctx.textAlign = "center";

ctx.font =
"bold 70px Arial";

ctx.fillText(
    titulo,
    512,
    150
);

ctx.font =
"300px Arial";

ctx.fillText(
    emoji,
    512,
    650
);

const textura =
new THREE.CanvasTexture(
    canvas
);

const panel =
new THREE.Mesh(

    new THREE.PlaneGeometry(
        8,
        8
    ),

    new THREE.MeshBasicMaterial({
        map:textura
    })

);

panel.position.set(
    x,
    6,
    z
);

scene.add(panel);

carteles.push({
    objeto: panel,
    titulo: titulo
});

}


function crearCarteles(){


crearCartel(
    "🎩",
    "Matemática Mágica",
    -25,
    0
);

crearCartel(
    "🤡",
    "Inglés con Pepito",
    25,
    0
);

crearCartel(
    "🤸",
    "Acrobacia Estelar",
    0,
    25
);

crearCartel(
    "🃏",
    "Memoria del Circo",
    0,
    -25
);

crearCartel(
    "🎯",
    "Lanzamiento de Aros",
    35,
    25
);

crearCartel(
    "🎨",
    "Colores Mágicos",
    -35,
    25
);


}

gestor = new GestorMinijuegos();

function crearGlobo(x, z, color){

    const globo = new THREE.Mesh(

        new THREE.SphereGeometry(
            1.2,
            32,
            32
        ),

        new THREE.MeshStandardMaterial({
            color: color
        })

    );

    globo.position.set(
        x,
        12,
        z
    );

    scene.add(globo);

}



function crearRueda(){

    rueda = new THREE.Mesh(

        new THREE.TorusGeometry(
            8,
            0.5,
            16,
            100
        ),

        new THREE.MeshStandardMaterial({
            color:0x00ffff
        })

    );

    rueda.position.set(
        40,
        12,
        0
    );

    scene.add(rueda);

}

function crearEstrellas(){

    for(let i=0;i<100;i++){

        const estrella = new THREE.Mesh(

            new THREE.SphereGeometry(
                0.15,
                8,
                8
            ),

            new THREE.MeshBasicMaterial({
                color:0xffffff
            })

        );

        estrella.position.set(

            (Math.random()-0.5)*200,
            Math.random()*60+20,
            (Math.random()-0.5)*200

        );

        scene.add(
            estrella
        );

    }

}

function configurarTeclado(){


window.addEventListener(
    "keydown",
    e => {

        keys[
            e.key.toLowerCase()
        ] = true;

    }
);

window.addEventListener(
    "keyup",
    e => {

        keys[
            e.key.toLowerCase()
        ] = false;

    }
);


}

function configurarMouse(){

    window.addEventListener(
    "deviceorientation",
    (event)=>{

        if(!modoVRMovil)
        return;

        if(event.alpha !== null){

            yaw =
            THREE.MathUtils.degToRad(
                event.alpha
            );

        }

        if(event.beta !== null){

            pitch =
            THREE.MathUtils.degToRad(
                event.beta - 90
            );

        }

    }
);


document.body.addEventListener(
    "click",
    ()=>{

        document.body.requestPointerLock();

    }
);

document.addEventListener(
    "pointerlockchange",
    ()=>{

        mouseEnabled =
        document.pointerLockElement ===
        document.body;

    }
);

document.addEventListener(
    "mousemove",
    event=>{

        if(!mouseEnabled)
        return;

        yaw -=
        event.movementX * 0.002;

        pitch -=
        event.movementY * 0.002;

        pitch = Math.max(
            -Math.PI/2,
            Math.min(
                Math.PI/2,
                pitch
            )
        );

    }
);

window.addEventListener(
    "keydown",
    e=>{

        if(
            e.key.toLowerCase() === "e"
            &&
            cartelActivo
        ){

            abrirMinijuego(
                cartelActivo.titulo
            );

        }

    }
);

}

function leerControles(){


const velocidad = 0.3;

if(keys["w"])
    player.position.z -= velocidad;

if(keys["s"])
    player.position.z += velocidad;

if(keys["a"])
    player.position.x -= velocidad;

if(keys["d"])
    player.position.x += velocidad;

const pads =
navigator.getGamepads();

if(pads){

    for(const pad of pads){

        if(!pad)
        continue;

        player.position.x +=
        pad.axes[0] * velocidad;

        player.position.z +=
        pad.axes[1] * velocidad;

        yaw -=
        pad.axes[2] * 0.04;

        // Botón A del control Xbox
        if(
            pad.buttons[0] &&
            pad.buttons[0].pressed &&
            cartelActivo
        ){

            abrirMinijuego(
                cartelActivo.titulo
            );

        }{

    abrirMinijuego(
        cartelActivo.titulo
    );

}

    }

}

function crearArbol(x,z){

    const grupo = new THREE.Group();

    const tronco = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5,0.5,4,16),
        new THREE.MeshStandardMaterial({
            color:0x8B4513
        })
    );

    tronco.position.y = 2;

    grupo.add(tronco);

    const copa = new THREE.Mesh(
        new THREE.SphereGeometry(2.5,32,32),
        new THREE.MeshStandardMaterial({
            color:0x228B22
        })
    );

    copa.position.y = 5;

    grupo.add(copa);

    grupo.position.set(x,0,z);

    scene.add(grupo);

}

function crearGlobo(x, z, color){

    const globo = new THREE.Mesh(

        new THREE.SphereGeometry(
            1.2,
            32,
            32
        ),

        new THREE.MeshStandardMaterial({
            color: color
        })

    );

    globo.position.set(
        x,
        12,
        z
    );

    scene.add(globo);

}

let rueda;

function crearRueda(){

    rueda = new THREE.Mesh(

        new THREE.TorusGeometry(
            8,
            0.5,
            16,
            100
        ),

        new THREE.MeshStandardMaterial({
            color:0x00ffff
        })

    );

    rueda.position.set(
        40,
        12,
        0
    );

    scene.add(rueda);

}

function crearEstrellas(){

    for(let i=0;i<300;i++){

        const estrella = new THREE.Mesh(

            new THREE.SphereGeometry(
                0.15,
                8,
                8
            ),

            new THREE.MeshBasicMaterial({
                color:0xffffff
            })

        );

        estrella.position.set(

            (Math.random()-0.5)*300,

            Math.random()*80 + 20,

            (Math.random()-0.5)*300

        );

        estrellas.push(
            estrella
        );

        scene.add(
            estrella
        );

    }

}


camera.rotation.order =
"YXZ";

camera.rotation.y =
yaw;

camera.rotation.x =
pitch;


}

function resize(){

    function activarVRMovil(){

    modoVRMovil = true;

    alert(
        "📱 Modo VR Box/Cardboard Activado"
    );

    const crosshair =
    document.getElementById(
        "crosshair"
    );

    if(crosshair){

        crosshair.style.display =
        "block";

    }

}


camera.aspect =
window.innerWidth /
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


}

function animate(){

    renderer.setAnimationLoop(
        render
    );

}

function render(){

    leerControles();

    verificarCarteles();

    if(gestor){

        // aquí después agregaremos
        // funciones de minijuegos

    }

    if(rueda){

    rueda.rotation.z += 0.01;

}

if(modoVRMovil){

    const crosshair =
    document.getElementById(
        "crosshair"
    );

    if(crosshair){

        crosshair.innerHTML = "+";

    }

}

    renderer.render(
        scene,
        camera
    );

    if(rueda){

    rueda.rotation.z += 0.01;

}

}

function crearInterfaz(){

    mensajeUI =
    document.createElement("div");

    mensajeUI.style.position = "absolute";
    mensajeUI.style.bottom = "40px";
    mensajeUI.style.left = "50%";
    mensajeUI.style.transform = "translateX(-50%)";

    mensajeUI.style.padding = "15px 25px";

    mensajeUI.style.background = "rgba(0,0,0,0.8)";
    mensajeUI.style.color = "white";

    mensajeUI.style.fontSize = "24px";
    mensajeUI.style.borderRadius = "10px";

    mensajeUI.style.display = "none";

    document.body.appendChild(
        mensajeUI
    );

}

document
.getElementById("startBtn")
?.addEventListener("click", () => {

    alert("Botón detectado");

    const menu = document.getElementById("menu");

    if(menu){
        menu.style.display = "none";
    }

    const musica =
document.getElementById(
    "musica"
);

if(musica){

    musica.play();

}

});

function verificarCarteles(){

    cartelActivo = null;

    for(const cartel of carteles){

        const distancia =
        player.position.distanceTo(
            cartel.objeto.position
        );

        if(distancia < 10){

            cartelActivo = cartel;

            break;

        }

    }

    if(cartelActivo){

        mensajeUI.style.display =
        "block";

        mensajeUI.innerHTML =

        cartelActivo.titulo +
        "<br>Presiona E o A";

        if(modoVRMovil){

            tiempoMirada++;

            if(tiempoMirada > 120){

                abrirMinijuego(
                    cartelActivo.titulo
                );

                tiempoMirada = 0;

            }

        }

    }
    else{

        tiempoMirada = 0;

        mensajeUI.style.display =
        "none";

    }

}

function abrirMinijuego(nombre){

    switch(nombre){

        case "Matemática Mágica":

            juegoMate.iniciar();

        break;

        case "Inglés con Pepito":
            juegoIngles.iniciar();
        break;

        break;

        case "Acrobacia Estelar":

    juegoAcrobacia.iniciar();

break;

        break;

        case "Memoria del Circo":

    juegoMemoria.iniciar();

break;

        case "Lanzamiento de Aros":

    juegoAros.iniciar();

break;

        break;

        case "Colores Mágicos":

    juegoColores.iniciar();

break;

        break;

    }

}

function activarVRMovil(){

    modoVRMovil = true;

    console.log(
        "📱 VR Móvil Activado"
    );

    const crosshair =
    document.getElementById(
        "crosshair"
    );

    if(crosshair){

        crosshair.style.display =
        "block";

    }

}