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

// Selects the theme toggle button
const modeToggle = document.getElementById('theme-switch');

// Selects the page logo image
const logo = document.getElementById('logo');

/**
 * Function to toggle between dark mode and light mode
 */
function toggleTheme() {
    // Toggles the 'light-mode' class on the body element
    document.body.classList.toggle('light-mode');

    // Checks if light mode is active
    if (document.body.classList.contains('light-mode')) {
        // Changes the logo to the light mode version
        logo.src = 'assets/claro_logo_header.png';
        // Updates the button text to indicate the option to switch to dark mode
        modeToggle.textContent = 'Dark Mode';
    } else {
        // Reverts the logo to the dark mode version
        logo.src = 'assets/logo_header.png';
        // Updates the button text to indicate the option to switch to light mode
        modeToggle.textContent = 'Light Mode';
    }
}

// Sets the default logo (dark mode version when the page loads)
logo.src = 'assets/logo_header.png';

// Adds a click event listener to the theme toggle button to switch themes
modeToggle.addEventListener('click', toggleTheme);
