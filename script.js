// Cambio de tema dinámico
const themeLightBtn = document.getElementById("theme-light");
const themeDarkBtn = document.getElementById("theme-dark");
const themeBlueBtn = document.getElementById("theme-blue");

const body = document.body;

themeLightBtn.addEventListener("click", () => {
  body.classList.remove("theme-dark", "theme-blue");
  body.classList.add("theme-light");
  setThemeVariables({
    '--header-bg': '#ffffff',
    '--main-bg': '#fcfcfc',
    '--footer-bg': '#1c2bc0',
    '--header-text-color': '#0c1b98',
    '--main-text-color': '#333333',
    '--link-color': '#333333',
    '--link-hover-color': '#1c2bc0',
    '--button-bg': '#4a90e2',
    '--button-hover-bg': '#76b6e4',
  });
});

themeDarkBtn.addEventListener("click", () => {
  body.classList.remove("theme-light", "theme-blue");
  body.classList.add("theme-dark");
  setThemeVariables({
    '--header-bg': '#2c2f36',
    '--main-bg': '#1e1e1e',
    '--footer-bg': '#333333',
    '--header-text-color': '#e6e6e6',
    '--main-text-color': '#e6e6e6',
    '--link-color': '#e6e6e6',
    '--link-hover-color': '#76b6e4',
    '--button-bg': '#4a90e2',
    '--button-hover-bg': '#76b6e4',
  });
});

themeBlueBtn.addEventListener("click", () => {
  body.classList.remove("theme-light", "theme-dark");
  body.classList.add("theme-blue");
  setThemeVariables({
    '--header-bg': '#d1e4f7',
    '--main-bg': '#fcfcfc',
    '--footer-bg': '#1c2bc0',
    '--header-text-color': '#1a73e8',
    '--main-text-color': '#333333',
    '--link-color': '#333333',
    '--link-hover-color': '#1c2bc0',
    '--button-bg': '#1a73e8',
    '--button-hover-bg': '#76b6e4',
  });
});

// Función para actualizar las variables CSS de los temas
function setThemeVariables(variables) {
  for (const [key, value] of Object.entries(variables)) {
    document.documentElement.style.setProperty(key, value);
  }
}

// Inicializar tema por defecto (opcional)
if (!localStorage.getItem("theme")) {
  body.classList.add("theme-light");
} else {
  body.classList.add(localStorage.getItem("theme"));
}

// Guardar tema actual
const saveTheme = () => {
  localStorage.setItem("theme", body.classList[1]);
};

themeLightBtn.addEventListener("click", saveTheme);
themeDarkBtn.addEventListener("click", saveTheme);
themeBlueBtn.addEventListener("click", saveTheme);