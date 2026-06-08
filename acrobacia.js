export class AcrobaciaEstelar{

    constructor(){

        this.joystickLiberado = true;

        this.controlActivo = false;

        this.secuencia = [];

        this.indice = 0;

        this.puntos = 0;

        this.flechas = [
            "⬆️",
            "⬇️",
            "⬅️",
            "➡️"
        ];

    }

    iniciar(){

        let panel =
        document.getElementById(
            "acrobaciaUI"
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
        "acrobaciaUI";

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
        <h1>🤸 Acrobacia Estelar</h1>

        <h2 id="secuenciaAcro"></h2>

        <h3 id="resultadoAcro"></h3>

        <h3 id="puntosAcro">
        ⭐ Puntos: 0
        </h3>

        <button id="cerrarAcro">
        Salir
        </button>
        `;

        document.body.appendChild(
            panel
        );

        document
        .getElementById(
            "cerrarAcro"
        )
        .onclick =
        ()=>{

            panel.style.display =
            "none";

            document.body.requestPointerLock();

        };

        this.configurarControles();

        this.nuevaRonda();

    }

    nuevaRonda(){

        this.indice = 0;

        this.secuencia = [];

        for(
            let i=0;
            i<4;
            i++
        ){

            this.secuencia.push(

                Math.floor(
                    Math.random()*4
                )

            );

        }

        document
        .getElementById(
            "secuenciaAcro"
        )
        .innerHTML =

        this.secuencia
        .map(
            i=>this.flechas[i]
        )
        .join(" ");

        document
        .getElementById(
            "resultadoAcro"
        )
        .innerHTML =
        "Repite la secuencia";

        setTimeout(()=>{

    document
    .getElementById(
        "secuenciaAcro"
    )
    .innerHTML =
    "❓ ❓ ❓ ❓";

},3000);

    }

    entrada(valor){

        document
.getElementById(
    "resultadoAcro"
)
.innerHTML =

"Paso " +
(this.indice + 1) +
" de " +
this.secuencia.length;

        if(
            valor ===
            this.secuencia[
                this.indice
            ]
        ){

            this.indice++;

            if(
                this.indice >=
                this.secuencia.length
            ){

                this.puntos++;

                document
                .getElementById(
                    "resultadoAcro"
                )
                .innerHTML =
                "✅ Correcto";

                document
                .getElementById(
                    "puntosAcro"
                )
                .innerHTML =

                "⭐ Puntos: " +
                this.puntos;

                setTimeout(
                    ()=>{

                        this.nuevaRonda();

                    },
                    1500
                );

            }

        }
        else{

            document
            .getElementById(
                "resultadoAcro"
            )
            .innerHTML =
            "❌ Error";

            setTimeout(
                ()=>{

                    this.nuevaRonda();

                },
                1500
            );

        }

    }

    configurarControles(){

        if(
            this.controlActivo
        )
        return;

        this.controlActivo = true;

        window.addEventListener(
            "keydown",
            (e)=>{

                const panel =
                document.getElementById(
                    "acrobaciaUI"
                );

                if(
                    !panel ||
                    panel.style.display==="none"
                )
                return;

                if(
                    e.key==="ArrowUp"
                ){

                    this.entrada(0);

                }

                if(
                    e.key==="ArrowDown"
                ){

                    this.entrada(1);

                }

                if(
                    e.key==="ArrowLeft"
                ){

                    this.entrada(2);

                }

                if(
                    e.key==="ArrowRight"
                ){

                    this.entrada(3);

                }

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

        this.joystickLiberado = true;

        return;

    }

    if(
        !this.joystickLiberado
    )
    return;

    this.joystickLiberado = false;

    if(y < -0.8){

        this.entrada(0);

    }
    else if(y > 0.8){

        this.entrada(1);

    }
    else if(x < -0.8){

        this.entrada(2);

    }
    else if(x > 0.8){

        this.entrada(3);

    }

},100);

    }

}