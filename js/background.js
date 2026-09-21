// =========================
// OMEGA BACKGROUND - LIGHT MODE
// =========================

// =========================
// CREATE BACKGROUND
// =========================
const background = document.createElement('div');

// Usamos valores negativos en inset para "sangrar" el fondo fuera de la pantalla
// y evitar que se vean bordes blancos al hacer scroll o en el notch.
background.style.position = 'fixed';
background.style.top = '-5%';
background.style.left = '-5%';
background.style.width = '110vw';
background.style.height = '110dvh';

background.style.overflow = 'hidden';
background.style.pointerEvents = 'none';
background.style.zIndex = '0';

// El color base ya no se fuerza aquí: lo controla --bg-primary
// (blanco en modo claro, negro puro en modo oscuro) mediante la
// clase 'omega-bg', para que el toggle de tema también lo afecte.
background.classList.add('omega-bg');

document.body.prepend(background);

// =========================
// ANIMATIONS
// =========================
const style = document.createElement('style');

// He añadido translate3d para forzar la aceleración por hardware (GPU) en iPhone
style.textContent = `
@keyframes blob1 {
    0% { transform: translate3d(0px, 0px, 0) scale(1); }
    100% { transform: translate3d(90px, -70px, 0) scale(1.1); }
}

@keyframes blob2 {
    0% { transform: translate3d(0px, 0px, 0) scale(1); }
    100% { transform: translate3d(-80px, 70px, 0) scale(1.06); }
}

@keyframes blob3 {
    0% { transform: translate3d(0px, 0px, 0) scale(1); }
    100% { transform: translate3d(60px, 60px, 0) scale(1.08); }
}
`;

document.head.appendChild(style);

// =========================
// CREATE BLOB
// =========================
function createBlob({ size, color, top, left, animation }) {
    const blob = document.createElement('div');

    blob.style.position = 'absolute'; // Absolute respecto al background fijo
    blob.style.width = `${size}px`;
    blob.style.height = `${size}px`;
    blob.style.top = top;
    blob.style.left = left;
    blob.style.borderRadius = '50%';
    blob.style.background = color;
    blob.style.filter = 'blur(80px)'; // Difuminado muy amplio: un tinte ambiental, no una mancha
    blob.style.opacity = '1';
    blob.style.pointerEvents = 'none';
    blob.style.willChange = 'transform';
    blob.style.animation = animation;

    background.appendChild(blob);
}

// =========================
// BLOBS
// Tonos pastel muy tenues (azul y violeta de sistema iOS),
// grandes y lentísimos — dan sensación de vida sin ensuciar
// el fondo blanco.
// =========================
createBlob({
    size: 340,
    color: 'rgba(0,122,255,0.10)',
    top: '4%',
    left: '8%',
    animation: 'blob1 15s ease-in-out infinite alternate'
});

createBlob({
    size: 300,
    color: 'rgba(175,82,222,0.08)',
    top: '55%',
    left: '58%',
    animation: 'blob2 17s ease-in-out infinite alternate-reverse'
});

createBlob({
    size: 260,
    color: 'rgba(52,199,89,0.06)',
    top: '78%',
    left: '10%',
    animation: 'blob3 19s ease-in-out infinite alternate'
});
