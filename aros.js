export class LanzamientoAros{

    constructor(){

        this.puntos = 0;

        this.posicion = 0;

        this.objetivo = 0;

        this.controlActivo = false;

        this.botones = [];

        this.joystickLiberado = true;
this.botonALiberado = true;

    }

    iniciar(){

        let panel =
        document.getElementById(
            "arosUI"
        );

        if(panel){

            panel.style.display =
            "block";

            document.exitPointerLock();

            this.nuevaRonda();

            return;

        }

        panel =
        document.createElement(
            "div"
        );

        panel.id =
        "arosUI";

        panel.style.position =
        "absolute";

        panel.style.top =
        "50%";

        panel.style.left =
        "50%";

        panel.style.transform =
        "translate(-50%,-50%)";

        panel.style.background =
        "rgba(0,0,0,.95)";

        panel.style.padding =
        "30px";

        panel.style.borderRadius =
        "20px";

        panel.style.color =
        "white";

        panel.style.textAlign =
        "center";

        panel.innerHTML =

        `
        <h1>🎯 Lanzamiento de Aros</h1>

        <h2 id="mensajeAros"></h2>

        <div id="opcionesAros"></div>

        <br>

        <button id="lanzarAro">
        Lanzar
        </button>

        <h3 id="resultadoAros"></h3>

        <h3 id="puntosAros">
        ⭐ Puntos: 0
        </h3>

        <button id="cerrarAros">
        Salir
        </button>
        `;

        document.body.appendChild(
            panel
        );

        document
        .getElementById(
            "cerrarAros"
        )
        .onclick =
        ()=>{

            panel.style.display =
            "none";

            document.body.requestPointerLock();

        };

        document
        .getElementById(
            "lanzarAro"
        )
        .onclick =
        ()=>{

            this.lanzar();

        };

        this.nuevaRonda();

        this.configurarControles();

    }

    nuevaRonda(){

        this.botones = [];

        this.posicion = 0;

        this.objetivo =

        Math.floor(
            Math.random()*5
        );

        document
        .getElementById(
            "mensajeAros"
        )
        .innerHTML =

        "Selecciona una posición";

        const contenedor =
        document.getElementById(
            "opcionesAros"
        );

        contenedor.innerHTML =
        "";

        for(
            let i=0;
            i<5;
            i++
        ){

            const btn =
            document.createElement(
                "button"
            );

            btn.innerHTML =
            "🎯";

            btn.style.fontSize =
            "35px";

            btn.style.margin =
            "10px";

            btn.onclick =
            ()=>{

                this.posicion = i;

                this.resaltar();

            };

            contenedor.appendChild(
                btn
            );

            this.botones.push(
                btn
            );

        }

        this.resaltar();

    }

    resaltar(){

    this.botones.forEach(
        (b,index)=>{

            b.style.border =
            "2px solid white";

            b.style.transform =
            "scale(1)";

            b.style.background =
            "#ffffff";

        }
    );

    if(
        this.botones[this.posicion]
    ){

        this.botones[
            this.posicion
        ].style.border =
        "5px solid yellow";

        this.botones[
            this.posicion
        ].style.transform =
        "scale(1.2)";

        this.botones[
            this.posicion
        ].style.background =
        "#ffe066";

    }

}

    lanzar(){

        const resultado =
        document.getElementById(
            "resultadoAros"
        );

        if(
            this.posicion ===
            this.objetivo
        ){

            resultado.innerHTML =

"✅ ¡Encestaste!<br>" +
"Posición: " +
(this.posicion + 1);

            resultado.style.color =
            "lime";

            this.puntos++;

        }
        else{

            resultado.innerHTML =

"❌ Fallaste<br>" +
"Objetivo: " +
(this.objetivo + 1);

            resultado.style.color =
            "red";

        }

        document
        .getElementById(
            "puntosAros"
        )
        .innerHTML =

        "⭐ Puntos: " +
        this.puntos;

        setTimeout(()=>{

            resultado.innerHTML =
            "";

            this.nuevaRonda();

        },2000);

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
                    "arosUI"
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

                    this.posicion++;

                    if(
                        this.posicion > 4
                    ){

                        this.posicion = 0;

                    }

                }

                if(
                    e.key ===
                    "ArrowLeft"
                ){

                    this.posicion--;

                    if(
                        this.posicion < 0
                    ){

                        this.posicion = 4;

                    }

                }

                if(
                    e.key ===
                    "Enter"
                ){

                    this.lanzar();

                }

                this.resaltar();

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

    if(
        Math.abs(x) < 0.4
    ){

        this.joystickLiberado =
        true;

    }

    if(
        this.joystickLiberado
    ){

        if(x > 0.8){

            this.posicion++;

            if(
                this.posicion > 4
            ){

                this.posicion = 0;

            }

            this.resaltar();

            this.joystickLiberado =
            false;

        }

        if(x < -0.8){

            this.posicion--;

            if(
                this.posicion < 0
            ){

                this.posicion = 4;

            }

            this.resaltar();

            this.joystickLiberado =
            false;

        }

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

        this.lanzar();

    }

},100);

    }

}