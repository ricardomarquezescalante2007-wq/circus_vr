export class InglesPepito{

    constructor(){

        this.intentos = 0;
        
        this.puntos = 0;

        this.preguntas = [

            {
                espanol:"Perro",
                ingles:"dog"
            },

            {
                espanol:"Gato",
                ingles:"cat"
            },

            {
                espanol:"Casa",
                ingles:"house"
            },

            {
                espanol:"Sol",
                ingles:"sun"
            },

            {
                espanol:"Agua",
                ingles:"water"
            }

        ];

        this.actual = null;

    }

    iniciar(){

        let panel =
        document.getElementById(
            "inglesUI"
        );

        if(panel){

    panel.style.display =
    "block";

    this.generarPregunta();

    setTimeout(()=>{

        document
        .getElementById(
            "respuestaIngles"
        )
        .focus();

    },100);

    return;

}

        panel =
        document.createElement(
            "div"
        );

        panel.id =
        "inglesUI";

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
        <h1>🤡 Inglés con Pepito</h1>

        <h2 id="palabraEspanol"></h2>

        <input
        id="respuestaIngles"
        type="text">

        <br><br>

        <button id="btnIngles">

            Responder

        </button>

        <h3 id="resultadoIngles"></h3>

        <h3 id="puntosIngles">

            ⭐ Puntos: 0

        </h3>

        <button id="cerrarIngles">

            Salir

        </button>
        `;

        document.body.appendChild(
            panel
        );

        document.exitPointerLock();
        setTimeout(()=>{

    document
    .getElementById(
        "respuestaIngles"
    )
    .focus();

},100);

        document
        .getElementById(
            "respuestaIngles"
        )
        .addEventListener(
            "keydown",
            (e)=>{

                if(
                    e.key === "Enter"
                ){

                    this.comprobar();

                }

            }
        );

        document
        .getElementById(
            "btnIngles"
        )
        .onclick =
        ()=>{

            this.comprobar();

        };

        document
        .getElementById(
            "cerrarIngles"
        )
        .onclick =
        ()=>{

            panel.style.display =
"none";

document.body.requestPointerLock();

        };

        this.generarPregunta();

document
.getElementById(
    "respuestaIngles"
)
.focus();

    }

    generarPregunta(){

        const indice =

        Math.floor(

            Math.random() *
            this.preguntas.length

        );

        this.actual =
        this.preguntas[indice];

        document
        .getElementById(
            "palabraEspanol"
        )
        .innerHTML =

        "Traduce: " +
        this.actual.espanol;

    }

    comprobar(){

        this.intentos++;

        const respuesta =

        document
        .getElementById(
            "respuestaIngles"
        )
        .value
        .toLowerCase()
        .trim();

        const resultado =

        document
        .getElementById(
            "resultadoIngles"
        );

        if(
            respuesta ===
            this.actual.ingles
        ){

            resultado.innerHTML =

"✅ Correcto<br>" +
this.actual.espanol +
" = " +
this.actual.ingles;

            resultado.style.color =
            "lime";

            this.puntos++;

        }
        else{

            resultado.innerHTML =

            "❌ Era: " +
            this.actual.ingles;

            resultado.style.color =
            "red";

        }

        document
        .getElementById(
            "puntosIngles"
        )
        .innerHTML =

        "⭐ Puntos: " +
        this.puntos;

        document
        .getElementById(
            "respuestaIngles"
        )
        .value =
        "";

        setTimeout(()=>{

            resultado.innerHTML =
            "";

            this.generarPregunta();

        },3000);

    }

}