// Detectar el desplazamiento para agregar sombra al header
document.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled'); // Agregar clase cuando se hace scroll
    } else {
        header.classList.remove('scrolled'); // Remover clase si vuelve al inicio
    }
});