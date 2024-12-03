// Seleccionar elementos de la serpiente y la pista
const snake = document.querySelector('.snake');
const raceTrack = document.querySelector('.race-track');

// Función para mover la serpiente verticalmente
function updateSnakePosition() {
    const scrollTop = window.scrollY; // Cantidad de scroll actual
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight; // Máximo posible de scroll
    const trackHeight = raceTrack.offsetHeight - snake.offsetHeight; // Altura útil de la pista

    // Asegurarse de que haya scroll disponible
    if (maxScroll > 0) {
        const position = (scrollTop / maxScroll) * trackHeight; // Posición proporcional
        snake.style.top = ` ${position}px`; // Mover serpiente verticalmente
    }
}

// Escuchar el evento de scroll
window.addEventListener('scroll', updateSnakePosition);
