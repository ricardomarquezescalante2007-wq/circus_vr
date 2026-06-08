export class MatematicaMagica{

    constructor(){

        this.puntos = 0;
        this.respuestaCorrecta = 0;

    }

    iniciar(){

        document.exitPointerLock();
        

        let panel =
        document.getElementById(
            "matematicasUI"
        );

        if(panel){

    panel.style.display =
    "block";

    this.generarPregunta();

    setTimeout(()=>{

        document
        .getElementById(
            "respuestaMate"
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
        "matematicasUI";

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
        <h1>🎩 Matemática Mágica</h1>

        <h2 id="preguntaMate"></h2>

        <input
        id="respuestaMate"
        type="number"
        style="font-size:24px">

        <br><br>

        <button id="btnResponder">

            Responder

        </button>

        <h3 id="resultadoMate"></h3>

        <h3 id="puntosMate">

            Puntos: 0

        </h3>

        <button id="cerrarMate">

            Salir

        </button>
        `;

        document.body.appendChild(
            panel
        );

        document
.getElementById(
    "respuestaMate"
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
)

document
.getElementById(
    "respuestaMate"
)
.focus();

        document
        .getElementById(
            "btnResponder"
        )
        .onclick =
        ()=>{

            this.comprobar();

        };

        document
        .getElementById(
            "cerrarMate"
        )
        .onclick =
        ()=>{

            panel.style.display =
"none";

document.body
.requestPointerLock();

        };

        this.generarPregunta();

    }

    generarPregunta(){

        const a =
        Math.floor(
            Math.random()*10
        )+1;

        const b =
        Math.floor(
            Math.random()*10
        )+1;

        const tipo =
        Math.floor(
            Math.random()*3
        );

        let texto;

        if(tipo===0){

            texto =
            `${a} + ${b}`;

            this.respuestaCorrecta =
            a+b;

        }

        if(tipo===1){

            texto =
            `${a} - ${b}`;

            this.respuestaCorrecta =
            a-b;

        }

        if(tipo===2){

            texto =
            `${a} × ${b}`;

            this.respuestaCorrecta =
            a*b;

        }

        document
        .getElementById(
            "preguntaMate"
        )
        .innerHTML =
        texto;

    }

    comprobar(){

        const campo =
document.getElementById(
    "respuestaMate"
);

if(
    campo.value.trim() === ""
)
return;

    const respuesta =

    Number(

        document
        .getElementById(
            "respuestaMate"
        )
        .value

    );

    const resultado =

    document
    .getElementById(
        "resultadoMate"
    );

    if(
        respuesta ===
        this.respuestaCorrecta
    ){

        resultado.innerHTML =

"✅ ¡Correcto!<br>" +
"Respuesta: " +
this.respuestaCorrecta;

        resultado.style.color =
        "lime";

        this.puntos++;

    }
    else{

        resultado.innerHTML =
        "❌ Incorrecto. La respuesta era: " +
        this.respuestaCorrecta;

        resultado.style.color =
        "red";

    }

    document
    .getElementById(
        "puntosMate"
    )
    .innerHTML =

    "⭐ Puntos: " +
    this.puntos;

    document
    .getElementById(
        "respuestaMate"
    )
    .value =
    "";

    setTimeout(()=>{
        
        resultado.innerHTML = "";

        this.generarPregunta();

document
.getElementById(
    "respuestaMate"
)
.focus();

    },3000);

}

}
