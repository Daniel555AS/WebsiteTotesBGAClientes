document.addEventListener('DOMContentLoaded', async () => {
    const identifierTypeSelect = document.getElementById('identifier-type');

    try {
        const response = await fetch('http://localhost:8080/identifier-type'); // Make the GET request
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const identifierTypes = await response.json(); // Convert response to JSON

        // Fill the select with the obtained identifier types
        identifierTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type.id;  // Use numeric ID as value
            option.textContent = type.name; // Display the identifier name
            identifierTypeSelect.appendChild(option);
        });

    } catch (error) {
        console.error('Error al obtener los tipos de identificador:', error);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Avoid normal form submission

        // Capturar los valores de los inputs
        const customerName = document.getElementById("nombre").value.trim();
        const lastName = document.getElementById("apellido").value.trim();
        const phoneNumbers = document.getElementById("telefono").value.trim();
        const customerType = document.getElementById("customer-type").value; 
        const identifierTypeId = document.getElementById("identifier-type").value;
        const customerId = document.getElementById("identificacion-num").value.trim();
        const email = document.getElementById("correo").value.trim();
        const address = document.getElementById("address").value.trim();

        // Convert customerType to isBusiness
        const isBusiness = customerType === "empresa"; 

        // Build the JSON object
        const customerData = {
            customerName: customerName,
            lastName: lastName,
            phoneNumbers: phoneNumbers,
            isBusiness: isBusiness,
            identifierTypeId: parseInt(identifierTypeId, 10), 
            customerId: customerId,
            email: email,
            address: address,
            customerState: true 
        };

        try {
            const response = await fetch("http://localhost:8080/customer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(customerData),
            });

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }

            const result = await response.json();
            alert("Cliente registrado exitosamente.");

            // Clear the form after submitting it
            form.reset();
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            alert("Hubo un problema al registrar el cliente. Inténtalo de nuevo.");
        }
    });
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

document.addEventListener("DOMContentLoaded", function () {
    let fechaInput = document.getElementById("fecha");
    let horaSelect = document.getElementById("hora");
    let fechaHoraFinal = document.getElementById("fecha-hora-final");
    let formulario = document.getElementById("contact-form");

    // Set the minimum date (from tomorrow)
    let hoy = new Date();
    let manana = new Date(hoy);
    manana.setDate(hoy.getDate() + 1);
    let minFecha = manana.toISOString().split("T")[0];
    fechaInput.setAttribute("min", minFecha);

    // Generate time options with 30-minute intervals
    function generarOpcionesHora() {
        for (let h = 9; h <= 16; h++) {
            for (let m of [0, 30]) {
                let horaFormateada = h.toString().padStart(2, "0");
                let minFormateados = m.toString().padStart(2, "0");
                let opcion = document.createElement("option");
                opcion.value = `${horaFormateada}:${minFormateados}`;
                opcion.textContent = `${horaFormateada}:${minFormateados}`;
                horaSelect.appendChild(opcion);
            }
        }
    }
    generarOpcionesHora(); // Call the function

    // Combine date and time before submitting the form
    formulario.addEventListener("submit", function (event) {
        if (!fechaInput.value || !horaSelect.value) {
            alert("Por favor, selecciona una fecha y una hora.");
            event.preventDefault();
            return;
        }

        // Combine date and time in datetime-local format
        let fechaHoraStr = `${fechaInput.value}T${horaSelect.value}:00`;
        fechaHoraFinal.value = fechaHoraStr;

        console.log("Fecha y hora seleccionadas:", fechaHoraFinal.value);
    });
});



