
// ---------------- ESCENA ----------------
let scene, camera, renderer;
let player;

let menu, btn;
let started = false;

// ---------------- INIT ----------------
window.onload = function () {

    console.log("JS cargado OK");

    menu = document.getElementById("menu");
    btn = document.getElementById("startBtn");

    if (!menu || !btn) {
        alert("ERROR: Falta menu o startBtn");
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

    // RENDERER
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

    // SUELO
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshStandardMaterial({ color: 0x55aa55 })
    );

    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // OBJETO DE PRUEBA (IMPORTANTE)
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 2),
        new THREE.MeshStandardMaterial({ color: 0xff0000 })
    );

    cube.position.set(0, 2, 0);
    scene.add(cube);

    // BOTÓN INICIAR
    btn.addEventListener("click", function () {

        console.log("START");

        menu.style.display = "none";
        started = true;

        animate();
    });

    window.addEventListener("resize", resize);
};

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
