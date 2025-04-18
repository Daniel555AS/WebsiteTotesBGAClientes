const identifierTypeMap = {};

document.addEventListener('DOMContentLoaded', async () => {
    const identifierTypeSelect = document.getElementById('identifier-type');
    const customerTypeSelect = document.getElementById('customer-type');
    const grupoNombre = document.getElementById('nombre').closest('.form-group');
    const grupoApellido = document.getElementById('apellido').closest('.form-group');
    const grupoRazonSocial = document.getElementById('grupo-razon-social');
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const razonSocialInput = document.getElementById('razon-social');

    try {
        const response = await fetch('http://localhost:8080/identifier-types', {
            method: "GET",
            headers: {
                "Username": "portalwebuser@totesmatriz.com"
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const identifierTypes = await response.json();

        identifierTypes.forEach(type => {
            identifierTypeMap[type.id] = type.name;
        });
        const identificacionInput = document.getElementById('identificacion-num');
        function actualizarOpcionesIdentificador(tipoCliente) {
            identifierTypeSelect.innerHTML = '';

            if (tipoCliente === 'juridica') {
                const nitId = Object.keys(identifierTypeMap).find(
                    id => identifierTypeMap[id].toUpperCase() === 'NIT'
                );

                if (nitId) {
                    const option = document.createElement('option');
                    option.value = nitId;
                    option.textContent = identifierTypeMap[nitId];
                    identifierTypeSelect.appendChild(option);
                    identifierTypeSelect.disabled = true;
                }
            } else {
                for (const [id, name] of Object.entries(identifierTypeMap)) {
                    if (name.toUpperCase() !== 'NIT') {
                        const option = document.createElement('option');
                        option.value = id;
                        option.textContent = name;
                        identifierTypeSelect.appendChild(option);
                    }
                }
                identifierTypeSelect.disabled = false;
            }
        }

        function actualizarCamposFormulario(tipoCliente) {
            if (tipoCliente === 'juridica') {
                grupoNombre.style.display = 'none';
                grupoApellido.style.display = 'none';
                grupoRazonSocial.style.display = 'block';

                nombreInput.required = false;
                apellidoInput.required = false;
                razonSocialInput.required = true;

                nombreInput.value = '';
                apellidoInput.value = '';
                identificacionInput.placeholder = 'NIT: Todo el código junto';
            } else {
                grupoNombre.style.display = 'block';
                grupoApellido.style.display = 'block';
                grupoRazonSocial.style.display = 'none';

                nombreInput.required = true;
                apellidoInput.required = true;
                razonSocialInput.required = false;

                razonSocialInput.value = '';
                identificacionInput.placeholder = 'Tu número de identificación';
            }
        }

        // When loading the page
        const tipoInicial = customerTypeSelect.value;
        actualizarOpcionesIdentificador(tipoInicial);
        actualizarCamposFormulario(tipoInicial);

        // When changing the client type
        customerTypeSelect.addEventListener('change', () => {
            const tipoSeleccionado = customerTypeSelect.value;
            actualizarOpcionesIdentificador(tipoSeleccionado);
            actualizarCamposFormulario(tipoSeleccionado);
        });

    } catch (error) {
        console.error('Error al obtener los tipos de identificador:', error);
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

// Select the input element with the ID 'identificacion-num'
const InputId = document.getElementById('identificacion-num');

// Check if the input element exists in the DOM
if (InputId) {
    InputId.addEventListener('keydown', (event) => {
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

        // Block if not an allowed number or key
        if (
            !/[0-9]/.test(event.key) &&
            !allowedKeys.includes(event.key)
        ) {
            event.preventDefault();
            return;
        }

        // Prevent entry of more than 12 digits (except control keys)
        const currentValue = InputId.value;
        const isControlKey = allowedKeys.includes(event.key);
        const selectionStart = InputId.selectionStart;
        const selectionEnd = InputId.selectionEnd;
        const willAddDigit = /[0-9]/.test(event.key);

        if (
            willAddDigit &&
            currentValue.length >= 12 &&
            selectionStart === selectionEnd // You are not selecting text
        ) {
            event.preventDefault();
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

document.addEventListener("DOMContentLoaded", function () {
    // Dictionary with friendly names for fields
    const fieldNames = {
        customerName: "Nombres",
        lastName: "Apellidos",
        email: "Correo Electrónico",
        customerId: "Número de Identificación",
        phoneNumbers: "Teléfono Celular",
        address: "Dirección de Residencia"
    };

    const form = document.getElementById("contact-form");
    const fechaInput = document.getElementById("fecha");
    const horaInput = document.getElementById("hora");
    const fechaHoraFinalInput = document.getElementById("fecha-hora-final");

    function actualizarFechaHoraFinal() {
        const fecha = fechaInput.value;
        const hora = horaInput.value;
    
        if (fecha && hora) {
            // Add "Z" to be interpreted in UTC
            fechaHoraFinalInput.value = `${fecha}T${hora}:00Z`;
        }
    }    
    
    // Listen for changes in date and time fields
    fechaInput.addEventListener("change", actualizarFechaHoraFinal);
    horaInput.addEventListener("change", actualizarFechaHoraFinal);

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Avoid normal form submission

        // Ensure the date and time have been combined before sending
        actualizarFechaHoraFinal();

        const dateTime = fechaHoraFinalInput.value.trim();
        if (!dateTime) {
            alert("Por favor, selecciona una fecha y hora.");
            return;
        }

        const customerType = document.getElementById("customer-type")?.value;
        const isBusiness = customerType === "juridica";
        const razonSocial = document.getElementById("razon-social")?.value.trim();
        const customerNameNatural = document.getElementById("nombre")?.value.trim();
        const lastNameNatural = document.getElementById("apellido")?.value.trim();
        const phoneNumbers = document.getElementById("telefono")?.value.trim();
        const identifierTypeId = document.getElementById("identifier-type")?.value;
        const customerId = document.getElementById("identificacion-num")?.value.trim();
        const email = document.getElementById("correo")?.value.trim();
        const address = document.getElementById("address")?.value.trim();
        
        const parsedCustomerId = parseInt(customerId, 10);
        const parsedIdentifierTypeId = parseInt(identifierTypeId, 10);
    
        // Assign first and last name values ​​according to customer type
        const customerName = isBusiness ? "*" : customerNameNatural;
        const lastName = isBusiness ? razonSocial : lastNameNatural;
    
        const appointmentData = {
            dateTime,
            state: true,
            customerId: parsedCustomerId,
            customerName,
            isBusiness,
            address,
            phoneNumbers,
            customerState: true,
            email,
            lastName,
            identifierTypeId: parsedIdentifierTypeId,
        };
    
        // Set friendly name for lastName depending on the client type
        if (isBusiness) {
            fieldNames.lastName = "Razón Social";
        } else {
            fieldNames.lastName = "Apellidos";
        }

        // Validate fields
        for (const key in appointmentData) {
            if (!(key in fieldNames)) continue;

            if (!appointmentData[key] || appointmentData[key].length === 0) {
                alert(`El campo "${fieldNames[key]}" es obligatorio y no puede estar vacío.`);
                return;
            }
        }

        if (!/^\d{10}$/.test(phoneNumbers)) {
            alert("Ingrese un número telefónico válido");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Username": "portalwebuser@totesmatriz.com"
                },
                body: JSON.stringify(appointmentData),
            });

            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
            }

            alert("¡Cita registrada exitosamente! Puedes Revisar el Resúmen de tu Cita en el archivo PDF que se ha descargado");
            generarPDFCita(appointmentData)
            form.reset();
            document.getElementById("customer-type").value = customerType;
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            alert("Oops... Hubo un problema al registrar la cita.");
        }
    });
});

async function generarPDFCita(appointmentData) {
    try {
        const fechaHoraActual = new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" });
        const appointmentId = await obtenerAppointmentId(appointmentData.customerId, appointmentData.dateTime);
        if (!appointmentId) {
            throw new Error("No se pudo obtener el ID de la cita.");
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: "portrait", format: "letter" });

        const pageWidth = doc.internal.pageSize.getWidth();
        const headerHeight = 25;
        doc.setFillColor(0, 0, 0);
        doc.rect(0, 10, pageWidth, headerHeight, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text("TOTES BGA - Matriz", 15, 20);

        const imageUrl = "assets/images/logo_header.png";

        // Turning the image into a promise
        await new Promise((resolve) => {
            const img = new Image();
            img.src = imageUrl;
            img.onload = function () {
                const imgWidth = 60;
                const imgHeight = 15;
                const imgX = pageWidth - imgWidth - 15;
                const imgY = 13;
                doc.addImage(img, "PNG", imgX, imgY, imgWidth, imgHeight);
                resolve();
            };
        });

        const margenDebajoFranja = 10;
        let startY = 10 + headerHeight + margenDebajoFranja;

        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Confirmación de Cita", pageWidth / 2, startY, { align: "center" });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        const descripcion = `Este documento confirma la cita registrada en el sistema de TOTES BGA - Matriz. A continuación, se detalla la información de la cita programada. Fecha de generación: ${fechaHoraActual}.`;

        let marginX = 15;
        let marginY = startY + 10;
        let maxWidth = pageWidth - 30;

        let textoDividido = doc.splitTextToSize(descripcion, maxWidth);
        doc.text(textoDividido, marginX, marginY);

        let startTableY = marginY + doc.getTextDimensions(textoDividido).h + 5;

        const columnas = ["Campo", "Información"];

        const identifierTypeName = identifierTypeMap[appointmentData.identifierTypeId] || "Desconocido";
        
        const filas = [];

        filas.push(["ID de Cita", appointmentId]);
        
        if (appointmentData.isBusiness) {
            filas.push(["Razón Social", appointmentData.lastName]);
        } else {
            filas.push(["Nombre", appointmentData.customerName]);
            filas.push(["Apellido", appointmentData.lastName]);
        }
        
        filas.push(["Teléfono", appointmentData.phoneNumbers]);
        filas.push(["Correo", appointmentData.email]);
        filas.push(["Dirección", appointmentData.address]);
        filas.push(["Tipo de Cliente", appointmentData.isBusiness ? "Jurídica" : "Natural"]);
        filas.push(["Identificación", appointmentData.customerId]);
        filas.push(["Tipo de Identificación", identifierTypeName]);
        filas.push(["Fecha y Hora", appointmentData.dateTime]);
        
        doc.autoTable({
            head: [columnas],
            body: filas,
            startY: startTableY,
            theme: "striped",
            styles: { fontSize: 10, halign: "center", cellPadding: 3 },
            headStyles: { fillColor: [52, 73, 94], textColor: 255, fontSize: 10 },
            columnStyles: {
                0: { cellWidth: 60, fontStyle: "bold" },
                1: { cellWidth: 120 }
            },
            tableWidth: "wrap",
            margin: { top: 10, bottom: 10 },
            startX: "center",
            pageBreak: "auto"
        });

        doc.save(`Cita_${appointmentData.customerId}.pdf`);
    } catch (error) {
        console.error("Error al generar el PDF:", error);
        alert("Error al generar el PDF: " + error.message);
    }
}

function formatearParaConsulta(dateISO) {
    const fecha = new Date(dateISO); // Convert the date with the "Z"

    const anio = fecha.getUTCFullYear();
    const mes = String(fecha.getUTCMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getUTCDate()).padStart(2, "0");
    const horas = String(fecha.getUTCHours()).padStart(2, "0");
    const minutos = String(fecha.getUTCMinutes()).padStart(2, "0");
    const segundos = String(fecha.getUTCSeconds()).padStart(2, "0");

    return `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`; // Format without "T" or "Z"
}

async function obtenerAppointmentId(customerId, dateTime) {
    try {
        const dateTimeFormatted = formatearParaConsulta(dateTime); // Convert for query
        const encodedDateTime = encodeURIComponent(dateTimeFormatted); // Encode spaces
        const url = `http://localhost:8080/appointments/byCustomerAndDate?customerId=${customerId}&dateTime=${encodedDateTime}`;

        const response = await fetch(url, { 
            method: "GET",
            headers: {
                "Username": "portalwebuser@totesmatriz.com"
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data && data.id) {
            return data.id;
        } else {
            throw new Error("No se encontró el appointmentId en la respuesta.");
        }
    } catch (error) {
        console.error("Error al obtener el ID de la cita:", error);
        return null;
    }
}

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
        for (let h = 9; h <= 17; h++) {
            let horaFormateada = h.toString().padStart(2, "0");
            let opcion = document.createElement("option");
            opcion.value = `${horaFormateada}:00`;
            opcion.textContent = `${horaFormateada}:00`;
            horaSelect.appendChild(opcion);
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



