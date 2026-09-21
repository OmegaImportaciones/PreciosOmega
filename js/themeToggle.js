/* =========================================================
   THEME TOGGLE
   El tema inicial (antes del primer pintado) ya lo aplica el
   pequeño script inline en el <head> de cada página, leyendo
   localStorage — esto evita el "flash" de tema equivocado.
   Este archivo solo maneja el click del botón y lo mantiene
   sincronizado (ícono, aria-pressed, theme-color del navegador).
========================================================= */

(function () {

    const STORAGE_KEY =
        'omega-theme';

    const htmlEl =
        document.documentElement;

    const button =
        document.getElementById(
            'themeToggleButton'
        );

    if (!button) return;

    const icon =
        button.querySelector(
            '.theme-toggle-icon'
        );

    const themeColorMeta =
        document.querySelector(
            'meta[name="theme-color"]'
        );


    function isDarkTheme() {

        return htmlEl.getAttribute('data-theme') === 'dark';

    }


    function syncToggleUI() {

        const dark =
            isDarkTheme();

        button.setAttribute(
            'aria-pressed',
            dark ? 'true' : 'false'
        );

        button.setAttribute(
            'aria-label',
            dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
        );

        if (icon) {

            icon.textContent =
                dark ? '☀️' : '🌙';

        }

        if (themeColorMeta) {

            themeColorMeta.setAttribute(
                'content',
                dark ? '#000000' : '#ffffff'
            );

        }

    }


    function toggleTheme() {

        const goingDark =
            !isDarkTheme();

        if (goingDark) {

            htmlEl.setAttribute('data-theme', 'dark');

        } else {

            htmlEl.removeAttribute('data-theme');

        }

        try {

            localStorage.setItem(
                STORAGE_KEY,
                goingDark ? 'dark' : 'light'
            );

        } catch (error) {

            // Modo privado / storage bloqueado: el tema seguirá
            // funcionando en esta sesión, solo no se recordará.

        }

        syncToggleUI();

        if (typeof gtag === 'function') {

            gtag(
                'event',
                'toggle_theme',
                {
                    theme:
                        goingDark ? 'dark' : 'light'
                }
            );

        }

    }


    button.addEventListener(
        'click',
        toggleTheme
    );

    syncToggleUI();

})();
