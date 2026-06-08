// =====================================
// SISTEMA DE MINIJUEGOS DEL CIRCO
// =====================================

export class GestorMinijuegos {

    constructor(){

        console.log(
            "🎪 Sistema de Minijuegos Cargado"
        );

        this.minijuegos = [
            "Matemática Mágica",
            "Inglés con Pepito",
            "Acrobacia Estelar",
            "Memoria del Circo",
            "Lanzamiento de Aros",
            "Colores Mágicos"
        ];

        this.mostrarLista();

    }

    mostrarLista(){

        console.log(
            "🎮 Minijuegos disponibles:"
        );

        this.minijuegos.forEach(
            juego => {

                console.log(
                    "➡️ " + juego
                );

            }
        );

    }

    iniciar(nombre){

        console.log(
            "🚀 Iniciando: " + nombre
        );

        switch(nombre){

            case "Matemática Mágica":

                this.matematicas();

            break;

            case "Inglés con Pepito":

                this.ingles();

            break;

            case "Acrobacia Estelar":

                this.acrobacia();

            break;

            case "Memoria del Circo":

                this.memoria();

            break;

            case "Lanzamiento de Aros":

                this.aros();

            break;

            case "Colores Mágicos":

                this.colores();

            break;

            default:

                console.log(
                    "Minijuego no encontrado"
                );

        }

    }

    matematicas(){

        console.log(
            "🎩 Matemática Mágica"
        );

    }

    ingles(){

        console.log(
            "🤡 Inglés con Pepito"
        );

    }

    acrobacia(){

        console.log(
            "🤸 Acrobacia Estelar"
        );

    }

    memoria(){

        console.log(
            "🃏 Memoria del Circo"
        );

    }

    aros(){

        console.log(
            "🎯 Lanzamiento de Aros"
        );

    }

    colores(){

        console.log(
            "🎨 Colores Mágicos"
        );

    }

}