// Selects the theme switch input element from the DOM
const themeSwitch = document.getElementById('theme-switch');

// Stores a reference to the body element for class manipulation
const body = document.body;

// Selects the first element with the class 'polygon-1' (decorative polygon image)
const polygon = document.querySelector('.polygon-1');

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
        // Changes the polygon and logo images to their light mode versions
        polygon.src = 'assets/claro_figura_inicio_decorativa.svg';
        logo.src = 'assets/claro_logo_header.png';
    } else {
        // Reverts the polygon and logo images to their dark mode versions
        polygon.src = 'assets/figura_inicio_decorativa.svg';
        logo.src = 'assets/logo_header.png';
    }
}

// Initializes the default polygon image (dark mode version on page load)
polygon.src = 'assets/figura_inicio_decorativa.svg';

// Listens for changes on the theme switch and triggers the theme toggle function
themeSwitch.addEventListener('change', toggleTheme);
