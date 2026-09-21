/* =========================================================
   CATÁLOGO (PREVIEW EN HOME) — CARRUSEL INFORMATIVO CON EL
   DATASET COMPLETO DEL CATÁLOGO (products.json), MOSTRANDO
   EL RANGO DE PRECIO (precio6 mínimo – precio1 máximo).
========================================================= */


/* =========================
   1. DOM & CONFIG
========================= */

const catalogPreviewSection =
    document.getElementById(
        'catalogSection'
    );

const catalogPreviewContainer =
    document.getElementById(
        'catalogContainer'
    );

const CATALOG_PREVIEW_CONFIG = {

    PRODUCTS_URL:
        './data/products.json',

    OLD_STOCK_URL:
        './data/old.json',

    PREVIEW_COUNT:
        12,

    SCROLL_INTERVAL_MS:
        10000,

    WHATSAPP_NUMBER:
        '59164216262'

};


/* =========================
   2. STATE
========================= */

const CATALOG_PREVIEW_STATE = {

    sliderInterval:
        null,

    isUserTouching:
        false,

    listenersRegistered:
        false

};


/* =========================
   3. DATA LAYER
========================= */

async function fetchCatalogPreviewJSON(path) {

    const response =
        await fetch(path);

    if (!response.ok) {

        throw new Error(
            `No se pudo cargar ${path}: ${response.status}`
        );

    }

    return await response.json();

}


function filterAvailableCatalogProducts(products) {

    if (!Array.isArray(products)) {

        return [];

    }

    return products.filter(product =>

        product.estado === 1 &&
        product.cantidad_disponible > 0

    );

}


// Igual que en el catálogo completo: si existe old.json, se usa para
// marcar qué productos son stock nuevo. Si no existe o falla, se
// omite la marca sin romper el carrusel.
async function fetchOldStockMapPreview() {

    try {

        const oldProducts =
            await fetchCatalogPreviewJSON(
                CATALOG_PREVIEW_CONFIG.OLD_STOCK_URL
            );

        const oldStockMap =
            new Map();

        oldProducts.forEach(product => {

            oldStockMap.set(
                product.id,
                Number(product.cantidad_disponible) || 0
            );

        });

        return oldStockMap;

    } catch (error) {

        return null;

    }

}


function markNewStockPreview(products, oldStockMap) {

    if (!oldStockMap) {

        return products.map(product => (
            { ...product, _isNewStock: false }
        ));

    }

    return products.map(product => {

        const isNewStock =
            !oldStockMap.has(product.id) ||
            oldStockMap.get(product.id) <= 0;

        return { ...product, _isNewStock: isNewStock };

    });

}


function sortNewStockFirstPreview(products) {

    return [...products].sort((a, b) => {

        if (a._isNewStock === b._isNewStock) return 0;

        return a._isNewStock ? -1 : 1;

    });

}


async function fetchCatalogPreviewProducts() {

    const [products, oldStockMap] =
        await Promise.all([
            fetchCatalogPreviewJSON(
                CATALOG_PREVIEW_CONFIG.PRODUCTS_URL
            ),
            fetchOldStockMapPreview()
        ]);

    const available =
        filterAvailableCatalogProducts(products);

    const withFlag =
        markNewStockPreview(available, oldStockMap);

    return sortNewStockFirstPreview(withFlag)
        .slice(0, CATALOG_PREVIEW_CONFIG.PREVIEW_COUNT);

}


/* =========================
   4. CARD BUILDER
========================= */

function buildCatalogPreviewCard(product) {

    const card =
        document.createElement('div');

    card.className =
        'carousel-card';

    const tagClass =
        product._isNewStock
            ? 'carousel-tag carousel-tag--new'
            : 'carousel-tag carousel-tag--catalog';

    const tagLabel =
        product._isNewStock
            ? '🆕 Nuevo'
            : '🛒 Catálogo';

    const precioMinimo =
        Number(product.precio6).toFixed(2);

    const precioMaximo =
        Number(product.precio1).toFixed(2);

    card.innerHTML = `

        <img src="${product.imagen}"
            alt="${product.producto}"
            class="carousel-image"
            loading="lazy">

        <div class="carousel-info">

            <span class="${tagClass}">
                ${tagLabel}
            </span>

            <h3>
                ${product.producto}
            </h3>

            <div class="carousel-prices">

                <span class="carousel-price-range">
                    Bs ${precioMinimo} – Bs ${precioMaximo}
                </span>

            </div>

        </div>

    `;

    return card;

}


/* =========================
   5. RENDER
========================= */

function renderCatalogPreviewCards(products) {

    catalogPreviewContainer.innerHTML =
        '';

    const fragment =
        document.createDocumentFragment();

    products.forEach(product => {

        fragment.appendChild(
            buildCatalogPreviewCard(product)
        );

    });

    catalogPreviewContainer.appendChild(
        fragment
    );

}


/* =========================
   6. SLIDER (mismo comportamiento que Ofertas Flash)
========================= */

function registerCatalogPreviewListenersOnce() {

    if (CATALOG_PREVIEW_STATE.listenersRegistered) {

        return;

    }

    catalogPreviewContainer.addEventListener(
        'touchstart',
        () => {

            CATALOG_PREVIEW_STATE.isUserTouching =
                true;

        },
        { passive: true }
    );

    catalogPreviewContainer.addEventListener(
        'touchend',
        () => {

            setTimeout(() => {

                CATALOG_PREVIEW_STATE.isUserTouching =
                    false;

            }, 1500);

        },
        { passive: true }
    );

    CATALOG_PREVIEW_STATE.listenersRegistered =
        true;

}


function startCatalogPreviewSlider() {

    if (!catalogPreviewContainer) return;

    const firstCard =
        catalogPreviewContainer.querySelector(
            '.carousel-card'
        );

    if (!firstCard) return;

    const scrollAmount =
        firstCard.offsetWidth + 12;

    clearInterval(
        CATALOG_PREVIEW_STATE.sliderInterval
    );

    CATALOG_PREVIEW_STATE.sliderInterval =
        setInterval(() => {

            if (CATALOG_PREVIEW_STATE.isUserTouching) {

                return;

            }

            const maxScroll =
                catalogPreviewContainer.scrollWidth -
                catalogPreviewContainer.clientWidth;

            if (

                catalogPreviewContainer.scrollLeft >=
                maxScroll - 10

            ) {

                catalogPreviewContainer.scrollTo({

                    left: 0,
                    behavior: 'smooth'

                });

                return;

            }

            catalogPreviewContainer.scrollBy({

                left: scrollAmount,
                behavior: 'smooth'

            });

        }, CATALOG_PREVIEW_CONFIG.SCROLL_INTERVAL_MS);

    registerCatalogPreviewListenersOnce();

}


/* =========================
   7. INIT
========================= */

async function loadCatalogPreview() {

    try {

        const products =
            await fetchCatalogPreviewProducts();

        if (products.length === 0) {

            catalogPreviewSection.style.display =
                'none';

            return;

        }

        catalogPreviewSection.style.display =
            '';

        renderCatalogPreviewCards(
            products
        );

        startCatalogPreviewSlider();

    } catch (error) {

        console.error(
            'Error cargando el Catálogo (preview):',
            error
        );

        catalogPreviewSection.style.display =
            'none';

    }

}


loadCatalogPreview();
