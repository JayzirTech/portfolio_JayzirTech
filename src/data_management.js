const inventoryMap = new Map([
    [
        "1001", {
            nombre: "Cuaderno Rayado 100H",
            precio: 5500,
            categoria: "Papelería"
        }],
    [
        "1002", {
            nombre: "Caja de Colores x24",
            precio: 12000,
            categoria: "Papelería"
        }],
    [
        "2002", {
            nombre: "Resaltador Fluorescente",
            precio: 2800,
            categoria: "Útiles de Oficina"
        }],
    [
        "3001", {
            nombre: "Cartulina de Colores",
            precio: 800,
            categoria: "Manualidades"
        }],
    [
        "3002", {
            nombre: "Silicona Líquida 250ml",
            precio: 8500,
            categoria: "Manualidades"
        }],
    [
        "2001", {
            nombre: "Pegante en Barra 40g",
            precio: 3500,
            categoria: "Útiles de Oficina"
        }],
    [
        "4001", {
            nombre: "Carpeta de Presentación",
            precio: 1500,
            categoria: "Archivo"
        }],
    [
        "4002", {
            nombre: "Ganchos Legajadores x20",
            precio: 2200,
            categoria: "Archivo"
        }],
    [
        "5001", {
            nombre: "Calculadora Científica",
            precio: 45000,
            categoria: "Tecnología"
        }],
    [
        "5002", {
            nombre: "Memoria USB 64GB",
            precio: 28000,
            categoria: "Tecnología"
        }]
]);

/**
 * Control de Navegación de Secciones
 * Esta función se encarga de mostrar solo una "pantalla" a la vez.
 */
function showSection(sectionId) {
    // 1. Ocultar el menú principal
    const mainMenu = document.getElementById('mainMenu');
    if (mainMenu) {
        mainMenu.style.display = 'none';
    }

    // 2. Ocultar todas las secciones de contenido (las que tienen la clase .content-section)
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
        const form = section.querySelector('form');
        if (form) {
            form.reset();
        }
    });

    // 3. Lógica para decidir qué mostrar
    if (sectionId === 'mainMenu') {
        // Si el usuario quiere volver, mostramos el menú principal en modo flex
        if (mainMenu) {
            mainMenu.style.display = 'flex';
        }
    } else {
        // Si el usuario elige una funcionalidad, activamos esa sección específica
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }
}

/**
 * Manejador de Búsqueda (Estructura base)
 * Esta función se activa al hacer clic en el botón de buscar.
 */
function handleSearch() {
    const id = document.getElementById('searchInputID').value;
    const resultArea = document.getElementById('searchResult');

    // Verificamos si el ID existe en nuestro Map
    if (inventoryMap.has(id)) {
        const producto = inventoryMap.get(id);
        resultArea.innerHTML = `
            <div class="info-box">
                <p><strong>Producto:</strong> ${producto.nombre}</p>
                <p><strong>Precio:</strong> $${producto.precio}</p>
                <p><strong>Categoría:</strong> ${producto.categoria}</p>
            </div>
        `;
    } else {
        resultArea.innerHTML = `<p class="placeholder-text">❌ Producto no encontrado</p>`;
    }
}

// Seleccionamos todos los campos de búsqueda
const searchFields = document.querySelectorAll('.search-field');

searchFields.forEach(field => {
    field.addEventListener('input', () => {
        // Verificamos si el campo actual tiene algún valor
        const hasValue = field.value !== "";

        if (hasValue) {
            // Si tiene valor, deshabilitamos todos los DEMÁS campos
            searchFields.forEach(otherField => {
                if (otherField !== field) {
                    otherField.disabled = true;
                    otherField.style.opacity = "0.5"; // Feedback visual de bloqueo
                    otherField.style.cursor = "not-allowed";
                }
            });
        } else {
            // Si el campo se vacía, habilitamos todos nuevamente
            searchFields.forEach(f => {
                f.disabled = false;
                f.style.opacity = "1";
                f.style.cursor = "auto";
            });
        }
    });
});