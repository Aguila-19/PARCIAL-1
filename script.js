// WebComponent personalizado
class TarjetaCita extends HTMLElement {
    set data(info) {
        this.innerHTML = `
            <div style="background:white; padding:15px; margin:10px; 
                        border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1)">
                <p><strong>Paciente:</strong> ${info.nombre}</p>
                <p><strong>Especialidad:</strong> ${info.especialidad}</p>
                <p><strong>Fecha:</strong> ${info.fecha}</p>
            </div>
        `;
    }
}

customElements.define("tarjeta-cita", TarjetaCita);

// Evento del formulario
document.getElementById("formCita").addEventListener("submit", function(e) {

    e.preventDefault(); // evita recarga

    let nombre = document.getElementById("nombre").value.trim();
    let especialidad = document.getElementById("especialidad").value;
    let fecha = document.getElementById("fecha").value;

    // Validación manual adicional
    if(nombre === "" || especialidad === "" || fecha === "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    let nuevaCita = {
        nombre,
        especialidad,
        fecha
    };

    let tarjeta = document.createElement("tarjeta-cita");
    tarjeta.data = nuevaCita;

    document.getElementById("resultado").appendChild(tarjeta);

    document.getElementById("formCita").reset();
});