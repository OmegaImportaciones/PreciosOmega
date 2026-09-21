/* =========================
   NAVBARS
========================= */

const heroNavbar =
    document.getElementById(
        'heroNavbar'
    );

const compactNavbar =
    document.getElementById(
        'compactNavbar'
    );


/* =========================
   SEARCH INPUTS
========================= */

const searchInputs =
    document.querySelectorAll(
        '.catalog-hero-search-input, .catalog-compact-search-input'
    );


/* =========================
   CONFIG
========================= */

const compactOffset =
    80;


/* =========================
   RAF STATE
========================= */

let ticking =
    false;


/* =========================
   SEARCH STATE
========================= */

let isSearching =
    false;


/* =========================
   SEARCH EVENTS
========================= */

searchInputs.forEach(input => {

    /* =========================
       FOCUS
    ========================= */

    input.addEventListener(
        'focus',
        () => {

            isSearching =
                true;

        }
    );


    /* =========================
       BLUR
    ========================= */

    input.addEventListener(
        'blur',
        () => {

            setTimeout(() => {

                isSearching =
                    false;

                updateNavbars();

            }, 120);

        }
    );

});


/* =========================
   UPDATE NAVBARS
========================= */

function updateNavbars() {

    /* =========================
       LOCK DURING SEARCH
    ========================= */

    if (isSearching) {

        ticking =
            false;

        return;

    }


    const scrollY =
        window.scrollY;


    /* =========================
       SHOW COMPACT
    ========================= */

    if (scrollY >= compactOffset) {

        heroNavbar.classList.add(
            'hero-hidden'
        );

        compactNavbar.classList.add(
            'compact-visible'
        );

    }


    /* =========================
       SHOW HERO
    ========================= */

    else {

        heroNavbar.classList.remove(
            'hero-hidden'
        );

        compactNavbar.classList.remove(
            'compact-visible'
        );

    }


    /* =========================
       RESET RAF
    ========================= */

    ticking =
        false;

}


/* =========================
   SCROLL EVENT
========================= */

window.addEventListener(
    'scroll',
    () => {

        if (!ticking) {

            window.requestAnimationFrame(
                updateNavbars
            );

            ticking =
                true;

        }

    },
    {
        passive: true
    }
);


/* =========================
   INIT
========================= */

updateNavbars();