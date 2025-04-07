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

// Select the input element with the ID 'telefono'
const telefonoInput = document.getElementById('telefono');

// Check if the input element exists in the DOM
if (telefonoInput) {
    // Add an event listener to the 'keydown' event (when a key is pressed)
    telefonoInput.addEventListener('keydown', (event) => {
        // Allow only numeric characters [0-9] and essential control keys (backspace, delete, arrow keys, tab)
        if (
            !/[0-9]/.test(event.key) && // Ensure the key is a digit (0-9)
            !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key) // Allow specific control keys
        ) {
            event.preventDefault(); // Block any other key press
        }
    });
}

// Select the email field
const emailInput = document.getElementById('correo');

// Checks if the field exists in the DOM
if (emailInput) {
    // Listen for the keydown event
    emailInput.addEventListener('keydown', (event) => {
        if (event.key === ' ') {
            event.preventDefault(); // Lock the space bar
        }
    });
}

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Dictionary with friendly names for fields
    const fieldNames = {
        name: "Nombres",
        last_name: "Apellidos",
        email: "Correo Electrónico",
        residence_state: "Departamento de Residencia",
        residence_city: "Ciudad de Residencia",
        comment: "Comentarios"
    };

    // Select the form element with the ID 'contact-form'
    const contactForm = document.getElementById('contact-form');

    // Add a submit event listener to the contact form
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Collect form data from input fields
        const formData = {
            name: document.getElementById('nombre').value.trim(),
            last_name: document.getElementById('apellido').value.trim(),
            email: document.getElementById('correo').value.trim(),
            phone: document.getElementById('telefono').value.trim() || null,
            residence_state: document.getElementById('departamento').value.trim(),
            residence_city: document.getElementById('ciudad').value.trim(),
            comment: document.getElementById('comentarios').value.trim()
        };

        // Validate that required fields are not empty or filled only with spaces
        for (const key in formData) {
            if (key !== "phone" && (!formData[key] || formData[key].length === 0)) {
                alert(`El campo "${fieldNames[key]}" es obligatorio y no puede estar vacío.`);
                return; // Stops the form from being sent
            }
        }

        if (!/^\d{10}$/.test(formData.phone)) {
            alert("Ingrese un número telefónico válido");
            return;
        }

        try {
            // Send a POST request to the backend server endpoint
            const response = await fetch('http://localhost:8080/comment', {
                method: 'POST', // HTTP method used for sending data
                headers: {
                    'Content-Type': 'application/json', // Indicate that the payload is in JSON format
                    "Username": "portalwebuser@totesmatriz.com" // Username header
                },
                body: JSON.stringify(formData) // Convert form data to a JSON string
            });

            // Check if the request was successful (status code 200-299)
            if (!response.ok) {
                throw new Error(`Request error: ${response.statusText}`); // Throw an error if the request fails
            }

            // Parse the JSON response from the server
            const result = await response.json();
            alert('El comentario fue enviado con éxito :)'); // Notify the user of a successful submission
            contactForm.reset(); // Clear the form fields after successful submission
            console.log('Server response:', result); // Log the server response to the console
        } catch (error) {
            // Handle errors during the fetch operation
            console.error('Hubo un error al enviar el comentario', error); // Log the error to the console
            alert('There was a problem sending the comment.'); // Notify the user of an error
        }
    });
});


