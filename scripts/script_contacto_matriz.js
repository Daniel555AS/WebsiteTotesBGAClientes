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

      /* --- Dropdown personalizado para FECHA (próximos 30 días) --- */
      const dropdownDate = document.getElementById('custom-dropdown-date');
      const dropdownSelectedDate = dropdownDate.querySelector('.dropdown-selected');
      const dropdownListDate = dropdownDate.querySelector('.dropdown-list');
      const hiddenInputDate = document.getElementById('fecha');
  
      const today = new Date();
      const daysToGenerate = 30; // Puedes ajustar el rango de fechas disponibles
      for (let i = 0; i < daysToGenerate; i++) {
        const dateOption = new Date(today);
        dateOption.setDate(today.getDate() + i);
        const year = dateOption.getFullYear();
        const month = String(dateOption.getMonth() + 1).padStart(2, '0');
        const day = String(dateOption.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        const optionDiv = document.createElement('div');
        optionDiv.className = 'dropdown-option';
        optionDiv.textContent = formattedDate;
        optionDiv.addEventListener('click', function() {
          dropdownSelectedDate.textContent = formattedDate;
          hiddenInputDate.value = formattedDate;
          dropdownListDate.style.display = 'none';
        });
        dropdownListDate.appendChild(optionDiv);
      }
  
      dropdownSelectedDate.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownListDate.style.display = dropdownListDate.style.display === 'block' ? 'none' : 'block';
      });
  
      document.addEventListener('click', function() {
        dropdownListDate.style.display = 'none';
      });
  
      /* --- Dropdown personalizado para HORA (intervalos de 30 minutos) --- */
      const dropdownTime = document.getElementById('custom-dropdown-time');
      const dropdownSelectedTime = dropdownTime.querySelector('.dropdown-selected');
      const dropdownListTime = dropdownTime.querySelector('.dropdown-list');
      const hiddenInputTime = document.getElementById('hora-time');
  
      for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 30) {
          const hour = String(h).padStart(2, '0');
          const minute = String(m).padStart(2, '0');
          const timeValue = `${hour}:${minute}`;
          const optionDiv = document.createElement('div');
          optionDiv.className = 'dropdown-option';
          optionDiv.textContent = timeValue;
          optionDiv.addEventListener('click', function() {
            dropdownSelectedTime.textContent = timeValue;
            hiddenInputTime.value = timeValue;
            dropdownListTime.style.display = 'none';
          });
          dropdownListTime.appendChild(optionDiv);
        }
      }
  
      dropdownSelectedTime.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownListTime.style.display = dropdownListTime.style.display === 'block' ? 'none' : 'block';
      });
  
      document.addEventListener('click', function() {
        dropdownListTime.style.display = 'none';
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
