// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

// Almacenamiento y control de duplicados (case-insensitive)
const amigos = [];
const amigosSetLower = new Set();

// Accesos rápidos
const $ = (id) => document.getElementById(id);
const $input = () => $("amigo");
const $ulLista = () => $("listaAmigos");
const $ulResultado = () => $("resultado");
const $btnSortear = () => $("btnSortear");
const $btnLimpiar = () => $("btnLimpiar");

// Estado inicial
document.addEventListener("DOMContentLoaded", () => {
  mensajeSinNombres();
  actualizarEstadoBotones();
  // Enter para añadir
  $input().addEventListener("keydown", (e) => {
    if (e.key === "Enter") agregarAmigo();
  });
});

// --- Funciones principales ---
function agregarAmigo() {
  const nombre = ($input().value || "").trim();
  if (!nombre) { mostrarResultado("Escribe un nombre antes de añadir."); return; }

  const key = nombre.toLowerCase();
  if (amigosSetLower.has(key)) {
    mostrarResultado("Ese nombre ya fue ingresado. Evitemos duplicados ✅");
    return;
  }

  amigos.push(nombre);
  amigosSetLower.add(key);
  $input().value = "";
  renderLista();
  limpiarResultado();
  actualizarEstadoBotones();
}

function sortearAmigo() {
  if (amigos.length === 0) { mensajeSinNombres(); return; }

  const idx = Math.floor(Math.random() * amigos.length);
  const ganador = amigos.splice(idx, 1)[0];
  amigosSetLower.delete(ganador.toLowerCase());

  renderLista();
  mostrarResultado(`🎉 El amigo secreto sorteado es: <strong>${ganador}</strong>`);
  actualizarEstadoBotones();
}

function limpiarAmigos() {
  if (amigos.length === 0) return;
  amigos.length = 0;
  amigosSetLower.clear();
  renderLista();
  mensajeSinNombres();
  actualizarEstadoBotones();
}

// --- Utilidades UI ---
function renderLista() {
  const ul = $ulLista();
  ul.innerHTML = "";
  for (let i = 0; i < amigos.length; i++) {
    const li = document.createElement("li");
    li.textContent = `• ${amigos[i]}`;
    ul.appendChild(li);
  }
}

function mostrarResultado(html) {
  const ul = $ulResultado();
  ul.innerHTML = "";
  const li = document.createElement("li");
  li.innerHTML = html;
  ul.appendChild(li);
}

function limpiarResultado() {
  $ulResultado().innerHTML = "";
}

function mensajeSinNombres() {
  mostrarResultado("No hay nombres para sortear. Agrega al menos uno.");
}

function actualizarEstadoBotones() {
  const vacio = amigos.length === 0;
  $btnSortear().disabled = vacio;
  $btnLimpiar().disabled = vacio;
}