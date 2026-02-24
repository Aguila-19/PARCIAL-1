class TurnoItem extends HTMLElement {
  set data(t) {
    this.innerHTML = `
      <div style="
        border:1px solid rgba(255,255,255,0.10);
        background: rgba(255,255,255,0.06);
        border-radius: 16px;
        padding: 14px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.25);
      ">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start;">
          <div>
            <div style="font-weight:900;font-size:14px;">
              Paciente: ${t.nombre}
            </div>
            <div style="margin-top:6px;font-size:13px;opacity:0.85;">
              Trámite: <strong>${t.tramite}</strong> · Prioridad: <strong>${t.prioridad}</strong>
            </div>
          </div>

          <div style="text-align:right;">
            <div style="font-size:12px;opacity:0.7;">Ticket</div>
            <div style="font-size:16px;font-weight:900;color:#4f7cff;">#${t.ticket}</div>
          </div>
        </div>

        <div style="margin-top:10px;display:flex;justify-content:space-between;gap:10px;align-items:center;">
          <div style="font-size:12px;opacity:0.7;">
            Estado: <strong>${t.estado}</strong>
          </div>

          <div style="
            padding: 6px 10px;
            border-radius: 999px;
            border:1px solid rgba(255,255,255,0.12);
            background: rgba(0,0,0,0.25);
            font-size: 12px;
            font-weight: 900;
          ">
            N° Cola: ${t.posicion}
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define("turno-item", TurnoItem);

// Estado
let cola = [];
let ticketCounter = 1;

// DOM
const form = document.getElementById("formTurno");
const nombre = document.getElementById("nombre");
const tramite = document.getElementById("tramite");
const prioridad = document.getElementById("prioridad");

const listaTurnos = document.getElementById("listaTurnos");
const statCola = document.getElementById("statCola");
const statSiguiente = document.getElementById("statSiguiente");

const btnAtender = document.getElementById("btnAtender");
const btnLimpiar = document.getElementById("btnLimpiar");
const mensajeForm = document.getElementById("mensajeForm");

function setMsg(texto, tipo = "") {
  mensajeForm.className = "notice " + tipo;
  mensajeForm.textContent = texto;
}

function existeDuplicado(n, tr) {
  const key = (n + "|" + tr).toLowerCase();
  return cola.some(x => (x.nombre + "|" + x.tramite).toLowerCase() === key);
}

function render() {
  listaTurnos.innerHTML = "";

  // recalcular posiciones (número de cola real)
  cola = cola.map((t, idx) => ({ ...t, posicion: idx + 1 }));

  statCola.textContent = String(cola.length);

  if (cola.length === 0) {
    statSiguiente.textContent = "—";
    return;
  }

  const next = cola[0];
  statSiguiente.textContent = `${next.nombre} (Cola ${next.posicion})`;

  cola.forEach(t => {
    const item = document.createElement("turno-item");
    item.data = t;
    listaTurnos.appendChild(item);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const n = nombre.value.trim();
  const tr = tramite.value;
  const pr = prioridad.value;

  // Validación fuerte
  if (n.length < 3) {
    setMsg("Nombre inválido: mínimo 3 caracteres.", "bad");
    return;
  }
  if (!tr) {
    setMsg("Seleccione un trámite.", "bad");
    return;
  }
  if (!pr) {
    setMsg("Seleccione prioridad.", "bad");
    return;
  }
  if (existeDuplicado(n, tr)) {
    setMsg("Registro duplicado: mismo nombre y trámite en cola.", "bad");
    return;
  }

  const nuevo = {
    ticket: ticketCounter++,
    nombre: n,
    tramite: tr,
    prioridad: pr,
    estado: "En espera",
    posicion: cola.length + 1
  };

  cola.push(nuevo);
  form.reset();
  setMsg(`Turno generado para ${nuevo.nombre}. Ticket #${nuevo.ticket}.`, "ok");
  render();
});

btnAtender.addEventListener("click", () => {
  if (cola.length === 0) {
    alert("No hay pacientes en cola.");
    return;
  }
  const atendido = cola.shift();
  alert(`Atendiendo a: ${atendido.nombre} (Ticket #${atendido.ticket})`);
  render();
});

btnLimpiar.addEventListener("click", () => {
  if (cola.length === 0) return;
  const ok = confirm("¿Desea limpiar toda la cola?");
  if (!ok) return;

  cola = [];
  render();
  setMsg("Cola limpiada correctamente.", "ok");
});

// inicial
render();