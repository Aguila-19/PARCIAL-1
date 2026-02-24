// WebComponent: tarjeta de turno reutilizable
class TurnoCard extends HTMLElement {
  set data(turno) {
    this.innerHTML = `
      <div style="padding:12px;border-radius:10px;background:#fff;
                  box-shadow:0 2px 10px rgba(0,0,0,0.06);
                  border:1px solid #ececf3;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <strong style="color:#1c2bc0;">Turno #${turno.numero}</strong>
          <span style="font-size:12px;color:#555;">${turno.tramite}</span>
        </div>
        <p style="margin-top:8px;"><strong>Nombre:</strong> ${turno.nombre}</p>
        <p style="font-size:12px;color:#666;margin-top:6px;">
          Estado: ${turno.estado}
        </p>
      </div>
    `;
  }
}
customElements.define("turno-card", TurnoCard);

// Estado de la app (cola de turnos)
let cola = [];
let correlativo = 1;

// Referencias DOM
const form = document.getElementById("formTurno");
const inputNombre = document.getElementById("nombre");
const selectTramite = document.getElementById("tramite");
const listaTurnos = document.getElementById("listaTurnos");
const estado = document.getElementById("estado");
const btnAtender = document.getElementById("btnAtender");
const btnLimpiar = document.getElementById("btnLimpiar");

// Renderiza la cola sin recargar (DOM)
function render() {
  listaTurnos.innerHTML = "";

  if (cola.length === 0) {
    estado.textContent = "No hay turnos en cola.";
    return;
  }

  const primero = cola[0];
  estado.textContent = `Siguiente a atender: Turno #${primero.numero} - ${primero.nombre} (${primero.tramite})`;

  cola.forEach(t => {
    const card = document.createElement("turno-card");
    card.data = t;
    listaTurnos.appendChild(card);
  });
}

// Validación: evita datos vacíos y duplicados
function existeDuplicado(nombre, tramite) {
  const key = (nombre + "|" + tramite).toLowerCase();
  return cola.some(t => (t.nombre + "|" + t.tramite).toLowerCase() === key);
}

// Evento submit (sin recargar)
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = inputNombre.value.trim();
  const tramite = selectTramite.value;

  // Validación fuerte (más allá de required)
  if (nombre.length < 3) {
    alert("El nombre debe tener al menos 3 caracteres.");
    return;
  }
  if (!tramite) {
    alert("Seleccione un trámite.");
    return;
  }
  if (existeDuplicado(nombre, tramite)) {
    alert("Ese turno ya existe (mismo nombre y trámite). Evitamos duplicados.");
    return;
  }

  const nuevoTurno = {
    numero: correlativo++,
    nombre,
    tramite,
    estado: "En espera"
  };

  cola.push(nuevoTurno);
  form.reset();
  render();
});

// Evento atender siguiente
btnAtender.addEventListener("click", () => {
  if (cola.length === 0) {
    alert("No hay turnos para atender.");
    return;
  }

  const atendido = cola.shift(); // sale el primero (FIFO)
  alert(`Atendiendo: Turno #${atendido.numero} - ${atendido.nombre} (${atendido.tramite})`);
  render();
});

// Evento limpiar cola
btnLimpiar.addEventListener("click", () => {
  if (cola.length === 0) return;
  const ok = confirm("¿Seguro que desea limpiar la cola?");
  if (!ok) return;

  cola = [];
  render();
});

// Inicial
render();