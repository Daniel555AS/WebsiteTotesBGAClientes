// Detect scroll event to add a shadow effect to the header
document.addEventListener('scroll', () => {
    // Get the header element by its ID
    const header = document.getElementById('header');
    
    // Check if the vertical scroll position is greater than 50 pixels
    if (window.scrollY > 50) {
        // Add the 'scrolled' class to the header to apply styling (e.g., shadow effect)
        header.classList.add('scrolled');
    } else {
        // Remove the 'scrolled' class when the scroll position is at the top
        header.classList.remove('scrolled');
    }
});
