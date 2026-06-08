export class MemoriaCirco{


constructor(){

    this.controlActivo = false;

    this.emojis = [
        "🎪","🎪",
        "🤡","🤡",
        "🎩","🎩",
        "🎨","🎨",
        "🎯","🎯",
        "🤸","🤸"
    ];

    this.seleccionadas = [];
    this.encontradas = 0;

    this.cartas = [];
    this.indiceSeleccionado = 0;
    this.joystickLiberado = true;
this.botonALiberado = true;

}

iniciar(){

    let panel =
    document.getElementById(
        "memoriaUI"
    );

    if(panel){

        panel.style.display =
        "block";

        document.exitPointerLock();

        this.reiniciar();

        return;

    }

    panel =
    document.createElement(
        "div"
    );

    panel.id =
    "memoriaUI";

    panel.style.position =
    "absolute";

    panel.style.top =
    "50%";

    panel.style.left =
    "50%";

    panel.style.transform =
    "translate(-50%,-50%)";

    panel.style.background =
    "rgba(0,0,0,0.95)";

    panel.style.padding =
    "20px";

    panel.style.borderRadius =
    "20px";

    panel.style.color =
    "white";

    panel.style.textAlign =
    "center";

    panel.innerHTML =

    `
    <h1>🃏 Memoria del Circo</h1>

    <div id="tableroMemoria"></div>

    <br>

    <button id="cerrarMemoria">
        Salir
    </button>
    `;

    document.body.appendChild(
        panel
    );

    document.exitPointerLock();

    document
    .getElementById(
        "cerrarMemoria"
    )
    .onclick =
    ()=>{

        panel.style.display =
        "none";

        document.body.requestPointerLock();

    };

    this.reiniciar();

    this.configurarControles();

}

reiniciar(){

    this.encontradas = 0;

    this.seleccionadas = [];

    this.cartas = [];

    this.indiceSeleccionado = 0;

    const cartas =
    [...this.emojis];

    cartas.sort(
        ()=>Math.random()-0.5
    );

    const tablero =
    document.getElementById(
        "tableroMemoria"
    );

    tablero.innerHTML = "";

    tablero.style.display =
    "grid";

    tablero.style.gridTemplateColumns =
    "repeat(4,80px)";

    tablero.style.gap =
    "10px";

    cartas.forEach(
        emoji=>{

            const carta =
            document.createElement(
                "button"
            );

            carta.innerHTML =
            "❓";

            carta.style.fontSize =
            "30px";

            carta.style.width =
            "80px";

            carta.style.height =
            "80px";

            carta.style.cursor =
            "pointer";

            carta.onclick =
            ()=>{

                this.voltear(
                    carta,
                    emoji
                );

            };

            this.cartas.push(
                carta
            );

            tablero.appendChild(
                carta
            );

        }
    );

    this.resaltarCarta();

}

resaltarCarta(){

    this.cartas.forEach(
        carta=>{

            carta.style.border =
            "2px solid white";

            carta.style.transform =
            "scale(1)";

        }
    );

    if(
        this.cartas[
            this.indiceSeleccionado
        ]
    ){

        this.cartas[
            this.indiceSeleccionado
        ].style.border =
        "5px solid yellow";

        this.cartas[
            this.indiceSeleccionado
        ].style.transform =
        "scale(1.15)";

    }

}

voltear(carta,emoji){

    if(
        carta.innerHTML !== "❓"
    )
    return;

    carta.innerHTML =
    emoji;

    this.seleccionadas.push({
        carta,
        emoji
    });

    if(
        this.seleccionadas.length === 2
    ){

        const a =
        this.seleccionadas[0];

        const b =
        this.seleccionadas[1];

        if(
            a.emoji ===
            b.emoji
        ){

            this.encontradas++;

            document
.getElementById(
    "puntosMemoria"
)
.innerHTML =

"⭐ Parejas: " +
this.encontradas +
" / 6";

            this.seleccionadas = [];

            if(
                this.encontradas === 6
            ){

                setTimeout(()=>{

                    alert(
                        "🏆 ¡Ganaste!"
                    );

                },500);

            }

        }
        else{

            setTimeout(()=>{

                a.carta.innerHTML =
                "❓";

                b.carta.innerHTML =
                "❓";

                this.seleccionadas =
                [];

            },1000);

        }

    }

}

configurarControles(){

    if(this.controlActivo)
    return;

    this.controlActivo = true;

    window.addEventListener(
        "keydown",
        
        (e)=>{

            const panel =
            document.getElementById(
                "memoriaUI"
            );

            if(
                !panel ||
                panel.style.display ===
                "none"
            )
            return;

            if(
                e.key ===
                "ArrowRight"
            ){

                this.indiceSeleccionado++;

                if(
                    this.indiceSeleccionado >=
                    this.cartas.length
                ){

                    this.indiceSeleccionado = 0;

                }

            }

            if(
                e.key ===
                "ArrowLeft"
            ){

                this.indiceSeleccionado--;

                if(
                    this.indiceSeleccionado < 0
                ){

                    this.indiceSeleccionado =
                    this.cartas.length - 1;

                }

            }

            if(
                e.key ===
                "Enter"
            ){

                this.cartas[
                    this.indiceSeleccionado
                ]?.click();

            }

            this.resaltarCarta();

        }
    );

    setInterval(()=>{

    const pads =
    navigator.getGamepads();

    if(
        !pads ||
        !pads[0]
    )
    return;

    const pad =
    pads[0];

    const x =
    pad.axes[0];

    const y =
    pad.axes[1];

    if(
        Math.abs(x) < 0.4 &&
        Math.abs(y) < 0.4
    ){

        this.joystickLiberado =
        true;

    }

    if(
        this.joystickLiberado
    ){

        if(x > 0.8){

            this.indiceSeleccionado++;

            if(
                this.indiceSeleccionado >=
                this.cartas.length
            ){

                this.indiceSeleccionado = 0;

            }

            this.joystickLiberado =
            false;

        }

        if(x < -0.8){

            this.indiceSeleccionado--;

            if(
                this.indiceSeleccionado < 0
            ){

                this.indiceSeleccionado =
                this.cartas.length - 1;

            }

            this.joystickLiberado =
            false;

        }

        if(y > 0.8){

            this.indiceSeleccionado += 4;

            if(
                this.indiceSeleccionado >=
                this.cartas.length
            ){

                this.indiceSeleccionado =
                this.cartas.length - 1;

            }

            this.joystickLiberado =
            false;

        }

        if(y < -0.8){

            this.indiceSeleccionado -= 4;

            if(
                this.indiceSeleccionado < 0
            ){

                this.indiceSeleccionado = 0;

            }

            this.joystickLiberado =
            false;

        }

        this.resaltarCarta();

    }

    if(
        !pad.buttons[0].pressed
    ){

        this.botonALiberado =
        true;

    }

    if(
        pad.buttons[0].pressed &&
        this.botonALiberado
    ){

        this.botonALiberado =
        false;

        this.cartas[
            this.indiceSeleccionado
        ]?.click();

    }

},100);

}


}
