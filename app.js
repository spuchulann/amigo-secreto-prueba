// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

// Lista (array) donde guardaremos los nombres
const amigos = [];
// Para validar duplicados de forma insensible a mayúsculas
const amigosSetLower = new Set();

// Utilidad: referencias a elementos del DOM
const $input = () => document.getElementById("amigo");
const $lista = () => document.getElementById("listaAmigos");
const $resultado = () => document.getElementById("resultado");

// --------- Funciones principales que pide el HTML ---------

function agregarAmigo() {
  // 1) Tomamos el texto y lo limpiamos
  const nombre = ($input().value || "").trim();

  // 2) Validaciones con condicionales
  if (!nombre) {
    mostrarMensaje("Por favor, escribe un nombre antes de añadir.");
    return;
  }

  const claveLower = nombre.toLowerCase();
  if (amigosSetLower.has(claveLower)) {
    mostrarMensaje("Ese nombre ya fue ingresado. Evitemos duplicados ✅");
    return;
  }

  // 3) Agregar a la lista
  amigos.push(nombre);
  amigosSetLower.add(claveLower);

  // 4) Actualizar la vista (lista de nombres) y limpiar el input
  renderListaAmigos();
  $input().value = "";
  $input().focus();
  limpiarResultado();
}

function sortearAmigo() {
  // Si no hay suficientes nombres, avisamos
  if (amigos.length === 0) {
    mostrarMensaje("No hay nombres para sortear. Agrega al menos uno.");
    return;
  }

  // Elegimos un índice aleatorio
  const indice = Math.floor(Math.random() * amigos.length);
  // Para evitar repetir ganadores en sorteos sucesivos, lo quitamos del array
  const ganador = amigos.splice(indice, 1)[0];
  amigosSetLower.delete(ganador.toLowerCase());

  // Mostramos el resultado y refrescamos la lista visible
  mostrarResultado(`🎉 El amigo secreto sorteado es: <strong>${ganador}</strong>`);
  renderListaAmigos();
}

// --------- Utilidades de interfaz ---------

function renderListaAmigos() {
  // Limpiamos la UL
  const ul = $lista();
  ul.innerHTML = "";

  // Recorremos el array para crear <li> (usa lazo de repetición)
  for (let i = 0; i < amigos.length; i++) {
    const li = document.createElement("li");
    li.textContent = `• ${amigos[i]}`;
    ul.appendChild(li);
  }
}

function mostrarMensaje(texto) {
  // Muestra mensajes informativos en la zona de resultado
  mostrarResultado(texto);
}

function mostrarResultado(html) {
  const ul = $resultado();
  ul.innerHTML = "";
  const li = document.createElement("li");
  li.innerHTML = html;
  ul.appendChild(li);
}

function limpiarResultado() {
  $resultado().innerHTML = "";
}

// --------- Mejora de usabilidad: Enter agrega ---------
document.addEventListener("DOMContentLoaded", () => {
  const input = $input();
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        agregarAmigo();
      }
    });
  }
});