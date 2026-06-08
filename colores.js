export class ColoresMagicos{

    constructor(){

        this.botones = [];
        this.indiceSeleccionado = 0;
        this.controlActivo = false;
        this.joystickLiberado = true;
this.botonALiberado = true;

        this.puntos = 0;

        this.colores = [

            {
                nombre:"ROJO",
                emoji:"🔴"
            },

            {
                nombre:"AZUL",
                emoji:"🔵"
            },

            {
                nombre:"VERDE",
                emoji:"🟢"
            },

            {
                nombre:"AMARILLO",
                emoji:"🟡"
            }

        ];

        this.correcto = null;

    }

    iniciar(){

        let panel =
        document.getElementById(
            "coloresUI"
        );

        if(panel){

            panel.style.display =
            "block";

            document.exitPointerLock();

            this.generarPregunta();

            return;

        }

        panel =
        document.createElement(
            "div"
        );

        panel.id =
        "coloresUI";

        panel.style.position =
        "absolute";

        panel.style.top =
        "50%";

        panel.style.left =
        "50%";

        panel.style.transform =
        "translate(-50%,-50%)";

        panel.style.background =
        "rgba(0,0,0,0.9)";

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
        <h1>🎨 Colores Mágicos</h1>

        <h2 id="preguntaColor"></h2>

        <div id="opcionesColor"></div>

        <h3 id="resultadoColor"></h3>

        <h3 id="puntosColor">
        ⭐ Puntos: 0
        </h3>

        <button id="cerrarColor">
        Salir
        </button>
        `;

        document.body.appendChild(
            panel
        );

        document.exitPointerLock();

        document
        .getElementById(
            "cerrarColor"
        )
        .onclick =
        ()=>{

            panel.style.display =
            "none";

            document.body.requestPointerLock();

        };

        this.generarPregunta();

        this.configurarControles();

    }

    generarPregunta(){

        const indice =

        Math.floor(
            Math.random() *
            this.colores.length
        );

        this.correcto =
        this.colores[indice];

        document
        .getElementById(
            "preguntaColor"
        )
        .innerHTML =

        "Selecciona: " +
        this.correcto.nombre;

        const opciones =
        document.getElementById(
            "opcionesColor"
        );

        this.botones = [];
        this.indiceSeleccionado = 0;

        opciones.innerHTML =
        "";

        this.colores.forEach(
            color=>{

                const btn =
                document.createElement(
                    "button"
                );

                btn.innerHTML =
                color.emoji +
                " " +
                color.nombre;

                btn.style.margin =
                "10px";

                btn.style.fontSize =
                "20px";

                btn.style.padding =
                "15px";

                btn.style.cursor =
                "pointer";

                btn.onclick =
                ()=>{

                    this.comprobar(
                        color
                    );

                };

                opciones.appendChild(
                    btn
                );

                this.botones.push(
                    btn
                );

            }
        );

        this.resaltarBoton();

    }

    comprobar(color){

        const resultado =
        document.getElementById(
            "resultadoColor"
        );

        if(
            color.nombre ===
            this.correcto.nombre
        ){

            resultado.innerHTML =

"✅ Correcto<br>" +
this.correcto.emoji +
" " +
this.correcto.nombre;

            resultado.style.color =
            "lime";

            this.puntos++;

        }
        else{

            resultado.innerHTML =

"❌ Incorrecto<br>" +
"Era: " +
this.correcto.nombre;

            resultado.style.color =
            "red";

        }

        document
        .getElementById(
            "puntosColor"
        )
        .innerHTML =

        "⭐ Puntos: " +
        this.puntos;

        setTimeout(()=>{

            resultado.innerHTML =
            "";

            this.generarPregunta();

        },2000);

    }

    resaltarBoton(){

    this.botones.forEach(
        boton=>{

            boton.style.border =
            "2px solid white";

            boton.style.transform =
            "scale(1)";

            boton.style.background =
            "white";

        }
    );

    if(
        this.botones[
            this.indiceSeleccionado
        ]
    ){

        this.botones[
            this.indiceSeleccionado
        ].style.border =
        "5px solid yellow";

        this.botones[
            this.indiceSeleccionado
        ].style.transform =
        "scale(1.15)";

        this.botones[
            this.indiceSeleccionado
        ].style.background =
        "#fff59d";

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
                    "coloresUI"
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
                        this.botones.length
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
                        this.botones.length - 1;

                    }

                }

                if(
                    e.key ===
                    "Enter"
                ){

                    this.botones[
                        this.indiceSeleccionado
                    ]?.click();

                }

                this.resaltarBoton();

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

            this.indiceSeleccionado++;

            if(
                this.indiceSeleccionado >=
                this.botones.length
            ){

                this.indiceSeleccionado = 0;

            }

            this.resaltarBoton();

            this.joystickLiberado =
            false;

        }

        if(x < -0.8){

            this.indiceSeleccionado--;

            if(
                this.indiceSeleccionado < 0
            ){

                this.indiceSeleccionado =
                this.botones.length - 1;

            }

            this.resaltarBoton();

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

        this.botones[
            this.indiceSeleccionado
        ]?.click();

    }

},100);

    }

}