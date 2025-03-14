function validateForm() {
    let valid = true;
    
    function validateField(id, regex, errorMessage) {
        let field = document.getElementById(id);
        let errorElement = document.getElementById("error-" + id);
        if (!regex.test(field.value.trim())) {
            errorElement.textContent = errorMessage;
            valid = false;
        } else {
            errorElement.textContent = "";
        }
    }
    
    validateField("nombre", /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/, "Solo se permiten letras");
    validateField("apellido", /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/, "Solo se permiten letras");
    validateField("telefono", /^\d{7,10}$/, "Debe contener entre 7 y 10 dígitos");
    validateField("cedula", /^\d{6,10}$/, "Debe contener entre 6 y 10 dígitos");
    validateField("NIT", /^\d{9,12}$/, "Debe contener entre 9 y 12 dígitos");
    validateField("correo", /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Correo inválido");
    validateField("departamento", /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/, "Solo se permiten letras");
    validateField("ciudad", /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/, "Solo se permiten letras");
    
    return valid;
}

document.getElementById("date").addEventListener("change", function () {
    let input = this;
    let date = new Date(input.value);
    let minutes = date.getMinutes();

    // Redondear los minutos al múltiplo de 30 más cercano
    let correctedMinutes = Math.round(minutes / 30) * 30;
    date.setMinutes(correctedMinutes, 0, 0);

    // Formatear correctamente la fecha para el input
    let formattedDate = date.toISOString().slice(0, 16);
    input.value = formattedDate;
});;

document.addEventListener('DOMContentLoaded', async () => {
    const identifierTypeSelect = document.getElementById('identifier-type');

    try {
        const response = await fetch('http://localhost:8080/identifier-type'); // Petición GET
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const identifierTypes = await response.json(); // Convertir respuesta a JSON

        // Llenar el select con los tipos de identificador obtenidos
        identifierTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type.id;  // Suponiendo que tiene un campo "id"
            option.textContent = type.name; // Suponiendo que tiene un campo "name"
            identifierTypeSelect.appendChild(option);
        });

    } catch (error) {
        console.error('Error al obtener los tipos de identificador:', error);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const tipoPersona = document.getElementById("tipo_persona");
    const cedulaGroup = document.getElementById("group-cedula");
    const nitGroup = document.getElementById("group-nit");

    function toggleFields() {
        if (tipoPersona.value === "natural") {
            cedulaGroup.style.display = "block";
            nitGroup.style.display = "none";
        } else if (tipoPersona.value === "empresa") {
            cedulaGroup.style.display = "none";
            nitGroup.style.display = "block";
        }
    }

    // Ocultar ambos al inicio hasta que se seleccione una opción
    cedulaGroup.style.display = "none";
    nitGroup.style.display = "none";

    // Evento para detectar cambios en la selección
    tipoPersona.addEventListener("change", toggleFields);
});
  // Detects the scroll event to add a shadow effect to the header
document.addEventListener('scroll', () => {
    const header = document.getElementById('header'); // Selects the header element by its ID

    // Adds or removes the 'scrolled' class based on the scroll position
    if (window.scrollY > 50) {
        header.classList.add('scrolled'); // Adds the 'scrolled' class if the scroll position is greater than 50 pixels
    } else {
        header.classList.remove('scrolled'); // Removes the 'scrolled' class if the scroll position is 50 pixels or less
    }
});

// Selects the theme switch input element from the DOM
const modeToggle = document.getElementById('theme-switch');

// Stores a reference to the body element for class manipulation
const body = document.body;

// Selects the logo image element
const logo = document.getElementById('logo');

/**
 * Function to toggle between dark mode and light mode
 */
function toggleTheme() {
    // Toggles the 'light-mode' class on the body element
    body.classList.toggle('light-mode');

    // Checks if light mode is active
    if (body.classList.contains('light-mode')) {
        // Changes the logo to the light mode version
        logo.src = 'assets/claro_logo_header.png';
        // Saves the mode to localStorage
        localStorage.setItem('theme', 'light');
    } else {
        // Reverts the logo to the dark mode version
        logo.src = 'assets/logo_header.png';
        // Saves the mode to localStorage
        localStorage.setItem('theme', 'dark');
    }
}

// Check if there is a saved theme in localStorage and apply it
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    logo.src = 'assets/images/claro_logo_header.png';
    modeToggle.checked = true;  // Ensures the slider is set to "light mode"
} else if (savedTheme === 'dark') {
    body.classList.remove('light-mode');
    logo.src = 'assets/images/logo_header.png';
    modeToggle.checked = false; // Ensures the slider is set to "dark mode"
}

// Adds a click event listener to the theme toggle button to switch themes
modeToggle.addEventListener('click', toggleTheme);

// Function to sync slider icon depending on the theme
modeToggle.addEventListener('change', () => {
    if (modeToggle.checked) {
        // Light mode
        logo.src = 'assets/images/claro_logo_header.png';
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        // Dark mode
        logo.src = 'assets/images/logo_header.png';
        body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    }
});
