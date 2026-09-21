/* =========================
   TIKTOK DETECTION
========================= */

const isTikTokBrowser =
    /TikTok/i.test(
        navigator.userAgent
    );


/* =========================
   ELEMENTS
========================= */

const openBrowserContainer =
    document.getElementById(
        'openBrowserContainer'
    );

const openBrowserButton =
    document.getElementById(
        'openBrowserButton'
    );


/* =========================
   SHOW ONLY IN TIKTOK
========================= */

if (!isTikTokBrowser) {

    openBrowserContainer.style.display =
        'none';

}


/* =========================
   OPEN EXTERNAL BROWSER
========================= */

openBrowserButton.addEventListener(
    'click',
    async () => {

        try {

            await navigator.clipboard.writeText(
                window.location.href
            );

        } catch (error) {

            console.log(error);

        }

        alert(
            '✅ Link copiado.\n\n' +
            'Ahora toca los 3 puntos ⋮ arriba a la derecha y selecciona:\n\n' +
            '"Abrir en navegador"'
        );

    }
);