// =========================
// BACKGROUND BLOBS
// =========================

// IMPORTANTE:
// TODO el fondo usa FIXED.
// NO usamos absolute.
// NO usamos scrollHeight.
// NO usamos resize hacks.
//
// Safari/iOS rompe el layout
// cuando el fondo participa
// del tamaño real del documento.

// =========================
// CREATE BACKGROUND
// =========================

const background = document.createElement('div');

background.style.position = 'fixed';

background.style.inset = '0';

background.style.width = '100vw';

background.style.height = '100dvh';

background.style.overflow = 'hidden';

background.style.pointerEvents = 'none';

background.style.zIndex = '-1';

background.style.background =
    `
linear-gradient(
    to bottom,
    #0b1220 0%,
    #101826 35%,
    #1a1f2b 65%,
    #25202a 100%
)
`;

document.body.prepend(background);

// =========================
// TOP LIGHT
// =========================

const topGlow = document.createElement('div');

topGlow.style.position = 'fixed';

topGlow.style.top = '-220px';

topGlow.style.left = '50%';

topGlow.style.transform =
    'translateX(-50%)';

topGlow.style.width = '180vw';

topGlow.style.height = '620px';

topGlow.style.background =
    `
radial-gradient(
    circle,

    rgba(120,210,255,0.22) 0%,

    rgba(255,255,255,0.12) 32%,

    transparent 74%
)
`;

topGlow.style.filter = 'blur(90px)';

topGlow.style.pointerEvents = 'none';

topGlow.style.zIndex = '-1';

background.appendChild(topGlow);

// =========================
// BOTTOM LIGHT
// =========================

const bottomGlow = document.createElement('div');

bottomGlow.style.position = 'fixed';

bottomGlow.style.left = '50%';

bottomGlow.style.bottom = '-240px';

bottomGlow.style.transform =
    'translateX(-50%)';

bottomGlow.style.width = '220vw';

bottomGlow.style.height = '900px';

bottomGlow.style.background =
    `
radial-gradient(
    circle,

    rgba(255,255,255,0.20) 0%,

    rgba(120,210,255,0.16) 25%,

    rgba(255,170,90,0.12) 48%,

    rgba(255,255,255,0.05) 62%,

    transparent 78%
)
`;

bottomGlow.style.filter = 'blur(100px)';

bottomGlow.style.pointerEvents = 'none';

bottomGlow.style.zIndex = '-1';

background.appendChild(bottomGlow);

// =========================
// CONFIG
// =========================

const blobsConfig = [

    // CELESTE

    {
        size: 520,

        color:
            'rgba(120, 210, 255, 0.24)',

        speedX: 2.3,

        speedY: 1.7
    },

    // BLANCO

    {
        size: 420,

        color:
            'rgba(255, 255, 255, 0.12)',

        speedX: -1.9,

        speedY: 1.5
    },

    // NARANJA

    {
        size: 360,

        color:
            'rgba(255, 170, 90, 0.16)',

        speedX: 1.8,

        speedY: -2.1
    }

];

// =========================
// BLOBS ARRAY
// =========================

const blobs = [];

// =========================
// CREATE BLOBS
// =========================

blobsConfig.forEach((config) => {

    const blob = document.createElement('div');

    // STYLE

    blob.style.position = 'fixed';

    blob.style.width =
        `${config.size}px`;

    blob.style.height =
        `${config.size}px`;

    blob.style.borderRadius = '50%';

    blob.style.background =
        config.color;

    blob.style.filter =
        'blur(90px)';

    blob.style.opacity = '1';

    blob.style.pointerEvents = 'none';

    blob.style.willChange = 'transform';

    blob.style.zIndex = '-1';

    // INITIAL POSITION

    const x =
        Math.random() *
        (window.innerWidth - config.size);

    const y =
        Math.random() *
        (window.innerHeight - config.size);

    // APPLY INITIAL POSITION

    blob.style.transform =
        `translate3d(${x}px, ${y}px, 0)`;

    background.appendChild(blob);

    blobs.push({

        element: blob,

        x,
        y,

        speedX: config.speedX,
        speedY: config.speedY,

        size: config.size

    });

});

// =========================
// ANIMATION
// =========================

function animateBlobs() {

    blobs.forEach((blob) => {

        // MOVE

        blob.x += blob.speedX;

        blob.y += blob.speedY;

        // HORIZONTAL LIMITS

        if (

            blob.x <= -220 ||

            blob.x >=
            window.innerWidth - blob.size + 220

        ) {

            blob.speedX *= -1;

        }

        // VERTICAL LIMITS

        if (

            blob.y <= -220 ||

            blob.y >=
            window.innerHeight - blob.size + 220

        ) {

            blob.speedY *= -1;

        }

        // APPLY MOVEMENT

        blob.element.style.transform =
            `translate3d(${blob.x}px, ${blob.y}px, 0)`;

    });

    requestAnimationFrame(animateBlobs);

}

// =========================
// START
// =========================

animateBlobs();