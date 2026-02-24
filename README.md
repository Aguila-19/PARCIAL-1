# Fredys-David-Parcial
en este repositorio esta nuestro parcial del computo l

<img src="https://ugb.edu.sv/wp-content/uploads/2023/06/UGB_LOGOTIPO_HORIZONTAL.png">

Docente: **Willian Alexis Montes Girón**

 **David Alfonso Alvarenga Bonilla**
 
 **Fredys Alejandro Hernadez Robles**


**Problematica**
**Gestión de la cola de pacientes en un consultorio**

Enunciado:
En muchos consultorios médicos y clínicas, la gestión de la cola de pacientes para atención es un proceso desorganizado y manual. 
Los pacientes llegan en diferentes momentos y muchas veces no hay un sistema claro para determinar quién debe ser atendido a continuación. Esto puede generar caos, especialmente cuando hay varios pacientes 
con diferentes niveles de urgencia (emergencias, consultas de rutina, controles, etc.), lo que resulta en tiempos de espera largos, duplicación de registros y confusión entre los pacientes y el personal médico.
Además, la falta de un sistema automatizado dificulta el registro eficiente de los pacientes, lo que podría llevar a errores humanos, como la asignación de un mismo turno a dos personas 
o la omisión de algún dato importante. Esto crea una experiencia negativa tanto para los pacientes como para los profesionales de salud, lo que afecta la productividad del consultorio y la satisfacción de los pacientes.
Sector o sectores enfocados:

Esta solución está dirigida principalmente al sector salud, en particular a consultorios médicos, clínicas pequeñas y medianas,
hospitales que manejan una gran cantidad de pacientes diarios y necesitanorganizar de forma eficiente el proceso de atención.
Además, podría extenderse a otros sectores de servicios donde se requiere gestionar colas de espera, como bancos, entidades gubernamentales, servicios de atención al cliente, etc.

**Solución propuesta:**
La página web propuesta resuelve este problema mediante un sistema automatizado para gestionar la cola de atención de pacientes.
A través de un formulario de registro, los pacientes pueden ingresar sus datos y seleccionar el motivo de su consulta, su nivel de prioridad y obtener un número de ticket. El sistema permite:
Registrar pacientes de manera eficiente, evitando duplicados y asegurando que los datos sean completos y correctos.
Gestionar la cola de pacientes, mostrando en tiempo real el número de pacientes en espera y quién será atendido a continuación.
Atender pacientes de forma ordenada, con la opción de marcar a quién se le ha dado atención y eliminarlo de la cola.
Limpiar la cola cuando sea necesario, restableciendo el sistema para una nueva jornada de trabajo.
Además, la interfaz de usuario es intuitiva, muestra notificaciones claras sobre el estado de los turnos y permite un manejo fácil y eficiente tanto para el personal como para los pacientes.

**Preguntas**
1. ¿Qué valor agregado tiene el uso de webcomponents a su proyecto?

El uso de Web Components en este proyecto agrega varios beneficios clave:
Encapsulación y modularidad: El TurnoItem es un Web Component que encapsula la estructura y el estilo de cada elemento de turno. Esto permite reutilizar este componente en diferentes partes de la página sin que afecte al resto del código o los estilos, lo que hace que el código sea más limpio, reutilizable y fácil de mantener.
Independencia de los estilos: Gracias a los Web Components, el componente tiene sus propios estilos, lo que evita conflictos con el estilo global de la página. El shadow DOM proporciona un ámbito aislado, lo que garantiza que el estilo y el comportamiento del componente no interfieran con otros elementos de la interfaz.
Fácil integración: Los Web Components se pueden usar de forma independiente en cualquier parte del proyecto, lo que facilita su integración en futuras funcionalidades o incluso en otros proyectos sin mayor esfuerzo.

2. ¿De qué forma manipularon los datos sin recargar la página?

Los datos en esta aplicación se manipulan de forma dinámica utilizando JavaScript. A través del código:
Cuando se registra un nuevo paciente, se agrega a la cola en el array cola. Los elementos de la cola se actualizan sin necesidad de recargar la página, gracias a la función render(), que actualiza el DOM de manera eficiente.
El uso de customElements permite crear el componente TurnoItem para renderizar la información de cada turno sin recargar la página. Este componente se actualiza y re-renderiza cuando se agregan o eliminan pacientes de la cola.
Las interacciones, como "Atender siguiente" y "Limpiar", modifican directamente el estado de la cola en el JavaScript y se reflejan en la página inmediatamente sin necesidad de recargarla, lo que proporciona una experiencia fluida y rápida para el usuario.

3. ¿De qué forma validaron las entradas de datos? Explique brevemente.

La validación de las entradas de datos en este proyecto se realiza de forma rigurosa antes de registrar a un paciente en la cola:
Validación de longitud: Se valida que el nombre del paciente tenga al menos 3 caracteres. Si no cumple con esta condición, se muestra un mensaje de error.
Validación de caracteres no permitidos: Se verifica que el nombre del paciente no contenga caracteres especiales o no permitidos mediante una expresión regular (/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/), evitando así entradas incorrectas.
Validación de campos requeridos: Se aseguran de que los campos "Trámite" y "Prioridad" estén seleccionados antes de permitir el envío del formulario. Si alguno de estos campos está vacío, el sistema muestra una notificación.
Validación de duplicados: Se verifica si ya existe un paciente con el mismo nombre y trámite en la cola. Si es así, se previene el registro de duplicados y se muestra una notificación.
Estas validaciones aseguran que solo se ingresen datos correctos y completos en la cola de pacientes, lo que mejora la eficiencia y la precisión del sistema.

4. ¿Cómo manejaría la escalabilidad futura en su página?

Para manejar la escalabilidad futura en esta página, podrían implementarse varias mejoras a medida que el proyecto crezca:Optimización de la manipulación de datos: 
Actualmente, la manipulación de la cola de pacientes se realiza en el cliente, lo que es adecuado para una pequeña cantidad de registros. Sin embargo, si el sistema tiene que gestionar
un número mucho mayor de pacientes, sería recomendable usar una base de datos (por ejemplo, mediante APIs RESTful o GraphQL) para almacenary recuperar los datos de manera eficiente,reduciendo la carga sobre el navegador.
Paginación y carga diferida: Si el número de pacientes en la cola crece considerablemente, se puede implementar paginación o carga diferida (lazy loading) para que solo se muestren los primeros N turnos o aquellos en espera, y los demás se carguen según sea necesario.
Optimización del rendimiento de los componentes: Aunque los Web Components son una excelente opción para crear interfaces modulares, se debe tener en cuenta el rendimiento si se manejan grandes volúmenes de datos. Se podría investigar el uso de técnicas como el Virtual
DOM o librerías como React o Vue.js para mejorar la actualización del DOM en casos de alta carga.
Seguridad y control de acceso: Para escalar a niveles más grandes, se deberá asegurar que solo los usuarios autorizados puedan acceder y manipular la cola, implementando roles y control de acceso.
Responsividad y adaptabilidad: A medida que el número de dispositivos y tamaños de pantalla crezca, se puede mejorar el diseño con un enfoque más profundo en la adaptabilidad móvil y
pruebas de usabilidad para asegurar que la página funcione sin problemas en diferentes dispositivos.
