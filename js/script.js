const preguntas = [
    {
        pregunta: "¿Cuál es la capital de España?",
        opciones: ["Madrid", "Barcelona", "Sevilla", "Valencia"],
        respuestaCorrecta: "Madrid"
    },
    {
        pregunta: "¿Cuál es el resultado de 3 + 5?",
        opciones: ["5", "8", "10", "9"],
        respuestaCorrecta: "8"
    },
    {
        pregunta: "¿Quién escribió 'Cien años de soledad'?",
        opciones: ["Mario Vargas Llosa", "Pablo Neruda", "Gabriel García Márquez", "Octavio Paz"],
        respuestaCorrecta: "Gabriel García Márquez"
    },
    {
        pregunta: "¿Qué planeta es conocido como el planeta rojo?",
        opciones: ["Venus", "Marte", "Júpiter", "Saturno"],
        respuestaCorrecta: "Marte"
    },
    {
        pregunta: "¿Cuántos continentes hay en el mundo?",
        opciones: ["5", "6", "7", "8"],
        respuestaCorrecta: "7"
    }
];

let indicePreguntaActual = 0;
let puntuacion = 0;

let textoPregunta, contenedorOpciones, mensajeError, textoPuntuacion;
let contenedorPreguntas, contenedorResultado;

function cargarPregunta() {
    const preguntaActual = preguntas[indicePreguntaActual];
    textoPregunta.textContent = preguntaActual.pregunta;
    contenedorOpciones.innerHTML = "";
    mensajeError.textContent = "";

    preguntaActual.opciones.forEach(opcion => {
        const div = document.createElement("div");
        div.classList.add("opcion");

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "respuesta";
        input.value = opcion;
        input.id = opcion;

        const etiqueta = document.createElement("label");
        etiqueta.setAttribute("for", opcion);
        etiqueta.textContent = opcion;

        div.appendChild(input);
        div.appendChild(etiqueta);
        contenedorOpciones.appendChild(div);
});
}

function siguientePregunta() {
    const seleccionada = document.querySelector("input[name='respuesta']:checked");
    if (!seleccionada) {
        mensajeError.textContent = "Por favor selecciona una respuesta antes de continuar.";
        return;
    }

    if (seleccionada.value === preguntas[indicePreguntaActual].respuestaCorrecta) {
        puntuacion++;
    }

    indicePreguntaActual++;

    if (indicePreguntaActual < preguntas.length) {
        cargarPregunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    contenedorPreguntas.classList.add("hidden");
    contenedorResultado.classList.remove("hidden");
    textoPuntuacion.textContent = `Has acertado ${puntuacion} de ${preguntas.length} preguntas.`;
}

function reiniciarCuestionario() {
    indicePreguntaActual = 0;
    puntuacion = 0;
    contenedorPreguntas.classList.remove("hidden");
    contenedorResultado.classList.add("hidden");
    cargarPregunta();
}

// Iniciar al cargar el DOM
window.addEventListener("DOMContentLoaded", () => {
    textoPregunta = document.getElementById("texto-pregunta");
    contenedorOpciones = document.getElementById("contenedor-opciones");
    mensajeError = document.getElementById("mensaje-error");
    textoPuntuacion = document.getElementById("texto-puntuacion");
    contenedorPreguntas = document.getElementById("contenedor-preguntas");
    contenedorResultado = document.getElementById("contenedor-resultado");

    cargarPregunta();
});
