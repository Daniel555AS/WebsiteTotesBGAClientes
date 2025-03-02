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
        polygon.src = 'assets/images/claro_figura_inicio_decorativa.svg';
        logo.src = 'assets/images/claro_logo_header.png';
        // Saves the mode to localStorage
        localStorage.setItem('theme', 'light');
    } else {
        // Reverts the polygon and logo images to their dark mode versions
        polygon.src = 'assets/images/figura_inicio_decorativa.svg';
        logo.src = 'assets/images/logo_header.png';
        // Saves the mode to localStorage
        localStorage.setItem('theme', 'dark');
    }
}

// Check if there is a saved theme in localStorage and apply it
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    polygon.src = 'assets/images/claro_figura_inicio_decorativa.svg';
    logo.src = 'assets/images/claro_logo_header.png';
    themeSwitch.checked = true; // Set the theme switch to reflect the light mode
} else if (savedTheme === 'dark') {
    body.classList.remove('light-mode');
    polygon.src = 'assets/images/figura_inicio_decorativa.svg';
    logo.src = 'assets/images/logo_header.png';
    themeSwitch.checked = false; // Set the theme switch to reflect the dark mode
}

// Listens for changes on the theme switch and triggers the theme toggle function
themeSwitch.addEventListener('change', toggleTheme);
